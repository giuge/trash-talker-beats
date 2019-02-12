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
`

const Content = styled.div`
  max-width: 656px;
  padding: 24px 0;
  margin: 80px auto 0 auto;
  text-align: center;
  display: flex;
  align-items: center;
  flex-direction: column;
  background: #dceaf4;
  min-height: 160px;

  position: relative;
  top: 50%;
  transform: translateY(-50%);
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
`

const Variant = styled.li`
  background: ${props => (props.isSelected ? '#0D2B40' : '#B8CFDF')};
  color: ${props => (props.isSelected ? '#DCEAF4' : '#011523')};
  margin: 8px;
  cursor: pointer;
  border-radius: 4px;
  padding: 8px;
  flex-basis: 25%;
  transition: all 0.5s;

  :hover {
    background: #0d2b40;
    color: #dceaf4;
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
`

const Close = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 100%;
  background: #39617d;
  position: absolute;
  top: 16px;
  right: 16px;
  border: none;
  outline: none;
  cursor: pointer;
`

const VariantModal = props => {
  const { context } = props
  const {
    selectingVariantForProuct,
    variantSelectionModalStatus,
    toggleVariantSelectionModal,
    selectVariant,
    openCart
  } = context.interface

  const addToCart = variant => {
    context.store.addVariantToCart(
      variant.shopifyId,
      selectingVariantForProuct.shopifyId
    )
    toggleVariantSelectionModal()
    selectVariant()
    openCart()
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
    if (
      variantSelectionModalStatus === 'open' &&
      !!selectingVariantForProuct.variants
    ) {
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
        <Close onClick={() => toggleVariantSelectionModal()}>
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
        {renderVariants()}
      </Content>
    </Container>
  )
}

export default withAllContext(VariantModal)
