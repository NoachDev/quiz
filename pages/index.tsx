import Layout_home 		from "../layouts/home"
import Head 					from 'next/head'
import React 					from "react"
import styled 				from "styled-components"
import { useRouter } 	from "next/router"

const Init_Page = styled.div`
	background 			: ${props => props.theme.fg};
	color 					: ${props => props.theme.bg};

	height 					: 18em		;
	text-align 			: center 	;
	display 				: flex		;
	flex-direction 	: column 	;
	padding		 			: 3em ;
	

	&>h1{
		margin-bottom : 1em;
	}
	

`
const Card_Base = styled.div`
	background 			: ${props => props.theme.fg};
	color 					: ${props => props.theme.bg};

	border-color 		: ${props => props.theme.complement};

	border-style 		: solid 		;

	height          : 10em    	;
  width           : 15em    	;
  
  border-radius  	: 0.8em   	;

	align-items 		: center		;
	justify-content	: center		;

	display 				: flex			;
	flex-direction	: column 		;

	position 				: relative	;




`
const Button_Open = styled.i`

	display 				: flex			;
	position 				: absolute	;

	align-self 			: end				;

	bottom 					: 0.6em			;
	margin-right		: 0.6em			;

	border-width 		: 0px 			;

	opacity 				: 0.2 			;		

	&:hover{
		opacity 			: 1 				;

	}

`
const Viwer			= styled.div`
	display 				: flex 			;

	flex-wrap				: wrap			;
	
	padding-top 		: 3em				;
	justify-content	: center		;

`

function Card({asks, router}){

	return <Card_Base>
		{asks}
		<Button_Open onClick={k => router.push(`/${asks}`)} className="bi bi-caret-right-fill"></Button_Open>
	</Card_Base>
}

function Home(){
	const [allcards, setcards] = React.useState([])
	const router = useRouter()

	const cards = []

	React.useEffect(() => {

		fetch("http://localhost:3000/api/MongoDb/all", {
			method : "GET",
			headers: {
				'content-type': 'application/json'
			},
		}).then(k => k.json()).then((k : Array<string>) => k.forEach((asks : string, index : number) => {
			cards.push(<Card router = {router} key = {index} asks = {asks}/>)
			
		})).then(k => setcards(cards))
	}, [])

	return (
    <div>
			<Head>
				<title>Questions</title>
				<link rel="preconnect" href="https://fonts.googleapis.com"></link>
			</Head>

			<Layout_home>
				<Init_Page>
					<h1>
						Aplication in react
					</h1>

					<h3>
						In Next Js with Styled Components , Bootstrap , Typescript
					</h3>
				</Init_Page>

				<Viwer>
					{allcards}
				</Viwer>

			</Layout_home>

    </div>
	)
}

export default Home