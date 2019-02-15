import React, { Component } from 'react'
import { navigate } from '@reach/router'
import styled from 'styled-components'

import { withAllContext } from '../../context/AllContext'
import Product from './Product'
import SearchInput from './SearchInput'
import AudioPlayer from '../AudioPlayer/'

const Container = styled.div`
  margin: 0 auto;
  max-width: 656px;
`

const List = styled.ul`
  width: 100%;
  background: #0d2b40;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  height: 70vh;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 10px;
    background: #0d2b40;
  }

  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.3);
  }

  &::-webkit-scrollbar-thumb {
    background-color: #39617d;
    outline: 1px solid slategrey;
  }
`

class ProductsList extends Component {
  componentDidMount() {
    const { context, products, location } = this.props
    const { search } = context.store
    const { hash } = location

    context.store.updateProducts(products)
    search.updateSuggestions()
    search.filterProducts()

    if (!!hash) {
      const selectedBeat = products.find(b => b.handle === hash.substr(1))

      if (!!selectedBeat) {
        context.interface.selectVariant(selectedBeat)
        context.interface.toggleVariantSelectionModal()
      }

      navigate('/')
    }
  }

  componentDidUpdate(prevProps) {
    const { context } = this.props
    const { search } = context.store

    if(prevProps.context.store.search.tags.length !== context.store.search.tags.length) {
      search.filterProducts()
    }    
  }

  render() {
    const { context } = this.props
    const { products } = context.store
    const { filteredProducts } = context.store.search
    const productsToUse = filteredProducts.length !== 0 ? filteredProducts : products
    
    return (
      <Container>
        <SearchInput />
        <AudioPlayer />
        <List>
          {productsToUse.map(p => (
            <Product beat={p} key={p.id} />
          ))}
        </List>
      </Container>
    )
  }
}

export default withAllContext(ProductsList)
