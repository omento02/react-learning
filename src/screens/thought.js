import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Animated,
  Easing,
  FlatList,
  ScrollView,
  TextInput
} from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Profile from "./profile";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";


const db = SQLite.openDatabase(
  {
    name: 'MainDB',
    location: 'default',
  },
  () => { },
  error => { console.log(error) }
);

const Tab = createMaterialTopTabNavigator();

function Random() {
  const [inputValue,setinputValue]=useState('i am trying this now!!'); 

  const numDaysinMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  const monthsnames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
  const daysInWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat']
  let i, l, todArray = []

  const timePicker = () => {
    let cDate = new Date
    let todayDat = cDate.getDate()
  
    let curNoDays = numDaysinMonth[cDate.getMonth()]
    let Month = monthsnames[cDate.getMonth()]
    let today=cDate.getDay()
    let day = today - 2
    let c; 

    for (i = todayDat - 2; i <= todayDat + 2; i++) {
      if (day < 0) day = -2 ? day = 5 : day = 6;
      if  (day > 6) day = 7 ? day = 0 : day = 1;
      c=i
      if (i>curNoDays){
        c=i-curNoDays
        Month = monthsnames[cDate.getMonth()+1]
      }
      if (i == todayDat - 1) {
        todArray.push('Yesterday')   
      }
      else if (i == todayDat) {
        todArray.push('Today')
      }
      else if (i == todayDat + 1) {
        todArray.push('Tomorrow')
      }
      else {
        todArray.push(daysInWeek[day] + ' ' + Month + ' ' + c)
      }
      day++
    }
    return todArray;
  }
  let days = timePicker()
  const UserInputText=(props)=>{
    return (
      <TextInput
      {...props}
      editable
      />
    )
    
  }

  function NewThoughts(e){

    return(
      <View style={styles.container} >
        <UserInputText
          value={inputValue}
          multiline
          onChangeText={text=>setinputValue(text)}
          style={styles.input}
        />

      </View>
         
    )
  }

  return (
    <View style={styles.container}>
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: { fontSize: 8 },
        }}
      >
        {
          days.map((item) =>
            <Tab.Screen
              key={item.toString()}
              name={item}
              // component={Profile}
              component={NewThoughts}
            />
          )
        }
      </Tab.Navigator>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    //width: '100%',
    //height: '100%',
    padding: 16,
    paddingTop: 25,
    backgroundColor: '#ffffff',
    //   justifyContent:'center',
    //   alignItems:'center',
  },
  flatlistContainer: {
    flex: 1,
    //width: '100%',
    //height: '100%',
    padding: 16,
    paddingTop: 25,
    backgroundColor: '#ffffff',
    // justifyContent:'center',
    // alignItems:'center',
    //margin:100,
  },
  button: {
    width: 80,
    height: 40,
    borderWidth: 1,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
  },
  text: {
    color: 'black'
  },
  cell: {
    borderWidth: 1,
    borderColor: '#ddd',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  tableheader: {
    borderWidth: 0.5,
    borderColor: '#ddd',
    backgroundColor: '#d00fff',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  flatlistInput: {
    flex: 1,
    // width: 250,
    // height:300,
    borderWidth: 1,
    margin: 5,
    //backgroundColor:'blue',
    //textAlign:'center',
    color: 'black',
  },
  input: {
    textAlign: 'center',
    color: 'black',
    height: 100,
    width: 100,
  },

});
export default Random;
