import React from 'react'
import style from './style'
import Sidebar from '../../view/Sidebar'
import ListEmp from './ListEmp'
import AddEmp from './AddEmp'

class Emp extends React.Component {

    state = {
        toggle: true
    }

    render() {
        const { classes } = this.props
        return (
            <div className={classes.container}>
                <Sidebar />
                <div className={classes.content}>
                    {
                        this.state.toggle ?
                            <ListEmp classes={classes} toggle={e=>this.setState({toggle:false})} />
                            :
                            <AddEmp classes={classes} toggle={e=>this.setState({toggle:true})} />
                    }
                </div>
            </div>
        )
    }
}

export default style(Emp)