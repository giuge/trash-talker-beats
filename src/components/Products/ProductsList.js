import React, {Component} from 'react'
import Product from './Product'
import styled from 'styled-components'

import { withStoreContext } from '../../context/StoreContext'
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
    background: #0D2B40;
  }

  &::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 8px rgba(0,0,0,0.3);
  }
  &::-webkit-scrollbar-thumb {
    background-color: #39617D;
    outline: 1px solid slategrey;
  }
`

class ProductsList extends Component {
  componentDidMount() {
    const {context, products} = this.props
    context.store.updateProducts(products)
  }

  render() {
    return (
      <Container>
      <AudioPlayer />
      <List>
        {this.props.products.map(p => (
          <Product beat={p.node} key={p.node.id} />
        ))}
      </List>
    </Container>
    )
  }
}

export default withStoreContext(ProductsList)
