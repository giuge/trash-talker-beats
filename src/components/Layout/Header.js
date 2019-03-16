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
  font-family: 'Work Sans', sans-serif;
  font-weight: 500;
  font-size: 18px;

  @media (max-width: 700px) {
    padding: 24px 16px;
  }
`

const Menu = styled.ul`
  text-transform: uppercase;
  color: #dceaf4;
  text-align: center;
`

// const MenuItem = styled.li`
//   cursor: pointer;
// `

const Logo = styled.div`
  margin: 0;
  flex: 2;

  a {
    transition: all 0.1s;

    :hover {
      opacity: 0.85;
    }
  }
`

const CartLink = styled.div`
  flex: 2;
  text-align: right;
  position: relative;
  margin-right: 8px;

  span {
    transform: ${props => (props.items !== 0 ? 'scale(1)' : 'scale(0)')};
    transition: all 0.2s ease-in;
  }
`

const CartBadge = styled.span`
  width: 20px;
  height: 20px;
  border-radius: 12px;
  background-color: #ffaa00;
  position: absolute;
  right: -10px;
  top: -10px;
  color: #000;
  text-align: center;
  z-index: 10;

  font-family: 'Work Sans', sans-serif;
  font-weight: 500;
  font-size: 12px;
  line-height: 19px;
`

const CartIcon = props => (
  <svg
    width="26"
    height="27"
    viewBox="0 0 26 27"
    fill="none"
    {...props}
    style={{ cursor: 'pointer' }}
  >
    <path
      d="M7.6 20.9425C6.16988 20.9425 5 22.0875 5 23.4872C5 24.8868 6.16988 26.0318 7.6 26.0318C9.03013 26.0318 10.2001 24.8868 10.2001 23.4872C10.2 22.0874 9.03006 20.9425 7.6 20.9425ZM0 0.977203V3.5218H2.6L7.28019 12.7999L5.32344 15.9167C5.12856 16.2348 4.99844 16.6802 4.99844 17.1257C4.99844 18.8292 6.1875 19.6703 7.8 19.6703H23V17.2235H8.11831C7.92344 17.2235 7.79331 17.0962 7.79331 16.9055C7.79331 16.8421 7.93125 16.5874 7.93125 16.5874L9.23013 14.5811H18.9147C19.8898 14.5811 20.7353 14.0723 21.1898 13.2454L25.8699 5.36694C25.9472 5.21641 26 4.98489 26 4.73085C26 4.03072 25.4148 3.52186 24.7 3.52186H5.46025L4.225 0.977203H0ZM20.3999 20.9425C18.9698 20.9425 17.7999 22.0875 17.7999 23.4872C17.7999 24.8868 18.9698 26.0318 20.3999 26.0318C21.8301 26.0318 23 24.8868 23 23.4871C23 22.0874 21.8301 20.9425 20.3999 20.9425Z"
      fill="#DCEAF4"
    />
  </svg>
)

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
          <Logo>
            <Link to="/">
              <img src={data.file.publicURL} alt={siteTitle} />
            </Link>
          </Logo>
          <Menu>
            {/* <MenuItem>
              <Link to="/">Beats</Link>
            </MenuItem> */}
          </Menu>
          <CartLink items={itemsInCart}>
            <CartBadge>{itemsInCart}</CartBadge>
            <CartIcon onClick={e => handleClick(e)} />
          </CartLink>
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
