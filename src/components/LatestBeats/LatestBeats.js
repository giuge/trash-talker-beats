import React from 'react'
import styled from 'styled-components'
import { withInterfaceContext } from '../../context/InterfaceContext'

import Cover from './Cover'
import Vinyl from './Vinyl'

const Container = styled.div`
  width: 100%;
  max-width: 960px;
  margin: 80px auto 124px auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 700px) {
    flex-direction: column;
  }
`

const StyledCover = styled(Cover)`
  position: absolute;
  top: 0;
  left: 0;
  filter: drop-shadow(0px 0px 22px rgba(0, 0, 0, 0.25));
`

const StyledVinyl = styled(Vinyl)`
  position: absolute;
  left: 0px;
  top: 0px;
  transition: all 0.3s;
  z-index: -9;
`

const BeatTitle = styled.h3`
  position: absolute;
  top: 8px;
  left: 0;
  width: 100%;
  padding: 0 16px;
  text-align: center;
  text-transform: uppercase;
  z-index: 99;

  font-family: Source Code Pro;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  font-size: 26px;

  color: #dceaf4;

  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.25);
`

const BeatInfo = styled.div`
  position: relative;
  height: 240px;
  width: 240px;
  cursor: pointer;

  &:hover ${StyledVinyl} {
    left: 32px;
  }

  @media (max-width: 700px) {
    margin-bottom: 56px;
  }
`

const LatestBeats = ({ products, context }) => {
  return (
    <Container>
      {products.map(p => {
        const image = p ? p.images[0].localFile.childImageSharp.fixed.src : null
        return (
          <BeatInfo
            key={p.handle}
            onClick={() => context.interface.selectPreview(p)}
          >
            <BeatTitle>{p.title}</BeatTitle>
            <StyledCover image={image} />
            <StyledVinyl />
          </BeatInfo>
        )
      })}
    </Container>
  )
}

export default withInterfaceContext(LatestBeats)
