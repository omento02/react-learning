import React,{useState,useEffect} from "react";
import { Col, Row, Grid } from "react-native-easy-grid";
import SQLite from 'react-native-sqlite-storage';
const db= SQLite.openDatabase(
   {
     name:'MainDB',
     location:'default',
   },
   ()=>{},
   error => {console.log(error)}
 );

const CostKeeperHandler=(value)=>{
    const [Bill,setBill]=useState('');
    db.transaction((tx)=>{
       tx.executeSql(
           "INSERT INTO Bookkeeping (Cost) VALUES (?);",
           [value],
           ()=>{
               setBill(value);
               return(
                <Row style={styles.cell} >
                <TextInput
                       placeholder="how much did it cost"
                       placeholderTextColor='grey'
                       style={styles.input}
                      // onChangeText={CostKeeperHandler}
                       onEndEditing={CostKeeperHandler}
                />
                </Row>
                
                   
               );
           },
           error=>{console.log(error)}

       )
    })
}
export default CostKeeperHandler;