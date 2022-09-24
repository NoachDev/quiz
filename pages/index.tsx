import React from "react"
import Layout_home from "../layouts/home"
import Head from 'next/head'
import Page_ask from "../components/page_ask";

function Home(){

    return (
    <div>
        <Head>
            <title>Questions</title>
        </Head>

        <Layout_home>
            {/* <Page_ask/> */}
        </Layout_home>
    </div>
    )
}

export default Home