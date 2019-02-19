import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/Layout/'
import SEO from '../components/shared/Seo'

const SecondPage = () => (
  <Layout>
    <SEO title="Page two" />
    <h1>Hi from the kits page</h1>
    <p>Welcome to the kits page</p>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default SecondPage
