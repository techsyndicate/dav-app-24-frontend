import React, { useState } from 'react';
import { Text, View, TextInput, StyleSheet, Pressable } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Login({navigation}) {

  const [error, setError] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleSubmit() {
    if (!email || !password) {
      setError("Please enter all the details.")
      return
    }
    
    if (!email.includes("@")) {
      setError("Please enter a valid email.")
      return
    }

    console.log(email)
    console.log(password)

    try {
      await AsyncStorage.setItem(
        'Email',
        email,
      );
      await AsyncStorage.setItem(
        'Password',
        password,
      );
    } catch (error) {
      // Error saving data
      console.log('An error occured in asyncstorage: ' + error)
    }
    navigation.navigate('Dashboard')
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
    <Text style={styles.heading}>Login</Text>
    <TextInput 
    style={styles.input}
    placeholder="Email" 
    onChangeText={(newText) => setEmail(newText)}
    />
    <TextInput 
    style={styles.input}
    secureTextEntry={true}
    onChangeText={(newText) => setPassword(newText)}
    placeholder="Password" />
    <Text style={styles.error}>{error}</Text>
    <Pressable 
        style={styles.button}
        onPress={() => handleSubmit()}
      >
        <Text style={styles.buttonTxt}>Submit</Text>
        </Pressable>
    </View>
  
  );
}

const styles = StyleSheet.create({
  heading: {
    fontFamily: "Outfit_700Bold",
    fontSize: 40,
    marginBottom: 30
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
    marginTop: 20
  },
  buttonTxt: {
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: 0.25,
    color: 'white',
    fontFamily: "Outfit_400Regular"
  },
  input: {
    // borderColor: "#000"
    borderColor: "#000",
    width: "60%",
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
    fontFamily: "Outfit_400Regular"
  },
  error: {
    fontFamily: "Outfit_400Regular"
  }
})
