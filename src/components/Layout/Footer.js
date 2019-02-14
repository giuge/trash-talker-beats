import React from 'react'
import { StaticQuery, graphql, Link } from 'gatsby'
import styled from 'styled-components'

const Container = styled.footer`
  margin-top: 40px;
  background: none;
  padding: 24px 40px;
  font-family: SarabunLight, sans-serif;
  font-size: 14px;
  text-align: center;

  a, a:visited, a:active {
    color: #DCEAF4;
    transition: all .5s;
  }

  a:hover {
    color: #ffaa00;
  }

  @media (max-width: 700px) {
    padding: 24px 16px;
  }
`

const Logo = styled.img`
  opacity: 0.4;
  display: block;
  margin: 0 auto 24px auto;
`

const Menu = styled.ul`
  margin: 1em 0 2em 0;
  padding: 0;

  li {
    display: inline-block;
    margin: 0 0.5em;
  }
`

const Copyright = styled.p`
  margin: 1em 0 2em 0;
  opacity: 0.5;
`

const LogoQuery = graphql`
  {
    file(relativePath: { eq: "logo_small_white.svg" }) {
      relativePath
      name
      publicURL
    }
  }
`

const Footer = () => {
  return (
    <StaticQuery
      query={LogoQuery}
      render={data => (
        <Container>
          <Link to="/">
            <Logo src={data.file.publicURL} alt="" />
          </Link>
          <Menu>
            <li>
              <Link to="/terms-of-service">Terms of Service</Link>
            </li>
            <li>
              <Link to="/privacy-policy">Privacy Policy</Link>
            </li>
          </Menu>
          <Copyright>
            © {new Date().getFullYear()} - Made with love by
            {` `}
            <a
              href="http://andshape.com"
              rel="noopener noreferrer"
              target="_blank"
            >
              Andshape
            </a>
          </Copyright>
        </Container>
      )}
    />
  )
}

export default Footer
