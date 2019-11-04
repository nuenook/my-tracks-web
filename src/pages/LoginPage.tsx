import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import { useHistory } from "react-router-dom";

import { signIn } from '../redux/actions/authActions';
import { ICred } from '../types/auth.type';


export interface LoginPageProps { }

export interface ILoginPageReduxDispatch {
    signIn: typeof signIn
}

export interface ILoginPageReduxState {
    auth: any;
}

const LoginPage: React.SFC<LoginPageProps & ILoginPageReduxState & ILoginPageReduxDispatch> = ({ auth, signIn }) => {
    let history = useHistory();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const handleLogin = async (event: any) => {
        event.preventDefault();

        signIn({ email, password })
    }

    useEffect(() => {
        if (auth.uid)
            history.push("/");

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [auth])

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

const mapStateToProps = (state: any) => {

    return {
        authError: state.auth.authError,
        auth: state.firebase.auth
    }
}
const mapDispatchToProps = (dispatch: any) => {
    return {
        signIn: (creds: ICred) => dispatch(signIn(creds))
    }
}

export default connect<ILoginPageReduxState, ILoginPageReduxDispatch, LoginPageProps>(mapStateToProps, mapDispatchToProps)(LoginPage);