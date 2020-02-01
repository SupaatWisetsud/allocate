import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import routes from './router'
import Sidebar from './Sidebar';

const DefaultLayout = props => {
    
    const { classes } = props;
    
    if (!localStorage.getItem('nodeToken')) {
        return <Redirect to="/login" />
    } else {
        return (
            <div className={classes.container}>
                <Sidebar />
                <div className={classes.content}>
                    <Switch>
                        {routes.map((route, idx) => {
                            return route.component ? (
                                <Route
                                    key={idx}
                                    path={route.path}
                                    name={route.name}
                                    component={route.component} />
                            ) : (null);
                        })}
                        <Route path="/" component={() => <Redirect to="/dashboard" />} />
                    </Switch>
                </div>
            </div>
        )
    }
};


export default DefaultLayout