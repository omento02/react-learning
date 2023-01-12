import SQLite from 'react-native-sqlite-storage';
import React,{useState,useEffect} from "react";
import { Col, Row, Grid } from "react-native-easy-grid";
const db= SQLite.openDatabase(
   {
     name:'MainDB',
     location:'default',
   },
   ()=>{},
   error => {console.log(error)}
 );
 const LiabilityKeeperHandler=(value)=>{
       const [Spend,setSpend]=useState(''); 
    db.transaction((tx)=>{
       tx.executeSql(
           "INSERT INTO Bookkeeping (Liabilities) VALUES (?);",
           [value],
           ()=>{
               setSpend(value);
               return(
                  <Row style={styles.cell}>

                  <TextInput
                         placeholder="what did u spend on"
                         placeholderTextColor='grey'
                         style={styles.input}
                       //  onChangeText={LiabilityKeeperHandler}
                         onEndEditing={LiabilityKeeperHandler}

                  />
                  </Row>
               );
           },
           error=>{console.log(error)}
/* after input is done */
       )
    })
}


export default LiabilityKeeperHandler;