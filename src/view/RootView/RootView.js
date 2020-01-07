import React from 'react'
import { BrowserRouter, Route, Redirect } from 'react-router-dom'
import { ThemeProvider } from 'react-jss'
import Theme from '../Theme'
import style from './style'
import route from './router'

const RootView = () => {

    return (
        <React.Fragment>
            <ThemeProvider theme={Theme} >
                <BrowserRouter>
                    <Route path="/" exact component={() => <Redirect to={"/dashboard"} />} />
                    {
                        route.map((r, i) => (
                            <Route key={i} path={r.path} component={r.component} />
                        ))
                    }
                </BrowserRouter>
            </ThemeProvider>
        </React.Fragment>
    )
}

export default style(RootView); 