import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useRef, useState } from "react";
import axios from 'axios';

import Button from "../components/Button";
import InputField from "../components/InputField";
import LoadingModal from "../components/LoadingModal";
import AlertModal from "../components/AlertModal";

const RegistrationPage = ({navigation}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState({isAlert: false, heading: '', description: ''});

  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const phoneNumberRef = useRef(null);
  const passwordRef = useRef(null);

  //Collect form data
  const postData = () => {
    const postData = {};
    postData.firstName = firstName;
    postData.lastName = lastName;
    postData.phoneNumber = phoneNumber;
    postData.password = password;

    return postData;
  }

  //Validate form data
  const validateFormData = () => {
    if(firstName === ''){
      setAlert({isAlert: true, heading: 'Invalid First Name', description: 'Please enter valid first name.'});
      firstNameRef.current.focus();
      return false;
    }

    if(lastName === ''){
      setAlert({isAlert: true, heading: 'Invalid Last Name', description: 'Please enter valid last name.'});
      lastNameRef.current.focus();
      return false;
    }

    if(phoneNumber === ''){
      setAlert({isAlert: true, heading: 'Invalid Phone Number', description: 'Please enter valid phone number.'});
      phoneNumberRef.current.focus();
      return false;
    }

    if(password === ''){
      setAlert({isAlert: true, heading: 'Invalid Password', description: 'Please enter valid password.'});
      passwordRef.current.focus();
      return false;
    }

    if(phoneNumber.length !== 10){
      setAlert({isAlert: true, heading: 'Invalid Phone Number Length', description: 'Phone number should be of 10 digits.'});
      phoneNumberRef.current.focus();
      return false;
    }

    return true;
  }

  //On form submit
  const handleRegister = async () => {
    //Form data validation
    if(!validateFormData()) return;

    //API Call
    setIsLoading(true);
    try {
      const response = await axios.post('http://192.168.1.9:3000/register', postData());
      if (response.data.success) {
        navigation.navigate('Login');
      } else {
        setAlert({
          isAlert: true,
          heading: "Registration failed",
          description: "",
        });
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
  
  //Navigate to log in page
  const logInUser = () => {
    navigation.navigate("Login");
  }

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <View style={styles.headingContainer}>
          <Text style={styles.headingText}>Register</Text>
        </View>
        <View style={styles.inputContainer}>
          <InputField
            placeholder="First Name"
            refObj={firstNameRef}
            value={firstName}
            onChangeText={setFirstName}
            blurOnSubmit={false}
            onSubmitEditing={() => lastNameRef.current.focus()}
          />
          <InputField
            placeholder="Last Name"
            refObj={lastNameRef}
            value={lastName}
            onChangeText={setLastName}
            blurOnSubmit={false}
            onSubmitEditing={() => phoneNumberRef.current.focus()}
          />
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
        <Button title="Register" onButtonPress={handleRegister} />
        <View style={styles.logInContainer}>
          <Text style={styles.logInText}>Already a User?</Text>
          <TouchableOpacity onPress={logInUser}>
            <Text style={styles.logInLink}>Log In!</Text>
          </TouchableOpacity>
        </View>
      </View>
      <LoadingModal isLoading={isLoading} loadingText="Registering User" />
      <AlertModal alert={alert} setAlert={setAlert} />
    </View>
  );
};

export default RegistrationPage;

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
    alignItems: 'center',
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
  logInContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  logInText: {
    font: 18,
    fontWeight: 'bold',
    margin: 5,
  },
  logInLink: {
    font: 18,
    fontWeight: 'bold',
    margin: 5,
    color: '#4E4CB3'
  }
});
