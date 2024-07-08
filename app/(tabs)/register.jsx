import React, { useState } from 'react';
import { Text, View, TextInput, StyleSheet, Pressable, Linking } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';



export default function Register({navigation}) {

  const [error, setError] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [cnfpassword, setCnfPassword] = useState('')
  const [fname, setFName] = useState('')
  const [lname, setLName] = useState('')

  const data = {
    fname: fname,
    lname: lname,
    email: email,
    password: password,
    cnfpassword: cnfpassword
  }

  async function handleSubmit() {
    if (!email || !password || !fname || !lname || !cnfpassword) {
      setError("Please enter all the details.")
      return
    }
    
    if (!email.includes("@")) {
      setError("Please enter a valid email.")
      return
    }
  
    await axios.post('https://dav-app-24-backend.onrender.com/register', data)
    .then(async result => {
      // console.log(result)
      const txt = result.data
      if (txt.success) {
        try {
          await AsyncStorage.setItem(
            'id',
            txt.message,
          );
        } catch (error) {
          console.log('An error occured in asyncstorage: ' + error)
        }
        navigation.navigate('Post')
      } else {
        setError(txt.message)
      }
    })    
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
    <Text style={styles.heading}>Register</Text>
    <TextInput 
    style={styles.input}
    placeholder="First Name" 
    onChangeText={(newText) => setFName(newText)}
    />
    <TextInput 
    style={styles.input}
    placeholder="Last Name" 
    onChangeText={(newText) => setLName(newText)}
    />
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
    <TextInput 
    style={styles.input}
    secureTextEntry={true}
    onChangeText={(newText) => setCnfPassword(newText)}
    placeholder="Confirm Password" />
    <Text style={styles.error}>{error}</Text>
    <Pressable 
        style={styles.button}
        onPress={() => handleSubmit()}
      >
        <Text style={styles.buttonTxt}>Submit</Text>
        </Pressable>


    <Text style={styles.error}>Already have an account? <Text style={styles.link} onPress={() => navigation.navigate('Login')}>Log in!</Text></Text>
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
    marginTop: 20,
    marginBottom: 20
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
  },
  link: {
    color: "#16e16e",
    textDecorationColor: "#16e16e"
  }
})
