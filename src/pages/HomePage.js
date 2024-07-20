import { StyleSheet, Text, View } from "react-native";
import React from "react";

import Button from "../components/Button";

const HomePage = () => {
  const greeting = () => {
    const time = new Date().getHours();
    if(time >= 4 && time < 12) return "Good Morning!";
    else if(time >= 12 && time < 4) return "Good Afternoon!";
    else if(time >= 4 && time < 8) return "Good Evening!";
    else return "Good Night!"
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{greeting()} Mr. Kanishk Bisht</Text>
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "600",
  },
});
