import React, { useState, useEffect } from 'react'
import { decode } from 'jsonwebtoken';
import Axios from 'axios'
import style from './style'
import { Spinner, Detail } from '../../component'
import { Submit, Newwork } from './popup'

const Workme = ({ classes }) => {

    const [submit, setSubmit] = useState(false)
    const [workme, setWorkme] = useState([])
    const [select, setSelect] = useState({})
    const [newwork, setNewwork] = useState(false);
    const [loading, setLoading] = useState(false);
    const [detail, setDetail] = useState({data: {}, status: false});

    useEffect(() => {

        const callAPI = async () => {
            setLoading(true);
            await Axios.get(`http://localhost:4000/api/workemes/${decode(localStorage.getItem("nodeToken"))._doc._id}`)
            .then(res => {
                setWorkme(res.data)
            })
            .catch(err => null)
            setLoading(false);
        }
        callAPI();
    }, [])

    return (
        <>
            {loading && <Spinner />}
            {detail.status && <Detail data={detail.data} close={e => setDetail({data: {}, status: false})}  />}
            {submit && <Submit classes={classes} close={e => { setSubmit(false); setSelect({}) }} data={select} setWorkme={setWorkme} />}
            {newwork && <Newwork classes={classes} close={e => setNewwork(false)} data={workme} setWorkme={setWorkme} />}
            <div className={classes.wrapper}>
                <header className={classes.title}>
                    <span>งานที่กำลังดำเนินการ</span>
                    <button onClick={e => setNewwork(true)} >งานใหม่</button>
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
                        {workme.map((n, i) => {
                            let deadbtn = true;
                            if(n.deadline && n.status === "proceed"){
                                let dateNow = new Date(), dateDeadline = new Date(n.deadline);
                                deadbtn = dateNow < dateDeadline;
                            }
                            
                            return (
                                n.status === "proceed" && <tr key={n._id} >
                                    <td> {i + 1} </td>
                                    <td>{n.title}</td>
                                    <td>{n.commander.firstname} {n.commander.lastname}</td>
                                    <td> {n.deadline || "ไม่มีกำหนด"} </td>
                                    <td>
                                        <button onClick={e => setDetail({data: n, status: true})} >เปิด</button>
                                    </td>
                                    <td>
                                        {
                                        deadbtn?
                                        <button onClick={e => {
                                            setSubmit(true);
                                            setSelect(n)
                                        }} >ส่งงาน</button>
                                        :
                                        <p style={{color: "red"}}>หมดกำหนดส่ง</p>
                                        }
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}


export default style(Workme)