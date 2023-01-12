import React,{useState,useEffect} from "react";
import {
    StyleSheet,
    Text,
    View,
    Button,
    RefreshControl,
    FlatList,
    SectionList,
    TouchableOpacity,
    Modal
  } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import { TextInput } from "react-native-gesture-handler";
import SQLite from 'react-native-sqlite-storage';
import CustomBotton from "./CustomBotton";

const db= SQLite.openDatabase(
    {
      name:'MainDB',
      location:'default',
    },
    ()=>{},
    error => {console.log(error)}
  );

export default function ShowTable(){
    const DATA1=[
        {
           title:'Title 1',
           data:newtabledata,
        },
       
    ];
    const [showTable,setshowTable]=useState(false)
    const [newtabledata,setnewtabledata]=useState([])


const ShowData =()=>{
    db.transaction((tx)=>{
      tx.executeSql(
        "SELECT * FROM Bookkeeping" ,
        [],
        (tx,results)=>{
          let len=results.rows.length
          console.log(`the number of item=${len}`)
          if (results){
            // console.log(`results found=${results.rows.item(0)}`)
            for (let i=0;i<len;i++){
              console.log(`order:${results.rows.item(i).Liabilities} and cost:${results.rows.item(i).Cost}`) 
              setnewtabledata([...newtabledata,{
                'Liabilities':results.rows.item(i).Liabilities,
                'Cost':results.rows.item(i).Cost
              }]);
              console.log(`results found=${newtabledata[i].Cost}`)
            }
          }
          else{
            console.log('no table found')
          }
        },
        error=>{console.log(error)}
      )
    }) 
  }
    return(
<Modal>
<Grid
 visible={showTable}
 onRequestClose={()=>{
   setshowTable(false)
 }}
>
  <Col>
  <SectionList 
  keyExtractor={(item,index)=>index.toString()}
  sections={DATA1}
  renderItem={({item})=>(
    <Row style={styles.cell}>
       <Text style={styles.text}>{item.Liabilities}</Text>
    </Row>
  )}
  renderSectionHeader={({section})=>(
    <Row style={styles.tableheader}>
     <Text style={styles.text}>TITLE</Text>
    </Row>
  )}
   />
  </Col>

  <Col>
  <SectionList 
  keyExtractor={(item,index)=>index.toString()}
  sections={DATA1}
  renderItem={({item})=>(
    <Row style={styles.cell}>
    <Text style={styles.text}>{item.Cost}</Text>
    </Row>
  )}
  renderSectionHeader={({section})=>(
    <Row style={styles.tableheader}>
  <Text style={styles.text}>COST</Text>
    </Row>
  )}
   />
  </Col>
</Grid>
<CustomBotton
  onPressfunction={()=>alert('clicked button to show table')}
  title={'CLOSE TABLE'}
/>
</Modal>
    )
}

const styles = StyleSheet.create({
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
})