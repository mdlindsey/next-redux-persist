import { AppContext, AppProps } from 'next/app'
import { reduxWrapper } from 'src/store'
import { loadState } from '../../../package/lib'

const Page = ({ Component, pageProps }: AppProps) => {
  return (
    <>
        <Component {...pageProps} />
    </>
  )
}

Page.getInitialProps = async ({ Component, ctx }:AppContext) => {
  loadState(ctx)
  const pageProps = !Component.getInitialProps ? {} : await Component.getInitialProps(ctx)
  return { pageProps }
}

// eslint-disable-next-line import/no-default-export
export default reduxWrapper.withRedux(Page)
