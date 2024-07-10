import { Text, View, Pressable, Alert, StyleSheet, Button, Image } from "react-native";
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PostComponent from '../partials/PostComponent'
import axios from 'axios';

export default function IndiPost({navigation, route}) {

    const [liked, setLiked] = useState(false)
    const [id, setId] = useState('')
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchDataFromAsyncStorage = async () => {
            const storedId = await AsyncStorage.getItem('id');
            if (!storedId) {
                return navigation.navigate('Home');
            }
            setId(storedId);
        };

        fetchDataFromAsyncStorage();

        const fetchData = async () => {
            const storedLike = await AsyncStorage.getItem('liked'+route.params.postId);
            console.log('This is liked: ', storedLike)
            if (storedLike == 'true') {
                return setLiked(true)
            } else {
                return setLiked(false)
            }
        };
        
        fetchData();
    }, [navigation]);


    async function like() {
        const data = {
            id: route.params.postId,
            userid: id
        }
        await axios.post('https://dav-app-24-backend.onrender.com/media/like', data)
        .then(async result => {
        const txt = result.data
        if (txt.success) {
            try {
                setLiked(true)
                try {
                    await AsyncStorage.setItem(
                      'liked'+route.params.postId,
                      'true'
                    );
                  } catch (error) {
                    console.log('An error occured in asyncstorage: ' + error)
                  }
            } catch (error) {
            console.log('An error occured in asyncstorage: ' + error)
            }
        } else {
            console.log(txt.message)
            setError(error)
        }
        })      
    }

    async function unlike() {
        const data = {
            id: route.params.postId,
            userid: id
        }
        await axios.post('https://dav-app-24-backend.onrender.com/media/unlike', data)
        .then(async result => {
        const txt = result.data
        if (txt.success) {
            try {
                setLiked(false)
                try {
                    await AsyncStorage.setItem(
                      'liked'+route.params.postId,
                      'false',
                    );
                  } catch (error) {
                    console.log('An error occured in asyncstorage: ' + error)
                  }
            } catch (error) {
            console.log('An error occured in asyncstorage: ' + error)
            }
        } else {
            console.log(txt.message)
            setError(error)
        }
        })      
    }
  
    console.log(route)
  return (
    <View
      style={styles.container}
    >
        <Text style={styles.heading}>{route.params.title}</Text>

      <PostComponent key={route.params.postId} likes={route.params.likes} navigation={route.params.navigation} name={route.params.name} date={route.params.date} title={route.params.title} desc={route.params.desc} uri={route.params.uri} />

        
    {
        liked ?
      <Pressable
        onPress={() => unlike()}
      >
          <Image style={styles.cross} source={require('../../assets/images/hearted.png' )} />
        </Pressable>
        :
      <Pressable
        onPress={() => like()}
      >
          <Image style={styles.cross} source={require('../../assets/images/unhearted.png' )} />
        </Pressable>

    }
    <Text style={styles.buttonTxt2}>{error}</Text>
    </View>
  );
}


const styles = StyleSheet.create({
  cross: {
    width: 38,
    height: 36
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontFamily: "Outfit_700Bold",
    fontSize: 30,
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
  },
  buttonTxt2: {
    fontSize: 16,
    color: 'black',
    fontFamily: "Outfit_400Regular"
  }
})