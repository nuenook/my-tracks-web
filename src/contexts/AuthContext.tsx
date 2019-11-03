import * as React from 'react';
import firebaseApp from '../firebase';

export const AuthContext = React.createContext({
    currentUser: "",
    uid: "",
    clearCurrentUser: () => {}
})

 
const AuthContextProvider: React.SFC = ({ children }) => {
    const [currentUser, setCurrentUser] = React.useState("")
    const [userId, setUserId] = React.useState("")

    React.useEffect(() => {
        const unsubFirebaseAuth = firebaseApp.auth().onAuthStateChanged(user => {
            if(user) {

                setUserId(user.uid)
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
            uid: userId,
            clearCurrentUser: () => setCurrentUser("")
        }}>
            {children}
        </AuthContext.Provider>
    );
}
 
export default AuthContextProvider;