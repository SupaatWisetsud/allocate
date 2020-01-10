import React from 'react'
import { decode } from 'jsonwebtoken'
import { useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { Modal } from '../../../component'

const REQUIRE_WORK = gql`
    mutation add_work($title: String!, $detail: String, $deadline: String, $worker: String!, $commander: String!){
        addwork(
            title: $title,
            detail: $detail,
            deadline: $deadline,
            worker: $worker,
            commander: $commander
        )
    } 
`;
export const RequireWork = ({ classes, data, close }) => {

    const [add_work] = useMutation(REQUIRE_WORK)
    let title, detail, deadline;

    const _onSubmit = e => {
        e.preventDefault();
        
        add_work({
            variables: {
                title: title.value,
                detail: detail.value,
                deadline: deadline.value,
                worker: data._id,
                commander: decode(localStorage.getItem("nodeToken"))._doc._id
            }
        });
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
