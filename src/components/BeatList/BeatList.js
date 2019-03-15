import React, { Component } from 'react'
import styled from 'styled-components'

import { withAllContext } from '../../context/AllContext'
import Product from './Beat'

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

const Header = styled.header`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #122434;
`

const SearchInput = styled.input`
  font-size: 18px;
  line-height: 18px;
  display: block;
  padding: 24px 16px;
  background: transparent;
  border: none;
  outline: none;
  width: 100%;
  color: #dceaf4;

  &::placeholder {
    color: rgba(220, 234, 244, 0.2);
  }
`
const GenreSelector = styled.select`
  min-width: 96px;
  text-indent: 4px;
  height: 32px;
  margin-right: 2em;
  background: rgba(220, 234, 244, 0.2);
  color: #0a1723;
  text-transform: capitalize;
  border-radius: 4px;
  border: none;
  outline: none;

  option: {
    color: #0a1723;
  }
`

class ProductsList extends Component {
  constructor(props) {
    super(props)

    const allGenres = this.props.products.map(p => p.genre)
    const genres = allGenres.filter((v, i) => allGenres.indexOf(v) === i)

    this.state = {
      serchResults: [],
      searchTerm: '',
      genres,
    }
  }

  componentDidMount() {
    const { context, products } = this.props
    context.store.updateProducts(products)
  }

  getProductsToFilter() {
    const { searchResults } = this.state
    const { products } = this.props.context.store
    return searchResults && searchResults.length > 0 ? searchResults : products
  }

  handleChange(e) {
    const searchTerm = e.target.value

    this.setState({
      serchResults: this.getProductsToFilter().filter(r =>
        r.title.toLowerCase().includes(searchTerm.toLowerCase())
      ),
      searchTerm,
    })
  }

  handleSelectChange(e) {
    const searchTerm = e.target.value.toLowerCase()

    this.setState({
      serchResults:
        searchTerm !== 'All genres'
          ? this.getProductsToFilter().filter(r =>
              r.genre.toLowerCase().includes(searchTerm.toLowerCase())
            )
          : [],
      searchTerm: '',
    })
  }

  renderProducts() {
    const { context } = this.props
    const { products } = context.store
    const { serchResults, searchTerm } = this.state
    const productsToUse = serchResults.length !== 0 ? serchResults : products

    if (products.length === 0) {
      return <EmptyText>No products in store</EmptyText>
    } else if (serchResults.length === 0 && searchTerm) {
      return <EmptyText>No product matches your criteria</EmptyText>
    }

    return productsToUse.map(p => <Product beat={p} key={p.id} />)
  }

  render() {
    return (
      <Container>
        <Header>
          <SearchInput
            type="text"
            onChange={e => this.handleChange(e)}
            value={this.state.searchTerm}
            placeholder="Search beats"
          />
          <GenreSelector
            defaultValue="Genre"
            onChange={e => this.handleSelectChange(e)}
          >
            <option disabled>Genre</option>
            {this.state.genres.map(g => (
              <option key={g}>{g}</option>
            ))}
            <option>All genres</option>
          </GenreSelector>
        </Header>
        <List>{this.renderProducts()}</List>
      </Container>
    )
  }
}

export default withAllContext(ProductsList)
