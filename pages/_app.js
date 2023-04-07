import React from 'react'
import Page from '../components/Page'
import { Roboto_Flex } from 'next/font/google'

const roboto = Roboto_Flex({ subsets: ['latin'] })

export default function TJIApp({ Component, pageProps }) {
  return (
    <Page className={roboto.className}>
      <Component {...pageProps} />
    </Page>
  )
}

export async function getInitialProps({ Component, ctx }) {
  let pageProps = {}

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx)
  }

  return { pageProps }
}
