import jss from 'react-jss';

const style = theme => ({
    containerSignIn : {
        display : "flex",
        justifyContent : "center",
        alignItems : "center",
        height : "100vh",
        width : "100%",
        backgroundColor : "#FAFAFA"   
    },
    containerForm : {
        backgroundColor : "white",
        padding : "20px 40px",
        borderRadius : 5,
        border : "1px solid #E6E6E6",
        '&>form':{
            '&>div':{
                textAlign : "center",
                marginBottom : 20,
                '&>p':{
                    fontSize : 45,
                    color : "#8D949E"
                },
                '&>input' : {
                    fontSize : 18,
                    padding : "5px 15px"
                },
                '&>button':{
                    backgroundColor : theme.colorPrimary,
                    color : "white",
                    fontSize : 18,
                    border : "none",
                    width : "100%",
                    padding : 10,
                    marginTop : 15
                }
            }
        }
    }
})

export default c => jss(style)(c);