
import React, {useEffect, useState} from "react";
import {BrowserRouter, Switch, Route, Redirect, useHistory} from 'react-router-dom';
import {createGlobalStyle, ThemeProvider} from 'styled-components'
import Upload from './components/Upload';
import Search from './components/Search';
import AuthPage from './pages/Auth'
import {TopNav} from './components/navigation';
import { ApolloProvider } from "@apollo/client";
import { client } from "./apollo";
import {useSelector, useDispatch} from 'react-redux';
import {actions} from 'store/slices';
import {useLogoutMutation, useMeQuery} from 'generated/graphql';
import {RolesEnum} from 'global';
import Loading from 'pages/Loading';

const {setAccessToken} = actions

const Logout = () => {
  const [logout] = useLogoutMutation();

  useEffect(() => {

    const handleLogout = async() => {

      try {
        await logout();
        // setAccessToken('');
        localStorage.setItem('token', '')
        await client.resetStore();
      } catch (err) {
        console.log(err.message)
      }
    }

    handleLogout();
    // logout();
    // dispatch(setAccessToken(""))
    // client.resetStore();
  }, []);

  return <div>...logging out</div>
}

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
  const dispatch = useDispatch();
  const history = useHistory();
  const {loading, data, error} = useMeQuery({
    fetchPolicy: 'network-only'
  });
  const me = data?.me || null;
  // let jwt = useSelector(state => state.accessToken.value)
  let jwt = ''
  if (!jwt.length) jwt = localStorage.getItem('token') || ''

  console.log('[client/src/App.js] jwt: ', jwt)

  if (error) {
    console.log('[client/src/App.js] error.message: ', error.message)
  }

  useEffect(() => {
    console.log('[client/src/App.js] useEffect history: ', history);
  }, [history])

  useEffect(() => {
    // @TODO: change from localhost
    fetch('http://localhost:4000/refresh_token', {
      method: 'POST',
      credentials: 'include'
    }).then(async x => {
      const {accessToken} = await x.json();
      setPageLoading({
        loading: false, error: false
      })
      localStorage.setItem('token', accessToken)
      dispatch(setAccessToken(accessToken))
    }).catch((e) => {
      console.log('[App] e: ', e)
      localStorage.setItem('token', '');
      setPageLoading({
        loading: false, error: true
      })
    });
  }, []);

  let routes = (
    <Switch>
      <Route path="/auth" component={AuthPage} />
      <Redirect to="/auth" />
    </Switch>
  )

  // @TODO: Create Loading Screen
  if (pageLoading.loading) routes = <Loading />

  if (me) {
    routes = (
      <>
      <TopNav />
      <Switch>
        <Route path="/search" component={Search} /> 
        {
          RolesEnum[me.role] >= RolesEnum['CONTRIBUTOR'] &&
            <Route path="/upload" component={Upload} />
        }
        <Route path="/logout" component={Logout} />
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

