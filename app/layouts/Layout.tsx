import { ReactNode, Suspense } from "react"
import { Head } from "blitz"
import Header from "../components/Header"
import Footer from "../components/Footer"

type LayoutProps = {
  title?: string
  children: ReactNode
}

const Layout = ({ title, children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title || "blog"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Suspense fallback={<div>Loading...</div>}>
        <Header />
      </Suspense>

      {children}

      <Footer />
    </>
  )
}

export default Layout
