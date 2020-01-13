import React, { useState } from 'react';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';
import style from './style';
import { Spinner } from '../../../component'

const Login = ({ classes, history }) => {

    const [redirect] = useState(false);
    const [loading, setLoading] = useState(false);
    let username, password;
    
    const _onLogin = async e => {
        e.preventDefault();
        setLoading(true);
        Axios.post("http://localhost:4000/api/login", {
            username : username.value,
            password : password.value
        })
        .then(res => {
            setLoading(false);
            
            if(res.data.status){
                localStorage.setItem("nodeToken", res.data.token);
                history.push('/');
            }else{
                alert("Username หรือ Password ของท่านไม่ถูกต้อง");
            }
        })
        .catch(err => null);

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