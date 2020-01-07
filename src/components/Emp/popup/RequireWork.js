import React from 'react'
import { Modal } from '../../../component'

export const RequireWork = ({ classes, data, close }) => {
    return (
        <Modal isOpen={true} >
            <div className={classes.titleJobCard} >
                <p>สั่งงาน</p>
                <p>ถึงคุณ : {data.m_firstname} {data.m_lastname} </p>
            </div>
            <div className={classes.wrapperJobCardForm}>
                <form>
                    <div>
                        <p>หัวข้อเรื่อง</p>
                        <input type="text" required />
                    </div>
                    <div>
                        <p>รายละเอียด</p>
                        <textarea cols="30" rows="10"></textarea>
                    </div>
                    <div>
                        <p>เวลาส่ง</p>
                        <input type="date" name="date" />
                    </div>
                    <div>
                        <button type="submit">สั่งงาน</button>
                        <button onClick={e=>{e.preventDefault(); close()}}  >ยกเลิก</button>
                    </div>
                </form>
            </div>
        </Modal>
    )
}
