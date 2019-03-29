import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  max-width: 960px;
  margin: 64px auto 0 auto;
`

const NewletterForm = styled.form`
  display: flex;
  flex-direction: column;

  input {
    font-family: Work Sans, 'sans-serif';
    padding: 16px 8px;
    border: none;
    background: #dceaf4;
    border-radius: 4px;
    margin-bottom: 16px;
  }

  input[type='text'] {
    flex: 1;
  }

  input[type='email'] {
    flex: 2;
  }

  label {
    cursor: pointer;
    line-height: 120%;
    display: inline-block;
  }

  input[type='checkbox'] {
    height: 16px;
    width: 16px;
    min-width: 16px;
    min-height: 16px;
    margin: 0;
    margin-right: 8px;
  }

  input[type='submit'] {
    cursor: pointer;
    display: block;
    background: #ffaa00;
    border-radius: 4px;
    padding: 1em;
    color: #0a1723;
    font-size: 1em;
    transition: all 0.2s;
    width: 150px;
    margin: 24px auto 0 auto;
  }
`

const NewsletterSignup = () => {
  return (
    <Container>
      <NewletterForm
        action="https://www.getdrip.com/forms/863416978/submissions"
        method="post"
        data-drip-embedded-form="863416978"
      >
        <input
          type="text"
          name="fields[first_name]"
          placeholder="Your name"
          required
        />
        <input
          type="email"
          name="fields[email]"
          placeholder="Your email address"
          required
        />
        <div style={{ display: 'flex' }}>
          <input
            type="checkbox"
            name="fields[eu_consent]"
            id="drip-eu-consent"
            value="granted"
            required
          />
          <label htmlFor="drip-eu-consent">
            I consent to receive information about services and special offers
            by email
          </label>
        </div>
        <div>
          <input
            type="hidden"
            name="fields[eu_consent_message]"
            value="I consent to receive information about services and special offers by email"
          />
        </div>
        <div style={{ display: 'none' }} aria-hidden="true">
          <label htmlFor="website">Website</label>
          <br />
          <input
            type="text"
            id="website"
            name="website"
            tabIndex="-1"
            autoComplete="false"
            defaultValue=""
          />
        </div>
        <input
          type="submit"
          value="Sign Up"
          data-drip-attribute="sign-up-button"
        />
      </NewletterForm>
    </Container>
  )
}

export default NewsletterSignup
