import React from "react"
import ReactDOM from "react-dom"

function List_Qst({id}) {
  const [listquest, setquest] = React.useState([])

  React.useEffect(() => {
    fetch("http://localhost:3000/api/mongodb", {
      method : "POST",
      headers: {
        'content-type': 'application/json'
      },
    })
    .then(res => res.json()).then( k => {
      for (const name in k){
        const index = k[name];
        console.log(name);

        setquest(listquest.concat(<p key={index}>{name}</p>))
        
      }
    })
  }, [])
  return <div id={id}>{listquest}</div>
}

export default List_Qst