import React, { Component } from 'react'
import { navigate } from '@reach/router'
import styled from 'styled-components'

import { withAllContext } from '../../context/AllContext'
import Product from './Product'
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
    const { hash } = location

    context.store.updateProducts(products)

    if (!!hash) {
      const selectedBeat = products.find(b => b.handle === hash.substr(1))

      if (!!selectedBeat) {
        context.interface.selectVariant(selectedBeat)
        context.interface.toggleVariantSelectionModal()
      }

      navigate('/')
    }
  }

  render() {
    return (
      <Container>
        <AudioPlayer />
        <List>
          {this.props.products.map(p => (
            <Product beat={p} key={p.id} />
          ))}
        </List>
      </Container>
    )
  }
}

export default withAllContext(ProductsList)
