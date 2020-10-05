import React, { Suspense } from "react"
import { useRouter, BlitzPage } from "blitz"
import Layout from "app/layouts/Layout"
import { LoginForm } from "app/auth/components/LoginForm"
import Header from "app/posts/components/Header"
import Footer from "app/posts/components/Footer"

const LoginPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <div>
      <br />
      <br />
      <br />
      <div className="loginS">
        <LoginForm onSuccess={() => router.push("/author")} />
      </div>
      <br />
      <br />
      <br />

      <style jsx>{`
      .loginS{
        display: grid;
        place-items: center;
      }`}
      </style>
    </div>
  )
}

LoginPage.getLayout = (page) => <Layout title="Log In">{page}</Layout>

export default LoginPage
