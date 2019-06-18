import React from "react";
import { View, Text, Image, TouchableOpacity, TextInput, KeyboardAvoidingView } from "react-native";
import styles from "./LoginScreenFood.styles";
import { MaterialButton } from "../../components/MaterialButton/MaterialButton";
import { Button, Icon } from "react-native-elements";
import { Font } from 'expo';
// import Icon from 'react-native-vector-icons/FontAwesome';


export class LoginScreenFood extends React.Component {

    state = {
        fontLoaded: false, // Used to check if the custom font has been loaded
      };

    // When the LoginScreen loads, then load a custom font asynchronously.
    async componentDidMount() {
        await Font.loadAsync({
          'open-sans': require('../../assets/fonts/OpenSans-LightItalic.ttf'),
          'open-sans-bold' : require('../../assets/fonts/OpenSans-Bold.ttf'),
        });
        this.setState({ fontLoaded: true });
      }

    render() {
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.loginContainer}>
                <View style={styles.headerContainer}>
                    <Image style={styles.imageStyle} source={require("../../assets/food-logo-2.png")}/>
                    {   // Only load this text once the 'open-sans' font has loaded. Note: you can use : null to not display the text
                        this.state.fontLoaded ? (
                        <Text style={[styles.headerText, {fontFamily: 'open-sans'}]}>What shall we eat?</Text>
                        ) : <Text style={styles.headerText}>What shall we eat?</Text>
                    }
                </View> 
                <View style={styles.formContainer}>
                    {/* <MaterialButton buttonStyles={{borderRadius:50, marginBottom: 20}} buttonText="LOGIN WITH FACEBOOK"/>                       */}
                    <TextInput placeholder="e.g. delis" placeholderTextColor="#FFF" style={styles.inputContainer}/>
                    {/* <TextInput placeholder="Password" secureTextEntry={true} placeholderTextColor="#FFF" style={styles.inputContainer}/>                     */}
                    {
                        this.state.fontLoaded ? (
                            <MaterialButton buttonText="Search" buttonStyles={{fontFamily: 'open-sans-bold'}} onPress={() => this.props.navigation.navigate("main")}/>
                        ) : <MaterialButton buttonText="Search" onPress={() => this.props.navigation.navigate("main")}/>
                    }
                    {/* <MaterialButton buttonText="Search" buttonStyles={{fontFamily: 'open-sans-bold'}} onPress={() => this.props.navigation.navigate("main")}/> */}
                </View>
            </KeyboardAvoidingView>
        )
    }
}
