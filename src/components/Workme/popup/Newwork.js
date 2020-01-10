import React, { useState, useEffect } from 'react'
import { graphql } from 'react-apollo'
import { decode } from 'jsonwebtoken'
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost'
import { Modal } from '../../../component'

const UPDATE_WORK = gql`
    mutation updateStatuework($id: ID!, $status: String!){
        workme(id: $id, status: $status)
    }
`
const Newwork = ({close, workme}) => {
    
    const [updateWork] = useMutation(UPDATE_WORK);

    const [newWork, setNewwork] = useState([]);
    useEffect(()=>{
        if(workme) setNewwork(workme)
    }, [workme])
    return (
        <Modal isOpen={true} >
            <header >
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
                    {newWork.map((n, i) => (
                        <tr key={n._id} >
                            <td> {i + 1} </td>
                            <td>{n.title}</td>
                            <td>{n.commander.firstname} {n.commander.lastname}</td>
                            <td> {n.deadline} </td>
                            <td>
                                <button>เปิด</button>
                            </td>
                            <td>
                                <button onClick={e=>{
                                    updateWork({
                                        variables: {
                                            id: n._id,
                                            status: "proceed"
                                        },
                                        refetchQueries: ["getWorkme"]
                                    })
                                }} >รับ</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Modal>
    )
}

const NEWWORK = gql`
    query getWorkme($id: ID!, $status: String!){
        workme(id: $id, status: $status){
            _id
            title
            detail
            deadline
            status
            commander {
                firstname
                lastname
            }
        }
    }
`;

export default graphql(NEWWORK, {
    options: {
        variables: {
            id: decode(localStorage.getItem("nodeToken"))._doc._id,
            status: "send"
        },
    },
    props: ({ data }) => ({ ...data })
})(Newwork);
