import * as React from 'react';

export interface NavBarsProps {
    
}
 
const NavBars: React.SFC<NavBarsProps> = () => {
    return ( 
        <nav className="navbar navbar-light bg-light">
            <a className="navbar-brand" href="#">My Tracks</a>
        </nav>
    );
}
 
export default NavBars;