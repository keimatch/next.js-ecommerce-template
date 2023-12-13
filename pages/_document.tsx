import Document, {
  Head,
  Main,
  NextScript,
  DocumentInitialProps,
  DocumentContext,
} from "next/document";

interface DocumentProps extends DocumentInitialProps {
  isProduction: boolean;
}

export default class CustomDocument extends Document<DocumentProps> {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentProps> {
    const initialProps = await Document.getInitialProps(ctx);

    // Check if in production
    const isProduction = process.env.NODE_ENV === "production";

    console.log("initial", initialProps);

    return {
      ...initialProps,
      isProduction,
    };
  }

  render() {
    return (
      <html lang="en">
        <Head></Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
