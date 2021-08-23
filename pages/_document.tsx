import Document, {DocumentContext, Head, Html, NextScript, Main} from 'next/document'
import React from 'react'

class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx)

        return initialProps
    }

    render() {
        return (
            <Html >
                <Head>
                </Head>
                <body>
                <Main/>
                <NextScript />
                <script type="module" src="/lib/bootstrap/dist/js/bootstrap.bundle.min.js"/>
                </body>
            </Html>
        )
    }
}

export default MyDocument