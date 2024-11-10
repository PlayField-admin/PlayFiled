import { ThemedText } from "../template/ThemedText";
import { StyleSheet, TouchableOpacity } from "react-native";
import { ThemedView } from "../template/ThemedView";
type propType={
    month:string,
     date:number,
     day:string,
     isSelected:boolean
     onClickHandler:()=>void
}
function DateContainer({month,date,day,isSelected=false,onClickHandler}:propType) {
    const currentColor=isSelected?"green":"black"
  return (
    <TouchableOpacity onPress={onClickHandler} style={{borderColor:isSelected?"green":"#cecece",...styles.container}}>
      <ThemedText style={{ fontSize: 15 ,color:currentColor}}>{month}</ThemedText>
      <ThemedText style={{ fontSize: 22,fontWeight:'bold' ,color:currentColor}}>{date}</ThemedText>
      <ThemedText style={{ fontSize: 17 ,color:currentColor}}>{day}</ThemedText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
    height: 80,
    width:60,
    // borderColor: "#888888",
    borderWidth: 2,
    borderRadius: 10,
    padding:10,
    color:"green"
  },
});
export default DateContainer;
