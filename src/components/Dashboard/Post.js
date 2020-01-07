import React from 'react'

export default ({ classes, data }) => (
    <div className={classes.post}>
        <div className={classes.postHeader}>
            <p>คุณ : {data.m_firstname} {data.m_lastname} </p>
            <p>สถานะ : {data.w_status === "proceed"? "รับงาน":"ส่งงาน"} </p>
        </div>
        <div className={classes.postBody}>
            <p>เรื่อง : {data.w_title} </p>
            <p>รายละเอียด : {data.w_detail === ""? "ไม่มี":data.w_detail} </p>
        </div>
        <div className={classes.postFooter}>
            <p> {data.w_datestatus} </p>
        </div>
    </div>
)