import React from "react";
import { View, Text, Image, TouchableOpacity, TextInput, KeyboardAvoidingView } from "react-native";
import styles from "./LoginScreen.styles";
import { MaterialButton } from "../../components/MaterialButton/MaterialButton";
import { Button } from "react-native-elements";
import { Font } from 'expo';


export class LoginScreen extends React.Component {

    state = {
        fontLoaded: false, // Used to check if the custom font has been loaded
      };

    // When the LoginScreen loads, then load a custom font asynchronously.
    async componentDidMount() {
        await Font.loadAsync({
          'open-sans-bold': require('../../assets/fonts/OpenSans-Bold.ttf'),
        });
        this.setState({ fontLoaded: true });
      }

    render() {
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.loginContainer}>
                <View style={styles.headerContainer}>
                    <Image style={styles.imageStyle} source={require("../../assets/food-logo-2.png")}/>
                    {   // Only load this text once the 'open-sans-bold' font has loaded.
                        this.state.fontLoaded ? (
                        <Text style={[styles.headerText, {fontFamily: 'open-sans-bold', fontSize: 20}]}>Where should we eat?</Text>
                        ) : null
                    }
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
