import React, { useContext } from 'react'
import Slider from 'rc-slider'
import styled from 'styled-components'
import { IconContext } from 'react-icons'
import { MdVolumeMute, MdVolumeDown, MdVolumeUp } from 'react-icons/md'
import 'rc-slider/assets/index.css'

import { InterfaceContext } from '../../context/'

const Container = styled.div`
  width: 40%;
  height: 8px;
  cursor: pointer;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  float: right;
`

const SliderContainer = styled.div`
  width: 82px;
  height: 8px;
  cursor: pointer;
`

const VolumeController = props => {
  const interfaceContext = useContext(InterfaceContext)
  const { playerVolume, setPlayerVolume } = interfaceContext.interface

  const renderIcon = () => {
    if (playerVolume === 0) {
      return <MdVolumeMute />
    } else if (playerVolume < 50) {
      return <MdVolumeDown />
    }

    return <MdVolumeUp />
  }

  return (
    <Container>
      <IconContext.Provider
        value={{
          size: 18,
          color: '#DCEAF4',
          style: {
            display: 'block',
            marginRight: 8,
          },
        }}
      >
        {renderIcon()}
      </IconContext.Provider>
      <SliderContainer>
        <Slider
          defaultValue={0}
          value={playerVolume}
          step={5}
          onChange={value => setPlayerVolume(value)}
          handleStyle={{
            display: 'none',
            borderRadius: 100,
            height: 16,
            width: 16,
            marginLeft: -8,
            marginTop: -8,
            backgroundColor: '#011523',
            border: 'none',
            zIndex: 10,
          }}
          trackStyle={{
            borderRadius: 0,
            position: 'absolute',
            top: 0,
            backgroundColor: '#DCEAF4',
            height: 8,
            zIndex: 10,
          }}
          railStyle={{
            borderRadius: 0,
            position: 'absolute',
            top: 0,
            left: 0,
            backgroundColor: '#596678',
            height: 8,
            zIndex: 0,
          }}
        />
      </SliderContainer>
    </Container>
  )
}

export default VolumeController
