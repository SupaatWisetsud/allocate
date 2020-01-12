import React from 'react'
import Axios from 'axios';

const AddEmp = ({ classes, toggle }) => {

    let username, password, fname, lname, email, phone, status, file;

    const _onSubmit = e => {
        e.preventDefault();
        
        const fd = new FormData();
        
        fd.append("username", username.value);
        fd.append("password", password.value);
        fd.append("firstname", fname.value);
        fd.append("lastname", lname.value);
        fd.append("email", email.value);
        fd.append("phone", phone.value);
        fd.append("status", status.value);
        fd.append("file", file.files[0]);

        Axios.post(`http://localhost:4000/api/register`, fd, {headers: {
            "Content-Type" : "multipart/form-data"
        }})
        .then(res => null)
        .catch(err => null)
    }
    return (
        <React.Fragment>
            <div className={classes.wrapper}>
                <header className={classes.title}>
                    <button onClick={toggle} >กลับ</button>
                    <span>เพิ่มพนักงาน</span>
                </header>
                <div className={classes.form}>
                    <form onSubmit={_onSubmit} >
                        <div className={classes.items}>
                            <input type="text" placeholder="Username" ref={e => username = e} />
                        </div>
                        <div className={classes.items}>
                            <input type="password" placeholder="Password" ref={e => password = e} />
                        </div>
                        <div className={classes.items2}>
                            <input type="text" placeholder="First Name" ref={e => fname = e} />
                            <input type="text" placeholder="Last Name" ref={e => lname = e} />
                        </div>
                        <div className={classes.items}>
                            <input type="email" placeholder="Email" ref={e => email = e} />
                        </div>
                        <div className={classes.items}>
                            <select name="status" ref={e => status = e} >
                                <option value="user" >พนักงาน</option>
                                <option value="admin">ผู้ดูแล</option>
                            </select>
                        </div>
                        <div className={classes.items}>
                            <input type="file" ref={e => file = e} />
                        </div>
                        <div className={classes.items}>
                            <input type="number" placeholder="Number Phone" ref={e => phone = e} />
                        </div>
                        <div className={classes.items}>
                            <button name="submit">ตกลง</button>
                        </div>
                    </form>
                </div>
            </div>
        </React.Fragment>
    )
}

export default AddEmp