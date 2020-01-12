import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { ThemeProvider } from 'react-jss'
import Theme from '../Theme'
import style from './style'
import Login from '../../components/page/Login';
import Logout from '../../components/page/Logout'
import DefaultLayout from '../DefaultLayout' 

const RootView = props => {
    return (
        <React.Fragment>
            <ThemeProvider theme={Theme} >
                <BrowserRouter>
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/logout" component={Logout} />
                    <Route path="/" component={() => <DefaultLayout classes={props.classes} />}  />
                </BrowserRouter>
            </ThemeProvider>
        </React.Fragment>
    )
}

export default style(RootView); 