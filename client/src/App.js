
import React from "react";
import {BrowserRouter, Switch, Route, Redirect, Link} from 'react-router-dom';
import {FileFormList, FileSelector} from './components/Upload';
import Search from './components/Search'
import {TopNav} from './components/navigation';

const App = () => {
  const Upload = () => (
    <>
      <FileFormList />
      <FileSelector />
    </>
  )

  const routes = (
    <Switch>
      <Route path="/search" component={Search} /> 
      <Route path="/upload" component={Upload} />
      <Redirect to="/search" />
    </Switch>
  )

  return (
    <BrowserRouter>
      <TopNav />
        {routes}
      {/* Bottom Nav */}
    </BrowserRouter>
  );
}

export default App;
