import React from "react";
import { View, Text, Image } from "react-native";
import { AppContext } from "../../AppProvider";
import Swiper from "../../components/Swiper/Swiper";
import { Card, Button } from "react-native-elements";
import { MapView } from "expo";
import HTML from "react-native-render-html";

export class SwipeScreenFood extends React.Component {
  formatAddress = location => {
    var address= ""; 
    for (line in location.display_address) {
      address = address + location.display_address[line] + "\n";
    }
    return address;
  };

  /**
   * Get the relevant image for the rating
   */
  formatRating = rating => {
    switch(rating) {
      case 0:
        return(
          <Image 
            source={require('../../assets/yelp_stars/regular/stars_regular_0.png')}
            style={{height: 18, width: 102}}
          />);
      case 1.0:
        return(
          <Image 
            source={require('../../assets/yelp_stars/regular/stars_regular_1.png')}
            style={{height: 18, width: 102}}
          />);
      case 1.5:
        return(
          <Image 
            source={require('../../assets/yelp_stars/regular/stars_regular_1_half.png')}
            style={{height: 18, width: 102}}
          />);
      case 2.0:
        return(
          <Image 
            source={require('../../assets/yelp_stars/regular/stars_regular_2.png')}
            style={{height: 18, width: 102}}
          />);
      case 2.5:
        return(
          <Image 
            source={require('../../assets/yelp_stars/regular/stars_regular_2_half.png')}
            style={{height: 18, width: 102}}
          />);
      case 3.0:
        return(
          <Image 
            source={require('../../assets/yelp_stars/regular/stars_regular_3.png')}
            style={{height: 18, width: 102}}
          />);
      case 3.5:
        return(
          <Image 
            source={require('../../assets/yelp_stars/regular/stars_regular_3_half.png')}
            style={{height: 18, width: 102}}
          />);
      case 4.0:
        return(
          <Image 
            source={require('../../assets/yelp_stars/regular/stars_regular_4.png')}
            style={{height: 18, width: 102}}
          />);
      case 4.5:
        return(
          <Image 
            source={require('../../assets/yelp_stars/regular/stars_regular_4_half.png')}
            style={{height: 18, width: 102}}
          />);
      case 5.0:
        return(
          <Image 
            source={require('../../assets/yelp_stars/regular/stars_regular_5.png')}
            style={{height: 18, width: 102}}
          />);
    }
    // return ratingImageSource;
  }
  renderCard = job => {
    const address = this.formatAddress(job.location);
    // const ratingImageSource = this.formatRating(job.rating);
    return (
      <Card title={job.name} titleStyle = {{fontSize: 30}} containerStyle={{ height: 600, backgroundColor: "#87AFC7" }}>
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
          {/* This is just a text number for the rating...
           <Text style={{fontSize: 20}}>{job.rating.toFixed(1)} / 5.0</Text> */}
          {this.formatRating(job.rating)}
          <Text style={{fontSize: 20}}>Price: {job.price}</Text>
        </View>
        <View>
          <Text style={{fontSize: 15}}>{address}</Text>
        </View>
      </Card>
    );
  };

  renderNoMoreCards = () => {
    return (
      <Card title="No more restaurants!">
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
