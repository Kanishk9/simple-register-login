import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

import Button from "../components/Button";

const HomePage = ({navigation}) => {
  const [user, setUser] = useState("");

  const handleLogout = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      await axios.post('http://192.168.1.9:3000/logout', {}, {
        headers: { 'x-access-token': token }
      });

      // Remove the token from local storage or secure store
      await AsyncStorage.removeItem('token');
      navigation.navigate('Login');
    } catch (error) {
      console.error(error);
      alert('An error occurred');
    }
  };

  const greeting = () => {
    const time = new Date().getHours();
    if(time >= 4 && time < 12) return "Good Morning!";
    else if(time >= 12 && time < 4) return "Good Afternoon!";
    else if(time >= 4 && time < 8) return "Good Evening!";
    else return "Good Night!"
  };

  //Read user data
  const readData = async () => {
    try{
      const user = JSON.parse(await AsyncStorage.getItem("user"));
      setUser(user.firstName + " " + user.lastName);
    }
    catch(err){
      console.log(err);
    }
  }

  useEffect(() => {
    readData();
  }, [user]);

  return (
    <View style={styles.container}>
      <Button title="Log Out" onButtonPress={handleLogout} />
      <Text style={styles.text}>{greeting()} Mr. {user}</Text>
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
