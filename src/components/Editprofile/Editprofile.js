import React from 'react'
import { decode } from 'jsonwebtoken'
import style from './style'
import Axios from 'axios';

class Editprofile extends React.Component {

    state = {
        username: "",
        fname: "",
        lname: "",
        email: "",
        phone: ""
    }

    async UNSAFE_componentWillMount() {
        if (localStorage.getItem("nodeToken")) {

            const { username, firstname, lastname, email, phone } = decode(localStorage.getItem("nodeToken"))._doc;

            await this.setState({
                username: username,
                fname: firstname,
                lname: lastname,
                email: email,
                phone: phone
            });
        }
    }

    _onSubmit = async e => {
        e.preventDefault();

        if (this.password_txt.value === this.passwordConfrim_txt.value) {

            const fd = new FormData();

            fd.append("username", this.username_txt.value);
            fd.append("password", this.password_txt.value);
            fd.append("firstname", this.fname_txt.value);
            fd.append("lastname", this.lname_txt.value);
            fd.append("email", this.email_txt.value);
            fd.append("phone", this.phone_txt.value);

            if (this.file_txt.files[0]) fd.append("file", this.file_txt.files[0]);

            await Axios.post(`http://localhost:4000/api/editprofile/${decode(localStorage.getItem("nodeToken"))._doc._id}`, fd, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            .then(res => {

            })
            .catch(err => null)

        } else {

        }
    }

    render() {
        const { email, fname, lname, phone, username } = this.state;
        const { classes } = this.props
        return (

            <div className={classes.wrapper}>
                <header className={classes.title}>
                    <span>แก้ไขโปรไฟล์</span>
                </header>

                <div className={classes.form}>
                    <form onSubmit={this._onSubmit} >
                        <div className={classes.itemsEdit}>
                            <label>Username</label>
                            <input type="text" defaultValue={username} ref={e => this.username_txt = e} />
                        </div>
                        <div className={classes.itemsEdit}>
                            <label>Password</label>
                            <input type="password" placeholder="*********" ref={e => this.password_txt = e} />
                        </div>
                        <div className={classes.itemsEdit}>
                            <label>Confrim Password</label>
                            <input type="password" placeholder="*********" ref={e => this.passwordConfrim_txt = e} />
                        </div>
                        <div className={classes.itemsEdit2}>
                            <div>
                                <label>First Name</label>
                                <input type="text" defaultValue={fname} ref={e => this.fname_txt = e} />
                            </div>
                            <div>
                                <label>Last Name</label>
                                <input type="text" defaultValue={lname} ref={e => this.lname_txt = e} />
                            </div>
                        </div>
                        <div className={classes.itemsEdit}>
                            <label>Email</label>
                            <input type="email" defaultValue={email} ref={e => this.email_txt = e} />
                        </div>
                        <div className={classes.itemsEdit}>
                            <label>Profile</label>
                            <input type="file" ref={e => this.file_txt = e} />
                        </div>
                        <div className={classes.itemsEdit}>
                            <label>Number Phone</label>
                            <input type="number" defaultValue={phone} ref={e => this.phone_txt = e} />
                        </div>
                        <div className={classes.itemsButton}>
                            <button type="submit">อัพเดท</button>
                        </div>
                    </form>
                </div>

            </div>
        )
    }
}

export default style(Editprofile)