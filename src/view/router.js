import {
    Editprofile,
    Emp,
    Dashboard,
    Login,
    Logout,
    Report,
    Workme
} from '../components'

const router = [
    {
        title : "หน้าหลัก",
        path: "/dashboard",
        status : "all",
        component : Dashboard,
        display: true
    },
    {
        title : "แก้ไขโปรไฟล์",
        path : "/editprofile",
        status : "all",
        component : Editprofile,
        display: true
    },
    {
        title : "รายงาน",
        path : "/report",
        status : "all",
        component : Report,
        display: true
    },
    {
        title : "สมาชิก",
        path : "/emp",
        status : "admin",
        component : Emp,
        display: true
    },
    {
        title : "งานของฉัน",
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
        title : "ออกจากระบบ",
        path : "/logout",
        status : "all",
        component : Logout,
        display: true
    },
]

export default router