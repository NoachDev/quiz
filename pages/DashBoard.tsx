import { getSession, useSession } from "next-auth/react"
import Layout_DashBoard from "../layouts/DashBoard"
import { unstable_getServerSession }from "next-auth/next"
import { authOptions }              from "../pages/api/auth/[...nextauth]"

export async function getServerSideProps(ctx) {
  const session = await unstable_getServerSession(ctx.req, ctx.res, authOptions)

  if (!session){
    return {
      redirect : {
        permanent : false,
        destination : "/login",
      }
    }
  }

  return {
    props: {
    },
  }
}

function IndexPage() {
  const session = useSession()

  if (!session){
    return (<>Loading...</>)
  }
  
  return <Layout_DashBoard></Layout_DashBoard>
}

export default IndexPage