import React, { useState } from "react";
import { Text, View, Button, Image, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function Dashboard({ navigation }) {
  const [imageUri, setImageUri] = useState(null);

  // Function to open the camera
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
      base64: true, // Enable base64 encoding
    });

    if (!result.canceled) {
      const base64String = result.assets[0].base64;
      console.log(base64String.slice(0, 10)); // Log first 10 digits of base64 string
      setImageUri(result.assets[0].uri);
    }
  };

  // Function to select an image from the gallery
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
      base64: true, // Enable base64 encoding
    });

    if (!result.canceled) {
      const base64String = result.assets[0].base64;
      console.log(base64String.slice(0, 10)); // Log first 10 digits of base64 string
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
      <Text>Dashboard</Text>
      <Button title="Open Camera" onPress={openCamera} />
      <Button title="Pick Image from Gallery" onPress={pickImage} />
      {imageUri && (
        <Image
          source={{ uri: imageUri }}
          style={{ width: 200, height: 200, marginTop: 20 }}
        />
      )}
    </View>
  );
}
