import React from "react";
import { View, Text, Image } from "react-native";
import { AppContext } from "../../AppProvider";
import Swiper from "../../components/Swiper/Swiper";
import { Card, Button } from "react-native-elements";
import { MapView } from "expo";
import HTML from "react-native-render-html";

export class SwipeScreenFood extends React.Component {
  // formatJobDesc = desc => {
  //   if (desc.length > 200) {
  //     desc = desc.substr(0, 150) + "...";
  //   }
  //   return desc;
  // };
  formatAddress = location => {
    var address= ""; 
    for (line in location.display_address) {
      address = address + location.display_address[line] + "\n";
    }

    return address;
  };
  renderCard = job => {
    // const jobDesc = this.formatJobDesc(job.description);
    const address = this.formatAddress(job.location);
    return (
      <Card title={job.name} titleStyle = {{fontSize: 30}} containerStyle={{ height: 600 }}>
        <View style={{ height: 300, marginBottom: 20 }}>
          <Image
            style={{height: 300, width: 300}}
            source={{ uri: '' + job.image_url }}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            marginBottom: 10
          }}
        >
          <Text style={{fontSize: 20}}>{job.rating}</Text>
          <Text style={{fontSize: 20}}>{job.price}</Text>
        </View>
        <View>
          <Text style={{fontSize: 15}}>{address}</Text>
        </View>
      </Card>
    );
  };

  renderNoMoreCards = () => {
    return (
      <Card title="No more jobs!">
        <Button
          title="Back To Map"
          icon={{ name: "my-location", color: "white" }}
          buttonStyle={{ backgroundColor: "#E43F3F", height: 50 }}
          onPress={() => {
            this.props.navigation.navigate("map");
          }}
        />
      </Card>
    );
  }

  render() {
    return (
      <View>
        <AppContext.Consumer>
          {({ results, likeJob }) => {
            return (
              <Swiper
                data={results}
                renderCard={this.renderCard}
                renderNoMoreCards={this.renderNoMoreCards}
                keyProp="id"
                onSwipeRight={likeJob}
              />
            );
          }}
        </AppContext.Consumer>
      </View>
    );
  }
}
