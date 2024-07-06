import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './(tabs)/login';
import Dashboard from './(tabs)/dashboard';
import Home from './(tabs)/home';

const Stack = createNativeStackNavigator();

export default function index() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );

}
