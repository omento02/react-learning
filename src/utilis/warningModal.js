import React from "react";
import {
    StyleSheet,
    Text,
    View,
    Modal
  } from 'react-native';
import CustomBotton from "./CustomBotton";
export default function WarningMessage(props){
    return(
        <Modal
           visible={props.showWarning}
           onRequestClose={props.backbutton}
          >
            <View>
              <Text style={styles.text}>
               {props.WarningText}
              </Text>
            </View>
            <CustomBotton
              onPressfunction={props.CloseFxn}
              title={props.btnTitle}

            />
          </Modal>
    )
}
const styles = StyleSheet.create({
    text:{
        color:'black'
    },
})
