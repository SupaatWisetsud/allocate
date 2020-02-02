import React from 'react'
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { decode } from 'jsonwebtoken'
import { Modal } from '../../../component'

const ADDWROK = gql`
    mutation addwork($title: String!, $detail: String, $deadline: String, $worker: String!, $commander: String!){
        addwork(title: $title, detail: $detail, deadline: $deadline, worker: $worker, commander: $commander)
    }
`;
export const RequireWork = ({ classes, data, close }) => {

    const [mutationAddwork] = useMutation(ADDWROK);

    let title, detail, deadline;

    const _onSubmit = async e => {
        e.preventDefault();
        
        mutationAddwork({
            variables: {
                title: title.value,
                detail: detail.value,
                deadline: deadline.value,
                worker: data._id,
                commander: decode(localStorage.getItem("nodeToken"))._doc._id
            }
        })

        close();
    }

    return (
        <Modal isOpen={true} >
            <div className={classes.header} >
                <p>สั่งงาน</p>
                <p>ถึงคุณ : {data.firstname} {data.lastname} </p>
            </div>
            <div className={classes.divForm}>
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
                        <button type="submit" style={{marginRight: 5}} className={classes.btn}>สั่งงาน</button>
                        <button onClick={e => { e.preventDefault(); close() }} className={classes.btnClose} >ยกเลิก</button>
                    </div>
                </form>
            </div>
        </Modal>
    )
}
