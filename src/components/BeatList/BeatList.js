import React, { Component } from 'react'
import styled from 'styled-components'

import { withAllContext } from '../../context/AllContext'
import Product from './Beat'
import SearchInput from './SearchInput'

const Container = styled.div`
  margin: 32px auto 0 auto;
  max-width: 960px;
  background: #0a1723;
  border-radius: 4px;
  padding-bottom: 4px;
`

const List = styled.ul`
  width: 100%;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  height: 70vh;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.3);
  }

  &::-webkit-scrollbar-thumb {
    background-color: #39617d;
    outline: 1px solid slategrey;
  }
`

const EmptyText = styled.p`
  width: 100%;
  text-align: center;
  padding: 24px;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.5em;
  color: #87adc8;
  line-height: 140%;
`

class ProductsList extends Component {
  componentDidMount() {
    const { context, products } = this.props
    const { search } = context.store

    context.store.updateProducts(products)
    search.updateSuggestions()
    search.filterProducts()
  }

  componentDidUpdate(prevProps) {
    const { context } = this.props
    const { search } = context.store

    if (
      prevProps.context.store.search.tags.length !==
      context.store.search.tags.length
    ) {
      search.filterProducts()
    }
  }

  renderProducts() {
    const { context } = this.props
    const { products } = context.store
    const { filteredProducts, tags } = context.store.search
    const productsToUse = tags.length !== 0 ? filteredProducts : products

    if (tags.length === 0) {
      if (products.length === 0) {
        return <EmptyText>No products in store</EmptyText>
      }
    } else {
      if (filteredProducts.length === 0) {
        return <EmptyText>No product matches your criteria</EmptyText>
      }
    }

    return productsToUse.map(p => <Product beat={p} key={p.id} />)
  }

  render() {
    return (
      <Container>
        <SearchInput />
        <List>{this.renderProducts()}</List>
      </Container>
    )
  }
}

export default withAllContext(ProductsList)
