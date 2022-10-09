import { getSession } from "next-auth/react"

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
      has_login: "test gsp",
    },
  }
}

function IndexPage({ has_login }) {
  return ( <>{has_login}</> )
}

export default IndexPage