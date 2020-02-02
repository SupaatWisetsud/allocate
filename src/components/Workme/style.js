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
        backgroundColor: theme.colorPrimary,
        fontSize: 28,
        color: "white",
        borderRadius: 5,
        padding: "5px 10px",
        boxShadow: "1px 2px 3px rgba(0,0,0,0.3)",
        margin: "10px 0"
    },
    // submit
    sTitle: {
        fontSize: 24,
        fontWeight: "bold",
        padding: "5px 20px",
        color: "white",
        backgroundColor: theme.colorPrimary,
        borderRadius: 5,
        boxShadow: "1px 2px 3px rgba(0,0,0,0.3)",
        margin: "10px 0"
    },
    sContent: {
        '& > div': {
            width: "100%",
            backgroundColor: "white",
            borderRadius: 5,
            padding: 10,
            boxShadow: "1px 2px 3px rgba(0,0,0,0.3)",
            margin: "10px 0",
        }
    },
    sBoxupload: {
        width: 400,
        height: 200,
        textAlign: "center",
        border: "2px rgba(0,0,0,0.3) dashed",
        lineHeight: 5,
        color: "#ccc",
        fontSize: 35
    },
    sSubmit: {
        width: "100%",
        backgroundColor: "white",
        borderRadius: 5,
        padding: 10,
        boxShadow: "1px 2px 3px rgba(0,0,0,0.3)",
        margin: "10px 0"
    },
    sDetail: {
        maxHeight: 90,
        overflow: "auto",
        '&>p': {
            margin: 10
        }
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