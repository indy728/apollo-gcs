import React, { Suspense } from "react"
import { Switch, Route, Redirect } from "react-router-dom";
import Loading from 'pages/Loading';
import { TopNav } from "components/navigation";

// pages
const SearchPage = React.lazy(() =>
  import('pages/Search').then((module) => ({
      default: module.default,
  }))
)

const LogoutPage = React.lazy(() =>
  import('pages/Logout').then((module) => ({
      default: module.default,
  }))
)

const PublicPages: React.FC = () => {
    return (
        <Suspense fallback={<Loading />}>
          <TopNav />
            <Switch>
              <Route exact path="/app/search" component={SearchPage} />
              <Route exact path="/app/upload" component={SearchPage} />
              <Route exact path="/logout" component={LogoutPage} />
                <Redirect to="/app/search" />
            </Switch>
        </Suspense>
    )
}

export default PublicPages