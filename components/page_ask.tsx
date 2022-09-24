import React, {Component} from "react"
import { ProgressBar, Row, Carousel, Stack, Button } from "react-bootstrap"
import Image from "next/image";

import cong from "../public/Congratulation.png"

class Place_ask extends Component<any>{
  render() : React.ReactNode {
    
    let elm_askor = this.props.ask.map((k, index) => create_ask(String(index), k))

    if (elm_askor.length > 1){
      let c_a = 1

      elm_askor.slice(0, elm_askor.length-1).map((k, index) => create_ask(`or${index}`, "or")).forEach((k, i) => {elm_askor.splice(i+c_a, 0, k)
      c_a += 1})
      
    }

    function create_ask(key : string, value : string){
      return <p key={key} className="text-center p-2">{value}</p>
    }

    return (
        <React.Fragment>
          <Row className="h-100 justify-content-center align-items-center">
            <div>
              {elm_askor}
            </div>
          </Row>
        </React.Fragment>
    );
  }
}

class Finish extends Component{
  
  render(): React.ReactNode {
    return <React.Fragment>
      <Row className="d-flex justify-content-center align-items-center" style={{"height" : "90%", }}>
        <Image src={cong} layout="intrinsic" height={""} width={""}></Image>
      </Row>
      
      <Row>
        <p className="text-center">
          thet is the end
        </p>
      </Row>

    </React.Fragment>
  }
}

function Page_ask(){
  const qst_task  = ["ask for anything",  "ask for test or"]
  const qst_task2 = ["ask for test ask_2", "ask for test ask_2", "ask for change size"]

  const questions = [<Place_ask key = "test" ask = {qst_task}/>, <Place_ask key = "test_2" ask = {qst_task2}/>, <Finish/>]
  const value_app = 100 / (questions.length-1)

  const [index, setIndex]           = React.useState(0);
  const [progress   , set_progress] = React.useState(value_app * index)
  const [has_finish , set_finish  ] = React.useState(false)
  const [not_back , set_back  ]     = React.useState(true)

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

  return (
    
    <>
    <ProgressBar now={progress} />

    <Row className="d-flex" style={{"height" : "85vh"}}>

      <Carousel className="d-flex" activeIndex={index} interval={null} indicators={false} controls={false} style={{"height" : "90%"}}>
        {questions.map((k, index) => <Carousel.Item className="h-100" key={index}>{k}</Carousel.Item>)}
      </Carousel>

      <Stack direction="horizontal" gap={3} className="d-flex align-self-end justify-content-end">
        <Button variant="outline-danger" disabled={not_back} className="mr-10" onPointerUp={k => progress_change(false)}>{"< Back"}</Button>
        <div className="vr"/>
        <Button variant="primary" disabled={has_finish} onPointerUp={k => progress_change(true)}>{"Next >"}</Button>
      </Stack>

    </Row>
  </>
  )
}

export default Page_ask