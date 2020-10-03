import React, { Suspense } from "react"
import { useRouter, BlitzPage } from "blitz"
import Layout from "app/layouts/Layout"
import { SignupForm } from "app/auth/components/SignupForm"
import Header from "app/posts/components/Header"
import Footer from "app/posts/components/Footer"

const SignupPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Header />
      </Suspense>
      <br />
      <br />
      <br />
      <div className="loginS">
        <SignupForm onSuccess={() => router.push("/author")} />
      </div>
      <br />
      <br />
      <br />
      <Footer />
      <style jsx>{`
      .loginS{
        display: grid;
        place-items: center;
      }`}
      </style>
    </div>
  )
}

SignupPage.getLayout = (page) => <Layout title="Sign Up">{page}</Layout>

export default SignupPage
