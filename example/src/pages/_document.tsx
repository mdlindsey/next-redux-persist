import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

class AppDocument extends Document {
  public props:any
  static getInitialProps(ctx) {
    const sheet = new ServerStyleSheet()
    const page = ctx.renderPage(App => props => sheet.collectStyles(<App {...props} />))
    const styleTags = sheet.getStyleElement()
    return { ...page, styleTags }
  }
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta name="author" content="Dan Lindsey" />
          <meta name="description" content="Next Redux Persist Example" />
          <link rel='shortcut icon' type='image/x-icon' href='/favicon.ico' />
          {this.props.styleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

// eslint-disable-next-line import/no-default-export
export default AppDocument
