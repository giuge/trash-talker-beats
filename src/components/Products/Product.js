import PropTypes from 'prop-types'
import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
import { IconContext } from 'react-icons'
import { MdShoppingCart, MdPlayArrow } from 'react-icons/md'

import { withAllContext } from '../../context/AllContext'

const ListItem = styled.li`
  display: flex;
  width: 100%;
  height: 48px;
  min-height: 48px;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.1s ease-in;
  overflow: hidden;
  cursor: pointer;
  background: ${props => (props.highlighted ? '#B8CFDF' : 'transparent')};
  color: ${props => (props.highlighted ? '#011523' : '#DCEAF4')};
  border-bottom: ${props =>
    props.highlighted
      ? '1px solid #39617D'
      : '1px solid rgba(255, 255, 255, .10)'};

      div > div > div {
        opacity: 0;
      }

  &:hover {
    transition: all 0.1s ease-out;
    background: ${props => (props.highlighted ? '#B8CFDF' : '#15354C')};

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
  font-size: 16px;
  cursor: pointer;
  height: 48px;
`

const ImageContainer = styled.div`
  position: relative;
  height: 48px;

  svg {
    position: absolute;
    top: 17%;
    left: 17%;
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
  background: rgba(0, 0, 0, .8);
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
  margin-right: 8px;
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

    display: inline-block;
    color: #39617d;
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
  margin-right: 8px;
  cursor: pointer;
  position: relative;
  outline: none;

  &:hover {
    color: #b8cfdf;
    background: #183a53;
  }
`

const previewQuery = graphql`
  query {
    allFile(filter: { sourceInstanceName: { eq: "previews" } }) {
      edges {
        node {
          name
          extension
          publicURL
          modifiedTime
          prettySize
        }
      }
    }
  }
`

const Product = props => {
  const { beat, context } = props
  const image = beat.images[0]
    ? beat.images[0].localFile.childImageSharp.fixed.src
    : null

  const handleClick = track => {
    context.interface.selectPreview({ ...track, ...beat })
  }

  const addToCart = e => {
    e.stopPropagation()

    context.interface.selectVariant(beat)
    context.interface.toggleVariantSelectionModal()
    //return context.store.addVariantToCart(beat.variants[0].shopifyId, 1)
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
    <StaticQuery
      query={previewQuery}
      render={data => {
        const beatTitleParts = beat.title.toLowerCase().split(' ')
        const beatSlug = beatTitleParts.join('_')
        const preview = data.allFile.edges.filter(t =>
          t.node.name.includes(beatSlug)
        )
        const previewTrack = preview.length > 0 ? preview[0].node : null

        return (
          <ListItem
            onClick={() => handleClick(previewTrack)}
            highlighted={previewFile.id === beat.id}
          >
            <Details>
              <ImageContainer>
              <ImageOverlay />
                <IconContext.Provider
                  value={{
                    size: 32,
                    color: '#ffffff',
                  }}
                >
                  <MdPlayArrow />
                </IconContext.Provider>

                <Image src={image} alt={`${beat.title}`} />
              </ImageContainer>
              <h3>{beat.title}</h3>
              <Tags>
                {beat.tags.map(t => (
                  <li key={t}>{`#${t}`}</li>
                ))}
              </Tags>
            </Details>
            {renderButton()}
          </ListItem>
        )
      }}
    />
  )
}

Product.propTypes = {
  siteTitle: PropTypes.string,
}

Product.defaultProps = {
  siteTitle: '',
}

export default withAllContext(Product)
