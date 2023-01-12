import React,{useState,useEffect} from "react";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Button,
    Alert,
    

  } from 'react-native';
 //import AsyncStorage from '@react-native-async-storage/async-storage';
import SQLite from 'react-native-sqlite-storage';
  const db= SQLite.openDatabase(
    {
      name:'MainDB',
      location:'default',
    },
    ()=>{},
    error => {console.log(error)}
  );


 
  function Home({navigation}){
    const[name, setName] = useState('');
    const[useDisable,setUseDisable]=useState(true);
    const [introProp,setIntroProp]=useState(false);

  useEffect(() => {
  
      getData();
      createUserTable();
 
  }, []);
        const createUserTable=()=>{
          db.transaction((tx)=>{
            tx.executeSql(
                  'CREATE TABLE IF NOT EXISTS User (ID INTEGER PRIMARY KEY AUTOINCREMENT,Username TEXT);'
                )
          })
    }
    


     const getData= async ()=>{
       try{

      await  db.transaction(async (tx)=>{
          await tx.executeSql(
            'SELECT Username FROM User; ',
            [],
            (tx,results)=>{
              let len = results.rows.length;
              if (len > 0){
              var userName=results.rows.item(0).Username;
              setName(userName);
              setUseDisable(false);
              setIntroProp(true);
                setTimeout(() => {
                        navigation.navigate('Idea');
                        },1000);
                          
              }
            },
            error => {console.log(error)}
          )
        })

       }
       catch(error){
         console.log(error);
       }
     }
    const onPressHandler = async ()=>{
      if (name.length == 0 ){
        Alert.alert('ENTER USERNAME PLZ!!')
      }
      else{
        try{ 
        await  db.transaction(async (tx)=>{
            await tx.executeSql(
              'INSERT INTO User (Username) VALUES (?);',
              [name],
              ()=>{
                setUseDisable(false);
                setIntroProp(true);
                //setName(name)
                setTimeout(() => {
                  navigation.navigate('Idea');
                  },1000);  
               // Alert.alert('successful logged in!!');
              },
              error=>{console.log(error)}
            )
          })
    }
        catch(error){
          console.log(error);
        }
      }
      
    
    }
      return(
          <View style={styles.container}>
            {
              introProp ? 
              <Text style={styles.text}>
              WELCOME TO {name.toUpperCase()}'s BLUEPRINT
          </Text> 
           : null
            }
            
              {
                  useDisable ? 
                  <View style={styles.container}>
                       <TextInput
                  placeholder="enter your name here"
                  placeholderTextColor='black'
                  style={styles.input}
                  onChangeText={value=>setName(value)}
                  autoFocus
                /> 
                
                <TouchableOpacity
             style={styles.button}
             onPress={onPressHandler}
             >
              <Text style={styles.text}>Log In</Text>
             </TouchableOpacity>
              
                  </View>
                 
                : null
              }
            
       
          </View>
      )
  }
  const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor:'#ffffff',
      justifyContent:'center',
      alignItems:'center',
    },
    text:{
        color:'black',
    },
    input:{
        width: 250,
        height:50,
        borderWidth:1,
        margin:5,
        //backgroundColor:'blue',
        textAlign:'center',
        color:'black',
        
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
     
   });

   export default Home;