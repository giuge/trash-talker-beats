import React, { useContext, useEffect } from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import { Emojione } from 'react-emoji-render'

import { StoreContext } from '../context/'
import Layout from '../components/Layout'

const RedirectTextContainer = styled.div`
  display: block;
  margin: 4em auto;
  padding: 4em 16px;
  font-family: 'Work Sans', sans-serif;
  text-align: center;
`

const RedirectText = styled.p`
  display: block;
  margin-bottom: 1em;
  font-family: 'Work Sans', sans-serif;
  text-align: center;
`

const Redirect = () => {
  const storeContext = useContext(StoreContext)
  const { lineItems, webUrl } = storeContext.store.checkout

  useEffect(() => {
    if (webUrl && lineItems.length > 0) {
      window.location.href = webUrl
    }

    return
  }, [webUrl, lineItems])

  const renderMessage = () => {
    if (!webUrl) {
      return <p>Loading checkout...</p>
    }

    if (lineItems.length > 0) {
      return <p>Redirecting to checkout page...</p>
    }

    return (
      <>
        <RedirectText>
          No items in cart <Emojione text="😔" />
        </RedirectText>
        <RedirectText>
          <Link to="/">Back to homepage</Link>
        </RedirectText>
      </>
    )
  }

  return <RedirectTextContainer>{renderMessage()}</RedirectTextContainer>
}

const Checkout = () => {
  return (
    <Layout>
      <Redirect />
    </Layout>
  )
}

export default Checkout
