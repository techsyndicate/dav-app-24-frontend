import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Pressable, Image } from "react-native";


export default function PostComponent(props) {

  const date = new Date(props.date).toLocaleDateString()

  return (
    <View style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'center',
      width: '90%',
      gap: 5,
      marginBottom: 25,
    }}>
        <View style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          // justifyContent: 'center',
          gap: 4,
          width: '100%',
        }}>
            <Text style={styles.heading2}>{props.name}</Text>
            <View style={styles.circle} />
            <Text style={styles.normalTextDate} >{date}</Text>
            {props.viewAble ?
            <Pressable style={{
              marginLeft: '35%'
            }}
            onPress={() => props.navigation.navigate('Post', {postId: props.postId, likes: props.likes, name: props.name, date: props.date, title: props.title, desc: props.desc, uri: props.uri})}
            >
              <Text style={styles.normalTextDate2} >View</Text>
            </Pressable> : ''
            }
        </View>
        <View style={{
          borderWidth: 1,
          borderColor: '#000',
          borderStyle: 'solid',
          width: '100%',
          padding: 8,
          borderRadius: 5,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center', 
          gap: 5,
          position: 'relative'
        }}>
          <Text style={styles.normalTextDate3} >{props.likes} likes</Text>
          <Text style={styles.heading3} >{props.title}</Text>
          <Text style={styles.normalText} >{props.desc}</Text>
          <Image source={{ uri: props.uri }} style={{ width: '100%', height: 200, borderRadius: 5 }}/>
        </View>
    </View>
  );

}


const styles = StyleSheet.create({
  circle: {
    width: 5,
    aspectRatio: 1,
    borderRadius: 100,
    backgroundColor: '#16e16e'
  },
  normalText: {
    fontSize: 16,
    fontFamily: 'Outfit_400Regular',
    color: '#000'
  },
  normalTextDate: {
    fontSize: 12,
    fontFamily: 'Outfit_400Regular',
    color: '#000'
  },
  normalTextDate3: {
    fontSize: 12,
    fontFamily: 'Outfit_400Regular',
    color: '#000',
    position: 'absolute',
    top: 8,
    right: 8
  },
  normalTextDate2: {
    fontSize: 12,
    fontFamily: 'Outfit_400Regular',
    color: '#000',
    color: '#16e16e'
  },
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
    fontFamily: "Outfit_700Bold",
    fontSize: 20,
    alignSelf: 'flex-start',
    marginBottom: 2
  },
  heading3: {
    fontFamily: "Outfit_700Bold",
    fontSize: 20,
    alignSelf: 'flex-start',
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
