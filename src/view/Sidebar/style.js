import jss from 'react-jss'


const style = theme => ({
    "@global": {
        nav: {
            padding: 5
        },
        li: {
            padding: 10,
            border: "2px solid rgba(0,0,0,0.3)",
            marginTop: 3,
            borderRadius: 5,
            '&:hover':{
                backgroundColor: "#E74C3C"
            }
        },
        a: {
            color: theme.txtColor,
            textDecoration: "none"
        }
    },
    sidebar : {
        width : 200,
        height : "100vh",
        backgroundColor : "white"
    },
    logo: {
        backgroundColor : theme.colorPrimary,
        textAlign: "center",
        padding: 3,
        fontSize: 24,
        fontWeight: "bold",
        color: "white"
    },
    profile: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,

        '&>img':{
            width: 150,
            height: 150,
            marginBottom: 5
        }
    },
    
});

export default c => jss(style)(c)