import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { Modal } from '../../../component'

const UPLOADFILE = gql`
    mutation uploadFile($file: Upload!){
        uploadfile(file: $file)
    }
`
export const Submit = ({ classes, close, data }) => {
    let upload, detailFile, file;

    const [uploadFileTodo, { loading }] = useMutation(UPLOADFILE);

    if (loading) {
        return (
            <Modal>
                <p>Loading...</p>
            </Modal>
        )
    }

    return (
        <Modal isOpen={true} >
            <div className={classes.sTitle}>
                <p>ส่งงาน</p>
            </div>
            <div className={classes.sContent}>
                <div>
                    <div>
                        <p>หัวข้อ : {data.w_title} </p>
                    </div>
                    <div>
                        <p>สั่งโดย : {data.m_firstname} {data.m_lastname} </p>
                    </div>
                    <div>
                        <p>รายละเอียด : {data.w_detail} </p>
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
                <button className={null} onClick={async e => {
                    await uploadFileTodo({ variables: { file } })
                        .then(res => {
                            close();
                        })
                }} >ส่ง</button>
                <button onClick={close} >ยกเลิก</button>
            </div>
        </Modal>
    )
}
