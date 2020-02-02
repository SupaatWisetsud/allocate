import React from 'react'
import { decode } from 'jsonwebtoken'
import style from './style'
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';

const EDITPORFILE = gql`
    mutation editprofile($id: ID!, $username: String!, $password: String, $firstname: String!, $lastname: String!, $email: String!, $phone: String!){
        editprofile(
            id: $id,
            username: $username, 
            firstname: $firstname,
            lastname: $lastname,
            email: $email,
            phone: $phone,
            password: $password
        )
    }
`;
class Editprofile extends React.Component {

    state = {
        username: "",
        fname: "",
        lname: "",
        email: "",
        phone: "",
        password: ""
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
        const { email, fname, lname, phone, username } = this.state;
        const { classes } = this.props

        return (
            <div className={classes.wrapper}>
                <header className={classes.title}>
                    <span>แก้ไขโปรไฟล์</span>
                </header>

                <div className={classes.form}>
                    <Mutation mutation={EDITPORFILE}>
                        {(editTodo) => (
                            <form onSubmit={async e => {
                                e.preventDefault();

                                await editTodo({
                                    variables: {
                                        id: decode(localStorage.getItem("nodeToken"))._doc._id,
                                        username: this.username_txt.value,
                                        firstname: this.fname_txt.value,
                                        lastname: this.lname_txt.value,
                                        email: this.email_txt.value,
                                        phone: this.phone_txt.value,
                                        password: this.password_txt.value
                                    }
                                }).then(res => {
                                    alert("Update ข้อมูลเสร็จสิ้น");
                                })
                            }} >
                                <div className={classes.itemsEdit}>
                                    <label>Username</label>
                                    <input type="text" defaultValue={username} ref={e => this.username_txt = e} />
                                </div>
                                <div className={classes.itemsEdit}>
                                    <label>Password</label>
                                    <input type="password" placeholder="***********" ref={e => this.password_txt = e} />
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
                                    <label>Number Phone</label>
                                    <input type="number" defaultValue={phone} ref={e => this.phone_txt = e} />
                                </div>
                                <div className={classes.itemsButton}>
                                    <button type="submit" className={classes.btnsubmit}>อัพเดท</button>
                                </div>
                            </form>
                        )}
                    </Mutation>

                </div>

            </div>
        )
    }
}

export default style(Editprofile)