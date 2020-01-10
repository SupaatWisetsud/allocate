import React from 'react'

export default ({ classes, data }) => (
    <div className={classes.post}>
        <div className={classes.postHeader}>
            <p>คุณ : {data.worker.firstname} {data.worker.lastname} </p>
            <p>สถานะ : {data.status === "proceed"? "รับงาน":"ส่งงาน"} </p>
        </div>
        <div className={classes.postBody}>
            <p>เรื่อง : {data.title} </p>
            <p>รายละเอียด : {data.detail === ""? "ไม่มี":data.detail} </p>
        </div>
        <div className={classes.postFooter}>
            <p> {data.datestatus} </p>
        </div>
    </div>
)