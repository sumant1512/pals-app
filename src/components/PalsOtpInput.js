import React, { useRef } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Controller } from "react-hook-form";

const PalsOtpInput = ({ name, control, rules = {} }) => {
  const inputs = Array.from({ length: 6 }, (_, i) => useRef());

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>Enter OTP</Text>

      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({
          field: { onChange, value = "" },
          fieldState: { error },
        }) => {
          const handleChange = (text, index) => {
            const newValue = value.split("");
            newValue[index] = text;
            onChange(newValue.join("").slice(0, 6));
            if (text && index < 5) {
              inputs[index + 1].current.focus();
            }
          };

          const handleKeyPress = (e, index) => {
            if (
              e.nativeEvent.key === "Backspace" &&
              !value[index] &&
              index > 0
            ) {
              inputs[index - 1].current.focus();
            }
          };

          return (
            <>
              <View style={styles.otpContainer}>
                {Array(6)
                  .fill()
                  .map((_, i) => (
                    <TextInput
                      key={i}
                      ref={inputs[i]}
                      style={styles.otpBox}
                      keyboardType="number-pad"
                      maxLength={1}
                      value={value[i] || ""}
                      onChangeText={(text) => handleChange(text, i)}
                      onKeyPress={(e) => handleKeyPress(e, i)}
                      autoFocus={i === 0}
                    />
                  ))}
              </View>
              {error && <Text style={styles.errorText}>{error.message}</Text>}
            </>
          );
        }}
      />
    </View>
  );
};

export default PalsOtpInput;

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: "#748390",
    marginBottom: 10,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  otpBox: {
    width: 45,
    height: 48,
    borderWidth: 1,
    borderColor: "#85B9D7",
    borderRadius: 8,
    textAlign: "center",
    fontSize: 18,
    color: "#014589",
  },
  errorText: {
    color: "#FF4C4C",
    fontSize: 12,
    marginTop: 5,
  },
});
