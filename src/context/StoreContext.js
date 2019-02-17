import React, { Component } from 'react'
import Client from 'shopify-buy'

export const StoreContext = React.createContext()

export default class StoreContextProvider extends Component {
  constructor(props) {
    super(props)

    const client = Client.buildClient({
      domain: 'trashtalkerbeats.myshopify.com',
      storefrontAccessToken: '333054976ed51e49aeee693e8bf0451d',
    })

    this.addVariantToCart = this.addVariantToCart.bind(this)
    this.removeLineItem = this.removeLineItem.bind(this)
    this.updateLineItem = this.updateLineItem.bind(this)
    this.updateProducts = this.updateProducts.bind(this)
    this.isProductInCart = this.isProductInCart.bind(this)
    this.addTag = this.addTag.bind(this)
    this.removeTag = this.removeTag.bind(this)
    this.updateSuggestions = this.updateSuggestions.bind(this)
    this.filterProducts = this.filterProducts.bind(this)

    this.state = {
      store: {
        client,
        adding: false,
        checkout: { lineItems: [] },
        products: [],
        shop: {},
        addVariantToCart: this.addVariantToCart,
        removeLineItem: this.removeLineItem,
        updateLineItem: this.updateLineItem,
        updateProducts: this.updateProducts,
        isProductInCart: this.isProductInCart,
        search: {
          tags: [],
          suggestions: [],
          filteredProducts: [],
          updateSuggestions: this.updateSuggestions,
          addTag: this.addTag,
          removeTag: this.removeTag,
          filterProducts: this.filterProducts,
        },
      },
    }
  }

  updateProducts(products) {
    this.setState(state => ({
      store: {
        ...state.store,
        products,
      },
    }))
  }

  addVariantToCart(variantId, productId) {
    if (variantId === '') {
      console.error('A lease is required')
      return
    }

    this.setState(state => ({
      store: {
        ...state.store,
        adding: true,
      },
    }))

    const { checkout, client } = this.state.store
    const checkoutId = checkout.id
    const lineItemsToUpdate = [{ variantId, quantity: parseInt(1, 10) }]
    let lineItemToRemove = ''

    // We only allow for a single variant for the same product
    for (let item of checkout.lineItems) {
      if (item.variant.product.id === productId) {
        lineItemToRemove = item.id
      }
    }

    return client.checkout
      .addLineItems(checkoutId, lineItemsToUpdate)
      .then(checkout => {
        if (!lineItemToRemove) {
          this.setState(state => ({
            store: {
              ...state.store,
              checkout,
              adding: false,
            },
          }))
        } else {
          client.checkout
            .removeLineItems(checkoutId, lineItemToRemove)
            .then(checkout => {
              this.setState(state => ({
                store: {
                  ...state.store,
                  checkout,
                  adding: false,
                },
              }))
            })
        }
      })
  }

  isProductInCart(productId) {
    const { checkout } = this.state.store

    for (let item of checkout.lineItems) {
      if (item.variant.product.id === productId) {
        return true
      }
    }

    return false
  }

  removeLineItem(lineItemID) {
    const { checkout, client } = this.state.store
    const checkoutId = checkout.id

    return client.checkout
      .removeLineItems(checkoutId, [lineItemID])
      .then(res => {
        this.setState(state => ({
          store: {
            ...state.store,
            checkout: res,
          },
        }))
      })
  }

  updateLineItem(lineItemID, quantity) {
    const { checkout, client } = this.state.store
    const checkoutID = checkout.id

    const lineItemsToUpdate = [
      { id: lineItemID, quantity: parseInt(quantity, 10) },
    ]

    return client.checkout
      .updateLineItems(checkoutID, lineItemsToUpdate)
      .then(res => {
        this.setState(state => ({
          store: {
            ...state.store,
            checkout: res,
          },
        }))
      })
  }

  async initializeCheckout() {
    // Check for an existing cart.
    const isBrowser = typeof window !== 'undefined'
    const existingCheckoutID = isBrowser
      ? localStorage.getItem('shopify_checkout_id')
      : null

    const setCheckoutInState = checkout => {
      if (isBrowser) {
        localStorage.setItem('shopify_checkout_id', checkout.id)
      }

      this.setState(state => ({
        store: {
          ...state.store,
          checkout,
        },
      }))
    }

    const createNewCheckout = () => this.state.store.client.checkout.create()
    const fetchCheckout = id => this.state.store.client.checkout.fetch(id)

    if (existingCheckoutID) {
      try {
        const checkout = await fetchCheckout(existingCheckoutID)

        // Make sure this cart hasn’t already been purchased.
        if (!checkout.completedAt) {
          setCheckoutInState(checkout)
          return
        }
      } catch (e) {
        localStorage.setItem('shopify_checkout_id', null)
      }
    }

    const newCheckout = await createNewCheckout()
    setCheckoutInState(newCheckout)
  }

  addTag(tag) {
    this.setState(state => {
      const { tags } = state.store.search

      const newTag =
        typeof tag === 'string' ? { id: tags.length + 1, name: tag } : tag

      const isTagPresent = !!tags.find(t => t.name === newTag.name)

      return {
        store: {
          ...state.store,
          search: {
            ...state.store.search,
            tags: !isTagPresent ? [].concat(tags, newTag) : tags,
          },
        },
      }
    })
    this.filterProducts()
  }

  removeTag(index) {
    this.setState(state => {
      const tags = state.store.search.tags.slice(0)
      tags.splice(index, 1)

      return {
        store: {
          ...state.store,
          search: {
            ...state.store.search,
            tags,
          },
        },
      }
    })
    this.filterProducts()
  }

  updateSuggestions() {
    this.setState(state => {
      const suggestions = state.store.products.reduce((acc, p) => {
        const tagsToPush = p.tags.filter(t => acc.indexOf(t) === -1)
        for (const tag of tagsToPush) {
          acc.push({ id: acc.length + 1, name: tag.toLowerCase() })
        }
        return acc
      }, [])

      return {
        store: {
          ...state.store,
          search: {
            ...state.store.search,
            suggestions,
          },
        },
      }
    })
  }

  filterProducts() {
    this.setState(state => {
      if (
        state.store.products.length === 0 ||
        state.store.search.tags.length === 0
      ) {
        return {
          store: {
            ...state.store,
            search: {
              ...state.store.search,
              filteredProducts: [],
            },
          },
        }
      }

      const tagList = state.store.search.tags.map(t => t.name)
      const filteredProducts = state.store.products.filter(p => {
        const filteredTags = p.tags.filter(t => tagList.indexOf(t) !== -1)
        return filteredTags.length === tagList.length
      })

      return {
        store: {
          ...state.store,
          search: {
            ...state.store.search,
            filteredProducts,
          },
        },
      }
    })
  }

  componentDidMount() {
    // Make sure we have a Shopify checkout created for cart management.
    this.initializeCheckout()
  }

  render() {
    return (
      <StoreContext.Provider value={{ ...this.state }}>
        {this.props.children}
      </StoreContext.Provider>
    )
  }
}

export function withStoreContext(Component) {
  return function WrapperComponent(props) {
    return (
      <StoreContext.Consumer>
        {state => <Component {...props} context={state} />}
      </StoreContext.Consumer>
    )
  }
}
