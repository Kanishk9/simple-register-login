import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";

const InputField = (props) => {
  const onChangeText = (value) => {
    if (props.keyboardType === "phone-pad") {
      if (/^\d+$/.test(value.toString()) || value === "") {
        props.onChangeText(value);
      }
    }
    else {
      props.onChangeText(value);
    }
  };

  return (
    <View>
      <TextInput
        style={styles.input}
        ref={props.refObj}
        value={props.value}
        placeholder={props.placeholder}
        keyboardType={props.keyboardType}
        secureTextEntry={props.secureTextEntry}
        onChangeText={onChangeText}
        maxLength={props.maxLength}
        blurOnSubmit={props.blurOnSubmit}
        onSubmitEditing={props.onSubmitEditing}
      />
    </View>
  );
};

export default InputField;

const styles = StyleSheet.create({
  input: {
    paddingVertical: 10,
    margin: 10,
    width: 300,
    borderBottomColor: "#061724",
    borderBottomWidth: 3,
    fontSize: 18,
    fontWeight: "500",
  },
});
