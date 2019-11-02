import * as React from 'react';
import { Route, Redirect } from "react-router-dom";

import { AuthContext } from "./AuthRoute";


export interface PrivateRouteProps {
    component: any;
    exact?: boolean;
    path: string;
}
 
const PrivateRoute: React.SFC<PrivateRouteProps> = ({
    component: RouteComponent,
    ...rest
}) => {
    const currentUser = React.useContext(AuthContext);

    return (
        <Route 
            {...rest}
            render={routeProps =>
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