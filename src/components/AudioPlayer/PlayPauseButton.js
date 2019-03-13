import React from 'react'
import styled from 'styled-components'
import { IconContext } from 'react-icons'
import { MdPlayArrow, MdPause } from 'react-icons/md'

import { withInterfaceContext } from '../../context/InterfaceContext'

const Container = styled.div`
  position: relative;
  display: block;
  width: 48px;
  height: 48px;
  text-align: center;
  background: transparent;
  border-radius: 100px;
  transform-style: preserve-3d;
  cursor: pointer;
`

const PlayPauseButton = props => {
  const { playerStatus, setPlayerStatus, previewFile } = props.context.interface

  const renderIcon = () =>
    playerStatus === 'PLAYING' &&
    !!previewFile.preview &&
    !!previewFile.preview.publicURL ? (
      <MdPause />
    ) : (
      <MdPlayArrow />
    )

  const handleClick = () => {
    if (
      props.onClick &&
      {}.toString.call(props.onClick) === '[object Function]'
    ) {
      props.onClick()
    }
    setPlayerStatus(playerStatus === 'PLAYING' ? 'PAUSED' : 'PLAYING')
  }

  return (
    <Container onClick={() => handleClick()}>
      <IconContext.Provider
        value={{
          size: 32,
          color: '#ffffff',
          style: {
            position: 'absolute',
            top: '50%',
            transform: 'translate(-50%,-50%)',
            left: '50%',
          },
        }}
      >
        {renderIcon()}
      </IconContext.Provider>
    </Container>
  )
}

export default withInterfaceContext(PlayPauseButton)
