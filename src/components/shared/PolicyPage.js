import React from 'react'
import styled from 'styled-components'

import Layout from '../Layout/'

const Title = styled.h2`
  font-size: 1.5em;
  text-align: center;
  margin-bottom: 1.5em;
`

const Body = styled.div`
  font-size: 1em;
  text-align: left;
  line-height: 1.5em;
`

const Text = styled.p`
  font-family: SarabunLight, sans-serif;
  margin-bottom: 1em;
  color: #87adc8;
`

const TextTitle = styled.h4`
  color: #dceaf4;
  font-size: 1.2em;
  margin-top: 1.5em;
  margin-bottom: 1em;
  text-transform: capitalize;
`

const PolicyPage = ({ pageContext }) => {
  console.log(pageContext)
  const paragraphs = pageContext.page.body.split('\n').filter(p => p !== '')

  return (
    <Layout>
      <Title>{pageContext.page.title}</Title>
      <Body>
        {paragraphs.map((p, i) => {
          if (p.toUpperCase() === p) {
            return <TextTitle key={i}>{p}</TextTitle>
          }
          return <Text key={i}>{p}</Text>
        })}
      </Body>
    </Layout>
  )
}

export default PolicyPage
