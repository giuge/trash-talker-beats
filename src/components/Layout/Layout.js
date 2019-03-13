import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql, Link } from 'gatsby'
import styled from 'styled-components'
import CookieBanner from 'react-cookie-banner'

import Header from './Header'
import Footer from './Footer'
import Cart from '../Cart/Cart'
import VariantModal from '../shared/VariantModal'
import AudioPlayer from '../AudioPlayer'
import GlobalStyle from '../../utils/styles'
import StoreContextProvider from '../../context/StoreContext'
import InterfaceContextProvider from '../../context/InterfaceContext'

//import SubscribeForm from '../shared/SubscribeForm'

const MyBanner = styled.div`
  width: 100%;
  max-width: 300px;
  position: fixed;
  bottom: 16px;
  right: 16px;
  background: #b2cde0;
  color: #011523;
  padding: 16px;
  font-size: 14px;
  line-height: 1.2em;

  a {
    font-family: 'Work Sans', sans-serif;
    color: #011523;
    cursor: pointer;
    display: block;
    margin-top: 0.5em;
    margin-bottom: 1em;
  }

  button {
    display: block;
    width: 100%;
    background: transparent;
    border: 1px solid black;
    padding: 0.5em 0;
    cursor: pointer;
    outline: none;
    transition: all 0.2s;

    &:hover {
      background: #011523;
      color: #b2cde0;
    }
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
  padding: 40px;
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
          <AudioPlayer />
          {/* <SubscribeForm /> */}
          <CookieBanner>
            {onAccept => (
              <MyBanner>
                <p>
                  This website uses cookies to ensure you get the best
                  experience on our website.
                </p>
                <Link to="privacy-policy">Learn more</Link>
                <button onClick={onAccept}>Got it</button>
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
