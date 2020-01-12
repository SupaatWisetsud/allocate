import React, { useState, useEffect } from 'react'
import style from './style'
import Post from './Post'
import { Spinner } from '../../component'
import Axios from 'axios'

const Dashboard = ({classes}) => {

    const [newfeed, setNewfeed] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const callAPI = () => {
            setLoading(true);
            Axios.get("http://localhost:4000/api/newfeeds")
            .then(res => {
                setLoading(false)
                if(res.data){
                    setNewfeed(res.data);
                }
            })
            .catch(err => null)
        }
        callAPI();
    }, [])

    return (
        <div className={classes.wrapperPost}>
            {loading && <Spinner />}
            <header className={classes.title}>
                <span>ฟิดข่าว</span>
            </header>
            {
                newfeed.map((n, i) => (
                    <Post key={i} classes={classes} data={n} />
                ))
            }
        </div>
    )
}

export default style(Dashboard)