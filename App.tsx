import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import PredictForm from "./screens/PredictForm";
import { Result } from "./screens/Result";
// import * as FileSystem from "expo-file-system";

const Stack = createNativeStackNavigator();

export default function App() {
  const [price, setPrice] = useState<number>();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="PredictForm">
        <Stack.Screen name="PredictForm">
          {(props) => (
            <PredictForm {...props} price={price} setPrice={setPrice} />
          )}
        </Stack.Screen>

        <Stack.Screen name="Result">
          {(props) => <Result {...props} price={price} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
