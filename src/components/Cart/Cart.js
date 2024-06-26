import React, { useContext } from 'react'
import styled from 'styled-components'
import { IconContext } from 'react-icons'
import { MdClose } from 'react-icons/md'
import { Emojione } from 'react-emoji-render'

import LineItem from './LineItem'
import { InterfaceContext, StoreContext } from '../../context/'

const Container = styled.div`
  transform: ${props =>
    props.cartStatus === 'open' ? 'translateX(0%)' : 'translateX(100%)'};
  position: fixed;
  padding: 24px;
  width: 400px;
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
  background: #b8cfdf;
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
  font-family: 'Work Sans', sans-serif;
  font-size: 1.5em;
  color: #011523;
  font-weight: 600;
`

const EmptyCart = styled.div`
  margin-top: 6em;

  p {
    text-align: center;
    line-height: 1.4em;
  }
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
  font-family: 'Work Sans', sans-serif;
  transition: all 0.75s;
  color: #011523;

  :visited {
    color: #011523;
  }

  :hover {
    background: #feca30;
    color: #011523;
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
    font-family: 'Work Sans', sans-serif;
    font-size: 0.85em;
    text-transform: uppercase;
  }

  p {
    font-family: 'Source Code Pro', sans-serif;
    font-size: 1em;
    font-weight: 600;
  }
`

const Cart = () => {
  const storeContext = useContext(StoreContext)
  const interfaceContext = useContext(InterfaceContext)
  const { store } = storeContext
  const { checkout } = store
  const currencySymbol = checkout.currencyCode === 'EUR' ? '€' : '$'

  const renderEmptyCart = () => (
    <EmptyCart>
      <p>
        Your Cart is sad <Emojione text="😔" /> <br />
        Make him happy by adding swag!
      </p>
    </EmptyCart>
  )

  const renderLineItems = () => (
    <ul>
      {checkout.lineItems.map(p => (
        <LineItem product={p} key={p.id} currencySymbol={currencySymbol} />
      ))}
    </ul>
  )

  return (
    <Container cartStatus={interfaceContext.interface.cartStatus}>
      <Overlay adding={store.adding} />
      <div>
        <Header>
          <Title>Your Cart</Title>
          <Close onClick={() => interfaceContext.interface.toggleCart()}>
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
        {checkout.lineItems.length > 0 ? renderLineItems() : renderEmptyCart()}
      </div>
      {checkout.lineItems.length > 0 && (
        <Footer>
          <Total>
            <h4>Total price</h4>
            <p>
              {checkout.paymentDue}
              {currencySymbol}
            </p>
          </Total>
          <Checkout href={checkout.webUrl}>Check out</Checkout>
        </Footer>
      )}
    </Container>
  )
}

export default Cart
