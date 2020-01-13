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
        maxWidth: 850,
        margin: "0 auto"
    },
    title: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontSize: 24,
        fontWeight: "bold",
        padding: "5px 20px",
        color: "white",
        backgroundColor: theme.colorPrimary,
        borderRadius: 5,
        boxShadow: "1px 2px 3px rgba(0,0,0,0.3)",
        margin: "10px 0"
    },
    form: {
        backgroundColor: "white",
        borderRadius: 5,
        padding: "5px 20px",
        boxShadow: "1px 2px 3px rgba(0,0,0,0.3)",
    },
    items: {
        display: "grid",
        gridTemplate: "auto / 1fr",
        margin: "15px 0"
    },
    items2: {
        display: "grid",
        gridGap: 15,
        gridTemplate: "auto / 1fr 1fr",
        margin: "15px 0"
    },
    header: {
        backgroundColor: theme.colorPrimary,
        fontSize: 28,
        color: "white",
        borderRadius: 5,
        padding: "5px 10px",
        boxShadow: "1px 2px 3px rgba(0,0,0,0.3)",
        margin: "10px 0"
    },
    divForm: {
        '& > form > div': {
            backgroundColor: "white",
            margin: "10px 0",
            padding: 10,
            borderRadius: 5,
            boxShadow: "1px 2px 3px rgba(0,0,0,0.3)",
            fontSize: 18,
        }
    }
})

export default c => jss(style)(c)