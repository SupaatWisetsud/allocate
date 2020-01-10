import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import axios from 'axios'
import { decode } from 'jsonwebtoken'
import style from './style'
import Sidebar from '../../view/Sidebar'
import { Spinner } from '../../component'
import { RequireWork } from './popup'


const GQL_Query = gql`
    query getData($id: ID!) {

        workorder(id: $id) {
            _id
            title
            deadline
            commander {
                firstname
                lastname
            }
        }
        report {
            _id
            title
            deadline
            path
            worker {
                firstname
                lastname
            }
        }
    }
`

const Report = ({ classes }) => {

    const {loading} = useQuery(GQL_Query, {
        variables: {
            id: decode(localStorage.getItem("nodeToken"))._doc._id
        },
        onCompleted: data => {
            setReport(data.report);
            setWork(data.workorder)
            
        }
    });

    const [report, setReport] = useState([]);
    const [user, setUser] = useState(false);
    const [isOpen, setIsOpen] = useState(false)
    const [work, setWork] = useState([])
    
    useEffect(() => {
        setUser(decode(localStorage.getItem("nodeToken"))._doc);
    }, []);

    const downloadFile = (filename) => {
        axios({
            url: `http://localhost:4000/upload/test.txt`,
            method: 'GET',
            responseType: 'blob', // important
        }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'test.txt');
            document.body.appendChild(link);
            link.click();
        });
    }
    return (
        <>
            {loading && <Spinner />}
            <RequireWork classes={classes} isOpen={isOpen} close={e => setIsOpen(false)} work={work} />
            <div className={classes.container}>
                <Sidebar />
                <div className={classes.content}>
                    <div className={classes.wrapper}>
                        <header className={classes.title}>
                            <span>งานทั้งหมด</span>
                            {user.status === "admin" && <button onClick={e => setIsOpen(true)}>งานที่สั่ง</button>}
                        </header>
                        <table>
                            <thead>
                                <tr>
                                    <td>No.</td>
                                    <td>หัวข้อ</td>
                                    <td>คนรับทำ</td>
                                    <td>เวลาส่ง</td>
                                    <td>รายละเอียดงาน</td>
                                    <td>ไฟล์</td>
                                </tr>
                            </thead>
                            <tbody>
                                {report.map(n => (
                                    <tr key={n._id} >
                                        <td> {n._id} </td>
                                        <td>{n.title}</td>
                                        <td>{n.worker.firstname} {n.worker.lastname}</td>
                                        <td> {n.deadline === null ? "ไม่มีกำหนด" : n.w_deadline} </td>
                                        <td>
                                            <button >เปิด</button>
                                        </td>
                                        <td>
                                            {/* <button onClick={e => downloadFile(n.w_path)} > {n.path}</button> */}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}


export default style(Report)