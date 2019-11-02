import * as React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import routes from '../../route';

import { AuthContext } from "../../route/AuthRoute";

export interface NavBarsProps {

}

const NavBars: React.SFC<NavBarsProps> = () => {
    let history = useHistory();

    const currentUser = React.useContext(AuthContext);


    const goTo = (path: string) => {
        history.push(path)
    }

    return (
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
            <Navbar.Brand onClick={() => goTo("/")}>My Tracks</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                </Nav>
                <Nav>
                    {currentUser && routes.filter(f => f.isPrivate).map(route => 
                        <Nav.Link key={route.path} onClick={() => goTo(route.path)}>
                            {route.name}
                        </Nav.Link>
                    )}
                    {currentUser ? (
                        <Nav.Link onClick={() => goTo('/logout')}>
                            Logout
                        </Nav.Link>) :
                        (<Nav.Link onClick={() => goTo('/login')}>
                            Login
                </Nav.Link>)
                    }
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavBars;