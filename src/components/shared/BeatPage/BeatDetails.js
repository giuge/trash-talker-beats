import React, { Component } from 'react'
import styled from 'styled-components'

import { withAllContext } from '../../../context/AllContext'
import AudioPlayer from '../../AudioPlayer'

const Container = styled.div`
  background: #0d2b40;
`

const Header = styled.header`
  padding: 8px 8px;
  color: #011523;
  display: flex;
  justify-content: flex-start;
  background: #87adc8;

  img {
    width: 150px;
    height: 150px;
    margin-right: 16px;
    border-radius: 4px;
  }

  h1 {
    font-family: SarabunBold, sans-serif;
    font-size: 1.5em;
    margin-top: 0.5em;
  }
`

const VariantList = styled.ul`
  width: 100%;
  margin: 0 auto;
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
  font-family: SarabunMedium, sans-serif;
  font-size: 0.65em;
  margin-bottom: 8px;
  text-transform: uppercase;
  opacity: 0.7;
  letter-spacing: 1px;
`

const VariantDescription = styled.p`
  font-family: SarabunMedium, sans-serif;
  font-size: 0.85em;
  margin: 16px 0 0 0;
  text-transform: uppercase;
  opacity: 0.7;
`

const VariantPrice = styled.h3`
  font-family: SarabunBold, sans-serif;
  font-size: 1.8em;
  margin-top: 0.5em;
`

const AddToCart = styled.h2`
  font-family: SarabunMedium, sans-serif;
  font-size: 18px;
  margin-top: 1.5em;
  margin-bottom: 1em;
  margin-left: 0.5em;
  text-align: center;
`

const TagList = styled.ul`
  margin-top: 8px;

  li {
    font-family: SarabunLight, sans-serif;
    display: inline-block;
    padding: 4px 8px;
    margin: 4px;
    background: #39617d;
    color: #dceaf4;
    border-radius: 2px;
    font-size: 0.75em;
    text-transform: uppercase;

    &:first-child {
      margin-left: 0;
    }
  }
`

class BeatDetails extends Component {
  componentDidMount() {
    const { beat, context, products } = this.props

    context.interface.selectPreview(beat)
    context.interface.stopPlayer()
    context.store.updateProducts(products)
  }

  isSelectedVariant(variant) {
    const { context } = this.props
    for (let item of context.store.checkout.lineItems) {
      if (item.variant.id === variant.shopifyId) {
        return true
      }
    }
    return false
  }

  addToCart(variant) {
    const { beat, context } = this.props
    const { openCart } = context.interface

    context.store.addVariantToCart(variant.shopifyId, beat.shopifyId)
    openCart()
  }

  renderVariants() {
    const { beat } = this.props
    return (
      <VariantList>
        {beat.variants.map((v, i) => {
          let description = 'No description available'
          const title = v.title.toLowerCase()

          if (title.includes('basic')) {
            description = 'MP3'
          } else if (title.includes('standard')) {
            description = 'MP3 AND WAV'
          } else if (title.includes('premium') || title.includes('unlimited')) {
            description = 'MP3, WAV AND TRACK STEMS'
          }

          return (
            <Variant
              onClick={e => this.addToCart(v)}
              key={i}
              isSelected={this.isSelectedVariant(v)}
            >
              <VariantTitle>{v.title}</VariantTitle>
              <VariantPrice>{v.price}</VariantPrice>
              <VariantDescription>{description}</VariantDescription>
            </Variant>
          )
        })}
      </VariantList>
    )
  }

  render() {
    const { beat } = this.props

    console.log(beat)
    return (
      <Container>
        <Header>
          <img src={beat.images[0].originalSrc} alt={beat.title} />
          <div>
          <h1>{beat.title}</h1>
          <TagList>
            {beat.tags ? beat.tags.map(t => <li key={t}>{t}</li>) : ''}
          </TagList>
          </div> 
        </Header>
        <AudioPlayer />
        <AddToCart>Make it yours!</AddToCart>
        {this.renderVariants()}
      </Container>
    )
  }
}

export default withAllContext(BeatDetails)
