import React, { useState, useEffect } from 'react'
import { RequireWork } from './popup';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost'

const LIST_EMP = gql`
    query list_emp {
        users {
            _id
            username
            firstname
            lastname
            email
            phone
            img
        }
    }
`;

const DELETE_EMP = gql`
    mutation delete_emp($id: ID!){
        deluser(id: $id)
    }
`;

export default ({ classes, toggle }) => {

    const [emp, setEmp] = useState([])
    const [data, setData] = useState({})
    const [isOpen, setIsOpen] = useState(false);

    const { data: datausers, loading, refetch } = useQuery(LIST_EMP);
    const [mutationDeleteEmp] = useMutation(DELETE_EMP);

    useEffect(() => {

        refetch();
        if (datausers) setEmp(datausers.users)

    }, [refetch, datausers])

    return (
        <>
            <div className={classes.wrapper}>
                {isOpen && <RequireWork classes={classes} data={data} close={e => setIsOpen(false)} />}
                <header className={classes.title}>
                    <span>รายชื่อพนักงาน</span>
                    <button onClick={toggle} className={classes.btnOrder}>เพิ่มพนักงาน</button>
                </header>
                <table>
                    <thead>
                        <tr>
                            <td>No.</td>
                            <td>ชื่อ</td>
                            <td>อีเมลล์</td>
                            <td>รูปโปรไฟล์</td>
                            <td>เบอร์โทรศศัพ</td>
                            <td>สั่งงาน</td>
                            <td>ลบ</td>
                        </tr>
                    </thead>
                    <tbody>

                        {emp.map((n, i) => (
                            <tr key={n._id}>
                                <td>{i + 1}</td>
                                <td> {n.firstname} {n.lastname} </td>
                                <td> {n.email} </td>
                                <td> {n.phone} </td>
                                <td>
                                    <img src={`http://localhost:5000${n.img}`} alt={n.email} width={80} height={80} style={{ objectFit: "cover" }} />
                                </td>
                                <td>
                                    <button onClick={e => {
                                        setData(n)
                                        setIsOpen(true)
                                    }} className={classes.btn}>สั่งงาน</button>
                                </td>
                                <td>
                                    <button onClick={async e => {
                                        await mutationDeleteEmp({
                                            variables: {
                                                id: n._id
                                            },
                                            refetchQueries: ["list_emp"]
                                        }).then(_ => alert("ลบสมาชิกเสร็จสิ้น"))
                                    }} className={classes.btnClose}>ลบ</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {loading && <p>Loading...</p>}
            </div>
        </>
    )
}
