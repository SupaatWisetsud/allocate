import React from 'react'
import { decode } from 'jsonwebtoken'
import style from './style'
import Sidebar from '../../view/Sidebar'

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

    render() {
        const { email, fname, lname, phone, username} = this.state;
        const { classes } = this.props
        return (
            <div className={classes.container}>
                <Sidebar />
                <div className={classes.content}>

                    <div className={classes.wrapper}>
                        <header className={classes.title}>
                            <span>แก้ไขโปรไฟล์</span>
                        </header>

                        <div className={classes.form}>
                            <form>
                                <div className={classes.itemsEdit}>
                                    <label>Username</label>
                                    <input type="text" defaultValue={username} />
                                </div>
                                <div className={classes.itemsEdit}>
                                    <label>Password</label>
                                    <input type="password" placeholder="*********" />
                                </div>
                                <div className={classes.itemsEdit}>
                                    <label>Confrim Password</label>
                                    <input type="password" placeholder="*********" />
                                </div>
                                <div className={classes.itemsEdit2}>
                                    <div>
                                        <label>First Name</label>
                                        <input type="text" defaultValue={fname} />
                                    </div>
                                    <div>
                                        <label>Last Name</label>
                                        <input type="text" defaultValue={lname} />
                                    </div>
                                </div>
                                <div className={classes.itemsEdit}>
                                    <label>Email</label>
                                    <input type="email" defaultValue={email} />
                                </div>
                                <div className={classes.itemsEdit}>
                                    <label>Profile</label>
                                    <input type="file" />
                                </div>
                                <div className={classes.itemsEdit}>
                                    <label>Number Phone</label>
                                    <input type="number" defaultValue={phone} />
                                </div>
                                <div className={classes.itemsButton}>
                                    <button type="submit">อัพเดท</button>
                                </div>
                            </form>
                        </div>

                    </div>

                </div>
            </div>
        )
    }
}

export default style(Editprofile)