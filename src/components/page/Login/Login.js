import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Redirect } from 'react-router-dom';
import style from './style';
import { Spinner } from '../../../component'

const LOGIN = gql`
    mutation login($username: String!, $password: String!){
        login(username: $username, password: $password){
            token
            status
        }
    }
`;
const Login = ({ classes, history }) => {
    
    const [redirect, setRedirect] = useState(false);

    const [mutationLogin, { loading }] = useMutation(LOGIN, {
        onCompleted: ({ login }) => {
            if (login.status) {
                localStorage.setItem("nodeToken", login.token);
                setRedirect(true)
            } else {
                alert("Username หรือ Password ของท่านไม่ถูกต้อง..")
            }
        }
    });


    let username, password;

    const _onLogin = async e => {
        e.preventDefault();

        mutationLogin({
            variables: {
                username: username.value,
                password: password.value
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