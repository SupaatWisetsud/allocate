import jss from 'react-jss'

const style = theme => ({

    close: {
        padding: 5,
        textAlign: "end"
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
    div: {
        backgroundColor: "white",
        margin: "10px 0",
        padding: 10,
        borderRadius: 5,
        boxShadow: "1px 2px 3px rgba(0,0,0,0.3)",
        fontSize: 18,
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
});

export default (component)=>jss(style)(component)