import { StyleSheet, SafeAreaView } from "react-native";
import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import RegistrationPage from "./src/pages/RegistrationPage";
import LoginPage from "./src/pages/LoginPage";
import HomePage from "./src/pages/HomePage";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Register" component={RegistrationPage} />
          <Stack.Screen name="Login" component={LoginPage} />
          <Stack.Screen name="Home" component={HomePage} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
