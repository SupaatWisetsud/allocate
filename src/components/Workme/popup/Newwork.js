import React, { useState } from 'react'
import { Modal } from '../../../component'
import { decode } from 'jsonwebtoken';
import Axios from 'axios'
import { Detail } from '../../../component'

export const Newwork = ({ classes, close, data, setWorkme }) => {

    const [detail, setDetail] = useState({ data: {}, status: false });

    const workConFrim = async (id, status) => {
        await Axios.post(`http://localhost:4000/api/workme`, {
            id,
            status
        })
            .then(res => null)
            .catch(err => null)
        await Axios.get(`http://localhost:4000/api/workemes/${decode(localStorage.getItem("nodeToken"))._doc._id}`)
            .then(res => {
                setWorkme(res.data)
            })
            .catch(err => null)
    }

    return (
        detail.status ?
            <Detail data={detail.data} close={e => setDetail({ data: {}, status: false })} />
            :
            <Modal isOpen={true} >
                <header className={classes.header} >
                    <span>งานใหม่</span>
                    <button onClick={close} >ปิด</button>
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
                        {data.map((n, i) => (
                            n.status === "send" && <tr key={n._id} >
                                <td> {i + 1} </td>
                                <td>{n.title}</td>
                                <td>{n.commander.firstname} {n.commander.lastname}</td>
                                <td> 
                                    {n.deadline || "ไม่มีกำหนด"} 
                                </td>
                                <td>
                                    <button onClick={e => setDetail({ data: n, status: true })} >เปิด</button>
                                </td>
                                <td>
                                    <button onClick={e => workConFrim(n._id, "proceed")} >รับ</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Modal>
    )
}
