import { StyleSheet, ScrollView, Button } from "react-native";
import { useState } from "react";
import { ThemedText } from "@/components/template/ThemedText";
import { ThemedView } from "@/components/template/ThemedView";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Ionicons } from "@expo/vector-icons";
import DateContainer from "@/components/custome/DateContainer";
import {getUpcomingDays} from "@/components/utils/upcommingDate"
export default function HomeScreen() {
  const [isCricket, setIsCricket] = useState(true);
  const [dates, setDates] = useState(getUpcomingDays())
  const [selectedDateIndex, setSelectedDateIndex] = useState(0)
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ThemedText style={styles.heading}>Booking</ThemedText>
      <ThemedView style={styles.toggle}>
        <MaterialIcons
          style={{ backgroundColor: isCricket ? "green" : "gray", ...styles.icons }}
          name="sports-cricket"
          size={50}
          color={isCricket ? "white" : "black"}
          onPress={() => setIsCricket(true)}
        />
        <Ionicons
          style={{ backgroundColor: !isCricket ? "green" : "gray", ...styles.icons }}
          name="football-outline"
          size={50}
          color={!isCricket ? "white" : "black"}
          onPress={() => setIsCricket(false)}
        />
      </ThemedView>
      <ThemedView style={styles.dates}>
        {dates.map((item,index)=><DateContainer key={item.day} month={item.month} date={item.date} day={item.day} isSelected={selectedDateIndex==index} onClickHandler={()=>{setSelectedDateIndex(index)}}/>)}
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  container: {
    flexDirection: "column",
    alignItems: "center",
    gap: 20,
    paddingTop: 50,
    padding: 10,
  },
  toggle: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    backgroundColor: "transparent",
  },
  icons: {
    padding: 5,
    borderRadius: 10,
  },
  dates:{
    display: "flex",
    flexDirection: "row",
    gap: 8,
    backgroundColor: "transparent",
    // width:200,
    justifyContent:"space-around"
  }
});
