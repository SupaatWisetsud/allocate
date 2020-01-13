import React from 'react'
import style from './style';
import { Modal } from '../index'

const Detail = ({ classes, data, close }) => {
    return (
        <Modal isOpen={true}>
            <div className={classes.close} >
                <button onClick={close} >ปิด</button>
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
                <p>เวลาที่กำหนดส่ง : {data.deadline} </p>
            </div>
        </Modal>
    )
}

export default style(Detail);
