import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  height: 5px;
  position: absolute;
  top: -5px;
  left: 0;
  cursor: pointer;
  transition: height 0.2s;

  :hover {
    height: 8px;
  }
`

const Rails = styled.div`
  width: 100%;
  height: 100%;
  background: #b8cfdf;
`

const Track = styled.div`
  width: ${props => `${props.computedWidth}%`};
  opacity: 0.6;
  height: 100%;
  bottom: 0;
  position: absolute;
  transition: width 0.2s;
  background: #39617d;
`

const Scrubber = props => {
  const { duration, position } = props.position
  const trackWidth = Math.floor((position / duration) * 100)

  const handleTrackClick = e => {
    const currentTargetRect = e.currentTarget.getBoundingClientRect()
    const offsetX = e.pageX - currentTargetRect.left
    const { width } = e.target.nextElementSibling.getBoundingClientRect()
    const newPosition = (offsetX * duration) / width

    props.callback(newPosition)
  }

  const handleRailsClick = e => {
    const currentTargetRect = e.currentTarget.getBoundingClientRect()
    const offsetX = e.pageX - currentTargetRect.left
    const { width } = currentTargetRect
    const newPosition = (offsetX * duration) / width

    props.callback(newPosition)
  }

  return (
    <Container>
      <Track
        computedWidth={trackWidth || 0}
        onClick={e => handleTrackClick(e)}
      />
      <Rails onClick={e => handleRailsClick(e)} />
    </Container>
  )
}

export default Scrubber
