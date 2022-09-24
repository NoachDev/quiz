import { useState } from "react";
import { Form, Button, Col, InputGroup, Row, Container } from "react-bootstrap"
import Layout_home from "../layouts/home"

function Login(){
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
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
          
          <Button size="sm" type="submit">Submit form</Button>

        </Form>
      </Container>
    </Layout_home>
}

export default Login