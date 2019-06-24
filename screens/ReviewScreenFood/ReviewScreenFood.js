import React from "react";
import { View, Text, Linking, Image } from "react-native";
import { AppContext } from "../../AppProvider";
import { ScrollView } from "react-native-gesture-handler";
import { Card, Button, Icon } from "react-native-elements";
import { MapView } from "expo";
import { styles } from "./ReviewScreenFood.styles"

export class ReviewScreenFood extends React.Component {
  static navigationOptions = {
    title: "Review",
    tabBarIcon: ({ tintColor }) => {
      return <Icon name="favorite" size={25} color={tintColor} />;
    }
  }
  renderLikedJobs = likedJobs => {
    if (likedJobs.length <= 0) {
      return this.renderNoMoreCards();
    }

    return likedJobs.map(job => {
      const { name, display_phone, url, is_closed, id, image_url } = job;

      return (
        <Card title={name} titleStyle={{ fontSize: 15 }} key={id} containerStyle={{backgroundColor: "#87AFC7"}}>
          <View style={{ height: 200 }}>
            <Image
            style={{height: 200, width: 300}}
            source={{ uri: '' + image_url }}
            />
          </View>
          <View
            style={{
              marginTop: 10,
              marginBottom: 10,
              flexDirection: "row",
              justifyContent: "space-around"
            }}
          >
            { is_closed ? (<Text style={{ fontStyle: "italic" }}>Closed</Text> )
                        : <Text style={{ fontStyle: "italic" }}>Open</Text>
            }
            <Text style={{ fontStyle: "italic" }}>{display_phone}</Text>
          </View>
          <Button
            title="Book Now"
            onPress={() => Linking.openURL(url)}
            buttonStyle={{ backgroundColor: "steelblue" }}
            disabled={is_closed}
          />
        </Card>
      );
    });
  };

  renderNoMoreCards = () => {
    return (
      <Card title="No restaurants selected.">
        <Button
          title="Back To Map"
          icon={{ name: "my-location", color: "white" }}
          buttonStyle={{ backgroundColor: "#87AFC7", height: 50 }}
          onPress={() => {
            this.props.navigation.navigate("map");
          }}
        />
      </Card>
    );
  }

  render() {
    return (
      <ScrollView>
        <AppContext.Consumer>
          {({ likedJobs }) => {
            return this.renderLikedJobs(likedJobs);
          }}
        </AppContext.Consumer>
      </ScrollView>
    );
  }
}
