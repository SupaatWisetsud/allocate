import jss from 'react-jss'

const style = theme => ({
    container: {
        display: "flex",
        flexDicection: "column",
    },
    content: {
        flex: 1,
        padding: 10
    },
    wrapper: {
        maxWidth: 650,
        margin: "0 auto"
    },
    title: {
        backgroundColor: theme.colorPrimary,
        fontSize: 28,
        color: "white",
        borderRadius: 5,
        padding: "5px 10px",
        boxShadow: "1px 2px 3px rgba(0,0,0,0.3)",
        margin: "10px 0"
    },
    form: {
        backgroundColor: "white",
        borderRadius: 5,
        padding: "5px 20px",
        boxShadow: "1px 2px 3px rgba(0,0,0,0.3)"
    },
    itemsEdit: {
        margin: "15px 0",
        display: "grid",
        gridTemplate: "auto / 250px 1fr"
    },
    itemsEdit2: {
        '&>div':{
            display: "grid",
            gridTemplate: "auto / 250px 1fr",
            margin: "2px 0"
        }
    },
    itemsButton: {
        margin: "10px 0"
    }
})

export default c => jss(style)(c)