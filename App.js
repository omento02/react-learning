import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, {useEffect} from 'react';
import Home from './src/screens/home';
import Idea from './src/screens/idea';
import SplashScreen from  "react-native-splash-screen";

function App(){
  const Stack = createStackNavigator();
  // useEffect(() => {
  //   SplashScreen.hide();
  // }, [])

  return(
    <NavigationContainer>
      <Stack.Navigator
      initialRouteName='Home'
      screenOptions={{
        headerTitleAlign:'center',
        headerTintColor: 'red',
        headerStyle:{
          'backgroundColor':'blue',
   
        },
      }
       
      }
      >
        <Stack.Screen
        name='Home'
        component={Home}
        options={{title:'Home'}}
        />
          <Stack.Screen
        name='Idea'
        component={Idea}
        options={{title:'ARCHIEVE'}}
        />

      </Stack.Navigator>
    </NavigationContainer>

  )
}

export default App;
