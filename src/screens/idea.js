import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import Random from "./thought";
import Record from "./record";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
  function Idea({navigation}){
      const Tab=createBottomTabNavigator();
      return(
          <Tab.Navigator
           screenOptions={({route})=>({
               tabBarIcon:({focused,size,color})=>{
                   let iconName;
                   if (route.name==='Random'){
                    iconName='book-open';
                    size= focused ? 25:20;
                    color= focused ? '#5f0fff':'#555';

                   }
                   else if(route.name === 'Record'){
                    iconName='coins';
                    size= focused ? 25:20;
                    color= focused ? '#5f0fff':'#555';
                   }
                   return(
                       <FontAwesome5
                    
                         name={iconName}
                         size={size}
                         color={color}

                       />
                   )
               },
              headerShown:false
           })}
          >
              <Tab.Screen
                  name='Random'
                  component={Random}
              />
              <Tab.Screen
                name="Record"
                component={Record}
              />
          </Tab.Navigator>

      )
            }


   export default Idea;