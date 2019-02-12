import React from 'react'
import styled from 'styled-components'
import { IconContext } from 'react-icons'
import { MdDelete } from 'react-icons/md'

import { withAllContext } from '../../context/AllContext'

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
    font-family: SarabunSemibold, sans-serif;
    color: #011523;
  }

  small {
    font-size: 14px;
    color: #39617d;
  }
`

const Price = styled.div`
  display: flex;

  p {
    font-family: SarabunMedium, sans-serif;
    line-height: 20px;
    margin-right: 8px;
  }

  svg {
    opacity: .3;
    transition: all 0.75s;
    cursor: pointer;

    :hover {
      opacity: 1;
      color: #FF4400 !important;
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
    if(store.checkout.lineItems.length === 1) {
      context.interface.closeCart()
    }
  }

  const handleChangeVariant = () => {
    const productFromVariant = store.products.find(p =>
        p.node.shopifyId === product.variant.product.id
      )

      if (!!productFromVariant) {
        context.interface.selectVariant(productFromVariant.node)
        context.interface.toggleVariantSelectionModal()
      }
  }

  return (
    <Container>
      <Details>
        <Image src={product.variant.image.src} alt={product.title} />
        <Description>
          <p>{product.title}</p>
          <small>{product.variant.title} - <ChangeLeaseButton onClick={() => handleChangeVariant()}>change</ChangeLeaseButton></small>
        </Description>
      </Details>
      <Price>
        <p>{product.variant.price} {currencySymbol}</p>
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
