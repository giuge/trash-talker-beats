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

import SubscribeForm from '../shared/SubscribeForm'

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
          <CookieBanner
            styles={{
              banner: {
                backgroundColor: '#0D2B40',
                position: 'fixed',
                bottom: 0,
              },
              message: { fontFamily: 'SarabunLight, sans-serif' },
            }}
            message="We use cookies to guarantee users the employment of its site features, offering a better purchasing experience. By continuing to browse the site you're agreeing to our use of cookies."
            onAccept={() => {}}
            cookie="user-has-accepted-cookies"
          />
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
