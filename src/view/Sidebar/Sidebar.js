import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom';
import { decode } from 'jsonwebtoken'
import { NavLink } from 'react-router-dom'
import style from './style'
import route from '../RootView/router';

const Sidebar = ({ classes }) => {

    const [user, setUser] = useState({});

    useEffect(() => {
        const decodeUser = () => {
            if(localStorage.getItem("nodeToken") !== null){
                setUser(decode(localStorage.getItem("nodeToken"))[0]);
            }
        }
        decodeUser();
    }, []);
    
    return (
        <div className={classes.sidebar} >
            {localStorage.getItem("nodeToken") === null? <Redirect to="/logout" />:null}
            <div className={classes.logo}>
                Allocate
            </div>
            <div className={classes.profile} >
                <img src={"logo192.png"} alt={user.m_id} />
                <p>Status : {user.m_status}</p>
                <p> {user.m_firstname} {user.m_lastname} </p>
            </div>
            <nav>
                <ul>
                    {route.map((n, index) => (
                        (n.display && (n.status === "all" || user.m_status === n.status)) &&
                        <NavLink key={index} to={n.path} exact activeStyle={{ textShadow: "1px 2px 3px rgba(0,0,0,0.3)" }} >
                            <li>
                                {n.title}
                            </li>
                        </NavLink>
                    ))}
                </ul>
            </nav>

        </div>
    )
}

export default style(Sidebar)