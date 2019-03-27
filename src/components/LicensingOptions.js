import PropTypes from 'prop-types'
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

const StyledLicense = styled.div`
  padding: 16px;
  background: #dceaf4;
  border-radius: 4px;
  text-align: center;
  color: #0a1723;
  width: 23%;
  flex-basis: 23%;

  @media (min-width: 1024px) {
    transform: ${props => (props.popular ? 'scale(1.1)' : '0')};
  }

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
  font-weight: ${props => (props.popular ? '600' : '400')};
  opacity: ${props => (props.popular ? '1' : '0.7')};

  color: #0d2b40;
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

const LicenseFeaturesList = styled.ul`
  font-size: 14px;
  line-height: 1.4em;
`

const LicenseFeature = styled.li``

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

export const License = props => (
  <StyledLicense popular={props.popular}>
    <LicenseTitle popular={props.popular}>{props.title}</LicenseTitle>
    <LicensePrice>{props.price}</LicensePrice>
    <LicenseFeaturesList>
      <li>Untagged MP3</li>
      <li>Untagged WAV</li>
      <li>Track stems</li>
      <li>Digital distribution</li>
      <li>YouTube monetization</li>
      <li>Distribute {props.copies || 3000} copies</li>
    </LicenseFeaturesList>
    <LicenseTerms to={props.URL}>Read full terms</LicenseTerms>
  </StyledLicense>
)

const LicensingOptions = () => {
  return (
    <Container>
      <LicenseContainer>
        <License
          title="Basic Lease"
          price="29€"
          URL="/basic-lease"
          mp3={true}
          copies={3000}
        />
        <License
          title="Standard Lease"
          price="49€"
          description="Untagged MP3 and WAV"
          URL="/standard-lease"
        />
        <License
          title="Premium Lease"
          price="99€"
          description="MP3, WAV and Stems"
          URL="/premium-lease"
          popular={true}
        />
        <License
          title="Unlimited Lease"
          price="199€"
          description="MP3, WAV and Stems"
          URL="/unlimited-lease"
        />
      </LicenseContainer>
      <Disclaimer>
        Prices may very depending on products, variants or available promotions.
      </Disclaimer>
    </Container>
  )
}

LicensingOptions.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  URL: PropTypes.string.isRequired,
}

LicensingOptions.defaultProps = {
  title: '',
  price: '',
  description: '',
  URL: '',
}

export default LicensingOptions
