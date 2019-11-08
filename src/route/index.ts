import CreateProjectPage from '../pages/CreateProjectPage';
import IndexPage from '../pages/IndexPage';
import ReportPage from '../pages/ReportPage';
import LoginPage from '../pages/LoginPage';
import LogoutPage from '../pages/LogoutPage'

export interface IRoute {
    component: any;
    path: string;
    name: string;
    exact?: boolean;
    isPrivate?: boolean; 
}

const routes: IRoute[] = [
    {
        component: IndexPage,
        path: "/",
        name: "Home",
        exact: true,
        isPrivate: true
    },
    {
        component: CreateProjectPage,
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