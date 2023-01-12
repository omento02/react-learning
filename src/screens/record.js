import React,{useState,useEffect} from "react";
import {
    StyleSheet,
    Text,
    View,
    RefreshControl,
    FlatList,
    SectionList,
    Modal
  } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import { TextInput } from "react-native-gesture-handler";
import SQLite from 'react-native-sqlite-storage';
import CustomBotton from "../utilis/CustomBotton";
import WarningMessage from "../utilis/warningModal";
import ShowTable from "../utilis/showtable";

  const db= SQLite.openDatabase(
    {
      name:'MainDB',
      location:'default',
    },
    ()=>{},
    error => {console.log(error)}
  );

function Record(){
  let counter=0;
  // let counterData=0
   // states of the app
    const [sectionData,setSectionData]=useState([counter]);
    const [Spend,setSpend]=useState(''); 
    const [Bill,setBill]=useState('');
    const [cost,setCost]=useState(0)
    const [warning,setWarning]=useState(false);
    const [showTable,setshowTable]=useState(false)
    const [TableBoolean,setTableboolean]=useState(false)
    const [newtabledata,setnewtabledata]=useState([])
    const [btnClicked,setBtnclicked]=useState(false);
        const [counterData,setCounterdata]=useState(0)
    const DATA=[
      {
         title:'Title 1',
         data:sectionData,
      },
     
  ];
  const DATA1=[
    {
       title:'Title 2',
       data:newtabledata[0],    
    },
   
];

 
    //on the start of the app
    useEffect(() => {
      createStoreTable();
     
    }, []);
    useEffect(()=>{
      ShowData()
      console.log(`from use effect:the value of counter=${counterData}`)

    },[counterData])
  

    const createStoreTable=()=>{
        db.transaction((tx)=>{
          tx.executeSql(
                'CREATE TABLE IF NOT EXISTS Bookkeeping (ID INTEGER PRIMARY KEY AUTOINCREMENT,Liabilities TEXT,Cost INTEGER);'
              )
        }),
        [],
        ()=>{console.log('table created successfull')},
        error => console.log(error)
  }
  
  const LiabilityKeeperHandler=(e)=>{ 
      let value=e.nativeEvent.text
      if(!value){
        setWarning(true)
      }
      else {
        setSpend(value);
      }
    
}

  const CostKeeperHandler=async(e)=>{
    let value=e.nativeEvent.text
      setBill(value);
      if (!value){
        setWarning(true)
      }
      else{
        await db.transaction((tx)=>{
          tx.executeSql(
              "INSERT INTO Bookkeeping (Liabilities,Cost) VALUES (?,?);",
              [Spend,value],
              ()=>{
                  // setCounterdata( counterData++)
                  ()=>{setCounterdata( counterData++)}
                  setSectionData([...sectionData,[counter+1]]);
               
              
              },
              error=>{console.log(error)}
          )
       })
      }
}

const SumHandler =async()=>{
  try{
   await db.transaction((tx)=>{
      tx.executeSql(
         'SELECT SUM(Cost) as Total_cost from Bookkeeping;',
        [],
        (tx,results)=>{
          if (results){
          let  cost= results.rows.item(0).Total_cost
          setCost(cost)
          }
          else{
            alert('sumthing is wrong!!')
          }
        },
      )
      }); 
  }
  catch(error){
    console.log(error)
  }
}


const ShowData =async()=>{
  try{
    await db.transaction((tx)=>{
      tx.executeSql(
        "SELECT * FROM Bookkeeping" ,
        [],
        (tx,results)=>{
          let len=results.rows.length
          let rowResults=results.rows.raw()
       
          if (len ===0){
            setBtnclicked(true)
          }
          else{
     
           setnewtabledata([...newtabledata,rowResults])
            // setCounterdata( counterData++)
          }
        },
        error=>{console.log(error)}
      )
    })     
  }
  catch{error=>console.log(error)}
}

const deletehandler=()=>{
  db.transaction((tx)=>{
    tx.executeSql(
      "DELETE  FROM Bookkeeping" ,
      [],
      ()=>{alert('deletion complete')},
      error=>{console.log(error)}
    )
  })
}
    return(
        <View style={styles.container}>
          <Modal
          visible={TableBoolean}
          onRequestClose={()=>{
            setTableboolean(false)
          }}
          onShow={()=>{
                console.log(`from modal:the value of counter=${counterData}`)  
                // counterData ?  ShowData():alert('no any data')
                ShowData()
          }}
        >
          <Text style={styles.text}>SHOWING TABLE</Text>
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
                {/* <Text style={styles.text}>{item.Liabilities}</Text> */}
                <TextInput
                 value={item.Liabilities}
                 style={styles.input}
                />
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
                  <TextInput
                 value={item.Cost.toString()}
                 style={styles.input}
                />
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
             onPressfunction={()=>{
              setTableboolean(false)
            }}
             title={'CLOSE MODAL'}
            />

        </Modal>        
    
              
       
       {/* incase of empty input */}
        <WarningMessage
           showWarning={warning}
           backbutton={()=>{
            setWarning(false)
          }}
          WarningText={' CANNOT BE EMPTY!!'}
          CloseFxn={()=>{
            setWarning(false)
          }}
          btnTitle={'OK'}
        />


        {/* table for input purpose */}
          <Grid>
            {/* column for the title of the expenditure */}
            <Col>
            <SectionList 
            keyExtractor={(item,index)=>index.toString()}
            sections={DATA}
            renderItem={({item})=>(
              <Row style={styles.cell}>
              <TextInput
                 placeholder="what did u spend on"
                 placeholderTextColor='grey'  
                 style={styles.input}
                 onEndEditing={LiabilityKeeperHandler}
                />
              </Row>
            )}
            renderSectionHeader={({section})=>(
              <Row style={styles.tableheader}>
               <Text style={styles.text}>TITLE</Text>
              </Row>
            )}
             />
            </Col>
          {/* column for input of the cost */}
            <Col>
            <SectionList 
            keyExtractor={(item,index)=>index.toString()}
            sections={DATA}
            renderItem={({item})=>(
              <Row style={styles.cell}>
              <TextInput
                 placeholder="how much did it cost"
                 placeholderTextColor='grey'
                 style={styles.input}
                 onEndEditing={CostKeeperHandler}
                />
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
          <View>
            <Text  style={styles.text}>Total:{cost} </Text>
          </View>
          <View>
            <Text  style={styles.text}>The Last input: grocery:{Spend} and its cost is {Bill}</Text>
          </View>

            <CustomBotton
             onPressfunction={SumHandler}
             title={'TOTAL'}
            />
               <CustomBotton
             onPressfunction={()=>{
              counterData ? setTableboolean(true) :alert('no any data')
              setCounterdata( counterData++)
   

               
             }}
             title={'SHOW TABLE'}
            />
            <CustomBotton
             onPressfunction={deletehandler}
             title={'DELETE ALL DATA'}
            />
           
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

export default Record;
