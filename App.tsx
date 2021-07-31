import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from "react-native";

import { Asset, useAssets } from "expo-asset";
import PickerWrapper from "./components/PickerWrapper";
// import * as FileSystem from "expo-file-system";
const numOfBedrooms: string[] = ["0", "1", "2", "3", "4", "5", "6", "7"];
const numOfBathrooms: string[] = ["0", "1", "2", "3", "4", "5", "6", "7"];

export default function App() {
  const [selectedNumBedrooms, setSelectedNumBedrooms] = useState("");
  const [selectedNumBathrooms, setSelectedNumBathrooms] = useState("");
  const [selectedListingType, setSelectedListingType] = useState("");

  const [listingType, setListingType] = useState<string[]>([]);
  // TextInput things..
  // const [text, setText] = useState("");

  // const onChange = (
  //   e: NativeSyntheticEvent<TextInputChangeEventData>
  // ): void => {
  //   const value = e.nativeEvent.text;
  //   setText(value);
  // };

  // async function fetchText(file_path: string) {
  //   const item = Asset.fromModule(require(file_path));
  //   let text;
  //   try {
  //     let textresponse = await fetch(item.uri);
  //     text = await textresponse.text();
  //   } catch (error) {
  //     console.error(error);
  //   }
  //   return text;
  // }
  // useEffect(() => {
  //   fetchText("./assets/textfiles/listing_type.txt");
  // }, []);

  const addArrayItemsToState = (arrayItems: string[], state: string) => {
    switch (state) {
      case "listingType":
        setListingType([...listingType, ...arrayItems]);
        break;

      default:
        break;
    }
  };
  async function fetchText() {
    const item = Asset.fromModule(
      require("./assets/textfiles/listing_type.txt")
    );
    let textresponse = await fetch(item.uri);
    let text = await textresponse.text();

    let textArray = text.split("\n");
    addArrayItemsToState(textArray, "listingType");
  }
  useEffect(() => {
    fetchText();
  }, []);

  // readListingTypeContent();
  // listing type
  //   TODO: output unique listing types to a file
  //         read them into the app and display into dropdown list
  // bedrooms - done
  // bathrooms - done
  // area
  //   TODO: let the user input their number?? or we can set a max and min according to our data model
  // price
  //    TODO: just let them input their number? I guess
  // location
  //   TODO: output unique locations to a file
  //         read them into the app and display into dropdown list
  // description
  //    TODO: find large textinput , will see
  return (
    <View style={styles.container}>
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
      <PickerWrapper
        pickerItems={listingType}
        selectedPickerItem={selectedListingType}
        setSelectedPicketItem={setSelectedListingType}
      />
      <StatusBar style="auto" />
    </View>
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
    height: 60,
    backgroundColor: "#ededed",
    width: 100,
    padding: 10,
  },
  picker: {
    width: 200,
  },
});
