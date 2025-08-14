import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  FlatList,
} from "react-native";
import { Controller } from "react-hook-form";

const PalsSelectInput = ({
  label,
  data,
  value,
  onSelect,
  name,
  control,
  rules,
}) => {
  const [visible, setVisible] = useState(false);

  const handleSelect = (item, onChange) => {
    onChange(item.value);
    onSelect?.(item);
    setVisible(false);
  };

  if (control && name) {
    // Controlled via react-hook-form
    return (
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { onChange, value }, fieldState: { error } }) => {
          const selected = data.find((d) => d.value === value);

          return (
            <View style={styles.container}>
              {label && <Text style={styles.label}>{label}</Text>}

              <TouchableOpacity
                style={styles.dropdown}
                onPress={() => setVisible(true)}
              >
                <Text style={styles.selectedText}>
                  {selected?.label || "Select an option"}
                </Text>
              </TouchableOpacity>

              {error && (
                <Text style={{ color: "red", fontSize: 12, marginTop: 4 }}>
                  {error.message}
                </Text>
              )}

              <Modal transparent visible={visible} animationType="fade">
                <TouchableOpacity
                  style={styles.overlay}
                  onPress={() => setVisible(false)}
                >
                  <View style={styles.modalContent}>
                    <FlatList
                      data={data}
                      keyExtractor={(item) => item.value}
                      renderItem={({ item }) => (
                        <TouchableOpacity
                          style={styles.option}
                          onPress={() => handleSelect(item, onChange)}
                        >
                          <Text style={styles.optionText}>{item.label}</Text>
                        </TouchableOpacity>
                      )}
                    />
                  </View>
                </TouchableOpacity>
              </Modal>
            </View>
          );
        }}
      />
    );
  }

  // If not used with react-hook-form
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}

      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => setVisible(true)}
      >
        <Text style={styles.selectedText}>
          {value?.label || "Select an option"}
        </Text>
      </TouchableOpacity>

      <Modal transparent visible={visible} animationType="fade">
        <TouchableOpacity
          style={styles.overlay}
          onPress={() => setVisible(false)}
        >
          <View style={styles.modalContent}>
            <FlatList
              data={data}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => {
                    onSelect(item);
                    setVisible(false);
                  }}
                >
                  <Text style={styles.optionText}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  label: {
    fontSize: 16,
    fontWeight: "400",
    marginBottom: 4,
    marginTop: 10,
  },
  dropdown: {
    height: 50,
    backgroundColor: "#EDEDED",
    width: "100%",
    borderColor: "#e8e8e8",
    borderRadius: 10,
    borderColor: "#dadada",
    justifyContent: "center",
  },
  selectedText: {
    paddingHorizontal: 10,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 8,
    maxHeight: "50%",
  },
  option: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  optionText: {
    fontSize: 16,
  },
});

export default PalsSelectInput;
