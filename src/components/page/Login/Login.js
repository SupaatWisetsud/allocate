import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { gql } from "apollo-boost";
import { useMutation } from '@apollo/react-hooks'
import style from './style';
import { Spinner } from '../../../component'

const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
        token
        status
    }
  }
`;

const Login = ({ classes }) => {

    const [loginTodo, { loading }] = useMutation(LOGIN);

    const [redirect, setRedirect] = useState(false);

    let username, password;
    
    const _onLogin = async e => {
        e.preventDefault();
        
        loginTodo({ variables: { username: username.value, password: password.value } })
            .then(res => {
                if(res.data.login.status){
                    localStorage.setItem("nodeToken", res.data.login.token);
                    setRedirect(true)
                }else{
                    alert("Username หรือ Password ของท่านไม่ถูกต้อง..")
                }
            })

        username.value = "";
        password.value = "";
    }


    return (
        (localStorage.getItem("nodeToken") !== null) ?
            <Redirect to="/" /> :
            <div className={classes.containerSignIn}>
                {loading && <Spinner />}
                {redirect && <Redirect to="/" />}
                <div className={classes.containerForm}>
                    <form onSubmit={_onLogin}>
                        <div>
                            <p>Allocate</p>
                        </div>
                        <div>
                            <input type="text" placeholder="Username" ref={e => username = e} />
                        </div>
                        <div>
                            <input type="password" placeholder="password" ref={e => password = e} />
                        </div>
                        <div>
                            <button>Sign in</button>
                        </div>
                    </form>
                </div>
            </div>
    );
}

export default style(Login);