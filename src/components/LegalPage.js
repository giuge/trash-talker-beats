import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import Layout from './Layout'

const Container = styled.div`
  padding: 40px;

  @media (max-width: 700px) {
    padding: 40px 16px;
  }
`

const Title = styled.h2`
  font-family: Work Sans;
  font-style: normal;
  font-weight: 400;
  line-height: 49px;
  font-size: 38px;
  text-align: center;

  color: #dceaf4;
  margin-bottom: 1.5em;
`

const Content = styled.div`
  font-size: 1em;
  text-align: left;
  line-height: 1.5em;
  max-width: 960px;
  margin: 0 auto;
`

const Text = styled.p`
  font-family: 'Work Sans', sans-serif;
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
  const paragraphs = pageContext.body.split('\n').filter(p => p !== '')

  return (
    <Layout>
      <Container>
        <Title>{pageContext.title}</Title>
        <Content>
          {paragraphs.map((p, i) => {
            if (p.toUpperCase() === p) {
              return <TextTitle key={i}>{p}</TextTitle>
            }
            return <Text key={i}>{p}</Text>
          })}
        </Content>
      </Container>
    </Layout>
  )
}

PolicyPage.propTypes = {
  pageContext: PropTypes.object.isRequired,
}

PolicyPage.defaultProps = {
  pageContext: {},
}

export default PolicyPage
