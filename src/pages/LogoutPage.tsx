import * as React from 'react';
import { AuthContext } from "../route/AuthRoute";
import firebaseApp from "../firebase"

export interface LogoutPageProps {
    
}
 
const LogoutPage: React.SFC<LogoutPageProps> = () => {

    const [isLoading, setLoading] = React.useState(false)
    const currentUser = React.useContext(AuthContext);

    React.useEffect(() => {

        if(currentUser) {
            setLoading(true)
            firebaseApp.auth().signOut().then(response => {
                setLoading(false)
              })
        }

    },[])
    return (
        <>
            {isLoading? <h2 className="text-center">logout...</h2>
            :<h1 className="text-center">Bye bye :3</h1>
            }
        </>
    );
}
 
export default LogoutPage;