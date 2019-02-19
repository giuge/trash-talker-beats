import React from 'react'
import styled from 'styled-components'
import { IconContext } from 'react-icons'
import { MdDelete } from 'react-icons/md'

import { withAllContext } from '../../context/AllContext'

const Container = styled.li`
  margin: 0;
  margin-bottom: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 8px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 4px;
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
    font-family: SarabunMedium, sans-serif;
    color: #011523;
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
    font-family: SarabunMedium, sans-serif;
    line-height: 20px;
    margin-right: 8px;
    font-size: 0.85em;
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

const LineItem = ({ context, product, currencySymbol }) => {
  const { store } = context

  const removeLineItem = lineItem => {
    store.removeLineItem(lineItem.id)
    if (store.checkout.lineItems.length === 1) {
      context.interface.closeCart()
    }
  }

  const handleChangeVariant = () => {
    const productFromVariant = store.products.find(
      p => p.shopifyId === product.variant.product.id
    )

    console.log(productFromVariant)

    if (!!productFromVariant) {
      context.interface.selectVariant(productFromVariant)
      context.interface.toggleVariantSelectionModal()
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
          {product.variant.price} {currencySymbol}
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

export default withAllContext(LineItem)
