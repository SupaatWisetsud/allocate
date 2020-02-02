import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

const APP_EMP = gql`
    mutation Add_EMP($username: String!, $password: String!, $firstname: String!, $lastname: String!, $email: String!, $phone: String!, $status: String!){
        register(
            username: $username, 
            password: $password, 
            firstname: $firstname,
            lastname: $lastname,
            email: $email,
            phone: $phone,
            status: $status,
        )
    }
`;
const AddEmp = ({ classes, toggle }) => {

    const [mutaAddemp] = useMutation(APP_EMP)
    let username, password, fname, lname, email, phone, status;

    const _onSubmit = e => {
        e.preventDefault();
        mutaAddemp({
            variables: {
                username: username.value,
                password: password.value,
                firstname: fname.value,
                lastname: lname.value,
                email: email.value,
                phone: phone.value,
                status: status.value
            }
        });
        toggle();
    }
    return (
        <React.Fragment>
            <div className={classes.wrapper}>
                <header className={classes.title}>
                    <button onClick={toggle} className={classes.btnOrder} >กลับ</button>
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
                            <input type="number" placeholder="Number Phone" ref={e => phone = e} />
                        </div>
                        <div className={classes.items}>
                            <button name="submit" className={classes.btnsubmit}>ตกลง</button>
                        </div>
                    </form>
                </div>
            </div>
        </React.Fragment>
    )
}

export default AddEmp