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
    },
    btn: {
        padding: 5, 
        borderRadius: 5, 
        border: "none", 
        fontSize: 18, 
        borderBottom: "3px solid #D35400", 
        cursor: "pointer",
        backgroundColor: "#EB984E",
        color: "white"
    },
    btnOrder: {
        margin: "0 0 0 5px",
        padding: 5, 
        borderRadius: 5, 
        border: "none", 
        fontSize: 18, 
        borderBottom: "3px solid #8E44AD", 
        cursor: "pointer",
        backgroundColor: "#A569BD",
        color: "white"
    },
    btnClose: {
        padding: 5, 
        borderRadius: 5, 
        border: "none", 
        fontSize: 18, 
        borderBottom: "3px solid #CB4335", 
        cursor: "pointer",
        backgroundColor: "#E74C3C",
        color: "white"
    },
    btnsubmit: {
        width: "100%", 
        padding: 5, 
        borderRadius: 5, 
        border: "none", 
        fontSize: 18, 
        borderBottom: "3px solid #28B463", 
        cursor: "pointer",
        backgroundColor: "#2ECC71",
        color: "white"
    }
})

export default c => jss(style)(c)