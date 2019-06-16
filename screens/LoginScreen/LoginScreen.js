import React from "react";
import { View, Text, Image, TouchableOpacity, TextInput, KeyboardAvoidingView } from "react-native";
import styles from "./LoginScreen.styles";
import { MaterialButton } from "../../components/MaterialButton/MaterialButton";
import { Button } from "react-native-elements";


export class LoginScreen extends React.Component {
    render() {
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.loginContainer}>
                <View style={styles.headerContainer}>
                    <Image style={styles.imageStyle} source={require("../../assets/food-logo-2.png")}/>
                    <Text style={styles.headerText}>Your next job is only a Swipe away</Text>
                </View> 
                <View style={styles.formContainer}>
                    <MaterialButton buttonStyles={{borderRadius:50, marginBottom: 20}} buttonText="LOGIN WITH FACEBOOK"/>                      
                    <TextInput placeholder="Username" placeholderTextColor="#FFF" style={styles.inputContainer}/>
                    <TextInput placeholder="Password" secureTextEntry={true} placeholderTextColor="#FFF" style={styles.inputContainer}/>                    
                    <MaterialButton buttonText="SIGN IN" onPress={() => this.props.navigation.navigate("main")}/>
                </View>
            </KeyboardAvoidingView>
        )
    }
}
