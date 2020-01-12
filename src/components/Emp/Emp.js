import React from 'react'
import style from './style'
import ListEmp from './ListEmp'
import AddEmp from './AddEmp'

class Emp extends React.Component {

    state = {
        toggle: true
    }

    render() {
        const { classes } = this.props
        return (
            this.state.toggle ?
                <ListEmp classes={classes} toggle={e => this.setState({ toggle: false })} />
                :
                <AddEmp classes={classes} toggle={e => this.setState({ toggle: true })} />
        )
    }
}

export default style(Emp)