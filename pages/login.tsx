import Layout_home                  from "../layouts/home"
import { getSession, signIn }       from "next-auth/react"
import React, { useState }          from "react";
import { Form, Button, Container }  from "react-bootstrap"
import { useRouter }                from "next/router";

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx)

  if (session){
    return {
      redirect : {
        permanent : false,
        destination : "/DashBoard",
      }
    }
  }
  return {
    props:{
      
    }
  }
}
function Login(){
  const [validated, setValidated] = useState(false);
  const router = useRouter()

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    else{
      const [ Name, Passwd ] = [form.validationCustom01.value, form.validationCustom02.value ]
      
      event.preventDefault()
      signIn("credentials", {redirect : false, username : Name, password: Passwd })
      router.push("/DashBoard")
    }
    
    setValidated(true);

    };

    return <Layout_home>
      <Container className = "d-flex justify-content-center pt-3">
        <Form noValidate validated={validated} onSubmit={handleSubmit} style={{width:"500px"}}>

          <Form.Group className = "mb-3" controlId="validationCustom01">
            <Form.Label>
            User Name
            </Form.Label>
            <Form.Control size="sm" required type="text" placeholder="User Name"/>
          </Form.Group>

          <Form.Group className = "mb-3" controlId="validationCustom02">
            <Form.Label>
            Password
            </Form.Label>
            <Form.Control size="sm" required type="text" placeholder="Password"/>
          </Form.Group>
          
          <Button size="sm" style = {{paddingInline : "1.3em"}} type="submit">Login</Button>

        </Form>
      </Container>
    </Layout_home>
}

export default Login