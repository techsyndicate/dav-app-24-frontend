import React, { useState } from "react";
import { Text, View, Pressable, Image, Alert, StyleSheet, TextInput, TextArea } from "react-native";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


export default function Post({ navigation }) {

  const [imageUri, setImageUri] = useState(null);
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');


  async function fetchDataFromAsyncStorage() {
    const storedId = await AsyncStorage.getItem('id');
    
    console.log(storedId)
    setId(storedId)
  }
  fetchDataFromAsyncStorage()


  const openCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Denied", "We need camera permissions to make this work!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      const base64String = result.assets[0].base64;
      console.log(base64String.slice(0, 20));
      // const data = {
      //   image: base64String,
      //   userid: id,
      //   title: 'bhavit',
      //   data: 'shyamak <3 bhavit'
      // }
      // await axios.post('https://dav-app-24-backend.onrender.com/register', data)
      // .then(async result => {
      //   const txt = result.data
      //   if (txt.success) {
      //     try {
      //       console.log(txt.message)
      //     } catch (error) {
      //       console.log('An error occured in asyncstorage: ' + error)
      //     }
      //     route.navigate('Dashboard')
      //   } else {
      //     console.log(txt.message)
      //   }
      // })
      setImageUri(result.assets[0].uri);
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Denied", "We need gallery permissions to make this work!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      const base64String = result.assets[0].base64;
      console.log(base64String);
      setImageUri(result.assets[0].uri);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={styles.heading}>Make a post</Text>
      <TextInput 
    style={styles.input}
    placeholder="Enter title" 
    onChangeText={(newText) => setTitle(newText)}
    />
      <TextInput
    multiline={true}
    style={styles.textArea}
    placeholder="Enter description"
    numberOfLines={6}
    onChangeText={newText => setDesc(newText)}
     />
      <Text style={styles.heading2}>Upload image</Text>
      <View style={styles.buttonContainer}>
      <Pressable 
        style={styles.button}
        onPress={() => openCamera()}
      >
        <Text style={styles.buttonTxt}>Camera</Text>
        </Pressable>
      <Pressable 
        style={styles.button}
        onPress={() => pickImage()}
      >
        <Text style={styles.buttonTxt}>Gallery</Text>
        </Pressable>
      </View>
      {imageUri && (
        <View style={styles.imageContainer}>
          <Pressable 
        style={styles.cross}
        onPress={() => setImageUri('')}
      >
          <Image style={styles.cross} source={require('../../assets/images/cross.png' )} />
        </Pressable>
          <Image
            source={{ uri: imageUri }}
            style={{ width: 100, height: 100, borderRadius: 5 }}
          />
        </View>
      )}
      <Pressable 
        style={styles.button3}
        onPress={() => {console.log('submitted')}}
      >
        <Text style={styles.buttonTxt2}>Submit</Text>
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
  imageContainer: {
    position: 'relative',
    alignSelf: 'flex-start',
    marginLeft: '15%'
  },
  cross: {
    width: 30,
    height: 30,
    position: 'absolute',
    top: '-12%',
    right: '-4%',
    zIndex: 100
  },
  buttonContainer: {
    display: 'flex',
    width: '70%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // gap: 10,
    marginTop: -20
  },
  heading2: {
    fontFamily: "Outfit_400Regular",
    fontSize: 20,
    alignSelf: 'flex-start',
    marginLeft: '15%',
    marginBottom: 10,
    marginTop: 10
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
  button3: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#16e16e',
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
  buttonTxt2: {
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: 0.25,
    color: 'black',
    fontFamily: "Outfit_400Regular"
  },
  input: {
    borderColor: "#000",
    width: "70%",
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
    fontFamily: "Outfit_400Regular"
  },
  textArea: {
    borderColor: "#000",
    width: "70%",
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
    fontFamily: "Outfit_400Regular",
    textAlignVertical: 'top'
  },
  error: {
    fontFamily: "Outfit_400Regular"
  },
  link: {
    color: "#16e16e",
    textDecorationColor: "#16e16e"
  }
})
