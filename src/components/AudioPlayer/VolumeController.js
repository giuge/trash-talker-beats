import React from 'react'
import Slider from 'rc-slider'
import styled from 'styled-components'
import { IconContext } from 'react-icons'
import { MdVolumeMute, MdVolumeDown, MdVolumeUp } from 'react-icons/md'
import 'rc-slider/assets/index.css'

import { withInterfaceContext } from '../../context/InterfaceContext'

const Container = styled.div`
  width: 40%;
  height: 8px;
  cursor: pointer;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`

const SliderContainer = styled.div`
  width: 82px;
  height: 8px;
  cursor: pointer;
`

const VolumeController = props => {
  const { playerVolume, setPlayerVolume } = props.context.interface

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
          color: '#39617D',
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
            backgroundColor: '#39617D',
            height: 8,
            zIndex: 10,
          }}
          railStyle={{
            borderRadius: 0,
            position: 'absolute',
            top: 0,
            left: 0,
            backgroundColor: '#B8CFDF',
            height: 8,
            zIndex: 0,
          }}
        />
      </SliderContainer>
    </Container>
  )
}

export default withInterfaceContext(VolumeController)
