import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Controller } from "react-hook-form";

const PalsTextInput = ({
  control,
  name,
  disabled,
  rules = {},
  placeholder,
  secureTextEntry,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => (
        <>
          <Text style={styles.label}>{placeholder}</Text>
          <View
            style={[
              styles.container,
              { borderColor: error ? "red" : "#e8e8e8" },
            ]}
          >
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              style={styles.input}
              readOnly={disabled}
              secureTextEntry={secureTextEntry}
            />
          </View>
          {error && (
            <Text style={{ color: "red", alignSelf: "stretch" }}>
              {error.message || "Error"}
            </Text>
          )}
        </>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#EDEDED",
    width: "100%",
    borderColor: "#e8e8e8",
    borderRadius: 10,
    borderColor: "#dadada",
    borderWidth: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: "400",
    marginBottom: 4,
    marginTop: 10,
  },
  input: {
    height: 50,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
});

export default PalsTextInput;
