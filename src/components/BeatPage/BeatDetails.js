import React, { useContext, useEffect } from 'react'
import styled from 'styled-components'

import { InterfaceContext, StoreContext } from '../../context/'
import BeatList from '../BeatList/'
import LicensingOptions from '../LicensingOptions'
import AudioPlayer from '../AudioPlayer'
import Cover from '../LatestBeats/Cover'
import Vinyl from '../LatestBeats/Vinyl'

const Container = styled.div`
  max-width: 960px;
  padding: 40px 16px;
  margin: 0 auto;

  @media (max-width: 700px) {
    padding: 40px 16px;
  }
`

const Title = styled.h2`
  font-family: Work Sans;
  font-style: normal;
  font-weight: 400;
  line-height: 49px;
  font-size: 38px;
  text-align: center;
  margin-bottom: 8px;

  color: #dceaf4;
`

const StyledCover = styled(Cover)`
  position: absolute;
  top: 0;
  left: 0;
  filter: drop-shadow(0px 0px 22px rgba(0, 0, 0, 0.25));
`

const StyledVinyl = styled(Vinyl)`
  position: absolute;
  top: 0;
  left: 0;
  transition: all 0.3s;
  z-index: -9;
`

const BeatImage = styled.div`
  position: relative;
  margin: 1em auto 4em auto;
  width: 240px;
  min-height: 240px;
  cursor: pointer;

  &:hover ${StyledVinyl} {
    left: 32px;
  }
`

const TagsContainer = styled.div`
  display: block;
  text-align: center;
  margin-bottom: 40px;

  span {
    margin-right: 16px;
    color: #dceaf4;
    opacity: 0.4;

    &:last-child {
      margin-right: 0;
    }
  }
`

const BeatListContainer = styled(Container)`
  max-width: 100%;
  margin-top: 24px;
  background: #0d2b40;
  padding: 40px 40px 56px 40px;
`

const LicenseContainer = styled(Container)`
  max-width: 100%;
`

const LicensingTitle = styled(Title)`
  padding: 40px 40px 56px 40px;
`

const VariantSectionTitle = styled.p`
  text-align: left;
  font-size: 18px;

  @media (max-width: 700px) {
    text-align: center;
  }
`

const VariantList = styled.ul`
  max-width: 960px;
  margin: 16px auto;
  text-align: center;
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  align-items: center;
  padding-bottom: 16px;

  @media (max-width: 700px) {
    flex-wrap: wrap;
  }
`

const Variant = styled.li`
  background: ${props => (props.isSelected ? '#FFAA00' : '#B8CFDF')};
  color: ${props => (props.isSelected ? '#011523' : '#011523')};
  margin: 8px;
  cursor: pointer;
  border-radius: 4px;
  padding: 16px 8px;
  flex-basis: 25%;
  transition: all 0.5s;

  @media (max-width: 700px) {
    flex: 0 0 45%;
  }

  :hover {
    background: ${props => (props.isSelected ? '#FFAA00' : '#87ADC8')};
    color: ${props => (props.isSelected ? '#011523' : '#011523')};
  }
`

const VariantTitle = styled.small`
  display: block;
  font-family: 'Work Sans', sans-serif;
  font-size: 12px;
  margin-bottom: 8px;
  text-transform: uppercase;
`

const VariantDescription = styled.p`
  font-family: 'Work Sans', sans-serif;
  font-size: 12px;
  line-height: 140%;
  margin: 8px 0 0 0;
  text-transform: uppercase;
  opacity: 0.7;
`

const VariantPrice = styled.h3`
  font-family: Source Code Pro;
  font-weight: bold;
  font-size: 32px;
  line-height: 44px;
  text-align: center;
  color: #040f1a;
`

const BeatDetails = props => {
  const { beat, products } = props
  const image = beat ? beat.images[0].localFile.childImageSharp.fixed.src : null
  const interfaceContext = useContext(InterfaceContext)
  const storeContext = useContext(StoreContext)

  const { selectPreview, stopPlayer, openCart } = interfaceContext.interface
  const { updateProducts, checkout, addVariantToCart } = storeContext.store

  useEffect(() => {
    selectPreview(beat)
    stopPlayer()
    updateProducts(products)
  }, [beat])

  const isSelectedVariant = variant => {
    for (let item of checkout.lineItems) {
      if (item.variant.id === variant.shopifyId) {
        return true
      }
    }
    return false
  }

  const addToCart = variant => {
    addVariantToCart(variant.shopifyId, beat.shopifyId)
    openCart()
  }

  const renderVariants = () => (
    <VariantList>
      {beat.variants.map((v, i) => {
        const { currencyCode } = storeContext.store.checkout
        let description = 'No description available'
        const title = v.title.toLowerCase()
        const currency = currencyCode
          ? currencyCode !== 'EUR'
            ? '$'
            : '€'
          : ''
        const price = parseFloat(v.price)
          .toFixed(2)
          .replace(/\.0+$/, '')

        if (title.includes('basic')) {
          description = 'MP3'
        } else if (title.includes('standard')) {
          description = 'MP3 AND WAV'
        } else if (title.includes('premium') || title.includes('unlimited')) {
          description = 'MP3, WAV, TRACK STEMS'
        }

        return (
          <Variant
            onClick={e => addToCart(v)}
            key={i}
            isSelected={isSelectedVariant(v)}
          >
            <VariantTitle>{v.title}</VariantTitle>
            <VariantPrice>{`${price}${currency}`}</VariantPrice>
            <VariantDescription>{description}</VariantDescription>
          </Variant>
        )
      })}
    </VariantList>
  )

  return (
    <>
      <Container>
        <Title>{beat.title}</Title>
        <TagsContainer>
          {beat.tags.map(t => (
            <span key={t}>{`#${t}`}</span>
          ))}
        </TagsContainer>
        <BeatImage onClick={() => selectPreview(beat)}>
          <StyledCover image={image} />
          <StyledVinyl />
        </BeatImage>
        <VariantSectionTitle>
          Select a license and add to cart:
        </VariantSectionTitle>
        {renderVariants()}
      </Container>
      <BeatListContainer>
        <Title>All Beats</Title>
        <BeatList products={products} />
      </BeatListContainer>
      <LicenseContainer>
        <LicensingTitle>Licensing options</LicensingTitle>
        <LicensingOptions />
      </LicenseContainer>
      <AudioPlayer />
    </>
  )
}

export default BeatDetails
