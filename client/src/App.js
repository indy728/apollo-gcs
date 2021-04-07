
import React, {useEffect, useState} from "react";
import {BrowserRouter} from 'react-router-dom';
import {createGlobalStyle, ThemeProvider} from 'styled-components'
import { ApolloProvider } from "@apollo/client";
import { client } from "./apollo";
import {useDispatch} from 'react-redux';
import {Routes} from 'routes';
import {isAuth, setAuth, clearAuth} from 'my-util';


// const Logout = () => {
//   const [logout] = useLogoutMutation();

//   useEffect(() => {

//     const handleLogout = async() => {

//       try {
//         await logout();
//         // setAccessToken('');
//         localStorage.setItem('token', '')
//         await client.resetStore();
//       } catch (err) {
//         console.log(err.message)
//       }
//     }

//     handleLogout();
//     // logout();
//     // dispatch(setAccessToken(""))
//     // client.resetStore();
//   }, []);

//   return <div>...logging out</div>
// }

const theme = {
  primary: ['#0c0032', '#190061', '#240090', '#3500d3', '#282828'],
  secondary: ['#2E7358', '#11AB70', '#13BF7D', '#19F7A2', '#62F4BC'],
  compliment: ['#F2EDBD', '#F3E973', '#F2E768', '#E3D133', '#A8A040'],
  black: '#000000',
  white: '#fffaff',
  grey: 'grey',
  text: {
    primary: '#fffaff',
    secondary: '#11AB70',
    compliment: '#F3E973',
    alert: '#F2E768',
    error: '#D92158',
  },
  button: {
    primary: '#240090',
    secondary: '#11AB70',
    compliment: '#F3E973',
    cancel: '#AB3E5E',
    disabled: 'grey',
  },
  borderRadius: '.2rem',
  transition: 'all .1s linear',
  transform: {
    hover: {
      translate: 'translateY(-.05rem)',
      scale: 'scale(1.1)',
    },
    active: {
      translate: 'translateY(0)'
    },
  },
  font: {
    brand: "'Gugi', serif",
  }
}

const GlobalStyle = createGlobalStyle`

    * { 
        margin: 0;
        padding: 0;
        color: ${theme.text.primary};
        font-family: 'Source Sans Pro', sans-serif;
        font-weight: 400;
        letter-spacing: .7px;
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
        background: ${theme.black};
        min-height: 100vh;


      .ellipsis, input {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

    .brand-text {
      font-family: 'Gugi', serif;
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
  // const {loading, error, data} = useQuery(CHECK_AUTH);
  const [pageLoading, setPageLoading] = useState({
    loading: true,
    error: false,
  })

  useEffect(() => {
    // @TODO: change from localhost
    fetch('http://localhost:4000/refresh_token', {
      method: 'POST',
      credentials: 'include'
    }).then(async res => {
      const {accessToken} = await res.json();
      setAuth(accessToken);
      setPageLoading({
        loading: false, error: false
      })
      // dispatch(setAccessToken(accessToken))
    }).catch((refreshError) => {
      console.log('[client/src/App.js] refreshError: ', refreshError);
      clearAuth();
      setPageLoading({
        loading: false, error: true
      })
    });
  }, []);

  // @TODO: Create Loading Screen *** should be caught anyway
  // if (pageLoading.loading) routes = <Loading />

  // if (me) {
  //   routes = (
  //     <>
  //     <TopNav />
  //     <Switch>
  //       <Route path="/search" component={Search} /> 
  //       {
  //         RolesEnum[me.role] >= RolesEnum['CONTRIBUTOR'] &&
  //           <Route path="/upload" component={Upload} />
  //       }
  //       <Route path="/logout" component={Logout} />
  //       <Redirect to="/search" />
  //     </Switch>
  //   </>
  //   )
  // }

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
          {/* {routes} */}
          <Routes />
        {/* Bottom Nav */}
        {/* <TestCount /> */}
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

