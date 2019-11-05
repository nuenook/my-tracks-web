import * as React from 'react';
import { Route, Redirect } from "react-router-dom";

import { AuthContext } from "../contexts/AuthContext";

import {IRoute} from '../route';

export interface PrivateRouteProps extends IRoute { }
 
const PrivateRoute: React.SFC<PrivateRouteProps> = ({
    component: RouteComponent,
    ...rest
}) => {
    const {currentUser, loading} = React.useContext(AuthContext);

    console.log("currentUser ", currentUser)

    return (
        <Route
            {...rest}
            render={routeProps =>
                loading ? <p>auth checking...</p> :
                !!currentUser ? (
                  <RouteComponent {...routeProps} />
                ) : (
                  <Redirect to={"/login"} />
                )
              }
        />
    );
}
 
export default PrivateRoute;