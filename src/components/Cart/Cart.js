import React from 'react'
import styled from 'styled-components'
import { IconContext } from 'react-icons'
import { MdClose } from 'react-icons/md'

import LineItem from './LineItem'
import { withAllContext } from '../../context/AllContext'

const Container = styled.div`
  transform: ${props =>
    props.cartStatus === 'open' ? 'translateX(0%)' : 'translateX(100%)'};
  position: fixed;
  padding: 24px;
  width: 25%;
  right: 0;
  top: 0;
  background: #dceaf4;
  color: #011523;
  height: 100vh;
  will-change: transform;
  z-index: 1000;
  transition: transform 0.75s;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 700px) {
    width: 100%;
  }
`

const Overlay = styled.div`
  opacity: ${props => (props.adding ? '.8' : '0')};
  visibility: ${props => (props.adding ? 'visible' : 'hidden')};
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  background: #B8CFDF;
`

const Header = styled.header`
  display: flex;
  align-items: center;
  align-items: baseline;
  justify-content: space-between;
  padding-top: 24px;
  margin-bottom: 48px;
`

const Title = styled.h2`
  font-family: SarabunBold, sans-serif;
  font-size: 1.5em;
  color: #011523;
`

const Close = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 100%;
  background: #39617d;
  border: none;
  outline: none;
  cursor: pointer;
  text-align: center;
`

const Checkout = styled.a`
  padding: 16px;
  width: 100%;
  display: block;
  text-transform: capitalize;
  background: #ffaa00;
  text-align: center;
  border-radius: 4px;
  fonr-size: 1.25em;
  font-family: SarabunSemiBold, sans-serif;
  transition: all 0.75s;
  color: #011523;

  :visited {
    color: #011523;
  }

  :hover {
    background: #feca30;
  }
`

const Footer = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-items: baseline;
  justify-content: space-between;
  padding-top: 24px;
`

const Total = styled.div`
  display: flex;
  margin-bottom: 24px;
  align-items: center;
  justify-content: space-between;
  align-self: normal;

  h4 {
    font-family: SarabunSemibold, sans-serif;
    font-size: 1.25em;
  }

  p {
    font-family: SarabunMedium, sans-serif;
    font-size: 1em;
  }
`

const Cart = props => {
  const { context } = props
  const { store } = context
  const { checkout } = store

  const currencySymbol = checkout.currencyCode === 'EUR' ? '€' : '$'

  // const itemsInCart = checkout.lineItems.reduce(
  //   (total, item) => total + item.quantity,
  //   0
  // )

  return (
    <Container cartStatus={context.interface.cartStatus}>
      <Overlay adding={store.adding} />
      <div>
        <Header>
          <Title>Your Cart</Title>
          <Close onClick={() => context.interface.toggleCart()}>
            <IconContext.Provider
              value={{
                size: 16,
                color: '#ffffff',
                style: {
                  display: 'block',
                  margin: '0 auto',
                },
              }}
            >
              <MdClose />
            </IconContext.Provider>
          </Close>
        </Header>
        <ul>
          {checkout.lineItems.map(p => (
            <LineItem product={p} key={p.id} currencySymbol={currencySymbol} />
          ))}
        </ul>
      </div>
      {checkout.lineItems.length > 0 && (
        <Footer>
          <Total>
            <h4>Total price</h4>
            <p>
              {checkout.paymentDue} {currencySymbol}
            </p>
          </Total>
          <Checkout href={checkout.webUrl}>Check out</Checkout>
        </Footer>
      )}
    </Container>
  )
}

export default withAllContext(Cart)
