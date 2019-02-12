import React, { Component } from 'react'

export const InterfaceContext = React.createContext()

export default class InterfaceContextProvider extends Component {
  constructor(props) {
    super(props)

    this.toggleCart = this.toggleCart.bind(this)
    this.toggleVariantSelectionModal = this.toggleVariantSelectionModal.bind(this)
    this.selectPreview = this.selectPreview.bind(this)
    this.setPlayerStatus = this.setPlayerStatus.bind(this)
    this.setPlayerVolume = this.setPlayerVolume.bind(this)
    this.selectVariant = this.selectVariant.bind(this)
    this.openCart = this.openCart.bind(this)
    this.closeCart = this.closeCart.bind(this)
    this.stopPlayer = this.stopPlayer.bind(this)

    this.state = {
      interface: {
        cartStatus: 'closed',
        previewFile: {},
        playerStatus: 'STOPPED',
        playerVolume: 75,
        variantSelectionModalStatus: 'closed',
        selectingVariantForProuct: {},
        selectPreview: this.selectPreview,
        setPlayerStatus: this.setPlayerStatus,
        setPlayerVolume: this.setPlayerVolume,
        stopPlayer: this.stopPlayer,
        toggleCart: this.toggleCart,
        toggleVariantSelectionModal: this.toggleVariantSelectionModal,
        selectVariant: this.selectVariant,
        openCart: this.openCart,
        closeCart: this.closeCart
      },
    }
  }

  toggleCart() {
    this.setState(state => ({
      interface: {
        ...state.interface,
        cartStatus:
          this.state.interface.cartStatus === 'open' ? 'closed' : 'open',
      },
    }))
  }

  openCart() {
    if(this.state.cartStatus === 'open') {
      return
    }

    this.setState(state => ({
      interface: {
        ...state.interface,
        cartStatus: 'open'
      },
    }))
  }

  closeCart() {
    if(this.state.cartStatus === 'closed') {
      return
    }

    this.setState(state => ({
      interface: {
        ...state.interface,
        cartStatus: 'closed'
      },
    }))
  }

  toggleVariantSelectionModal() {
    this.setState(state => ({
      interface: {
        ...state.interface,
        variantSelectionModalStatus:
          this.state.interface.variantSelectionModalStatus === 'open' ? 'closed' : 'open',
      },
    }))    
  }

  selectVariant(product) {
    this.setState(state => ({
      interface: {
        ...state.interface,
        selectingVariantForProuct: product || {}
      },
    }))
  }

  setPlayerStatus(status) {
    this.setState(state => ({
      interface: {
        ...state.interface,
        playerStatus: status
      },
    }))
  }

  stopPlayer() {
    this.setState(state => ({
      interface: {
        ...state.interface,
        playerStatus: 'STOPPED'
      },
    }))
  }

  setPlayerVolume(playerVolume) {
    this.setState(state => ({
      interface: {
        ...state.interface,
        playerVolume
      },
    }))
  }

  selectPreview(previewFile) {
    this.setState(state => ({
      interface: {
        ...state.interface,
        playerStatus: 'PLAYING',
        previewFile
      },
    }))
  }

  render() {
    return (
      <InterfaceContext.Provider value={{ ...this.state }}>
        {this.props.children}
      </InterfaceContext.Provider>
    )
  }
}

export function withInterfaceContext(Component) {
  return function WrapperComponent(props) {
    return (
      <InterfaceContext.Consumer>
        {state => <Component {...props} context={state} />}
      </InterfaceContext.Consumer>
    )
  }
}
