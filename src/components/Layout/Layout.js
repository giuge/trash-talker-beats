import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
import CookieBanner from 'react-cookie-banner'

import Header from './Header'
import Footer from './Footer'
import Cart from '../Cart/Cart'
import VariantModal from '../shared/VariantModal'
import GlobalStyle from '../../utils/styles'
import StoreContextProvider from '../../context/StoreContext'
import InterfaceContextProvider from '../../context/InterfaceContext'

//import SubscribeForm from '../shared/SubscribeForm'

const MyBanner = styled.div`
  width: 100%;
  max-width: 400px;
  position: fixed;
  bottom: 16px;
  right: 24px;
  right: calc(50% - 200px);
  background: #b2cde0;
  color: #011523;
  padding: 16px;
  border-radius: 4px;
  font-size: 14px;
  line-height: 1.2em;

  a {
    font-family: SarabunSemibold, sans-serif;
    cursor: pointer;
  }

  @media (max-width: 700px) {
    max-width: 100%;
    border-radius: 0;
    right: 0;
    bottom: 0;
  }
`

const Container = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: 0px 40px;
  padding-top: 0;

  @media (max-width: 700px) {
    padding: 0px 16px;
  }
`

const siteTitleQuery = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`

const Layout = props => (
  <StaticQuery
    query={siteTitleQuery}
    render={data => (
      <InterfaceContextProvider>
        <StoreContextProvider>
          <GlobalStyle />
          <VariantModal />
          <Cart />
          <Header siteTitle={data.site.siteMetadata.title} />
          <Container>{props.children}</Container>
          {/* <SubscribeForm /> */}
          <CookieBanner>
            {onAccept => (
              <MyBanner>
                <p>
                  We use cookies to guarantee users the employment of its site
                  features. By continuing to browse the site you're agreeing to
                  our use of cookies. <a onClick={onAccept}>Agree</a>.
                </p>
              </MyBanner>
            )}
          </CookieBanner>
          <Footer />
        </StoreContextProvider>
      </InterfaceContextProvider>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
