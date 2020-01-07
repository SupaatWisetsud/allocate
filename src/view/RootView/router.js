import {
    Editprofile,
    Emp,
    Dashboard,
    Login,
    Logout,
    Report,
    Workme
} from '../../components'

const router = [
    {
        title : "Dashboard",
        path: "/dashboard",
        status : "all",
        component : Dashboard,
        display: true
    },
    {
        title : "Edit Profile",
        path : "/editprofile",
        status : "all",
        component : Editprofile,
        display: true
    },
    {
        title : "Report",
        path : "/report",
        status : "all",
        component : Report,
        display: true
    },
    {
        title : "Emp",
        path : "/emp",
        status : "admin",
        component : Emp,
        display: true
    },
    {
        title : "Work Me",
        path : "/workme",
        status : "user",
        component : Workme,
        display: true
    },
    {
        title : "Login",
        path : "/login",
        status : "all",
        component : Login,
        display: false
    },
    {
        title : "Logout",
        path : "/logout",
        status : "all",
        component : Logout,
        display: true
    },
]

export default router