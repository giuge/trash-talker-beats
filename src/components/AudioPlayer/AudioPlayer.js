import React, { useState, useContext, useEffect } from 'react'
import Sound from 'react-sound'
import styled from 'styled-components'
import { MdShoppingCart } from 'react-icons/md'

import { InterfaceContext, StoreContext } from '../../context/'
import PlayPauseButton from './PlayPauseButton'
import VolumeController from './VolumeController'
import Scrubber from './Scrubber'

const Container = styled.div`
  background: rgba(26, 37, 48, 0.99);
  color: #011523;
  font-family: 'Work Sans', sans-serif;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  height: 64px;
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 999;
  transition: transform 0.75s;
  display: flex;

  visibility: ${props => (props.show ? 'visible' : 'hidden')};
  transform: ${props => (props.show ? 'translateY(0%)' : 'translateY(100%)')};
`

const Details = styled.div`
  flex-flow: row;
  display: flex;
  align-items: center;
  flex: 2;

  img {
    width: 48px;
    height: 48px;
    border-radius: 24px;
    margin-right: 1em;
  }
`

const BeatInfo = styled.div`
  h2 {
    font-family: Work Sans;
    font-weight: 400;
    font-size: 18px;
    color: #ffffff;
    margin-bottom: 2px;
  }

  span {
    font-size: 12px;
    color: #8e969c;
    margin-right: 0.5em;
  }
`

const AddToCart = styled.button`
  background: #183a53;
  border-radius: 4px;
  color: #b8cfdf;
  text-transform: uppercase;
  border: none;
  padding: 8px 8px 8px 28px;
  cursor: pointer;
  position: relative;
  transition: background 0.1s ease-in;
  outline: none;
  margin-left: 2em;

  svg {
    position: absolute;
    left: 8px;
  }

  &:hover,
  &:visited {
    transition: background 0.1s ease-in;
    background: #ffaa00;
    color: #011523;
  }
`

const VolumeControllerContainer = styled.div`
  flex: 2;
  text-align: right;

  @media (max-width: 700px) {
    display: none;
  }
`

const AudioPlayer = () => {
  const [position, setPosition] = useState({})
  const [seekposition, setSeekposition] = useState(0)

  const interfaceContext = useContext(InterfaceContext)
  const storeContext = useContext(StoreContext)
  const { adding } = storeContext.store
  const {
    previewFile,
    selectVariant,
    setPlayerStatus,
    selectPreview,
    playerStatus,
    playerVolume,
  } = interfaceContext.interface

  const imgSource = previewFile.images
    ? previewFile.images[0].localFile.childImageSharp.fixed.src
    : null

  const addToCart = e => {
    e.stopPropagation()
    selectVariant(previewFile)
  }

  const handleFinishedPlaying = () => {
    selectPreview()
    setPlayerStatus('STOPPED')
    setSeekposition(0)
    setPosition({})
  }

  useEffect(() => {
    if (window && !!window.soundManager) {
      window.soundManager.setup({
        ignoreMobileRestrictions: true,
        useHighPerformance: true,
      })
    }
  }, [])

  return (
    <Container show={Object.keys(previewFile).length > 0}>
      <Scrubber position={position} callback={p => setSeekposition(p)} />
      <Details>
        <img src={imgSource} alt={previewFile.title} />
        <BeatInfo>
          <h2>
            {previewFile.title ? `${previewFile.title}` : 'No track selected'}
          </h2>
          {previewFile.tags &&
            previewFile.tags.map(t => <span key={t}>{`#${t}`}</span>)}
        </BeatInfo>
        <AddToCart onClick={e => addToCart(e)} disabled={adding}>
          <MdShoppingCart />
          BUY
        </AddToCart>
      </Details>
      <div>
        <Sound
          url={previewFile.preview ? previewFile.preview.publicURL : ''}
          loop={false}
          playStatus={playerStatus}
          volume={playerVolume}
          position={seekposition}
          onLoad={() =>
            /* Needed to trigger the waveform */
            setPlayerStatus('PLAYING')
          }
          onPlaying={position => {
            setSeekposition(position.position)
            setPosition(position)
          }}
          onFinishedPlaying={() => handleFinishedPlaying()}
          onStop={() => {
            setPosition({})
            setSeekposition(0)
          }}
        />
        <PlayPauseButton />
      </div>
      <VolumeControllerContainer>
        <VolumeController />
      </VolumeControllerContainer>
    </Container>
  )
}

export default AudioPlayer
