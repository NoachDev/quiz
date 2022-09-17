import React from "react"
import Place_ask from "../components/ask"
import Finish from "../components/finish";
import {ProgressBar, Button, Container, Row, Nav, Stack, Carousel} from "react-bootstrap"

function Layout_ask({ children }){
  const [index, setIndex]           = React.useState(0);
  const [progress   , set_progress] = React.useState(0)
  const [has_finish , set_finish  ] = React.useState(false)
  const [not_back , set_back  ]     = React.useState(true)

  // const qst_task = {ask_1 : "ask for anything", ask_2 : "ask for test or", ask_3 : "ask for test alg", ask_4 : "ask for test alg", ask_5 : "ask test for test object", ask_6 : "ask for test size"}
  
  const qst_task  = {ask_1 : "ask for anything", ask_2 : "ask for test or"}
  const qst_task2 = {ask_1 : "ask for test ask_2", ask_2 : "ask for test ask_2", ask_3 : "ask for change size"}

  const questions = [<Place_ask key = "test" {...qst_task}/>, <Place_ask key = "test_2" {...qst_task2}/>, <Finish/>]
  const value_app = 100 / (questions.length-1)

  // page_change(questions[0])
  
  function progress_change(next : boolean){
    if (next && index + 1 <= questions.length-1){
      setIndex(index+1)
    }
    else if (next == false && index - 1 >= 0){
      setIndex(index-1)
    }
  }

  React.useEffect(() => {
    if (progress >= 100){
      set_finish(true)
    }
    else[
      set_finish(false)
    ]

    if (index == 0){
      set_back(true)
    }
    else{
      set_back(false)
    }
    
    set_progress(index * value_app)
  })
  console.log();
  
  return<React.Fragment>
      <Container>
        <div style={{"height" : "3em"}}>
          <Nav className="d-flex h-100 justify-content-center align-items-center">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Config</Nav.Link>
          </Nav>
        </div>

        <ProgressBar now={progress} />

        <Row className="d-flex" style={{"height" : "85vh"}}>
          {/* <Place_ask {...qst_task}/> */}
          {/* {pages} */}

          <Carousel className="d-flex" activeIndex={index} interval={null} indicators={false} controls={false} style={{"height" : "90%"}}>
            {questions.map((k, index) => <Carousel.Item className="h-100" key={index}>{k}</Carousel.Item>)}
          </Carousel>

          <Stack direction="horizontal" gap={3} className="d-flex align-self-end justify-content-end">
            <Button variant="outline-danger" disabled={not_back} className="mr-10" onPointerUp={k => progress_change(false)}>{"< Back"}</Button>
            <div className="vr"/>
            <Button variant="primary" disabled={has_finish} onPointerUp={k => progress_change(true)}>{"Next >"}</Button>
          </Stack>

        </Row>

    </Container>

  </React.Fragment>
}


export default Layout_ask