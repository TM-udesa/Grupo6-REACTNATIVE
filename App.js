import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack'

const Stack= createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Register' component={Register} options={{headerShown:false}}/> 
        <Stack.Screen name='Login' component={Login} options={{headerShown:false}}/> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
