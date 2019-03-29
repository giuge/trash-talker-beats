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
  display: flex;
  flex-direction: column;

  input,
  textarea {
    font-family: Work Sans, 'sans-serif';
    padding: 16px 8px;
    border: none;
    background: #dceaf4;
    border-radius: 4px;
  }

  textarea {
    resize: vertical;
    min-height: 80px;
  }

  div > input[type='text'],
  div > input[type='email'] {
    width: 49%;
    margin-right: 2%;

    &:last-child {
      margin-right: 0;
    }

    @media (max-width: 700px) {
      width: 100%;
      margin-right: 0;
      margin-bottom: 16px;
    }
  }

  input[type='text'],
  textarea {
    width: 100%;
    margin-bottom: 16px;
  }

  input[type='submit'] {
    cursor: pointer;
    width: 150px;
    margin-top: 16px;
    background: #ffaa00;

    @media (max-width: 700px) {
      margin: 24px auto;
    }
  }
`

const ThanksMessage = styled.p`
  text-align: center;
`

const Contact = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [botfilter, setBotfilter] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const encode = data => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
      .join('&')
  }

  const handleSubmit = e => {
    e.preventDefault()
    setLoading(true)

    if (botfilter) {
      setLoading(false)
      setSubmitted(true)
      return
    }

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': 'contact',
        name,
        email,
        subject,
        message,
      }),
    })
      .then(() => {
        setLoading(false)
        setSubmitted(true)
      })
      .catch(_ => {
        setLoading(false)
        setSubmitted(false)
      })
  }

  return (
    <Layout>
      <Container>
        <Title>Get in touch</Title>
        {!submitted && (
          <ContactForm onSubmit={e => handleSubmit(e)}>
            {/* You still need to add the hidden input with the form name to your JSX form */}
            <input
              type="hidden"
              name="botfilter"
              value={botfilter}
              onChange={e => setBotfilter(e.target.value)}
            />
            <div>
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
            </div>
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
            <input type="submit" value={loading ? '...' : 'Send Message'} />
          </ContactForm>
        )}
        {submitted && <ThanksMessage>Thanks for reaching out!</ThanksMessage>}
      </Container>
    </Layout>
  )
}

export default Contact
