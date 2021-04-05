import React, { Suspense } from "react"
import { Switch, Route, Redirect } from "react-router-dom";
import Loading from 'pages/Loading';

// pages
const AuthPage = React.lazy(() =>
    import('pages/Auth').then((module) => ({
        default: module.default,
    }))
)

const PublicPages: React.FC = () => {
    return (
        <Suspense fallback={<Loading />}>
            <Switch>
                <Route exact path="/search" component={AuthPage} />
                <Route exact path="/upload" component={AuthPage} />
                <Route exact path="/logout" component={AuthPage} />
                <Redirect to="/app/search" />
            </Switch>
        </Suspense>
    )
}

export default PublicPages