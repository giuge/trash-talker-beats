import React from 'react'
import MailchimpSubscribe from 'react-mailchimp-subscribe'

const CustomForm = ({ onValidated }) => {
  let email, name
  const submit = () =>
    email &&
    name &&
    email.value.indexOf('@') > -1 &&
    onValidated({
      EMAIL: email.value,
      NAME: name.value,
    })

  return (
    <div
      style={{
        background: '#efefef',
        borderRadius: 2,
        padding: 10,
        display: 'inline-block',
      }}
    >
      <input
        style={{ fontSize: '2em', padding: 5 }}
        ref={node => (name = node)}
        type="text"
        name="MERGE1"
        id="MERGE1"
        placeholder="Your name"
      />
      <br />
      <input
        style={{ fontSize: '2em', padding: 5 }}
        ref={node => (email = node)}
        type="email"
        name="EMAIL"
        id="mc-EMAIL"
        placeholder="Your email"
      />
      <br />
      <button style={{ fontSize: '2em', padding: 5 }} onClick={submit}>
        Submit
      </button>
    </div>
  )
}

const SubscribeForm = () => {
  const u = 'e647a49a4a0843b67c424df64'
  const id = 'd9766b56bf'
  const url = `//mc.us20.list-manage.com/subscribe/post?u=${u}&id=${id}`
  //const SimpleForm = () => <MailchimpSubscribe url={url} />

  const renderValidation = (status, message) => {
    if (status === 'sending') {
      return <div style={{ color: 'blue' }}>sending...</div>
    } else if (status === 'error') {
      return (
        <div
          style={{ color: 'red' }}
          dangerouslySetInnerHTML={{ __html: message }}
        />
      )
    } else if (status === 'success') {
      return <div style={{ color: 'green' }}>Subscribed !</div>
    }
  }

  return (
    <MailchimpSubscribe
      url={url}
      render={({ subscribe, status, message }) => (
        <div>
          <CustomForm
            status={status}
            message={message}
            onValidated={formData => subscribe(formData)}
          />
          {renderValidation(status, message)}
        </div>
      )}
    />
  )
}

export default SubscribeForm
