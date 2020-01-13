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
    }
});

export default (component)=>jss(style)(component)