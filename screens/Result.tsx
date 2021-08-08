import React from "react";
import { Text, View, StyleSheet } from "react-native";

export const Result = ({ price }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={styles.text}> {`Predicted Price is:\n\n\t${price}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
  },
});
