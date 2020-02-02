import jss from 'react-jss'

const style = theme => ({
    container:{
        display:"flex",
        flexDicection:"column",
    },
    content:{
        flex: 1,
        padding: 10
    },
    wrapper: {
        maxWidth: 850,
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
    header: {
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: theme.colorPrimary,
        fontSize: 28,
        color: "white",
        borderRadius: 5,
        padding: "5px 10px",
        boxShadow: "1px 2px 3px rgba(0,0,0,0.3)",
        margin: "10px 0"
    },
    btn: {
        width: "100%", 
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
    }
})

export default c => jss(style)(c)