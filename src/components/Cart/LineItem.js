import PropTypes from 'prop-types'
import React, { useContext } from 'react'
import styled from 'styled-components'
import { IconContext } from 'react-icons'
import { MdDelete } from 'react-icons/md'

import { InterfaceContext, StoreContext } from '../../context/'

const Container = styled.li`
  margin: 0;
  margin-bottom: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Image = styled.img`
  width: 32px;
  height: 32px;
  margin-right: 8px;
  border-radius: 4px;
`

const Details = styled.div`
  display: flex;
`

const Description = styled.div`
  p {
    font-family: 'Work Sans', sans-serif;
    color: #011523;
    font-weight: 600;
  }

  small {
    font-size: 14px;
    color: #39617d;
    margin-top: 2px;
    display: block;
    opacity: 0.7;
  }
`

const Price = styled.div`
  display: flex;

  p {
    font-family: 'Source Code Pro', sans-serif;
    line-height: 20px;
    margin-right: 8px;
    font-size: 0.85em;
    font-weight: 600;
  }

  svg {
    opacity: 0.3;
    transition: all 0.75s;
    cursor: pointer;

    :hover {
      opacity: 1;
      color: #ff4400 !important;
    }
  }
`

const ChangeLeaseButton = styled.button`
  background: none;
  border: none;
  outline: none;
  padding: 0;
  color: inherit;
  cursor: pointer;
`

const LineItem = ({ product, currencySymbol }) => {
  const storeContext = useContext(StoreContext)
  const interfaceContext = useContext(InterfaceContext)
  const { store } = storeContext
  const {
    selectVariant,
    toggleVariantSelectionModal,
  } = interfaceContext.interface

  const removeLineItem = lineItem => {
    store.removeLineItem(lineItem.id)
  }

  const handleChangeVariant = () => {
    const productFromVariant = store.products.find(
      p => p.shopifyId === product.variant.product.id
    )

    if (!!productFromVariant) {
      selectVariant(productFromVariant)
      toggleVariantSelectionModal()
    }
  }

  return (
    <Container>
      <Details>
        <Image src={product.variant.image.src} alt={product.title} />
        <Description>
          <p>{product.title}</p>
          <small>
            {product.variant.title} -{' '}
            <ChangeLeaseButton onClick={() => handleChangeVariant()}>
              change
            </ChangeLeaseButton>
          </small>
        </Description>
      </Details>
      <Price>
        <p>
          {product.variant.price}
          {currencySymbol}
        </p>
        <IconContext.Provider
          value={{
            size: 18,
            color: '#183A53',
            style: {
              display: 'block',
              margin: '0 auto',
            },
          }}
        >
          <MdDelete onClick={() => removeLineItem(product)} />
        </IconContext.Provider>
      </Price>
    </Container>
  )
}

LineItem.propTypes = {
  product: PropTypes.object.isRequired,
  currencySymbol: PropTypes.string.isRequired,
}

LineItem.defaultProps = {
  product: {},
  currencySymbol: '€',
}

export default LineItem
