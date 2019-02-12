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
  background: #39617D;
  border-radius: 100px;
  transform-style: preserve-3d;
  cursor: pointer;
`

const PlayPauseButton = props => {
  const { playerStatus, setPlayerStatus, previewFile } = props.context.interface

  const renderIcon = () =>
    playerStatus === 'PLAYING' && !!previewFile.publicURL ? <MdPause /> : <MdPlayArrow />

  return (
    <Container
      onClick={() =>
        setPlayerStatus(playerStatus === 'PLAYING' ? 'PAUSED' : 'PLAYING')
      }
    >
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
