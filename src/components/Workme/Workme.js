import React, { useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { decode } from 'jsonwebtoken'
import style from './style'
import Sidebar from '../../view/Sidebar'
import { Spinner } from '../../component'
import { Submit, Newwork } from './popup'

const GETWORKME = gql`
    query getWorkme($id: ID!, $status: String!){
        workme(id: $id, status: $status){
            _id
            title
            detail
            deadline
            status
            commander {
                firstname
                lastname
            }
        }
    }
`

const Workme = ({ classes }) => {
    
    const { loading, refetch } = useQuery(GETWORKME, {
        variables: {
            id: decode(localStorage.getItem("nodeToken"))._doc._id,
            status: "proceed"
        },
        onCompleted: data => {
            setWorkme(data.workme);
        },
    });
    
    const [submit, setSubmit] = useState(false)
    const [workme, setWorkme] = useState([])
    const [select, setSelect] = useState({})
    const [newwork, setNewwork] = useState(false)

    return (
        <>
            {loading && <Spinner />}
            {submit && <Submit classes={classes} close={e=>{setSubmit(false); setSelect({})}} data={select} />}
            {newwork && <Newwork close={e=>setNewwork(false)} />}
            <div className={classes.container}>
                <Sidebar />
                <div className={classes.content}>
                    <button onClick={e => refetch()}>Refetch</button>
                    <div className={classes.wrapper}>
                        <header className={classes.title}>
                            <span>งานที่กำลังดำเนินการ</span>
                            <button onClick={e=>setNewwork(true)} >งานใหม่</button>
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
                                {workme.map((n, i) => (
                                    <tr key={n._id} >
                                        <td> {i+1} </td>
                                        <td>{n.title}</td>
                                        <td>{n.commander.firstname} {n.commander.lastname}</td>
                                        <td> {n.deadline} </td>
                                        <td>
                                            <button>เปิด</button>
                                        </td>
                                        <td>
                                            <button onClick={e => {
                                                setSubmit(true);
                                                setSelect(n)
                                            }} >ส่งงาน</button>
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