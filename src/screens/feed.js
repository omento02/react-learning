import React,{useState,useEffect} from "react";
import {
    StyleSheet,
    Text,
    View,
    Button,
    TouchableOpacity,
    FlatList,
    TextInput,
  } from 'react-native';
  import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
  import Random from "./thought";
  import Record from "./record";

export default function Feed(){
  const Tab=createBottomTabNavigator();
    return(
        <View style={styles.container}>
          <Text style={styles.text}>
            HELLO THERE
            </Text>  
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
      flex:1,
      //width: '100%',
      //height: '100%',
      padding: 16,
      paddingTop: 25,
      backgroundColor:'#ffffff',
    //   justifyContent:'center',
    //   alignItems:'center',
    },
    flatlistContainer:{
        flex:1,
        //width: '100%',
        //height: '100%',
        padding: 16,
        paddingTop: 25,
        backgroundColor:'#ffffff',
        // justifyContent:'center',
        // alignItems:'center',
        //margin:100,
      },
    button:{
      width: 80,
      height:40,
      borderWidth:1,
       margin:10,
       alignItems:'center',
       justifyContent:'center',
       backgroundColor:'blue',
   },
    text:{
        color:'black'
    },
    cell: {
        borderWidth: 1,
        borderColor: '#ddd',
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center'
      },
 tableheader:{
    borderWidth: 0.5,
    borderColor: '#ddd',
    backgroundColor:'#d00fff',
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center'
 },
 flatlistInput:{
     flex:1,
    // width: 250,
    // height:300,
    borderWidth:1,
    margin:5,
    //backgroundColor:'blue',
    //textAlign:'center',
    color:'black',
    
},
    input:{
        textAlign:'center',
        color:'black',
        height:100,
        width:100,
        
        
    },
     
   });
