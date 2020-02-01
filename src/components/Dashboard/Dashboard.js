import React, { useState, useEffect } from 'react'
import style from './style'
import Post from './Post'
import { Spinner } from '../../component'
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

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
    const { data, loading, refetch} = useQuery(NEW_FEED);

    useEffect(() => {
        refetch();
        if(data) setNewfeed(data.newfeeds)
    }, [data, refetch]);

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