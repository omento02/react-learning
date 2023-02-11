import React,{useState,useEffect} from "react";
function TimePicker(){
    let i, l, todArray = []
    let day = dateCurrent - 2
    let c; 
  
    for (i = dateCurrent- 2; i <= dateCurrent+ 2; i++) {
      if (day < 0) day = -2 ? day = 5 : day = 6;
      if  (day > 6) day = 7 ? day = 0 : day = 1;
      c=i
      if (i>curNoDays){
        c=i-curNoDays
        Month = monthsnames[cDate.getMonth()+1]
      }
      if (i == dateCurrent - 1) {
        todArray.push('Yesterday')   
      }
      else if (i == dateCurrent) {
        todArray.push('Today')
      }
      else if (i == dateCurrent + 1) {
        todArray.push('Tomorrow')
      }
      else {
        todArray.push(daysInWeek[day] + ' ' + Month + ' ' + c)
      }
      day++
    }
    return todArray;
  }
  export default TimePicker;