import React from "react";
import { View, Text } from "react-native";
import { MapView } from "expo";
import { Button, Icon } from "react-native-elements";
import styles from "./MapScreenFood.styles";
import axios from "axios";
import { AppContext } from "../../AppProvider";

const initialRegion = {
  longitude: -122,
  latitude: 37,
  longitudeDelta: 0.04,
  latitudeDelta: 0.09
};

export class MapScreenFood extends React.Component {
  static navigationOptions = {
    title: "Map",
    tabBarIcon: ({ tintColor }) => {
      return <Icon name="my-location" size={25} color={tintColor} />;
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      region: initialRegion
    };
  }

  onRegionChangeComplete = region => {
    this.setState({
      region
    });
  };

  fetchJobs = async () => {
    const latitude = this.state.region.latitude;
    const longitude = this.state.region.longitude;

    try {
      // const response = await axios.get(
      //   `https://jobs.github.com/positions.json?lat=${latitude}&long=${longitude}`
      // );
      // const jobs = response.data.slice(0, 10);
      // return jobs;
      const response = await axios({
        method: 'get',
        url: 'https://api.yelp.com/v3/businesses/search?term=delis&latitude='+latitude+'&longitude='+longitude,
        headers: {
          Authorization: 'Bearer uEHV6xfRo8t08Mbssj-ISPyjjW5SAY3zBdcKBfJD_48V6vbZmdrceEQTAWgVhCVGvDNGsrXnGh2jgOeKe-oLWla_22118nZBWSG4BmLWtQIVEHUNlmG-4LAUkekGXXYx',
        },
      });
      const jobs = response.data.businesses.slice(0, 10);
      console.log(jobs);
      return jobs;
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <MapView
          style={{ flex: 1 }}
          region={this.state.region}
          onRegionChangeComplete={this.onRegionChangeComplete}
        />
        <Button 
        title="Back"
        onPress={() => this.props.navigation.navigate("auth")}
        />
        <View style={styles.buttonContainer}>
          <AppContext.Consumer>
            {({ addResults }) => {
              return (
                <Button
                  title="Find Food"
                  buttonStyle={styles.buttonStyles}
                  icon={{ name: "search", color: "white" }}
                  onPress={async () => {
                      const jobs = await this.fetchJobs();
                      addResults(jobs);
                      this.props.navigation.navigate("swipe");
                  }}
                />
              );
            }}
          </AppContext.Consumer>
        </View>
      </View>
    );
  }
}
