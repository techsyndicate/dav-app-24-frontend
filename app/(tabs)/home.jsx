import { Text, View, Button, Alert, StyleSheet } from "react-native";

export default function Home({navigation}) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={styles.heading}>Home</Text>
      <Button
        title="Login"
        onPress={() => navigation.navigate('Login')}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  heading: {
    fontSize: 20
  }
})