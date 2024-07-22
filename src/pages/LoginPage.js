import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useRef, useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Button from "../components/Button";
import InputField from "../components/InputField";
import LoadingModal from "../components/LoadingModal";
import AlertModal from "../components/AlertModal";

const LoginPage = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState({
    isAlert: false,
    heading: "",
    description: "",
  });

  const phoneNumberRef = useRef(null);
  const passwordRef = useRef(null);

  //Collect form data
  const postData = () => {
    const postData = {};
    postData.phoneNumber = phoneNumber;
    postData.password = password;

    return postData;
  };

  //Validate form data
  const validateFormData = () => {
    if (phoneNumber === "") {
      setAlert({
        isAlert: true,
        heading: "Invalid Phone Number",
        description: "Please enter valid phone number.",
      });
      phoneNumberRef.current.focus();
      return false;
    }

    if (password === "") {
      setAlert({
        isAlert: true,
        heading: "Invalid Password",
        description: "Please enter valid password.",
      });
      passwordRef.current.focus();
      return false;
    }

    if (phoneNumber.length !== 10) {
      setAlert({
        isAlert: true,
        heading: "Invalid Phone Number Length",
        description: "Phone number should be of 10 digits.",
      });
      phoneNumberRef.current.focus();
      return false;
    }

    return true;
  };

  //On form submit
  const handleLogin = async () => {
    //Form data validation
    if (!validateFormData()) return;

    //API calls
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://192.168.1.9:3000/login",
        postData()
      );
      if (response.data.success) {
        // Store the token in local storage or secure store
        AsyncStorage.setItem("token", response.data.token);
        // Store the user data in local storage or secure store
        await AsyncStorage.setItem('user', JSON.stringify(response.data.user));
        navigation.navigate("Home");
      } else {
        setAlert({ isAlert: true, heading: "Login failed", description: "" });
      }
    } catch (error) {
      console.error(error);
      setAlert({
        isAlert: true,
        heading: "An error occurred",
        description: "",
      });
    }
    setIsLoading(false);
  };

  //Navigate to registration page
  const registerUser = () => {
    navigation.navigate("Register");
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <View style={styles.headingContainer}>
          <Text style={styles.headingText}>Login</Text>
        </View>
        <View style={styles.inputContainer}>
          <InputField
            placeholder="Phone Number"
            keyboardType="phone-pad"
            refObj={phoneNumberRef}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            maxLength={10}
            blurOnSubmit={false}
            onSubmitEditing={() => passwordRef.current.focus()}
          />
          <InputField
            placeholder="Password"
            secureTextEntry={true}
            refObj={passwordRef}
            value={password}
            onChangeText={setPassword}
          />
        </View>
        <Button title="Login" onButtonPress={handleLogin} />
        <View style={styles.registrationContainer}>
          <Text style={styles.registrationText}>New User?</Text>
          <TouchableOpacity onPress={registerUser}>
            <Text style={styles.registrationLink}>Register Now!</Text>
          </TouchableOpacity>
        </View>
      </View>
      <LoadingModal isLoading={isLoading} loadingText="Logging In" />
      <AlertModal alert={alert} setAlert={setAlert} />
    </View>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#061724",
  },
  formContainer: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 20,
    margin: 20,
    borderRadius: 20,
  },
  headingContainer: {
    alignItems: "center",
    margin: 5,
  },
  headingImage: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  headingText: {
    fontSize: 30,
    fontWeight: "bold",
  },
  registrationContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  registrationText: {
    font: 18,
    fontWeight: "bold",
    margin: 5,
  },
  registrationLink: {
    font: 18,
    fontWeight: "bold",
    margin: 5,
    color: "#4E4CB3",
  },
});
