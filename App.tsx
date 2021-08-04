import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  ScrollView,
} from "react-native";

import { Asset } from "expo-asset";
import PickerWrapper from "./components/PickerWrapper";
// import * as FileSystem from "expo-file-system";
const numOfBedrooms: string[] = ["0", "1", "2", "3", "4", "5", "6", "7"];
const numOfBathrooms: string[] = ["0", "1", "2", "3", "4", "5", "6", "7"];

export default function App() {
  const SERVER_URL = "http://127.0.0.1:5000/";
  // Picker States
  const [selectedNumBedrooms, setSelectedNumBedrooms] = useState("");
  const [selectedNumBathrooms, setSelectedNumBathrooms] = useState("");
  const [selectedListingType, setSelectedListingType] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  // state to store and render text fetched from txt files
  const [location, setLocation] = useState<string[]>([]);
  const [listingType, setListingType] = useState<string[]>([]);

  // textinnput state
  const [area, onChangeArea] = useState("");
  const [description, setDescription] = useState("");
  // TextInput things..
  // const [text, setText] = useState("");

  // const onChange = (
  //   e: NativeSyntheticEvent<TextInputChangeEventData>
  // ): void => {
  //   const value = e.nativeEvent.text;
  //   setText(value);
  // };

  const handleSubmit = async (pressEvent) => {
    //
    let res = await fetch(SERVER_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bedrooms: selectedNumBedrooms,
        bathrooms: selectedNumBathrooms,
        area: area,
        location: selectedLocation,
        listing_type: selectedListingType,
        description: description,
      }),
    });
    let price = await res.json();
    let priceText = price.price;
    console.log("price is: ", priceText);
  };
  const text_files = {
    listing_type: require("./assets/textfiles/listing_type.txt"),
    location: require("./assets/textfiles/location.txt"),
  };

  // TODO: could be changed to a reducer
  const addArrayItemsToState = (arrayItems: string[], state: string) => {
    switch (state) {
      case "listingType":
        setListingType([...listingType, ...arrayItems]);
        break;

      case "location":
        setLocation([...location, ...arrayItems]);
        break;
      default:
        break;
    }
  };
  async function fetchText(require_module: any) {
    const item = Asset.fromModule(require_module);
    let textresponse = await fetch(item.uri);
    let text = await textresponse.text();

    let textArray = text.split("\n");
    return textArray;
  }
  useEffect(() => {
    const listing_type_textArray = fetchText(text_files.listing_type);
    listing_type_textArray.then((listing_type_textArray) => {
      addArrayItemsToState(listing_type_textArray, "listingType");
    });

    const location_textArray = fetchText(text_files.location);
    location_textArray.then((location_textArray) =>
      addArrayItemsToState(location_textArray, "location")
    );
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text>Number of bedrooms: </Text>

      <PickerWrapper
        pickerItems={numOfBathrooms}
        selectedPickerItem={selectedNumBathrooms}
        setSelectedPicketItem={setSelectedNumBathrooms}
      />
      <Text>Number of bathrooms: </Text>
      <PickerWrapper
        pickerItems={numOfBedrooms}
        selectedPickerItem={selectedNumBedrooms}
        setSelectedPicketItem={setSelectedNumBedrooms}
      />
      <Text> listing type: </Text>
      <PickerWrapper
        pickerItems={listingType}
        selectedPickerItem={selectedListingType}
        setSelectedPicketItem={setSelectedListingType}
      />
      <Text> Area (sqft): </Text>
      <TextInput
        style={styles.textinput}
        onChangeText={onChangeArea}
        value={area}
        keyboardType="numeric"
      />
      <Text> Location: </Text>

      <PickerWrapper
        pickerItems={location}
        selectedPickerItem={selectedLocation}
        setSelectedPicketItem={setSelectedLocation}
      />
      <Text> Description</Text>

      <TextInput
        style={styles.multilineTextInput}
        multiline
        numberOfLines={16}
        onChangeText={setDescription}
        value={description}
      />
      <StatusBar style="auto" />

      <Button title="Submit" onPress={handleSubmit} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,

    flex: 1,
    // backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
  textinput: {
    height: 40,
    backgroundColor: "#ededed",
    width: 100,
    padding: 10,
  },
  multilineTextInput: {
    backgroundColor: "#ededed",
  },
  picker: {
    width: 200,
  },
});
