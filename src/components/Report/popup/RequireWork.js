import React, { useState } from 'react'
import { Modal } from '../../../component'


export const RequireWork = ({ classes, isOpen, close, work }) => {
    
    const [togle, setTogle] = useState(true)
    const [detail, setDetail] = useState({})

    return (
        <Modal isOpen={isOpen} >
            {togle ?
                <React.Fragment>
                    <div className={classes.titleWork}>
                        <p>งานที่สั่ง</p>
                        <button onClick={close}>ปิด</button>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <td>No.</td>
                                <td>หัวข้อ</td>
                                <td>คนรับ</td>
                                <td>เวลาหมดกำหนด</td>
                                <td>สถานะ</td>
                                <td>รายละเอียด</td>
                            </tr>
                        </thead>
                        <tbody>
                            {work.map(n => (
                                <tr key={n.w_id}>
                                    <td>{n.w_id}</td>
                                    <td>{n.w_title}</td>
                                    <td>{n.m_firstname} {n.m_lastname}</td>
                                    <td>{n.w_deadline}</td>
                                    <td>รอรับ</td>
                                    <td>
                                        <button onClick={e => { setDetail(n); setTogle(false) }} >เปิด</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </React.Fragment>
                :
                <React.Fragment>
                    <div>
                        <button onClick={e => setTogle(true)} >กลับ</button>
                        <p>รายละเอียด</p>
                    </div>
                    <div>
                        <p>ถึงคุณ : {detail.m_firstname} {detail.m_lastname} </p>
                    </div>
                    <div>
                        <p>หัวเรื่อง : {detail.w_title}</p>
                        <p>รายละเอียด : {detail.w_detail}</p>
                        <p>กำหนดส่ง : {detail.w_deadline}</p>
                    </div>
                </React.Fragment>
            }

        </Modal>
    )
}
