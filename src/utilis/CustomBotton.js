import React from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
  } from 'react-native';

export default function CustomBotton (props){
    return(
        <View>
        <TouchableOpacity
         style={styles.button}
         onPress={props.onPressfunction}
         >
          <Text style={styles.text}> {props.title} </Text>
         </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
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
})