import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import style from './style'
import Sidebar from '../../view/Sidebar'
import Post from './Post'
import { Spinner } from '../../component'

const NEW_FEED = gql`
    {
        newfeeds {
            w_id
            m_firstname
            m_lastname
            w_status
            w_title
            w_detail
            w_datestatus
        }
    }
`;
// bug อยู่เน้อ
const Dashboard = ({ classes }) => {

    const [newfeed, setNewfeed] = useState([]);

    const { data, loading } = useQuery(NEW_FEED);

    useEffect(()=>{
        if(data !== undefined){
            setNewfeed(data.newfeeds)
        }
    }, [data]);
    
    return (
        <>
            {loading && <Spinner />}
            <div className={classes.container}>
                <Sidebar />
                <div className={classes.content}>
                    <div className={classes.wrapperPost}>
                        <header className={classes.title}>
                            <span>ฟิดข่าว</span>
                        </header>
                        {
                            newfeed.map((n, i) => (
                                <Post key={i} classes={classes} data={n} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}


export default style(Dashboard)