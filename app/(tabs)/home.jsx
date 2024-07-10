import { Text, View, Pressable, Alert, StyleSheet, Button } from "react-native";
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts ,Outfit_400Regular, Outfit_700Bold } from '@expo-google-fonts/outfit';

export default function Home({navigation}) {
  
  const [id, setId] = useState('')
  let [fontsLoaded] = useFonts({
    Outfit_400Regular,
    Outfit_700Bold
  });

  if (!fontsLoaded) {
    return null;
  }


  async function handleLogoutUser() {
    await AsyncStorage.removeItem('id');
    setId('')
  }

  async function fetchDataFromAsyncStorage() {
    const storedId = await AsyncStorage.getItem('id');
  
    setId(storedId)
  }

  fetchDataFromAsyncStorage()

  return (
    <View
      style={styles.container}
    >
      <Text style={styles.heading}>Hi user! 👋</Text>
      {
        id ? 
        <View>
        <Pressable 
        style={styles.button}
        onPress={() => navigation.navigate('Dashboard')}
        >
        <Text style={styles.buttonTxt}>Go to dashboard</Text>
        </Pressable>
        <Pressable 
        style={styles.button2}
        onPress={() => handleLogoutUser()}
        >
        <Text style={styles.buttonTxt}>Logout</Text>
        </Pressable>
        </View> : 
        <Pressable 
        style={styles.button}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.buttonTxt}>Login</Text>
        </Pressable>
      }
      
      {/* <Button
        title="Fetch"
        onPress={() => fetchDataFromAsyncStorage()}
      /> */}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontFamily: "Outfit_700Bold",
    fontSize: 40,
    marginBottom: 50
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
  },
  button2: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    marginTop: 15,
    backgroundColor: 'black',
  },
  buttonTxt: {
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: 0.25,
    color: 'white',
    fontFamily: "Outfit_400Regular"
  }
})