import React from "react";
import { TouchableOpacity, Text } from "react-native";
import styles from "./MaterialButton.styles";

/**
 * According to this definition, the MaterialButton component has the following props:
 * - buttonStyles: Any additional styles to add to the button (styles specific for an implementation, rather than the defaults provided in the .styles.css)
 * - onPress: The method to call when the button is pressed.
 * - buttonText: The text to display on the button.
 * 
 * This definition also uses the StyleSheet from MaterialButton.styles to determine the text style and button style.
 */
export class MaterialButton extends React.Component {
    render() {
        return (
            <TouchableOpacity style={[this.props.buttonStyles, styles.buttonContainer]} onPress={this.props.onPress}>
                <Text style={[this.props.buttonTextStyles, styles.buttonText]}>{this.props.buttonText}</Text>
            </TouchableOpacity>
        );
    }
}