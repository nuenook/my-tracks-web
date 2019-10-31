import * as React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { useHistory } from "react-router-dom";

export interface NavBarsProps {

}

const NavBars: React.SFC<NavBarsProps> = () => {
    let history = useHistory();

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
                    <Nav.Link onClick={() => goTo('/create')}>
                        Create
                    </Nav.Link>

                    <Nav.Link eventKey={2} onClick={() => goTo('/report')}>
                        Report
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavBars;