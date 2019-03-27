import React, { useState } from 'react'
import styled from 'styled-components'

import Layout from '../components/Layout/'

const Container = styled.div`
  max-width: 960px;
  margin: 0 auto;
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

const ContactForm = styled.form`
  padding: 40px;

  @media (max-width: 700px) {
    padding: 40px 16px;
  }
`

const Contact = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [botfilter, setBotfilter] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')

  const encode = data => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
      .join('&')
  }

  const handleSubmit = e => {
    e.preventDefault()
    setLoading(true)

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        botfilter,
        name,
        email,
        subject,
        message,
      }),
    })
      .then(() => {
        setLoading(false)
        alert('Success!')
      })
      .catch(error => {
        setLoading(false)
        alert(error)
      })
  }

  return (
    <Layout>
      <Container>
        <Title>Get in touch</Title>
        <ContactForm
          name="contact"
          method="post"
          data-netlify="true"
          data-netlify-honeypot="botfilter"
          onSubmit={e => handleSubmit(e)}
        >
          {/* You still need to add the hidden input with the form name to your JSX form */}
          <input
            type="hidden"
            name="botfilter"
            value={botfilter}
            onChange={e => setBotfilter(e.target.value)}
          />
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={subject}
            onChange={e => setSubject(e.target.value)}
            required
          />
          <textarea
            type="text"
            name="message"
            placeholder="Message"
            value={message}
            onChange={e => setMessage(e.target.value)}
            required
          />
          <input type="submit" value={loading ? '...' : 'Submit'} />
        </ContactForm>
      </Container>
    </Layout>
  )
}

export default Contact
