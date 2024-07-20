import { StyleSheet, Text, View, Image,TouchableOpacity } from "react-native";
import React, { useRef, useState } from "react";

import Button from "../components/Button";
import InputField from "../components/InputField";
import LoadingModal from "../components/LoadingModal";
import AlertModal from "../components/AlertModal";

const RegistrationPage = ({navigation}) => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState({isAlert: false, heading: '', description: ''});

  const firstnameRef = useRef(null);
  const lastnameRef = useRef(null);
  const phoneNoRef = useRef(null);
  const passwordRef = useRef(null);

  //Collect form data
  const postData = () => {
    const postData = {};
    postData.firstname = firstnameRef.current.value;
    postData.lastname = lastnameRef.current.value;
    postData.phoneNo = phoneNoRef.current.value;
    postData.password = passwordRef.current.value;
  }

  //Validate form data
  const validateFormData = () => {
    const validPhoneNo = /^[0-9]*$/
    if(firstname === ''){
      setAlert({isAlert: true, heading: 'Invalid First Name', description: 'Please enter valid first name.'});
      firstnameRef.current.focus();
      return false;
    }

    if(lastname === ''){
      setAlert({isAlert: true, heading: 'Invalid Last Name', description: 'Please enter valid last name.'});
      lastnameRef.current.focus();
      return false;
    }

    if(phoneNo === ''){
      setAlert({isAlert: true, heading: 'Invalid Phone Number', description: 'Please enter valid phone number.'});
      phoneNoRef.current.focus();
      return false;
    }

    if(password === ''){
      setAlert({isAlert: true, heading: 'Invalid Password', description: 'Please enter valid password.'});
      passwordRef.current.focus();
      return false;
    }

    if(phoneNo.length !== 10){
      setAlert({isAlert: true, heading: 'Invalid Phone Number Length', description: 'Phone number should be of 10 digits.'});
      phoneNoRef.current.focus();
      return false;
    }

    return true;
  }

  //On form submit
  const onButtonPress = () => {
    if(!validateFormData()) return;

    //API calls
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigation.navigate("Home");
    }, 3000);
  };
  
  //Navigate to log in page
  const logInUser = () => {
    navigation.navigate("Login");
    console.log();
  }

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <View style={styles.headingContainer}>
          <Image
            style={styles.headingImage}
            source={require("../assets/images/logo.png")}
          />
          <Text style={styles.headingText}>Register to Equip-9</Text>
        </View>
        <View style={styles.inputContainer}>
          <InputField
            placeholder="First Name"
            refObj={firstnameRef}
            value={firstname}
            onChangeText={setFirstname}
            blurOnSubmit={false}
            onSubmitEditing={() => lastnameRef.current.focus()}
          />
          <InputField
            placeholder="Last Name"
            refObj={lastnameRef}
            value={lastname}
            onChangeText={setLastname}
            blurOnSubmit={false}
            onSubmitEditing={() => phoneNoRef.current.focus()}
          />
          <InputField
            placeholder="Phone Number"
            keyboardType="phone-pad"
            refObj={phoneNoRef}
            value={phoneNo}
            onChangeText={setPhoneNo}
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
        <Button title="Register" onButtonPress={onButtonPress} />
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
  inputContainer: {
    //
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
