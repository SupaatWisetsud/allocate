import jss from 'react-jss'

const style = {
    "@global": {
        '*': {
            margin: 0,
            fontFamily: "tahoma",
            padding: 0,
            boxSizing: "border-box"
        },
        body: {
            backgroundColor: '#EFEFEF',
        },
        table: {
            width: "100%",
            backgroundColor: "white",
            borderRadius: 5,
            padding: "5px 20px",
            boxShadow: "1px 2px 3px rgba(0,0,0,0.3)"
        },
        "thead, tbody, tr, td, th": {
            padding: "5px 10px",
            border: "1px solid rgba(0,0,0,0.3)",
            textAlign: "center"
        },
        thead: {
            backgroundColor: "#58D68D",
            color: "white"
        },
        "input, textarea, select": {
            fontSize: 18,
            padding: "3px 5px",
            borderRadius: 3,
            border: "1px solid rgba(0,0,0,0.3)",
            outline: "none"
        }
    },
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
}

export default c => jss(style)(c)