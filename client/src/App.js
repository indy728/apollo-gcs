
import React from "react";
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import {createGlobalStyle, ThemeProvider} from 'styled-components'
import {FileFormList, FileSelector} from './components/Upload';
import Search from './components/Search'
import AuthPage from './components/Auth'
import {TopNav} from './components/navigation';

const theme = {
  background: {
    black: '#000000',
    dark0: '#0c0032',
    dark1: '#190061',
    dark2: '#240090',
    dark3: '#3500d3',
    grey: '#282828',
  },
  text: {
    white: '#fffaff',
    grey: 'c8c8c8',
  }
}

const GlobalStyle = createGlobalStyle`

    * { 
        margin: 0;
        padding: 0;
        color: ${theme.text.white};
        font-family: 'Source Sans Pro', sans-serif !important;
    }
    *,
    *::after,
    *::before {
        box-sizing: inherit;
        -moz-box-sizing: inherit; 
        -webkit-box-sizing: inherit;
    }
    html {
        box-sizing: border-box;
        font-size: 62.5%;
    }
    body {
        background: ${theme.background.black};
        min-height: 100vh;
    }

    @media (min-width: 760px) {
      html {
        font-size: 100%;
      }
    }
`;

 /* font-family: ${({ theme }) => theme.fonts.primary};
        font-size: ${({ theme }) => theme.mobile.base};
        
        h1 {
            font-size: ${({ theme }) => theme.mobile.header};
            text-align: center;
        }
        h2 {
            font-size: ${({ theme }) => theme.mobile.subheader}
        }
        @media (min-width: ${({ theme }) => theme.media.tablet}) {
            font-size: ${({ theme }) => theme.tablet.base};
        
            h1 {
                font-size: ${({ theme }) => theme.tablet.header};
                text-align: center;
            }
            h2 {
                font-size: ${({ theme }) => theme.tablet.subheader}
            }
        }
        @media (min-width: ${({ theme }) => theme.media.desktop}) {
            font-size: ${({ theme }) => theme.desktop.base};
        
            h1 {
                font-size: ${({ theme }) => theme.desktop.header};
                text-align: center;
            }
            h2 {
                font-size: ${({ theme }) => theme.desktop.subheader}
            }
        }
    }
    h1, h2, h3, h4, h5, h6 {
        font-family: ${({ theme }) => theme.fonts.header};
        font-weight: 300;
        text-transform: uppercase;
    } */


const App = () => {
  const Upload = () => (
    <>
      <FileFormList />
      <FileSelector />
    </>
  )

  let routes = (
    <Switch>
      <Route path="/auth" component={AuthPage} />
      <Redirect to="/auth" />
    </Switch>
  )

  if (1 === 1) {
    routes = (
      <>
      <TopNav />
      <Switch>
        <Route path="/search" component={Search} /> 
        <Route path="/upload" component={Upload} />
        <Redirect to="/search" />
      </Switch>
    </>
  )
}

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
          {routes}
        {/* Bottom Nav */}
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
