import React from 'react'
import Axios from 'axios';
import { decode } from 'jsonwebtoken';
import { Modal } from '../../../component'


export const Submit = ({ classes, close, data, setWorkme }) => {

    let upload, detailFile, file;

    const _onSubmitWork = async e => {

        const fd = new FormData();
        for (let n of file) fd.append("file", n);
        fd.append("id", data._id);
        
        await Axios.post("http://localhost:4000/api/uploadfile", fd, { headers : {
            "Content-Type" : "multipart/form-data"
        }})
        .catch(err=>null)

        await Axios.get(`http://localhost:4000/api/workemes/${decode(localStorage.getItem("nodeToken"))._doc._id}`)
        .then(res => {
            setWorkme(res.data)
        })
        .catch(err => null)

        close();
    }
    return (
        <Modal isOpen={true} >
            <div className={classes.sTitle}>
                <p>ส่งงาน</p>
            </div>
            <div className={classes.sContent}>
                <div>
                    <div>
                        <p>หัวข้อ : {data.title} </p>
                    </div>
                    <div>
                        <p>สั่งโดย : {data.commander.firstname} {data.commander.lastname} </p>
                    </div>
                    <div>
                        <p>รายละเอียด : {data.detail} </p>
                    </div>
                </div>
                <div>
                    <div
                        ref={e => upload = e}
                        className={classes.sBoxupload}
                        onDrop={e => {
                            e.preventDefault();
                            upload.style.backgroundColor = "#FFF";
                            file = e.dataTransfer.files
                            detailFile.innerHTML = "";
                            let tag;
                            for (let x of file) {
                                tag = document.createElement("p");
                                tag.innerText = x.name;
                                detailFile.appendChild(tag);
                            }
                        }}
                        onDragOver={e => {
                            e.preventDefault();
                            upload.style.backgroundColor = "#D6EAF8"
                        }}
                        onDragLeave={e => {
                            e.preventDefault();
                            upload.style.backgroundColor = "#FFF"
                        }}
                    >
                        Upload File
                    </div>
                    <div className={classes.sDetail} ref={e => detailFile = e} >
                    </div>
                </div>
            </div>
            <div className={classes.sSubmit} >
                <button className={null} onClick={_onSubmitWork} >ส่ง</button>
                <button onClick={close} >ยกเลิก</button>
            </div>
        </Modal>
    )
}
