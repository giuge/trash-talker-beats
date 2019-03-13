import React, { Component } from 'react'
import Sound from 'react-sound'
import styled from 'styled-components'

import { withInterfaceContext } from '../../context/InterfaceContext'
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
  z-index: 99;
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

  h2 {
    font-family: Work Sans;
    font-weight: 400;
    font-size: 20px;
    color: #ffffff;
  }
`

class AudioPlayer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      position: {},
      seekPosition: 0,
    }
  }

  handleCallback(seekPosition) {
    this.setState(state => ({
      ...state,
      seekPosition: seekPosition,
    }))
  }

  componentDidMount() {
    if (window && !!window.soundManager) {
      window.soundManager.setup({
        ignoreMobileRestrictions: true,
        useHighPerformance: true,
      })
    }
  }

  render() {
    const {
      previewFile,
      playerStatus,
      playerVolume,
      setPlayerStatus,
    } = this.props.context.interface

    const imgSource = previewFile.images
      ? previewFile.images[0].localFile.childImageSharp.fixed.src
      : null

    return (
      <Container show={Object.keys(previewFile).length > 0}>
        <Scrubber
          position={this.state.position}
          callback={p => this.handleCallback(p)}
        />
        <Details>
          <img src={imgSource} alt={previewFile.title} />
          <h2>
            {previewFile.title ? `${previewFile.title}` : 'No track selected'}
          </h2>
        </Details>
        <div>
          <Sound
            url={previewFile.preview ? previewFile.preview.publicURL : ''}
            loop={true}
            playStatus={playerStatus}
            volume={playerVolume}
            position={this.state.seekPosition}
            onLoad={() =>
              /* Needed to trigger the waveform */
              setPlayerStatus('PLAYING')
            }
            onPlaying={(position, _) =>
              this.setState(_ => ({
                position,
                seekPosition: position.position,
              }))
            }
            onStop={() => this.setState({ position: {}, seekPosition: 0 })}
          />
          <PlayPauseButton />
        </div>
        <div style={{ flex: '2', textAlign: 'right' }}>
          <VolumeController />
        </div>
      </Container>
    )
  }
}

export default withInterfaceContext(AudioPlayer)
