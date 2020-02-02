import React from 'react'
import style from './style';
import { Modal } from '../index'
import Time from 'react-time-format'

const Detail = ({ classes, data, close }) => {
    return (
        <Modal isOpen={true}>
            <div className={classes.close} >
                <button onClick={close} className={classes.btnClose}>ปิด</button>
            </div>
            <header className={classes.header}>
                <p>รายละเอียดงาน</p>
            </header>
            <div className={classes.div}>
                <p>เรื่อง : {data.title} </p>
            </div>
            <div className={classes.div}>
                <p>รายละเอียด : {data.detail}</p>
            </div>
            <div className={classes.div}>
                <p>เวลาที่กำหนดส่ง : {data.deadline? <Time value={data.deadline} format="DD/MM/YYYY" /> : "ไม่มีกำหนด"} </p>
            </div>
        </Modal>
    )
}

export default style(Detail);
