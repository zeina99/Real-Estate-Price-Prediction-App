import "react-native-gesture-handler";
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

import RNPickerSelect from "react-native-picker-select";
import { fetchPrice } from "../api/price";
import { fetchText } from "../api/text";
import { convertArraytoArrayOfObjects, roundNumber } from "../utils/arrays";

// import * as FileSystem from "expo-file-system";
const numOfBedrooms = [
  { label: "0", value: "0" },
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
  { label: "4", value: "4" },
  { label: "5", value: "5" },
  { label: "6", value: "6" },
  { label: "7", value: "7" },
];

const numOfBathrooms = [
  { label: "0", value: "0" },
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
  { label: "4", value: "4" },
  { label: "5", value: "5" },
  { label: "6", value: "6" },
  { label: "7", value: "7" },
];

const text_files = {
  listing_type: require("../assets/textfiles/listing_type.txt"),
  location: require("../assets/textfiles/location.txt"),
};

export default function PredictForm({ navigation, price, setPrice }) {
  // error message states

  // const [locationError, setLocationError] = useState("");
  // const [bedroomsError, setBedroomsError] = useState("");
  // const [bathroomsError, setBathroomsError] = useState("");
  // const [listingTypeError, setListingTypeError] = useState("");
  // const [areaError, setAreaError] = useState<number>();
  // const [descriptionError, setDescriptionError] = useState("");

  const [errors, setErrors] = useState<{
    location?: string;
    listingType?: string;
    bathrooms?: string;
    bedrooms?: string;
    area?: string;
    description?: string;
  }>({});
  const [requestedSubmit, setRequestedSubmit] = useState(false);
  // Picker selected value States
  const [selectedNumBedrooms, setSelectedNumBedrooms] = useState(null);
  const [selectedNumBathrooms, setSelectedNumBathrooms] = useState(null);
  const [selectedListingType, setSelectedListingType] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);

  // state to store and render text fetched from txt files
  const [location, setLocation] = useState<{ label: string; value: string }[]>(
    []
  );
  const [listingType, setListingType] = useState<
    { label: string; value: string }[]
  >([]);

  // textinnput state
  const [area, onChangeArea] = useState("");
  const [description, setDescription] = useState("");

  const validateInputs = () => {
    let errors: {
      location?: string;
      listingType?: string;
      bathrooms?: string;
      bedrooms?: string;
      area?: string;
      description?: string;
    } = {};

    if (selectedLocation === null) {
      errors.location = "location has to be selected";
    }

    if (selectedListingType === null) {
      errors.listingType = "listing type has to be selected";
    }

    if (selectedNumBathrooms === null) {
      errors.bathrooms = "number of bathrooms has to be selected";
    }

    if (selectedNumBedrooms === null) {
      errors.bedrooms = "number of bedrooms has to be selected";
    }

    if (area === "") {
      errors.area = "area cannot be empty";
    }

    if (description === "") {
      errors.description = "description cannot be empty";
    }

    return errors;
  };

  const handleSubmit = () => {
    let errors = validateInputs();
    setErrors(errors);
    setRequestedSubmit(true);
  };

  const submitRequest = async () => {
    let price;

    try {
      price = await fetchPrice(
        selectedNumBedrooms,
        selectedNumBathrooms,
        area,
        selectedListingType,
        selectedLocation,
        description
      );
    } catch (error) {
      console.log(error);
      console.error(
        selectedNumBedrooms,
        selectedNumBathrooms,
        selectedListingType,
        area,
        selectedLocation,
        description
      );
    }

    navigation.navigate("Result");

    price = roundNumber(price);
    setPrice(price);
    console.log("price is: ", price);
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && requestedSubmit) {
      submitRequest();
    }
  }, [errors]);

  // TODO: could be changed to a reducer
  const addArrayItemsToState = (
    arrayItems: { label: string; value: string }[],
    state: string
  ) => {
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

  useEffect(() => {
    if (location !== null) {
      const listing_type_textArray = fetchText(text_files.listing_type);

      listing_type_textArray.then((listing_type_textArray) => {
        let listing_typeArrayOfObjects = convertArraytoArrayOfObjects(
          listing_type_textArray
        );
        addArrayItemsToState(listing_typeArrayOfObjects, "listingType");
      });
    }
    if (listingType !== null) {
      const location_textArray = fetchText(text_files.location);

      location_textArray.then((location_textArray) => {
        let locationArrayOfObjects =
          convertArraytoArrayOfObjects(location_textArray);
        addArrayItemsToState(locationArrayOfObjects, "location");
      });
    }
  }, []);

  return (
    <ScrollView
      style={styles.containerMargin}
      // contentContainerStyle={styles.container}
    >
      <Text>Number of bedrooms: </Text>

      <RNPickerSelect
        items={numOfBedrooms}
        onValueChange={(value, index) => setSelectedNumBedrooms(value)}
        placeholder={{ label: "Select number of bedrooms", value: null }}
        style={styles}
        useNativeAndroidPickerStyle={false}
      />
      {errors.bedrooms && <Text style={styles.error}> {errors.bedrooms} </Text>}

      <View style={{ paddingVertical: 10 }} />

      <Text>Number of bathrooms: </Text>
      <RNPickerSelect
        onValueChange={(value) => setSelectedNumBathrooms(value)}
        items={numOfBathrooms}
        placeholder={{ label: "Select number of bathrooms", value: null }}
        style={styles}
        useNativeAndroidPickerStyle={false}
      />

      {errors.bathrooms && (
        <Text style={styles.error}> {errors.bathrooms} </Text>
      )}
      <View style={{ paddingVertical: 10 }} />

      <Text> listing type: </Text>

      <RNPickerSelect
        onValueChange={(value, index) => setSelectedListingType(value)}
        items={listingType}
        placeholder={{ label: "Select listing type ", value: null }}
        style={styles}
        useNativeAndroidPickerStyle={false}
        // value={selectedListingType}
      />

      {errors.listingType && (
        <Text style={styles.error}> {errors.listingType} </Text>
      )}
      <View style={{ paddingVertical: 10 }} />

      <Text> Area (sqft): </Text>
      <TextInput
        style={styles.textinput}
        onChangeText={onChangeArea}
        value={area}
        keyboardType="numeric"
      />

      {errors.area && <Text style={styles.error}> {errors.area} </Text>}
      <View style={{ paddingVertical: 10 }} />

      <Text> Location: </Text>

      <RNPickerSelect
        onValueChange={(value, index) => setSelectedLocation(value)}
        items={location}
        placeholder={{ label: "Select Location: ", value: null }}
        style={styles}
        useNativeAndroidPickerStyle={false}
      />

      {errors.location && <Text style={styles.error}> {errors.location} </Text>}
      <View style={{ paddingVertical: 10 }} />

      <Text> Description</Text>

      <TextInput
        style={styles.multilineTextInput}
        multiline
        numberOfLines={6}
        onChangeText={setDescription}
        value={description}
      />
      {errors.description && (
        <Text style={styles.error}> {errors.description} </Text>
      )}
      <StatusBar style="auto" />

      <View style={{ paddingVertical: 10 }} />

      <Button title="Submit" onPress={handleSubmit} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  containerMargin: { backgroundColor: "white", padding: 20 },

  error: {
    color: "red",
  },
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  inputIOS: {
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 0.5,
    borderColor: "gray",
    borderRadius: 8,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "grey",
    borderRadius: 8,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  textinput: {
    height: 40,
    backgroundColor: "#f5f5f5",
    width: 100,
    padding: 10,
    borderRadius: 10,
    borderStyle: "solid",
    borderColor: "black",
  },

  multilineTextInput: {
    borderRadius: 10,
    borderStyle: "solid",
    borderColor: "black",
    padding: 15,
    backgroundColor: "#f5f5f5",
  },

  picker: {
    width: 200,
  },
});
