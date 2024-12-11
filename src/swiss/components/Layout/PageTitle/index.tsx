import type { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'

type PageTitleProps = {
  title: string
  Component: NextPage | React.FC
}

const PageTitleComponent = ({ title, Component }: PageTitleProps) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Component />
    </>
  )
}

const pageTitle = ({ title, Component }: PageTitleProps) => {
  const PageTitleWrapper = () => {
    return <PageTitleComponent Component={Component} title={title} />
  }
  return PageTitleWrapper
}

export default pageTitle
