import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './(tabs)/login';
import Post from './(tabs)/post';
import Home from './(tabs)/home';
import Register from './(tabs)/register';
import Dashboard from './(tabs)/dashboard';
import IndiPost from './(tabs)/indiPost';
import { DevSettings } from 'react-native';

const Stack = createNativeStackNavigator();

export default function index() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Posts" component={Post} />
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Post" component={IndiPost} />
    </Stack.Navigator>
  );

}
