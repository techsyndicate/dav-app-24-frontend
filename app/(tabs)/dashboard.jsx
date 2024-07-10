import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Pressable, ScrollView, SafeAreaView } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import PostComponent from '../partials/PostComponent'

export default function Dashboard({ navigation }) {
    const [id, setId] = useState('');
    const [posts, setAllPosts] = useState([]);
    const [error, setError] = useState('');

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
            try {
                const result = await axios.post('https://dav-app-24-backend.onrender.com/media/getallposts');
                const txt = result.data;
                if (txt.success) {
                    setAllPosts(txt.message);
                } else {
                    setError(txt.message);
                    console.log(txt.message);
                }
            } catch (error) {
                console.log('An error occurred:', error);
                setError(error.message);
            }
        };
        
        fetchData();
    }, [navigation]);
    console.log(posts)

    return (
        <SafeAreaView>

        <ScrollView 
        contentContainerStyle={{
            display: 'flex',
            alignItems: 'center',
            paddingTop: 25,
            minHeight: '100%'
            // justifyContent: "center",
        }}
        >
            <Text style={styles.heading}>Posts</Text>
            <Pressable
            style={{
              position: 'absolute',
              top: 15,
              right: 15,
            }}
            onPress={() => navigation.navigate('Home')}>
                <Text style={{
                  fontFamily: 'Outfit_400Regular',
                  color: '#16e16e'
                }}>Go to home</Text>
                </Pressable>

            {posts.map(info => (
                // <Text key={info._id}>{info.title}</Text>
                <PostComponent key={info._id} likes={info.likes} postId={info._id} viewAble={true} navigation={navigation} name={info.name} date={info.date} title={info.title} desc={info.data} uri={info.image} />
            ))}

        </ScrollView>
            <Pressable 
            style={styles.button}
            onPress={() => navigation.navigate('Posts')}
            >
        <Text style={styles.buttonTxt}>+</Text>
        </Pressable>

        </SafeAreaView>
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
      paddingVertical: '3%',
      paddingHorizontal: '5.5%',
      borderRadius: 100000,
      elevation: 3,
      backgroundColor: 'black',
      marginTop: 20,
      marginBottom: 20,
      position: 'absolute',
      bottom: '2%',
      right: '10%'
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
      fontSize: 31,
      color: '#fff',
      fontFamily: "Outfit_400Regular"
    },
    buttonTxt2: {
      fontSize: 16,
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
  