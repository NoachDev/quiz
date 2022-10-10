import { createGlobalStyle, ThemeProvider} from 'styled-components'
import React, {createContext} from 'react'
import { SSRProvider } from 'react-bootstrap'
import { SessionProvider } from "next-auth/react"

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

const GlobalStyle = createGlobalStyle`
  body {
    background: ${props => props.theme.bg};
    color     : ${props => props.theme.fg};
  }
`
export const theme_cnt = createContext(null)

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  const [theme_profile, set_theme] =  React.useState("light")

  const theme = {
    dark: {
      bg            : "#202020",
      fg            : "#ffffff",
      complement     : "#303030",
    },
    
    light:{
      bg            : "#ffffff",
      fg            : "#121212",
      complement     : "#efefef",
      
    }
  }

  React.useEffect(() => {set_theme(localStorage.getItem("theme_") || "light")})
  
  return (
    <SessionProvider session={session}>
      <SSRProvider>
        <theme_cnt.Provider value = {[theme_profile, set_theme]}>
          <ThemeProvider theme={theme[theme_profile]}>
            <GlobalStyle/>
            <Component {...pageProps} />
          </ThemeProvider>
        </theme_cnt.Provider>
      </SSRProvider>
    </SessionProvider>
  )
}
