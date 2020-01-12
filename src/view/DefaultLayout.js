import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import routes from './router'
import Sidebar from './Sidebar';

const DefaultLayout = ({ classes, history }) => {

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
                                    exact={route.exact}
                                    name={route.name}
                                    component={route.component} />
                            ) : (null);
                        })}
                        {/* <Route path="/" component={() => } /> */}
                    </Switch>
                </div>
            </div>
        )
    }
};


export default DefaultLayout