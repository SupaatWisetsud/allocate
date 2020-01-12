import React from 'react'
import Axios from 'axios'
import { decode } from 'jsonwebtoken'
import { Modal } from '../../../component'

export const RequireWork = ({ classes, data, close }) => {

    let title, detail, deadline;

    const _onSubmit = async e => {
        e.preventDefault();
        
        await Axios.post(`http://localhost:4000/api/addwork`, {
            title: title.value,
            detail: detail.value,
            deadline: deadline.value,
            worker: data._id,
            commander: decode(localStorage.getItem("nodeToken"))._doc._id
        })

        close();
    }

    return (
        <Modal isOpen={true} >
            <div className={classes.titleJobCard} >
                <p>สั่งงาน</p>
                <p>ถึงคุณ : {data.firstname} {data.lastname} </p>
            </div>
            <div className={classes.wrapperJobCardForm}>
                <form onSubmit={_onSubmit}>
                    <div>
                        <p>หัวข้อเรื่อง</p>
                        <input type="text" required ref={e => title = e} />
                    </div>
                    <div>
                        <p>รายละเอียด</p>
                        <textarea cols="30" rows="10" ref={e => detail = e}></textarea>
                    </div>
                    <div>
                        <p>เวลาส่ง</p>
                        <input type="date" name="date" ref={e => deadline = e} />
                    </div>
                    <div>
                        <button type="submit">สั่งงาน</button>
                        <button onClick={e => { e.preventDefault(); close() }}  >ยกเลิก</button>
                    </div>
                </form>
            </div>
        </Modal>
    )
}
