import React, { useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import style from './style'
import Sidebar from '../../view/Sidebar'
import Post from './Post'
import { Spinner } from '../../component'

const NEW_FEED = gql`
    {
        newfeeds {
            title
            detail
            status
            datestatus
            worker {
                firstname
                lastname
            }
        }
    }
`;

const Dashboard = ({ classes }) => {

    const [newfeed, setNewfeed] = useState([]);

    const { loading } = useQuery(NEW_FEED, {
        onCompleted: data => {
            setNewfeed(data.newfeeds)
        }
    });
    
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