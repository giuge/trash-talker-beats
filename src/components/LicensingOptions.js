import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

const Container = styled.div``

const LicenseContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 700px) {
    display: block;
  }
`

const License = styled.div`
  padding: 16px;
  background: #dceaf4;
  border-radius: 4px;
  text-align: center;
  color: #0a1723;
  width: 23%;
  flex-basis: 23%;

  @media (max-width: 700px) {
    width: 100%;
    margin-bottom: 2em;
  }
`

const LicenseTitle = styled.h2`
  font-family: Work Sans;
  line-height: 16px;
  font-size: 1em;
  text-transform: uppercase;
  margin-bottom: 0;

  color: #0d2b40;

  opacity: 0.7;
`

const LicensePrice = styled.h3`
  font-family: Source Code Pro;
  font-weight: 900;
  line-height: 44px;
  font-size: 44px;
  text-align: center;

  margin: 16px;

  color: #0a1723;
`

const LicenseDescription = styled.p`
  font-size: 14px;
  line-height: 1.4em;
`

const LicenseTerms = styled(Link)`
  display: block;
  background: #ffaa00;
  border-radius: 4px;
  padding: 1em;
  color: #0a1723;
  margin-top: 2em;
  font-size: 1em;
  transition: all 0.2s;

  :active,
  :visited {
    color: #0a1723;
  }

  :hover {
    color: #0a1723;
    background: rgba(255, 170, 0, 0.8);
  }
`

const Disclaimer = styled.p`
  font-family: Work Sans;
  line-height: 24px;
  font-size: 16px;
  text-align: center;

  margin: 48px auto 64px auto;

  color: #dceaf4;
  opacity: 0.7;
`

const LicensingOptions = () => {
  return (
    <Container>
      <LicenseContainer>
        <License>
          <LicenseTitle>Basic Lease</LicenseTitle>
          <LicensePrice>29€</LicensePrice>
          <LicenseDescription>Untagged MP3</LicenseDescription>
          <LicenseTerms to="/">Read full terms</LicenseTerms>
        </License>
        <License>
          <LicenseTitle>Standard Lease</LicenseTitle>
          <LicensePrice>49€</LicensePrice>
          <LicenseDescription>Untagged MP3 and WAV</LicenseDescription>
          <LicenseTerms to="/">Read full terms</LicenseTerms>
        </License>
        <License>
          <LicenseTitle>Premium Lease</LicenseTitle>
          <LicensePrice>99€</LicensePrice>
          <LicenseDescription>MP3, WAV and Stems</LicenseDescription>
          <LicenseTerms to="/">Read full terms</LicenseTerms>
        </License>
        <License>
          <LicenseTitle>Unlimited Lease</LicenseTitle>
          <LicensePrice>299€</LicensePrice>
          <LicenseDescription>MP3, WAV and Stems</LicenseDescription>
          <LicenseTerms to="/">Read full terms</LicenseTerms>
        </License>
      </LicenseContainer>
      <Disclaimer>
        Prices may very depending on products, variants or available promotions.
      </Disclaimer>
    </Container>
  )
}

export default LicensingOptions
