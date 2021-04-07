import React, { Suspense } from "react"
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import Loading from 'pages/Loading';
import { TopNav } from "components/navigation";

// pages
const SearchPage = React.lazy(() =>
  import('pages/Search').then((module) => ({
      default: module.default,
  }))
)

const PublicPages: React.FC = () => {
  const history = useHistory();
  console.log('[client/src/routes/Main.routes.tsx] history.location: ', history.location)
  return (
  <Suspense fallback={<Loading />}>
    <TopNav />
      <Switch>
        <Route exact path="/app/search" component={SearchPage} />
        <Route exact path="/app/upload" component={SearchPage} />
          <Redirect to="/app/search" />
      </Switch>
  </Suspense>
)}

export default PublicPages