import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Controller } from "react-hook-form";

const PalsTextInput = ({
  name,
  control,
  rules = {},
  label,
  placeholder,
  keyboardType = "default",
  maxLength,
  style,
  ...props
}) => {
  return (
    <View style={styles.wrapper}>
      {label && <Text style={styles.label}>{label}</Text>}

      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <>
            <TextInput
              style={[styles.input, error && styles.inputError, style]}
              placeholder={placeholder}
              placeholderTextColor="#999"
              keyboardType={keyboardType}
              maxLength={maxLength}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              {...props}
            />
            {error && <Text style={styles.errorText}>{error.message}</Text>}
          </>
        )}
      />
    </View>
  );
};

export default PalsTextInput;

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
  },
  label: {
    fontSize: 14,
    color: "#748390",
    marginBottom: 5,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: "#85B9D7",
    color: "#014589",
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  inputError: {
    borderColor: "#FF4C4C",
  },
  errorText: {
    color: "#FF4C4C",
    fontSize: 12,
    marginTop: 2,
    marginBottom: 16,
  },
});
