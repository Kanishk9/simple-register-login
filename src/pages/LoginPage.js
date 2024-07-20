import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useRef, useState } from "react";
import Button from "../components/Button";
import InputField from "../components/InputField";
import LoadingModal from "../components/LoadingModal";
import AlertModal from "../components/AlertModal";

const LoginPage = ({navigation}) => {
  const [phoneNo, setPhoneNo] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState({
    isAlert: false,
    heading: "",
    description: "",
  });

  const phoneNoRef = useRef(null);
  const passwordRef = useRef(null);

  //Collect form data
  const postData = () => {
    const postData = {};
    postData.phoneNo = phoneNoRef.current.value;
    postData.password = passwordRef.current.value;
  };

  //Validate form data
  const validateFormData = () => {
    if (phoneNo === "") {
      setAlert({
        isAlert: true,
        heading: "Invalid Phone Number",
        description: "Please enter valid phone number.",
      });
      phoneNoRef.current.focus();
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

    if (phoneNo.length !== 10) {
      setAlert({
        isAlert: true,
        heading: "Invalid Phone Number Length",
        description: "Phone number should be of 10 digits.",
      });
      phoneNoRef.current.focus();
      return false;
    }

    return true;
  };

  //On form submit
  const onButtonPress = () => {
    if (!validateFormData()) return;

    //API calls
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigation.navigate("Home");
    }, 3000);
  };

  //Navigate to registration page
  const registerUser = () => {
    navigation.navigate("Register");
    console.log("Navigate to Register");
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <View style={styles.headingContainer}>
          <Image
            style={styles.headingImage}
            source={require("../assets/images/logo.png")}
          />
          <Text style={styles.headingText}>Login to Equip-9</Text>
        </View>
        <View style={styles.inputContainer}>
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
        <Button title="Login" onButtonPress={onButtonPress} />
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
  inputContainer: {
    //
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
