import React, { useState } from 'react'
import { Modal } from '../../../component'
import { Detail } from '../../../component';
import Time from 'react-time-format'

export const RequireWork = ({ classes, isOpen, close, work }) => {

    const [detail, setDetail] = useState({ data: {}, status: false });

    return (
        <Modal isOpen={isOpen} >
            {!detail.status ?
                <React.Fragment>
                    <div className={classes.header}>
                        <p>งานที่สั่ง</p>
                        <button onClick={close} className={classes.btnClose}>ปิด</button>
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
                            {work.map((n, i) => (
                                <tr key={n._id}>
                                    <td>{i + 1}</td>
                                    <td>{n.title}</td>
                                    <td>{n.worker.firstname} {n.worker.lastname}</td>
                                    <td>{n.deadline ? <Time value={n.deadline} format="DD/MM/YYYY" /> : "ไม่มีกำหนด"}</td>
                                    <td>
                                        {n.status === "send" && "รอรับ"}
                                        {n.status === "proceed" && "กำลังดำเนินการ"}
                                        {n.status === "success" && "เสร็จสิ้น"}
                                    </td>
                                    <td>
                                        <button onClick={e => setDetail({ data: n, status: true })} className={classes.btn}>เปิด</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </React.Fragment>
                :
                <Detail data={detail.data} close={e => setDetail({ data: {}, status: false })} />
            }

        </Modal>
    )
}
