import React from "react";
import {
    StyleSheet,
    Text,
    View,
    Button,
    TouchableOpacity,
  } from 'react-native';

export default function Profile(){
    return(
        <View style={styles.container}>
            <Text style={styles.text}>
                PROFILE
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
      justifyContent:'center',
      alignItems:'center',
    },
    button:{
      width: 80,
      height:40,
      borderWidth:1,
       margin:5,
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
    input:{
        textAlign:'center',
        color:'black',
    },
     
   });
