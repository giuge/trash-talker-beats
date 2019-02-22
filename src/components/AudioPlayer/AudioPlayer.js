import React, { Component } from 'react'
import Sound from 'react-sound'
import styled from 'styled-components'

import { withInterfaceContext } from '../../context/InterfaceContext'
import PlayPauseButton from './PlayPauseButton'
import VolumeController from './VolumeController'
import Scrubber from './Scrubber'

const Container = styled.div`
  background: #dceaf4;
  display: flex;
  color: #011523;
  font-family: SarabunBold, sans-serif;
  align-items: center;
  justify-content: space-between;
  padding: 8px 8px 16px 8px;
  height: 64px;
  position: relative;
`

const NowPlaying = styled.small`
  font-size: 10px;
  color: #99a9b5;
  text-transform: uppercase;
  display: block;
  margin-bottom: 4px;
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

    return (
      <Container>
        <div style={{ width: '40%' }}>
          <NowPlaying>Now Playing</NowPlaying>
          <h2>
            {previewFile.title ? `${previewFile.title}` : 'No track selected'}
          </h2>
        </div>
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
            autoLoad={true}
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
        <VolumeController />
        <Scrubber
          position={this.state.position}
          callback={p => this.handleCallback(p)}
        />
      </Container>
    )
  }
}

export default withInterfaceContext(AudioPlayer)
