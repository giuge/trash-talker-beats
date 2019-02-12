import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import React from 'react'
import styled from 'styled-components'

import { withAllContext } from '../../context/AllContext'

const Container = styled.div`
  background: none;
  padding: 24px 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40px;
  font-family: SarabunSemiBold, sans-serif;

  @media (max-width: 700px) {
    padding: 24px 16px;
  }
`

const Menu = styled.ul`
  text-transform: uppercase;
  color: #dceaf4;
  width: 20%;
`

const MenuItem = styled.li`
  cursor: pointer;
`

const Logo = styled.div`
  margin: 0;
  text-align: center;
  transition: all 0.1s;

  :hover {
    opacity: 0.85;
  }
`

const CartLink = styled.a`
  opacity: ${props => (props.cartStatus === 'open' ? '0' : '1')};
  text-transform: uppercase;
  color: #dceaf4;
  transition: all 1s ease-in;
`

const LogoQuery = graphql`
  {
    file(relativePath: { eq: "logo_full.svg" }) {
      relativePath
      name
      publicURL
    }
  }
`

const Header = ({ siteTitle, context }) => {
  const handleClick = e => {
    e.preventDefault()
    context.interface.toggleCart()
  }

  const itemsInCart = context.store.checkout.lineItems.reduce(
    (total, item) => total + item.quantity,
    0
  )

  return (
    <StaticQuery
      query={LogoQuery}
      render={data => (
        <Container>
          <Menu>
            <MenuItem>
              <Link to="/">Beats</Link>
            </MenuItem>
          </Menu>
          <Logo>
            <Link to="/">
              <img src={data.file.publicURL} alt={siteTitle} />
            </Link>
          </Logo>
          <div style={{ width: '20%', textAlign: 'right' }}>
          <CartLink
            href="#"
            onClick={e => handleClick(e)}
            cartStatus={context.interface.cartStatus}
          >
            Cart ({itemsInCart})
          </CartLink>
          </div>
        </Container>
      )}
    />
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: '',
}

export default withAllContext(Header)
