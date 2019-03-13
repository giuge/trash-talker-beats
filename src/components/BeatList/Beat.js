import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import { IconContext } from 'react-icons'
import { MdShoppingCart, MdPlayArrow } from 'react-icons/md'

import { withAllContext } from '../../context/AllContext'

const ListItem = styled.li`
  display: flex;
  width: 100%;
  height: 64px;
  min-height: 64px;
  align-items: center;
  justify-content: space-between;
  transition: all 0.1s ease-in;
  overflow: hidden;
  cursor: pointer;
  background: ${props => (props.highlighted ? '#011523' : 'transparent')};
  color: ${props => (props.highlighted ? '#DCEAF4' : '#DCEAF4')};
  border-bottom: 1px solid #122434;
  padding: 8px 16px;

  div > div > div {
    opacity: 0;
  }

  &:hover {
    transition: all 0.1s ease-out;
    background: #011523;

    div > div > div {
      opacity: ${props => (props.highlighted ? '0' : '1')};
    }

    div > svg {
      opacity: ${props => (props.highlighted ? '0' : '1')};
    }
  }
`

const Details = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  cursor: pointer;

  h3 {
    font-family: Work Sans;
    font-size: 18px;
    font-weight: 400;
  }

  color: #dceaf4;
`

const ImageContainer = styled.div`
  position: relative;
  height: 48px;

  img {
    border-radius: 4px;
  }

  svg {
    position: absolute;
    top: 17%;
    left: 14%;
    opacity: 0;
    transition: all 0.5s;
    z-index: 99;
  }
`

const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 48px;
  height: 48px;
  background: rgba(0, 0, 0, 0.8);
`

const Image = styled.img`
  height: 48px;
  width: 48px;
  margin-right: 8px;
`

const AddToCart = styled.button`
  background: #183a53;
  border-radius: 4px;
  color: #b8cfdf;
  text-transform: uppercase;
  border: none;
  padding: 8px 8px 8px 28px;
  cursor: pointer;
  position: relative;
  transition: all 0.1s ease-in;

  svg {
    position: absolute;
    left: 8px;
  }

  &:hover,
  &:visited {
    transition: all 0.1s ease-in;
    background: #ffaa00;
    color: #011523;
  }
`

const Tags = styled.ul`
  margin: 0 0 0 16px;
  padding: 0;

  li {
    &:first-child {
      margin-left: 0;
    }

    font-family: Source Code Pro;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    font-size: 14px;
    color: #dceaf4;
    opacity: 0.2;

    display: inline-block;
    margin: 0 4px;
    border-radius: 4px;
  }
`

const InCart = styled.button`
  background: #183a53;
  border-radius: 4px;
  color: #b8cfdf;
  text-transform: uppercase;
  border: none;
  padding: 8px;
  cursor: pointer;
  position: relative;
  outline: none;

  &:hover {
    color: #b8cfdf;
    background: #183a53;
  }
`

const Product = props => {
  const { beat, context } = props
  const image = beat ? beat.images[0].localFile.childImageSharp.fixed.src : null

  const handleClick = () => {
    context.interface.selectPreview(beat)
  }

  const addToCart = e => {
    e.stopPropagation()
    context.interface.selectVariant(beat)
  }

  const handleTagClick = (e, t) => {
    e.stopPropagation()
    context.store.search.addTag(t)
  }

  const renderButton = () => {
    if (context.store.isProductInCart(beat.shopifyId)) {
      return (
        <InCart onClick={e => addToCart(e)} disabled={context.store.adding}>
          In cart
        </InCart>
      )
    } else {
      return (
        <AddToCart onClick={e => addToCart(e)} disabled={context.store.adding}>
          <MdShoppingCart />
          Add
        </AddToCart>
      )
    }
  }

  const { previewFile } = context.interface

  return (
    <ListItem
      onClick={() => handleClick(beat.preview)}
      highlighted={previewFile.id === beat.id}
    >
      <Details>
        <ImageContainer>
          <ImageOverlay />
          <IconContext.Provider
            value={{
              size: 32,
              color: '#DCEAF4',
            }}
          >
            <MdPlayArrow />
          </IconContext.Provider>

          <Image src={image} alt={`${beat.title}`} />
        </ImageContainer>
        <h3>{beat.title}</h3>
        <Tags>
          {beat.tags.map(t => (
            <li
              key={t}
              onClick={e => handleTagClick(e, t)}
              title="Click to filter"
            >{`#${t}`}</li>
          ))}
        </Tags>
      </Details>
      {renderButton()}
    </ListItem>
  )
}

Product.propTypes = {
  siteTitle: PropTypes.string,
}

Product.defaultProps = {
  siteTitle: '',
}

export default withAllContext(Product)
