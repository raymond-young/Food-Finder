import { StyleSheet, Dimensions } from "react-native";

export default StyleSheet.create({
    loginContainer: {
        flex: 1,
        // backgroundColor: "#87AFC7",
        backgroundColor: 'steelblue',
        padding: 20
    },
    headerContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: 'powderblue'
    },
    headerText: {
        color: "#FFF",
        marginTop: 20,
        fontSize: 30
        // fontFamily: "open-sans-bold",
        // Trebuchet MS,Arial,sans-serif
    },
    imageStyle: {
        width: 150,
        height: 150
    },
    formContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: 'skyblue',
        alignItems: "stretch",
    },
    inputContainer: {
        height: 60,
        // width: 300,
        color: "#FFF",
        padding: 10,
        backgroundColor: "rgba(255, 255,255, 0.2)",
        marginBottom: 20
    },
    buttonStyles: {
        borderRadius:25, 
        position:'absolute', 
        width:250, 
        left: (Dimensions.get("window").width/2)-125-20
    }

})