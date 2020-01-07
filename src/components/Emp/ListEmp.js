import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { Spinner } from '../../component'
import {RequireWork} from './popup';

const LIST_EMP = gql`
    {
        users {
            m_id
            m_username
            m_firstname
            m_lastname
            m_email
            m_numberphone
            m_img
        }
    }
`
export default ({ classes, toggle }) => {

    const { data, loading } = useQuery(LIST_EMP)
    const [emp, setEmp] = useState([])
    const [id, setID] = useState({})
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        if(data !== undefined){
            setEmp(data.users)
        }
    }, [data])

    return (
        <>
            {loading && <Spinner /> }
            <div className={classes.wrapper}>
                {isOpen && <RequireWork classes={classes} data={id} close={e=>setIsOpen(false)} />}
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
                        {emp.map(n => (
                            <tr key={n.m_id}>
                                <td>{n.m_id}</td>
                                <td> {n.m_firstname} {n.m_lastname} </td>
                                <td> {n.m_email} </td>
                                <td> {n.m_numberphone} </td>
                                <td>
                                    <img src="logo192.png" alt=".." width={80} height={80} style={{ borderRadius: "50%", objectFit: "cover" }} />
                                </td>
                                <td>
                                    <button onClick={e=>{
                                        setID(n)
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
