import { getSession, useSession } from "next-auth/react"
import Layout_DashBoard from "../layouts/DashBoard"

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx)

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