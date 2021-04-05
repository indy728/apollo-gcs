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
                <Route exact path="/auth" component={AuthPage} />
                <Redirect to="/auth" />
            </Switch>
        </Suspense>
    )
}

export default PublicPages