import PropTypes from 'prop-types'
import React, { useState, useContext, useEffect } from 'react'
import styled from 'styled-components'

import { StoreContext } from '../../context/'
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

const BeatList = ({ products }) => {
  const [searchResults, setSearchResults] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [genre, setGenre] = useState('')
  const allGenres = products.map(p => p.genre)
  const genres = allGenres.filter((v, i) => allGenres.indexOf(v) === i)
  const storeContext = useContext(StoreContext)

  useEffect(() => {
    storeContext.store.updateProducts(products)
  }, [products])

  useEffect(() => {
    if (searchTerm && (!genre || genre === 'all genres')) {
      setSearchResults(
        storeContext.store.products.filter(r =>
          r.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    } else if (genre && genre !== 'all genres' && !searchTerm) {
      setSearchResults(
        storeContext.store.products.filter(r =>
          r.genre.toLowerCase().includes(genre.toLocaleLowerCase())
        )
      )
    } else if (genre && genre !== 'all genres' && searchTerm) {
      setSearchResults(
        storeContext.store.products.filter(
          r =>
            r.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
            r.genre.toLowerCase().includes(genre.toLocaleLowerCase())
        )
      )
    } else {
      setSearchResults([])
    }
  }, [genre, searchTerm])

  const renderProducts = () => {
    const productsToUse =
      searchResults.length > 0 ? searchResults : storeContext.store.products

    if (products.length === 0) {
      return <EmptyText>No products in store</EmptyText>
    } else if (
      (searchResults.length === 0 && searchTerm) ||
      (searchResults.length === 0 && genre && genre !== 'all genres')
    ) {
      return <EmptyText>No product matches your criteria</EmptyText>
    }

    return productsToUse.map(p => <Product beat={p} key={p.id} />)
  }

  return (
    <Container>
      <Header>
        <SearchInput
          type="text"
          onChange={e => setSearchTerm(e.target.value)}
          value={searchTerm}
          placeholder="Search beats"
        />
        <GenreSelector
          defaultValue="Genre"
          onChange={e => setGenre(e.target.value.toLowerCase())}
        >
          <option disabled>Genre</option>
          {genres.map(g => (
            <option key={g}>{g}</option>
          ))}
          <option>All genres</option>
        </GenreSelector>
      </Header>
      <List>{renderProducts()}</List>
    </Container>
  )
}

BeatList.propTypes = {
  products: PropTypes.array.isRequired,
}

BeatList.defaultProps = {
  products: [],
}

export default BeatList
