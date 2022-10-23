import Layout_DashBoard               from "../layouts/DashBoard"
import { unstable_getServerSession }  from "next-auth/next"
import { authOptions }                from "../pages/api/auth/[...nextauth]"

export async function getServerSideProps(ctx) {
  const session = await unstable_getServerSession(ctx.req, ctx.res, authOptions)

  if (session){
    return {
      props: {
        loged : true
      },
    }
  }

  return {
    redirect : {
      permanent : false,
      destination : "/login",
    }
  }
}

function IndexPage(loged) {
  if (!loged){
    return (<>Loading...</>)
  }
  
  return <Layout_DashBoard></Layout_DashBoard>
}

export default IndexPage