

import React from 'react';

import CreatePage from '../pages/CreatePage';
import HomePage from '../pages/HomePage';
import ReportPage from '../pages/ReportPage';
import LoginPage from '../pages/LoginPage';
import LogoutPage from '../pages/LogoutPage'

interface IRoute {
    component: React.FunctionComponent<any> | React.ComponentClass<any, any>;
    path: string;
    name: string;
    exact?: boolean;
    isPrivate?: boolean; 
}

const routes: IRoute[] = [
    {
        component: HomePage,
        path: "/",
        name: "Home",
        exact: true,
        isPrivate: true
    },
    {
        component: CreatePage,
        path: "/create",
        name: "Create",
        isPrivate: true
    },
    {
        component: ReportPage,
        path: "/report",
        name: "Report",
        isPrivate: true
    },
    {
        component: LoginPage,
        path: "/login",
        name: "Login"
    },
    {
        component: LogoutPage,
        path: "/logout",
        name: "Logout"
    },
    
]


export default routes