import React from "react";
import { Text, View } from "react-native";

export const Result = ({ price }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text> Predicted Price is: {price}</Text>
    </View>
  );
};
