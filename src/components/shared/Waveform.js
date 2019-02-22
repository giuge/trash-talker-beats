import React, { Component } from 'react'
import styled from 'styled-components'
import ReactAnimationFrame from 'react-animation-frame'
import { withAllContext } from '../../context/AllContext'

const Container = styled.canvas`
  visibility: ${props => (props.playing ? 'visible' : 'hidden')};
  width: 100%;
  position: absolute;
  top: 10%;
  left: 0;
  height: 200px;
  z-index: -10;
  opacity: 0.2;

  @media (max-width: 700px) {
    display: none;
  }
`

class Waveform extends Component {
  constructor(props) {
    super(props)

    this.canvas = React.createRef()
    this.audioContextCheck = null
    this.audioContext = null
    this.analyser = null
  }

  componentDidMount() {
    const { playerStatus } = this.props.context.interface

    this.audioContextCheck = window.AudioContext || window.webkitAudioContext
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)()

    this.analyser = this.audioContext.createAnalyser()
    this.analyser.fftSize = 256

    console.log(this.audioContext)
  }

  componentDidUpdate() {
    const { playerStatus, previewFile } = this.props.context.interface
    const { soundManager } = window

    this.audioContext.resume().then(() => console.log(this.audioContext))

    if (playerStatus === 'PLAYING') {
      const currentAudioFile = Object.keys(soundManager.sounds).filter(k =>
        soundManager.sounds[k].instanceOptions.url.includes(
          previewFile.preview.name
        )
      )

      const audio = soundManager.sounds[currentAudioFile]
        ? soundManager.sounds[currentAudioFile]._a
        : null

      this.props.startAnimation()

      try {
        const source = this.audioContext.createMediaElementSource(audio)
        source.connect(this.analyser)
        this.analyser.connect(this.audioContext.destination)
      } catch (e) {}

      this.props.startAnimation()
    } else if (playerStatus !== 'PLAYING') {
      this.props.endAnimation()
    }
  }

  onAnimationFrame() {
    const canvas = this.canvas.current
    const ctx = canvas ? canvas.getContext('2d') : null

    if (!ctx) return

    const bufferLength = this.analyser.frequencyBinCount
    const dataArray = new Uint8Array(bufferLength)
    const WIDTH = window.innerWidth
    const HEIGHT = 80

    ctx.clearRect(0, 0, WIDTH, HEIGHT)

    this.analyser.getByteTimeDomainData(dataArray)
    ctx.fillStyle = 'transparent'
    ctx.fillRect(0, 0, WIDTH, HEIGHT)
    ctx.lineWidth = 4
    ctx.strokeStyle = '#DCEAF4'
    ctx.beginPath()

    const sliceWidth = (WIDTH * 1.0) / bufferLength
    let x = 0

    for (let i = 0; i < bufferLength; i++) {
      let v = dataArray[i] / 128.0
      let y = (v * HEIGHT) / 2

      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }

      x += sliceWidth
    }
    ctx.lineTo(canvas.width, canvas.height / 2)
    ctx.stroke()
  }

  render() {
    if (!this.audioContextCheck) {
      return ''
    }

    return (
      <Container
        ref={this.canvas}
        playing={this.props.context.interface.playerStatus === 'PLAYING'}
      />
    )
  }
}

export default withAllContext(ReactAnimationFrame(Waveform))
