import React from 'react'
import { IconContext } from 'react-icons'
import { MdClose } from 'react-icons/md'
import styled from 'styled-components'

import { withAllContext } from '../../context/AllContext'

const Container = styled.div`
  visibility: ${props => (props.status === 'open' ? 'visible' : 'hidden')};
  opacity: ${props => (props.status === 'open' ? '1' : '0')};
  transition: all 0.5s;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: rgba(1, 21, 35, 0.8);
  z-index: 5000;
  -webkit-transform: translateZ(0);
  padding: 40px;
`

const Content = styled.div`
  text-align: center;
  display: flex;
  align-items: center;
  flex-direction: column;
  background: #dceaf4;

  height: 100%;
  width: 100%;
  position: relative;
`

const VariantList = styled.ul`
  width: 100%;
  padding: 24px;
  margin: 0 auto;
  text-align: center;
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  align-items: center;

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
    background: ${props => (props.isSelected ? '#FFAA00' : '#0d2b40')};
    color: ${props => (props.isSelected ? '#011523' : '#dceaf4')};
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

const VariantPrice = styled.h3`
  font-family: SarabunBold, sans-serif;
  font-size: 1.5em;
  margin-top: 0.5em;
`

const Close = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 100%;
  background: #011523;
  position: absolute;
  top: 32px;
  right: 40px;
  border: none;
  outline: none;
  cursor: pointer;
`

const TrackInfo = styled.div`
  color: #011523;
  text-align: left;
  width: 100%;
  padding: 32px 40px;
  background: #b8cfdf;
  display: flex;

  img {
    height: 120px;
    width: 120px;
    margin-right: 24px;
    border-radius: 4px;
  }

  h2 {
    font-family: SarabunMedium, sans-serif;
    font-size: 1.5em;
  }
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

const VariantModal = props => {
  const { context } = props
  const {
    selectingVariantForProuct,
    variantSelectionModalStatus,
    toggleVariantSelectionModal,
    selectVariant,
    openCart,
  } = context.interface

  console.log(selectingVariantForProuct, 'selectingVariantForProuct')

  const addToCart = variant => {
    context.store.addVariantToCart(
      variant.shopifyId,
      selectingVariantForProuct.shopifyId
    )
    toggleVariantSelectionModal()
    selectVariant()
    openCart()
  }

  const closeModal = () => {
    selectVariant()
    toggleVariantSelectionModal()
  }

  const isSelectedVariant = variant => {
    for (let item of context.store.checkout.lineItems) {
      if (item.variant.id === variant.shopifyId) {
        return true
      }
    }
    return false
  }

  const renderVariants = () => {
    if (variantSelectionModalStatus === 'open') {
      return (
        <VariantList>
          {selectingVariantForProuct.variants.map((v, i) => {
            const selected = isSelectedVariant(v)
            return (
              <Variant
                onClick={e => addToCart(v)}
                key={i}
                isSelected={selected}
              >
                <VariantTitle>{v.title}</VariantTitle>
                <VariantPrice>{v.price}</VariantPrice>
              </Variant>
            )
          })}
        </VariantList>
      )
    }
  }

  return (
    <Container status={variantSelectionModalStatus}>
      <Content>
        <Close onClick={() => closeModal()}>
          <IconContext.Provider
            value={{
              size: 16,
              color: '#ffffff',
              style: {
                display: 'block',
                margin: '0 auto',
              },
            }}
          >
            <MdClose />
          </IconContext.Provider>
        </Close>
        <TrackInfo>
          <img
            src={
              !!selectingVariantForProuct.images
                ? selectingVariantForProuct.images[0].localFile.childImageSharp
                    .fixed.src
                : ''
            }
            alt={selectingVariantForProuct.title}
          />
          <div>
            <h2>{selectingVariantForProuct.title}</h2>
            <TagList>
              {selectingVariantForProuct.tags
                ? selectingVariantForProuct.tags.map(t => <li key={t}>{t}</li>)
                : ''}
            </TagList>
          </div>
        </TrackInfo>
        {renderVariants()}
      </Content>
    </Container>
  )
}

export default withAllContext(VariantModal)
