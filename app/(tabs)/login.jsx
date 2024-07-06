import { Text, View, TextInput, StyleSheet, Button } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Dashboard from "./dashboard";


export default function Login({navigation}) {
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
    placeholder="Email" />
    <TextInput 
    secureTextEntry={true}
    placeholder="Password" />
    <Button
      title="Go home"
      onPress={() => navigation.navigate('Home')}
    />
    </View>
  
  );
}

const styles = StyleSheet.create({
  heading : {
    fontSize: 30
  }
})
