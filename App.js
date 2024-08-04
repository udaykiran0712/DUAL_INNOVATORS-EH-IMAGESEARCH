import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SearchScreen from './SearchScreen';
import ImageDetailsScreen from './ImageDetailsScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Search">
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="ImageDetails" component={ImageDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
