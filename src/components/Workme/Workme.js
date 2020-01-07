import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { decode } from 'jsonwebtoken'
import style from './style'
import Sidebar from '../../view/Sidebar'
import { Spinner } from '../../component'

const GETWORKME = gql`
    query getWorkme($id: ID!){
        workme(id: $id){
            w_id
            w_title
            m_firstname
            m_lastname
            w_deadline
        }
    }
`

const Workme = ({ classes }) => {

    const { data, loading } = useQuery(GETWORKME, {
        variables: {
            id: decode(localStorage.getItem("nodeToken"))[0].m_id
        }
    })
    const [Workme, setWorkme] = useState([])

    useEffect(() => {
        if(data !== undefined) setWorkme(data.workme);
    }, [data])

    return (
        <>
            {loading && <Spinner />}
            <div className={classes.container}>
                <Sidebar />
                <div className={classes.content}>
                    <div className={classes.wrapper}>
                        <header className={classes.title}>
                            <span>งานที่กำลังดำเนินการ</span>
                            <button>งานใหม่</button>
                        </header>
                        <table>
                            <thead>
                                <tr>
                                    <th>No.</th>
                                    <th>ชื่อเรื่อง</th>
                                    <th>สั่งโดย</th>
                                    <th>กำหนดส่ง</th>
                                    <th>รายละเอียด</th>
                                    <th>ส่งงาน</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Workme.map(n => (
                                    <tr key={n.w_id} >
                                        <td> {n.w_id} </td>
                                        <td>{n.w_title}</td>
                                        <td>{n.m_firstname} {n.m_lastname}</td>
                                        <td> {n.w_deadline} </td>
                                        <td>
                                            <button>เปิด</button>
                                        </td>
                                        <td>
                                            <button>ส่งงาน</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}


export default style(Workme)