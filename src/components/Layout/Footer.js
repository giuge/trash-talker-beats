import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'

const Container = styled.footer`
  margin-top: 40px;
  background: none;
  padding: 24px 40px;
  font-family: SarabunLight, sans-serif;
  font-size: 14px;
  opacity: 0.8;
  text-align: center;

  @media (max-width: 700px) {
    padding: 24px 16px;
  }
`

const Logo = styled.img`
  opacity: .4;
  display: block;
  margin: 0 auto 24px auto;
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

const Footer = props => {
  return (
    <StaticQuery
      query={LogoQuery}
      render={data => (
        <Container>
          <Logo src={data.file.publicURL} alt="" />
          <p>
            © {new Date().getFullYear()} - Made with love by
            {` `}
            <a
              href="http://andshape.com"
              rel="noopener noreferrer"
              target="_blank"
            >
              Andshape
            </a>
          </p>
        </Container>
      )}
    />
  )
}

export default Footer
