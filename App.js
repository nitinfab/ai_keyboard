import { StatusBar } from 'expo-status-bar';
import React, { useState, useRef } from 'react';
import Keyboard from 'react-simple-keyboard';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import "react-simple-keyboard/build/css/index.css";

export default function App() {
  const [input, setInput] = useState("");
  const [layout, setLayout] = useState("default");
  const keyboard = useRef();

  const onChange = input => {
    setInput(input);
    console.log("Input changed", input);
  };

  const handleShift = () => {
    const newLayoutName = layout === "default" ? "shift" : "default";
    setLayout(newLayoutName);
  };

  const onKeyPress = button => {
    console.log("Button pressed", button);

    /**
     * If you want to handle the shift and caps lock buttons
     */
    if (button === "{shift}" || button === "{lock}") handleShift();
  };

  const onChangeInput = event => {
    const input = event.target.value;
    setInput(input);
    keyboard.current.setInput(input);
  };

  return (
    <View style={styles.container}>
     <TextInput
        style={styles.input}
        value={input}
        placeholder={"Tap on the virtual keyboard to start"}
        onChange={onChangeInput}
      />
			<Keyboard
        style={styles.keyboard}
        keyboardRef={r => (keyboard.current = r)}
        layoutName={layout}
        onChange={onChange}
        onKeyPress={onKeyPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    width: 1000,
    height: 100,
    margin: 100,
    padding: 20,
    fontSize: 20,
  },
  keyboard: {
    maxWidth: 850,
  },
  container: {
    width: "auto",
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
