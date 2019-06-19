import React from "react";
import { View, Text, Image, TouchableOpacity, TextInput, KeyboardAvoidingView, Dimensions } from "react-native";
import styles from "./LoginScreenFood.styles";
import { MaterialButton } from "../../components/MaterialButton/MaterialButton";
import { Button, Icon } from "react-native-elements";
import { Font } from 'expo';
import Autocomplete from 'react-native-autocomplete-input';
import axios from 'axios';
// import Icon from 'react-native-vector-icons/FontAwesome';


export class LoginScreenFood extends React.Component {
    _isMounted = false;

    constructor(props) {
        super(props);

        this.state = {
            fontLoaded: false, // Used to check if the custom font has been loaded
            categories: [],
            query: '',
        };
    }
 

    async componentDidMount() {
        this._isMounted = true;

        // When the LoginScreen loads, then load a custom font asynchronously.
        this.setState({})
        await Font.loadAsync({
          'open-sans': require('../../assets/fonts/OpenSans-LightItalic.ttf'),
          'open-sans-bold' : require('../../assets/fonts/OpenSans-Bold.ttf'),
          'proxima-nova-soft' : require('../../assets/fonts/proxima-nova-soft/proxima-nova-soft-regular.ttf'),
          'proxima-nova-soft-bold' : require('../../assets/fonts/proxima-nova-soft/proxima-nova-soft-bold.ttf'),
        });
        console.log('Fonts loaded');
        this.setState({ fontLoaded: true });
        
        // Set up the autocomplete results
        var categories = [];
        const loadFromAPI = false; // T: Load results from external API, F: Load results from local file
        if (loadFromAPI) {
            try {
                const response = await axios({
                    method: 'get',
                    url: 'https://api.yelp.com/v3/categories',
                    headers: {
                    Authorization: 'Bearer uEHV6xfRo8t08Mbssj-ISPyjjW5SAY3zBdcKBfJD_48V6vbZmdrceEQTAWgVhCVGvDNGsrXnGh2jgOeKe-oLWla_22118nZBWSG4BmLWtQIVEHUNlmG-4LAUkekGXXYx',
                    },
                });
                categories = response.data.categories;
                console.log("Autocomplete retrival SUCCESSFUL")
            } catch (err) {
                // If retrival doesn't work, then just load a saved version of the categories from file.
                console.log(err);
                console.log("Autocomplete retrieval UNSUCCESSFUL. Loading from file.")
                categories = require('./Categories.json');
            }
        } else {
            console.log("Loading autocomplete from file")
            categories = require('./Categories.json');
        }

        // Change the state. Check if mounted to avoid warnings avoid setting state of unmounted components.
        if (this._isMounted) {
            this.setState({ categories });
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }
    
    // Method caled every time we change the value of the input
    getSuggestions(query) {

        // If the query is empty or is too short, then return blank
        if (query === '' || query.length < 2 ) {
            return []
        }

        const { categories } = this.state;
        // Making a case insensitive regular expression to get similar value from the category json
        const regex = new RegExp(`${query.trim()}`, 'i')

        // Return the filtered category array according the query from the input
        return categories.filter(category => category.title.search(regex) >= 0);
        // return categories.filter(category => category.parent.search('food') >= 0);
    }

    render() {
        const { query } = this.state;
        const foundSuggestions = this.getSuggestions(query);
        const comp = (a,b) => a.toLowerCase().trim() === b.toLowerCase().trim();

        // var str = JSON.stringify(foundSuggestions, null, 2); // Print the suggestions
        // console.log('foundSuggestions:' + str); 

        return (
            // <KeyboardAvoidingView behavior="padding" style={styles.loginContainer}>
            <View style={styles.loginContainer}>
                <View style={styles.headerContainer}>
                    <Image style={styles.imageStyle} source={require("../../assets/food-logo-2.png")}/>
                    {   // Only load this text once the 'open-sans' font has loaded. Note: you can use : null to not display the text
                        this.state.fontLoaded ? (
                        <Text style={[styles.headerText, {fontFamily: 'proxima-nova-soft'}]}>What shall we eat?</Text>
                        ) : <Text style={styles.headerText}>What shall we eat?</Text>
                    }
                </View> 
                <View style={styles.formContainer}>
                    
                    {/* <TextInput placeholder="e.g. delis" placeholderTextColor="#FFF" style={styles.inputContainer}/> */}
                    <Autocomplete
                        autoCapitalize="none"
                        autoCorrect={false}
                        
                        // Data to show suggestion
                        data={ (foundSuggestions.length === 1 && comp(query, foundSuggestions[0].title)) ? [] : foundSuggestions}

                        // Default value if you want to set something in input
                        defaultValue={query}

                        // Onchange of the text changing the state of the query, which will trigger the findCategory method to show suggestions.
                        onChangeText={text => this.setState({ query: text})}

                        placeholder="e.g. pizza"
                        renderItem={({ title, alias }) => (
                            // You can change the view to want to show in suggestion from here.
                            <TouchableOpacity onPress={() => this.setState({ query: title })}>
                                <Text style={styles.autocompleteText}>
                                    {title} 
                                </Text>
                            </TouchableOpacity>
                        )}
                    />
                    {
                        this.state.fontLoaded ? (
                            <MaterialButton buttonText="Search" buttonTextStyles={{fontFamily:'proxima-nova-soft-bold'}} buttonStyles={[styles.buttonStyles ]} onPress={() => this.props.navigation.navigate("main")}/>
                        ) : <MaterialButton buttonText="Search" buttonStyles={[styles.buttonStyles]} onPress={() => this.props.navigation.navigate("main")}/>
                    }
                </View>
            </View>
            //  </KeyboardAvoidingView>
        )
    }
}
