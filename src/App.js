import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import { ThemeProvider, createGlobalStyle } from 'styled-components';

import 'semantic-ui-css/semantic.min.css';
import './App.css';

import { AuthProvider } from './context/auth';
import AuthRoute from './util/AuthRoute';

import MenuBar from './components/MenuBar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import SinglePost from './pages/SinglePost';

const GlobalStyle = createGlobalStyle `
body{
  background-color: ${props => 
    props.theme.mode === 'dark' ? '#111' : '#EEE'};
  color: ${props => 
    props.theme.mode === 'dark' ? '#EEE' : '#111'};
  }
}
`;
function App() {
  const [theme, setTheme] = useState({mode: 'light'})
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
    <AuthProvider>
      <Router>
        <Container>
          <MenuBar />
          <button onClick = {e => 
            setTheme(
              theme.mode === 'dark'
              ? { mode: 'light'}
              : { mode: 'dark'}
            )
          } >Press Me!</button>
          <Route exact path="/" component={Home} />
          <AuthRoute exact path="/login" component={Login} />
          <AuthRoute exact path="/register" component={Register} />
          <Route exact path="/posts/:postId" component={SinglePost} />
        </Container>
      </Router>
    </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
