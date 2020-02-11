import React, { useEffect, useState } from 'react'
import { decode } from 'jsonwebtoken';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import style from './style'
import { Detail } from '../../component'
import { RequireWork } from './popup'
import Axios from 'axios';
import Time from 'react-time-format'

const GQL_Query = gql`
    query getData($id: ID!) {
        workorder(id: $id) {
            _id
            title
            deadline
            detail
            commander {
                firstname
                lastname
            }
            worker {
                firstname
                lastname
            }
            status
        }
        report {
            _id
            title
            deadline
            detail
            path
            worker {
                firstname
                lastname
            }
        }
    }
`

const Report = ({ classes, data }) => {

    const [report, setReport] = useState([]);
    const [user, setUser] = useState(false);
    const [isOpen, setIsOpen] = useState(false)
    const [work, setWork] = useState([]);
    const [detail, setDetail] = useState({ data: {}, status: false });

    const { data: dataReport, loading, refetch } = useQuery(GQL_Query, {
        variables: {
            id: decode(localStorage.getItem("nodeToken"))._doc._id
        }
    });

    useEffect(() => {
        refetch();
        if (dataReport) {
            setReport(dataReport.report);
            setWork(dataReport.workorder);

        }
        setUser(decode(localStorage.getItem("nodeToken"))._doc);

    }, [dataReport, refetch]);

    const downloadFile = (filename) => {
        Axios({
            url: `http://localhost:5000/upload/${filename}`,
            method: 'GET',
            responseType: 'blob', // important
        }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();
        });
    }
    return (
        <>
            {detail.status && <Detail data={detail.data} close={e => setDetail({ data: {}, status: false })} />}
            <RequireWork classes={classes} isOpen={isOpen} close={e => setIsOpen(false)} work={work} />
            <div className={classes.wrapper}>
                <header className={classes.title}>
                    <span>งานทั้งหมด</span>
                    {user.status === "admin" && <button onClick={e => setIsOpen(true)} className={classes.btnOrder}>งานที่สั่ง</button>}
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

                        {report.map((n, i) => (
                            <tr key={n._id} >
                                <td> {i + 1} </td>
                                <td>{n.title}</td>
                                <td>{n.worker.firstname} {n.worker.lastname}</td>
                                <td> {n.deadline ? <Time value={n.deadline} format="DD/MM/YYYY" /> : "ไม่มีกำหนด"} </td>

                                <td>
                                    <button onClick={e => setDetail({ data: n, status: true })} className={classes.btn} >เปิด</button>
                                </td>
                                <td>
                                    {n.path.map(p => <p key={p} style={{ border: "1px solid #333", cursor: "pointer" }} onClick={e => downloadFile(p)} >{p}</p>)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {loading && <p>loading...</p>}
            </div>
        </>
    )
}


export default style(Report)