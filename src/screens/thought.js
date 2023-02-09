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
import { TabActions } from "@react-navigation/native";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
//intiation of database
const db = SQLite.openDatabase(
  {
    name: 'MainDB',
    location: 'default',
  },
  () => { },
  error => { console.log(error) }
);

//constant variable to be used 
const numDaysinMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
const monthsnames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
const daysInWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat']
const dateNow=new Date()
const dateCurrent=dateNow.getDate()
const monthNow= dateNow.getMonth()
const curNoDays = numDaysinMonth[monthNow]
const Month = monthsnames[monthNow]
const dateLiteral=`${dateCurrent} ${Month}`



const Tab = createMaterialTopTabNavigator();


// for creating new tab after every 24hrs
function NewTab({arr}){
  return(
    <Tab.Navigator
    screenOptions={{
      tabBarLabelStyle: { fontSize: 8 },
    }}
  >
{
  arr.map((item,index)=>{
    return(
      <Tab.Screen
      key={index +item + 'abcd'}
      name={item.toString()}
      component={NewThoughts}
    />
    )
  })
}
    </Tab.Navigator>
  )
}

//function component to be used in creating the new input methods
function NewThoughts(e){
  const [inputValue,setinputValue]=useState(''); 
  return(
    <View style={styles.thoughtContainer} >
      <TextInput
        value={inputValue}
        placeholder={'write down the review of your day'}
        multiline={true}
        onChangeText={text=>setinputValue(text)}
        style={styles.thoughtInput}
        placeholderTextColor='grey'
      />

    </View>
       
  )
}



//main function to return the tabs  having a blank or filled txt input
function Random() {
  const [time,setTime]=useState([dateLiteral])
  useEffect(()=>{
    let timer=setTimeout(()=>{
      setTime([...time,dateLiteral])
    },1000*24*60*60);
    return ()=>{clearTimeout(timer)}
  },[time])

  return (
    <View style={styles.container}>
     <NewTab
      arr={time}
     />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
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
    height: '100%',
    width: '100%',
  },
  thoughtInput:{
    color: 'black',
    height: '100%',
    width: '100%',
    borderColor:'blue'
    
  },
  thoughtContainer:{
    flex: 1,
    // width: '100%',
    // height: '100%',
    padding: 16,
    paddingTop: 25,
    backgroundColor: '#ffffff',
      // justifyContent:'center',
      alignItems:'start',
  }

});
export default Random;
