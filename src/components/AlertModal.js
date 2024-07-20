import { StyleSheet, Text, View, Modal, ActivityIndicator } from "react-native";
import React from "react";
import Button from "./Button";

const AlertModal = (props) => {
  const {isAlert, heading, description} = props.alert;
  
  //Close alert on click
  const closeAlert = () => {
    props.setAlert({ isAlert: false});
  };

  return (
    <Modal animationType="slide" transparent={true} visible={isAlert}>
      <View style={styles.container}>
        <View style={styles.alertContainer}>
          <Text style={styles.alertHeading}>{heading}</Text>
          <Text style={styles.alertDescription}>{description}</Text>
          <Button title="OK" onButtonPress={closeAlert} />
        </View>
      </View>
    </Modal>
  );
};

export default AlertModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  alertContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 320,
    height: 250,
    borderRadius: 20,
    borderColor: "grey",
    backgroundColor: "#FFFFFF",
  },
  alertHeading: {
    fontSize: 26,
    fontWeight: "bold",
    padding: 5,
    textAlign: "center",
  },
  alertDescription: {
    fontSize: 16,
    paddingHorizontal: 10,
    fontWeight: "500",
    textAlign: "center",
  },
});
