import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Modal } from '../../../component'
import { Detail } from '../../../component';

const UPDATEWORK = gql`
    mutation workme($id: ID!, $status: String!){
        workme(id: $id, status: $status)
    }
`;
export const Newwork = ({ classes, close, data, refetch }) => {

    const [detail, setDetail] = useState({ data: {}, status: false });
    
    const [mutationUpdateWork] = useMutation(UPDATEWORK);

    const workConFrim = async (id) => {
        
        await mutationUpdateWork({
            variables: {
                id,
                status: "proceed"
            }
        });
        refetch();
    }

    return (
        detail.status ?
            <Detail data={detail.data} close={e => setDetail({ data: {}, status: false })} />
            :
            <Modal isOpen={true} >
                <header className={classes.header} >
                    <span>งานใหม่</span>
                    <button onClick={close} >ปิด</button>
                </header>
                <table>
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>ชื่อเรื่อง</th>
                            <th>สั่งโดย</th>
                            <th>กำหนดส่ง</th>
                            <th>รายละเอียด</th>
                            <th>ส่งงาน</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((n, i) => (
                            n.status === "send" && <tr key={n._id} >
                                <td> {i + 1} </td>
                                <td>{n.title}</td>
                                <td>{n.commander.firstname} {n.commander.lastname}</td>
                                <td>
                                    {n.deadline || "ไม่มีกำหนด"}
                                </td>
                                <td>
                                    <button onClick={e => setDetail({ data: n, status: true })} >เปิด</button>
                                </td>
                                <td>
                                    <button onClick={e => workConFrim(n._id)} >รับ</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Modal>
    )
}
