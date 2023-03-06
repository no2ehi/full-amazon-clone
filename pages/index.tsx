import Header from '@/components/Header'
import MenuSideBar from '@/components/MenuSidebar'
import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>Full Amazon Clone React</title>
        <meta name="description" content="full amazon clone React" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div>
        <Header/>
      </div>
      <MenuSideBar />
    </>
  )
}
