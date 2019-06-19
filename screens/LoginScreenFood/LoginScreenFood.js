import React from "react";
import { View, Text, Image, TouchableOpacity, TextInput, KeyboardAvoidingView } from "react-native";
import styles from "./LoginScreenFood.styles";
import { MaterialButton } from "../../components/MaterialButton/MaterialButton";
import { Button, Icon } from "react-native-elements";
import { Font } from 'expo';
import Autocomplete from 'react-native-autocomplete-input';
// import Icon from 'react-native-vector-icons/FontAwesome';


export class LoginScreenFood extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fontLoaded: false, // Used to check if the custom font has been loaded
            categories: [],
            query: '',
        };
    }
 

    // When the LoginScreen loads, then load a custom font asynchronously.
    async componentDidMount() {
        this.setState({})
        await Font.loadAsync({
          'open-sans': require('../../assets/fonts/OpenSans-LightItalic.ttf'),
          'open-sans-bold' : require('../../assets/fonts/OpenSans-Bold.ttf'),
        });
        this.setState({ fontLoaded: true });

        const categories = [
            {
                "alias": "3dprinting",
                "title": "3D Printing",
                "parent_aliases": [
                    "localservices"
                ],
                "country_whitelist": [],
                "country_blacklist": []
            },
            {
                "alias": "abruzzese",
                "title": "Abruzzese",
                "parent_aliases": [
                    "italian"
                ],
                "country_whitelist": [
                    "IT"
                ],
                "country_blacklist": []
            },
            {
                "alias": "absinthebars",
                "title": "Absinthe Bars",
                "parent_aliases": [
                    "bars"
                ],
                "country_whitelist": [
                    "CZ"
                ],
                "country_blacklist": []
            }]
        this.setState({ categories });
    }
    
    // Method caled every time we change the value of the input
    getSuggestions(query) {

        // If the query is null, then return blank
        if (query === '') {
            return []
        }

        const { categories } = this.state;
        // Making a case insensitive regular expression to get similar value from the category json
        const regex = new RegExp(`${query.trim()}`, 'i')

        // Return the filtered category array according the query from the input
        return categories.filter(category => category.title.search(regex) >= 0);
    }

    render() {
        const { query } = this.state;
        const foundCat = this.getSuggestions(query);
        // Prettyprint Json
        var str = JSON.stringify(foundCat, null, 2);
        console.log('FOUNDCAT:' + str);

        const comp = (a,b) => a.toLowerCase().trim() === b.toLowerCase().trim();

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
                    
                    {/* <TextInput placeholder="e.g. delis" placeholderTextColor="#FFF" style={styles.inputContainer}/> */}
                    <Autocomplete
                        autoCapitalize="none"
                        autoCorrect={false}
                        
                        // Data to show suggestion
                        data={ (foundCat.length === 1 && comp(query, foundCat[0].title)) ? [] : foundCat}

                        // Default value if you want to set something in input
                        defaultValue={query}

                        // Onchange of the text changing the state of the query, which will trigger the findCategory method to show suggestions.
                        onChangeText={text => this.setState({ query: text})}

                        placeholder="e.g. Delis"
                        renderItem={({ title, alias }) => (
                            // You can change the view to want to show in suggestion from here.
                            <TouchableOpacity onPress={() => this.setState({ query: title })}>
                                <Text>
                                    {title} ({alias})
                                </Text>
                            </TouchableOpacity>
                        )}
                    />
                    {
                        this.state.fontLoaded ? (
                            <MaterialButton buttonText="Search" buttonStyles={{fontFamily: 'open-sans-bold'}} onPress={() => this.props.navigation.navigate("main")}/>
                        ) : <MaterialButton buttonText="Search" onPress={() => this.props.navigation.navigate("main")}/>
                    }
                </View>
                <View>
                    { foundCat.length > 0 ? (
                        <Text style={styles.infoText}>{ this.state.query }</Text>
                    ) : (
                        <Text style={styles.infoText}>Enter the category name</Text>
                    )
                }
                </View>
            </KeyboardAvoidingView>
        )
    }
}
