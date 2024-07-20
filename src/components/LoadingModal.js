import { ActivityIndicator, Modal, StyleSheet, Text, View } from "react-native";
import React from "react";

const LoadingModal = (props) => {
  return (
    <Modal animationType="slide" transparent={true} visible={props.isLoading}>
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <Text style={styles.loadingText}>{props.loadingText}</Text>
          <ActivityIndicator size="large" color="#061724" />
        </View>
      </View>
    </Modal>
  );
};

export default LoadingModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  formContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 250,
    height: 200,
    borderRadius: 20,
    borderColor: 'grey',
    backgroundColor: "#FFFFFF",
  },
  loadingText: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
  }
});
