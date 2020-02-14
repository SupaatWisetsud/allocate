import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom';
import { decode } from 'jsonwebtoken'
import { NavLink } from 'react-router-dom'
import style from './style'
import route from '../router';

const Sidebar = ({ classes }) => {

    const [user, setUser] = useState({});

    useEffect(() => {
        const decodeUser = () => {
            if(localStorage.getItem("nodeToken") !== null){
                setUser(decode(localStorage.getItem("nodeToken"))._doc);   
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
                <img src={`http://localhost:4000${user.img}`} alt={user._id} style={{objectFit: "cover" }} />
                <p style={{margin: "10px 0 5px 0"}}>สถานะ : {user.status}</p>
                <p> {user.firstname} {user.lastname} </p>
            </div>
            <nav>
                <ul>
                    {route.map((n, index) => (
                        (n.display && (n.status === "all" || user.status === n.status)) &&
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