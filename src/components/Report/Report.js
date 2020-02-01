import React, { useEffect, useState } from 'react'
import { decode } from 'jsonwebtoken';
import Axios from 'axios'
import style from './style'
import { Spinner, Detail } from '../../component'
import { RequireWork } from './popup'

const Report = ({ classes, data }) => {

    const [report, setReport] = useState([]);
    const [user, setUser] = useState(false);
    const [isOpen, setIsOpen] = useState(false)
    const [work, setWork] = useState([]);
    const [loading, setLoading] = useState(false)
    const [detail, setDetail] = useState({ data : {}, status: false});

    useEffect(() => {
        const callAPI = async () => {
            setLoading(true);
            await Axios.get("http://localhost:4000/api/reports")
            .then(res => {
                setReport(res.data);
            })
            .catch(err => null)
            await Axios.get(`http://localhost:4000/api/workorders/${decode(localStorage.getItem("nodeToken"))._doc._id}`)
            .then(res => {
                setWork(res.data)
            })
            .catch(err=>null);
            setLoading(false);
        }
        callAPI();

        setUser(decode(localStorage.getItem("nodeToken"))._doc);
    }, []);

    const downloadFile = (filename) => {
        Axios({
            url: `http://localhost:4000/upload/${filename}`,
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
            {loading && <Spinner />}
            {detail.status && <Detail data={detail.data} close={e => setDetail({data:{}, status: false})} />}
            <RequireWork classes={classes} isOpen={isOpen} close={e => setIsOpen(false)} work={work} />
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
                                <td> {n.deadline || "ไม่มีกำหนด"} </td>
                                <td>
                                    <button onClick={ e => setDetail({data:n, status: true}) } >เปิด</button>
                                </td>
                                <td>

                                    {n.path.map(p => <p key={p} onClick={e => downloadFile(p)} >{p}</p>)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}


export default style(Report)