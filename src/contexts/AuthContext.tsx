import * as React from 'react';
import firebaseApp from '../firebase';

export const AuthContext = React.createContext({
    loading: false,
    currentUser: "",
    uid: "",
    clearCurrentUser: () => {}
})

 
const AuthContextProvider: React.SFC = ({ children }) => {
    const [currentUser, setCurrentUser] = React.useState("")
    const [userId, setUserId] = React.useState("")
    const [loading, setLoading] = React.useState(true)
    React.useEffect(() => {
        setLoading(true)
        const unsubFirebaseAuth = firebaseApp.auth().onAuthStateChanged(user => {
            if(user) {

                setUserId(user.uid)
                setCurrentUser(user.email ? user.email : "")
            }
            setLoading(false)
        });
        return () => {
            unsubFirebaseAuth()
        }
    }, []);

    return (
        <AuthContext.Provider value={{
            currentUser,
            uid: userId,
            loading: loading,
            clearCurrentUser: () => setCurrentUser("")
        }}>
            {children}
        </AuthContext.Provider>
    );
}
 
export default AuthContextProvider;