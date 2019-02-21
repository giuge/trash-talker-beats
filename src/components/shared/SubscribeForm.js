import React from 'react'
import MailchimpSubscribe from 'react-mailchimp-subscribe'

const url =
  '//mc.us20.list-manage.com/subscribe/post?u=e647a49a4a0843b67c424df64&id=d9766b56bf'
const SimpleForm = () => <MailchimpSubscribe url={url} />

const SubscribeForm = () => (
  <MailchimpSubscribe
    url={url}
    render={({ subscribe, status, message }) => (
      <div>
        <SimpleForm onSubmitted={formData => subscribe(formData)} />
        {status === 'sending' && (
          <div style={{ color: 'blue' }}>sending...</div>
        )}
        {status === 'error' && (
          <div
            style={{ color: 'red' }}
            dangerouslySetInnerHTML={{ __html: message }}
          />
        )}
        {status === 'success' && (
          <div style={{ color: 'green' }}>Subscribed !</div>
        )}
      </div>
    )}
  />
)

export default SubscribeForm
