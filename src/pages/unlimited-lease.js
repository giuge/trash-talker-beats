import React from 'react'
import styled from 'styled-components'

import Layout from '../components/Layout/'
import SEO from '../components/shared/Seo'

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

  strong {
    font-weight: 600;
  }

  ul {
    margin-top: 8px;

    li {
      margin-left: 1em;
      list-style: circle;
    }
  }
`

const TextTitle = styled.h4`
  color: #dceaf4;
  font-size: 1.2em;
  margin-top: 1.5em;
  margin-bottom: 1em;
  text-transform: capitalize;
`

const UnlimitedLease = () => (
  <Layout>
    <SEO title="Unlimited Lease" />
    <Container>
      <Title>Unlimited Lease</Title>
      <Content>
        <Text>
          THIS LICENSE AGREEMENT is made on the date of purchase ("Effective
          Date") by and between Licensee (hereinafter referred to as the
          "Licensee") and Davide Morleo ("Songwriter"), hereinafter referred to
          as the "Licensor". Licensor warrants that it controls the mechanical
          rights in and to the copyrighted musical work that has been purchased
          ("Composition") as of and prior to the date first written above. The
          Composition, including the music thereof, was composed by Davide
          Morleo ("Songwriter") managed under the Licensor.
        </Text>
        <Text>
          <strong>All licenses are non-refundable and non-transferable.</strong>
        </Text>
        <TextTitle>Master Use</TextTitle>
        <Text>
          The Licensor hereby grants to Licensee a non-exclusive license (this
          "License") to record vocal synchronization to the Composition partly
          or in its entirety and substantially in its original form ("Master
          Recording")
        </Text>
        <TextTitle>Mechanical Rights</TextTitle>
        <Text>
          The Licensor hereby grants to Licensee a non-exclusive license to use
          Master Recording in the reproduction, duplication, manufacture, and
          distribution of phonograph records, cassette tapes, compact disk,
          digital downloads, other miscellaneous audio and digital recordings,
          and any lifts and versions thereof (collectively, the "Recordings",
          and individually, a "Recordings") worldwide for up to the pressing or
          selling a total of Unlimited copies of such Recordings or any
          combination of such Recordings, condition upon the payment to the
          Licensor a sum of Two Hundred And Ninety-nine dollars ($299.00),
          receipt of which is confirmed. Additionally licensor shall be
          permitted to distribute Unlimited free internet downloads or streams
          for non-profit and non-commercial use. This license allows Unlimited
          not monetized audio streams to sites (like Spotify, RDIO, Rhapsody).
          This lease is eligible for monetization on YouTube.
        </Text>
        <TextTitle>Performance Rights</TextTitle>
        <Text>
          The Licensor hereby grants to Licensee a non-exclusive license to use
          the Master Recording in Unlimited performances, shows, or concerts.
        </Text>
        <TextTitle>Synchronization Rights</TextTitle>
        <Text>
          The Licensor hereby grants limited synchronization rights for One (1)
          music video streamed online (Youtube, Vimeo, etc..) for up to
          Unlimited non-monetized video streams on all total sites. A separate
          synchronization license will need to be purchased for distribution of
          video to Television, Film or Video game.
        </Text>
        <TextTitle>Broadcast Rights</TextTitle>
        <Text>
          The Licensor hereby grants to Licensee broadcasting rights up to
          Unlimited Radio Stations.
        </Text>
        <TextTitle>Credit</TextTitle>
        <Text>
          Licensee shall acknowledge the original authorship of the Composition
          appropriately and reasonably in all media and performance formats
          under the name "Trash Talker" in writing where possible and vocally
          otherwise.
        </Text>
        <TextTitle>Consideration</TextTitle>
        <Text>
          In consideration for the rights granted under this agreement, Licensee
          shall pay to licensor the sum of $299.00 US dollars and other good and
          valuable consideration, payable to " Trash Talker", receipt of which
          is hereby acknowledged. If the Licensee fails to account to the
          Licensor, timely complete the payments provided for hereunder, or
          perform its other obligations hereunder, including having insufficient
          bank balance, the licensor shall have the right to terminate License
          upon written notice to the Licensee. Such termination shall render the
          recording, manufacture and/or distribution of Recordings for which
          monies have not been paid subject to and actionable infringements
          under the Italian law, including, without limitation, the Italian
          Copyright Statute, as amended.
        </Text>
        <TextTitle>Indemnification</TextTitle>
        <Text>
          Accordingly, Licensee agrees to indemnify and hold Licensor harmless
          from and against any and all claims, losses, damages, costs, expenses,
          including, without limitation, reasonable attorney's fees, arising of
          or resulting from a claimed breach of any of Licensee's
          representations, warranties or agreements hereunder.
        </Text>
        <TextTitle>Audio Samples</TextTitle>
        <Text>
          3rd party sample clearance is the responsibility of the licensee.
        </Text>
        <TextTitle>Miscellaneous</TextTitle>
        <Text>
          This license is non-transferable and is limited to the Composition
          specified above, does not convey or grant any right of public
          performance for profit, constitutes the entire agreement between the
          Licensor and the Licensee relating to the Composition, and shall be
          binding upon both the Licensor and the Licensee and their respective
          successors, assigns, and legal representatives.
        </Text>
        <TextTitle>Governing Law</TextTitle>
        <Text>
          This License is governed by and shall be construed under the law of
          Italy, without regard to the conflicts of laws principles thereof. Any
          dispute will be handled under the Italian Jurisdiction.
        </Text>
        <TextTitle>Term</TextTitle>
        <Text>
          Executed by the Licensor and the Licensee, to be effective as for all
          purposes as of the Effective Date first mentioned above and shall
          terminate exactly ten (10) years from this date.
          <ul>
            <li>
              <strong>Licensee</strong>, owns 50% of the writers share.
            </li>
            <li>
              <strong>Davide Morleo (Trash Talker)</strong>, owns 50% of the
              writers share.
            </li>
          </ul>
        </Text>
      </Content>
    </Container>
  </Layout>
)

export default UnlimitedLease
