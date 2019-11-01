import React, { useState } from 'react';
import firebaseApp from '../firebase';
import { useHistory } from "react-router-dom";


export interface LoginPageProps {
}

const LoginPage: React.SFC<LoginPageProps> = () => {
    let history = useHistory();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const handleLogin = async (event: any) => {
        event.preventDefault();

        try {
            await firebaseApp
                .auth()
                .signInWithEmailAndPassword(email, password);
            history.push("/");

        } catch (error) {
            console.log("error auth: ", error)
            alert(error);

        }
    }
    return (
        <>
            <h1 className="text-center">Log in</h1>
            <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-6">
                    <form onSubmit={handleLogin}>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Email address</label>
                            <input type="email"
                                className="form-control"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                                placeholder="Enter email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Password</label>
                            <input type="password"
                                className="form-control"
                                id="exampleInputPassword1"
                                placeholder="Password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default LoginPage;