import React, { useContext, useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'

import { InterfaceContext } from '../../context/'

const glitch1 = keyframes` 
  from {
    clip: rect(${Math.floor(
      Math.random() * Math.floor(100)
    )}px, 9999px, ${Math.floor(Math.random() * Math.floor(100))}px, 0);
    transform: skew(${Math.floor(Math.random() * Math.floor(100)) / 100}deg);
  }
  to {
    clip: rect(${Math.floor(
      Math.random() * Math.floor(100)
    )}px, 9999px, ${Math.floor(Math.random() * Math.floor(100))}px, 0);
    transform: skew(${Math.floor(Math.random() * Math.floor(100)) / 100}deg);
  }
  10% {
    clip: rect(${Math.floor(
      Math.random() * Math.floor(100)
    )}px, 9999px, ${Math.floor(Math.random() * Math.floor(100))}px, 0);
    transform: skew(${Math.floor(Math.random() * Math.floor(100)) / 100}deg);
  }
  15% {
    clip: rect(${Math.floor(
      Math.random() * Math.floor(100)
    )}px, 9999px, ${Math.floor(Math.random() * Math.floor(100))}px, 0);
    transform: skew(${Math.floor(Math.random() * Math.floor(100)) / 100}deg);
  }
  20% {
    clip: rect(${Math.floor(
      Math.random() * Math.floor(100)
    )}px, 9999px, ${Math.floor(Math.random() * Math.floor(100))}px, 0);
    transform: skew(${Math.floor(Math.random() * Math.floor(100)) / 100}deg);
  }
  25% {
    clip: rect(${Math.floor(
      Math.random() * Math.floor(100)
    )}px, 9999px, ${Math.floor(Math.random() * Math.floor(100))}px, 0);
    transform: skew(${Math.floor(Math.random() * Math.floor(100)) / 100}deg);
  }
  30% {
    clip: rect(${Math.floor(
      Math.random() * Math.floor(100)
    )}px, 9999px, ${Math.floor(Math.random() * Math.floor(100))}px, 0);
    transform: skew(${Math.floor(Math.random() * Math.floor(100)) / 100}deg);
  }
  35% {
    clip: rect(${Math.floor(
      Math.random() * Math.floor(100)
    )}px, 9999px, ${Math.floor(Math.random() * Math.floor(100))}px, 0);
    transform: skew(${Math.floor(Math.random() * Math.floor(100)) / 100}deg);
  }
  40% {
    clip: rect(${Math.floor(
      Math.random() * Math.floor(100)
    )}px, 9999px, ${Math.floor(Math.random() * Math.floor(100))}px, 0);
    transform: skew(${Math.floor(Math.random() * Math.floor(100)) / 100}deg);
  }
  45% {
    clip: rect(${Math.floor(
      Math.random() * Math.floor(100)
    )}px, 9999px, ${Math.floor(Math.random() * Math.floor(100))}px, 0);
    transform: skew(${Math.floor(Math.random() * Math.floor(100)) / 100}deg);
  }
  50% {
    clip: rect(${Math.floor(
      Math.random() * Math.floor(100)
    )}px, 9999px, ${Math.floor(Math.random() * Math.floor(100))}px, 0);
    transform: skew(${Math.floor(Math.random() * Math.floor(100)) / 100}deg);
  }
  55% {
    clip: rect(${Math.floor(
      Math.random() * Math.floor(100)
    )}px, 9999px, ${Math.floor(Math.random() * Math.floor(100))}px, 0);
    transform: skew(${Math.floor(Math.random() * Math.floor(100)) / 100}deg);
  }
  60% {
    clip: rect(${Math.floor(
      Math.random() * Math.floor(100)
    )}px, 9999px, ${Math.floor(Math.random() * Math.floor(100))}px, 0);
    transform: skew(${Math.floor(Math.random() * Math.floor(100)) / 100}deg);
  }
  65% {
    clip: rect(${Math.floor(
      Math.random() * Math.floor(100)
    )}px, 9999px, ${Math.floor(Math.random() * Math.floor(100))}px, 0);
    transform: skew(${Math.floor(Math.random() * Math.floor(100)) / 100}deg);
  }
  70% {
    clip: rect(${Math.floor(
      Math.random() * Math.floor(100)
    )}px, 9999px, ${Math.floor(Math.random() * Math.floor(100))}px, 0);
    transform: skew(${Math.floor(Math.random() * Math.floor(100)) / 100}deg);
  }
  75% {
    clip: rect(${Math.floor(
      Math.random() * Math.floor(100)
    )}px, 9999px, ${Math.floor(Math.random() * Math.floor(100))}px, 0);
    transform: skew(${Math.floor(Math.random() * Math.floor(100)) / 100}deg);
  }
  80% {
    clip: rect(${Math.floor(
      Math.random() * Math.floor(100)
    )}px, 9999px, ${Math.floor(Math.random() * Math.floor(100))}px, 0);
    transform: skew(${Math.floor(Math.random() * Math.floor(100)) / 100}deg);
  }
  85% {
    clip: rect(${Math.floor(
      Math.random() * Math.floor(100)
    )}px, 9999px, ${Math.floor(Math.random() * Math.floor(100))}px, 0);
    transform: skew(${Math.floor(Math.random() * Math.floor(100)) / 100}deg);
  }
  90% {
    clip: rect(${Math.floor(
      Math.random() * Math.floor(100)
    )}px, 9999px, ${Math.floor(Math.random() * Math.floor(100))}px, 0);
    transform: skew(${Math.floor(Math.random() * Math.floor(100)) / 100}deg);
  }
  95% {
    clip: rect(${Math.floor(
      Math.random() * Math.floor(100)
    )}px, 9999px, ${Math.floor(Math.random() * Math.floor(100))}px, 0);
    transform: skew(${Math.floor(Math.random() * Math.floor(100)) / 100}deg);
  }
  100% {
    clip: rect(${Math.floor(
      Math.random() * Math.floor(100)
    )}px, 9999px, ${Math.floor(Math.random() * Math.floor(100))}px, 0);
    transform: skew(${Math.floor(Math.random() * Math.floor(100)) / 100}deg);
  }
`

const glitch2 = keyframes`
  0% {
    clip: rect(6px, 9999px, 7px, 0);
    transform: skew(0.51deg);
  }
  5% {
    clip: rect(60px, 9999px, 50px, 0);
    transform: skew(0.75deg);
  }
  10% {
    clip: rect(34px, 9999px, 54px, 0);
    transform: skew(0.78deg);
  }
  15% {
    clip: rect(43px, 9999px, 57px, 0);
    transform: skew(0.09deg);
  }
  20% {
    clip: rect(71px, 9999px, 8px, 0);
    transform: skew(0.4deg);
  }
  25% {
    clip: rect(58px, 9999px, 65px, 0);
    transform: skew(0.35deg);
  }
  30% {
    clip: rect(36px, 9999px, 31px, 0);
    transform: skew(0.14deg);
  }
  35% {
    clip: rect(45px, 9999px, 35px, 0);
    transform: skew(0.99deg);
  }
  40% {
    clip: rect(45px, 9999px, 24px, 0);
    transform: skew(0.37deg);
  }
  45% {
    clip: rect(70px, 9999px, 99px, 0);
    transform: skew(0.02deg);
  }
  50% {
    clip: rect(22px, 9999px, 77px, 0);
    transform: skew(0.26deg);
  }
  55% {
    clip: rect(12px, 9999px, 69px, 0);
    transform: skew(0.08deg);
  }
  60% {
    clip: rect(34px, 9999px, 64px, 0);
    transform: skew(0.62deg);
  }
  65% {
    clip: rect(59px, 9999px, 23px, 0);
    transform: skew(0.19deg);
  }
  70% {
    clip: rect(40px, 9999px, 24px, 0);
    transform: skew(0.69deg);
  }
  75% {
    clip: rect(38px, 9999px, 69px, 0);
    transform: skew(0.26deg);
  }
  80% {
    clip: rect(59px, 9999px, 31px, 0);
    transform: skew(0.08deg);
  }
  85% {
    clip: rect(6px, 9999px, 41px, 0);
    transform: skew(0.64deg);
  }
  90% {
    clip: rect(90px, 9999px, 47px, 0);
    transform: skew(0.44deg);
  }
  95% {
    clip: rect(3px, 9999px, 85px, 0);
    transform: skew(0.47deg);
  }
  100% {
    clip: rect(62px, 9999px, 32px, 0);
    transform: skew(0.31deg);
  }
`

const glitchSkew = keyframes`
  0% {
    transform: skew(${Math.floor(Math.random() * Math.floor(10)) - 5}deg);
  }
  10% {
    transform: skew(${Math.floor(Math.random() * Math.floor(10)) - 5}deg);
  }
  20% {
    transform: skew(${Math.floor(Math.random() * Math.floor(10)) - 5}deg);
  }
  30% {
    transform: skew(${Math.floor(Math.random() * Math.floor(10)) - 5}deg);
  }
  40% {
    transform: skew(${Math.floor(Math.random() * Math.floor(10)) - 5}deg);
  }
  50% {
    transform: skew(${Math.floor(Math.random() * Math.floor(10)) - 5}deg);
  }
  60% {
    transform: skew(${Math.floor(Math.random() * Math.floor(10)) - 5}deg);
  }
  70% {
    transform: skew(${Math.floor(Math.random() * Math.floor(10)) - 5}deg);
  }
  80% {
    transform: skew(${Math.floor(Math.random() * Math.floor(10)) - 5}deg);
  }
  90% {
    transform: skew(${Math.floor(Math.random() * Math.floor(10)) - 5}deg);
  }
  100% {
    transform: skew(${Math.floor(Math.random() * Math.floor(10)) - 5}deg);
  }
`

const GlitchContanier = styled.div`
  text-align: center;
  margin: 0 auto;
`
const Glitch = styled.div`
  position: relative;
  display: inline-block;

  > * {
    transition: translate 0.2s;
  }

  > *:first-child {
    width: 100%;
    position: absolute;
    top: 0;
    left: 2px;
    text-shadow: -2px 0 #cd1dea;
    clip: rect(96px, 490px, 96px, 0);
    animation: ${glitch1} 5s infinite linear alternate-reverse;
    z-index: -10;
  }

  > *:nth-child(2) {
    animation: ${glitchSkew} 1s infinite linear alternate-reverse;
  }

  > *:last-child {
    width: 100%;
    position: absolute;
    top: 0;
    left: -2px;
    text-shadow: -2px 0 #00f0ff, 2px 2px #cd1dea;
    animation: ${glitch2} 1s infinite linear alternate-reverse;
    z-index: 10;
  }
`

const GlitchedText = ({ children }) => {
  const [shouldGlitch, setShouldGlitch] = useState(false)
  const interfaceContext = useContext(InterfaceContext)
  const { playerStatus } = interfaceContext.interface

  useEffect(() => {
    setShouldGlitch(playerStatus === 'PLAYING')
  }, [playerStatus])

  return shouldGlitch ? (
    <GlitchContanier>
      <Glitch>
        {children}
        {children}
        {children}
      </Glitch>
    </GlitchContanier>
  ) : (
    children
  )
}

export default GlitchedText
