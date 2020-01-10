import React, { useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { Spinner } from '../../component'
import {RequireWork} from './popup';

const LIST_EMP = gql`
    {
        users {
            _id
            username
            firstname
            lastname
            email
            phone
            img
        }
    }
`
export default ({ classes, toggle }) => {

    const { loading } = useQuery(LIST_EMP, {
        onCompleted: data => {
            setEmp(data.users)
        }
    })
    
    const [emp, setEmp] = useState([])
    const [data, setData] = useState({})
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            {loading && <Spinner /> }
            <div className={classes.wrapper}>
                {isOpen && <RequireWork classes={classes} data={data} close={e=>setIsOpen(false)} />}
                <header className={classes.title}>
                    <span>รายชื่อพนักงาน</span>
                    <button onClick={toggle} >เพิ่มพนักงาน</button>
                </header>
                <table>
                    <thead>
                        <tr>
                            <td>No.</td>
                            <td>Name</td>
                            <td>email</td>
                            <td>Profile</td>
                            <td>Number Phone</td>
                            <td>Work</td>
                            <td>Delete</td>
                        </tr>
                    </thead>
                    <tbody>
                        {emp.map((n, i)=> (
                            <tr key={n._id}>
                                <td>{i+1}</td>
                                <td> {n.firstname} {n.lastname} </td>
                                <td> {n.email} </td>
                                <td> {n.phone} </td>
                                <td>
                                    <img src="logo192.png" alt=".." width={80} height={80} style={{ borderRadius: "50%", objectFit: "cover" }} />
                                </td>
                                <td>
                                    <button onClick={e=>{
                                        setData(n)
                                        setIsOpen(true)
                                    }} >สั่งงาน</button>
                                </td>
                                <td>
                                    <button>ลบ</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}
