import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: 2em 0;

  input[type='email'] {
    width: 100%;
    padding: 0.5em;
    height: 48px;
    border-radius: 4px 0 0 4px;
    border: none;
    outline: none;
    background: #dceaf4;
    color: #011523;
  }

  input[type='submit'] {
    display: block;
    margin: 1em auto;
    background: #ffaa00;
    outline: none;
    border: none;
    padding: 1em;
    border-radius: 0 4px 4px 0;
    height: 48px;
    cursor: pointer;
  }
`

const InputContainer = styled.div`
  display: flex;
  height: 48px;
  align-items: center;
`

const Title = styled.h2`
  font-size: 1.5em;
  text-align: center;
  margin-bottom: 1em;
`

const SignupForm = () => {
  return (
    <Container>
      <Title>Subscribe to our mailing list</Title>
      <form
        action="https://con.us20.list-manage.com/subscribe/post?u=e647a49a4a0843b67c424df64&amp;id=d9766b56bf"
        method="post"
        id="mc-embedded-subscribe-form"
        name="mc-embedded-subscribe-form"
        target="_blank"
        noValidate
      >
        <div id="mc_embed_signup_scroll">
          <InputContainer>
            <input
              type="email"
              name="EMAIL"
              id="mce-EMAIL"
              placeholder="Email address"
              required
            />
            <div
              style={{ position: 'absolute', left: '-5000px' }}
              aria-hidden="true"
            >
              <input
                type="text"
                name="b_e647a49a4a0843b67c424df64_d9766b56bf"
                tabIndex="-1"
              />
            </div>
            <div>
              <input
                type="submit"
                value="Subscribe"
                name="subscribe"
                id="mc-embedded-subscribe"
                className="button"
              />
            </div>
          </InputContainer>
        </div>
      </form>
    </Container>
  )
}

export default SignupForm
