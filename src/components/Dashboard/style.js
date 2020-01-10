import jss from 'react-jss'

const style = theme => ({
    container: {
        display: "flex",
        flexDicection: "column",
    },
    content: {
        flex: 1,
        padding: 10,
        height: "100vh",
        overflow: "auto"
    },
    wrapperPost: {
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
    post: {
        marginTop: 15,
        backgroundColor: "white",
        padding: 5,
        borderRadius: 5,
        boxShadow: "1px 2px 3px rgba(0,0,0,0.3)"
    },
    postHeader: {
        display: "flex",
        justifyContent: "space- between",
        padding: 5,
        borderBottom: "2px solid #333"
    },
    postBody: {
        padding: 10,
        wordWrap: "break-word"
    },
    postFooter: {
        textAlign: "end",
        padding: 10,
        wordWrap: 'break-word'
    }
})

export default c => jss(style)(c)