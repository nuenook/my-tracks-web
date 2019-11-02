import * as React from 'react';
import firebaseApp from '../firebase';

export const AuthContext = React.createContext({
    currentUser: "",
    clearCurrentUser: () => {}
})

 
const AuthContextProvider: React.SFC = ({ children }) => {
    const [currentUser, setCurrentUser] = React.useState("")

    React.useEffect(() => {
        const unsubFirebaseAuth = firebaseApp.auth().onAuthStateChanged(user => {
            if(user) {
                setCurrentUser(user.email ? user.email : "")
            }
        });
        return () => {
            unsubFirebaseAuth()
        }
    }, []);

    return (
        <AuthContext.Provider value={{
            currentUser,
            clearCurrentUser: () => setCurrentUser("")
        }}>
            {children}
        </AuthContext.Provider>
    );
}
 
export default AuthContextProvider;