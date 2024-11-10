import { StyleSheet, ScrollView, Modal, View, TouchableOpacity } from "react-native";
import { useState, useEffect,useRef } from "react";
import { ThemedText } from "@/components/template/ThemedText";
import { ThemedView } from "@/components/template/ThemedView";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Ionicons } from "@expo/vector-icons";
import DateContainer from "@/components/custome/DateContainer";
import { getUpcomingDays, formatTime } from "@/components/utils/DateFormaters";
import { Calendar } from "react-native-calendars";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {lightGray} from "@/constants/Colors";
type DateObject = {
  month: string;
  date: number;
  day: string;
  dateFormat: Date;
};

export default function HomeScreen() {
  const startingTime = useRef(new Date())
  const [isCricket, setIsCricket] = useState(true);
  const [dates, setDates] = useState<DateObject[]>([]);
  const [selectedDate, setSelectedDate] = useState(startingTime.current);
  const [calendarVisibility, setCalendarVisibility] = useState(false);
  const [fromDateVisibility, setFromDateVisibility] = useState(false);
  const [selectedFromTime, setSelectedFromTime] = useState<Date>(startingTime.current);
  const [toDateVisibility, setToDateVisibility] = useState(false);
  const [selectedToTime, setSelectedToTime] = useState<Date>(startingTime.current);
  useEffect(() => {
    setDates(() => {
      return getUpcomingDays(selectedDate);
    });
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ThemedText style={styles.heading}>Booking</ThemedText>
      <ThemedView style={styles.toggle}>
        <MaterialIcons
          style={{ backgroundColor: isCricket ? "green" : lightGray, ...styles.icons }}
          name="sports-cricket"
          size={50}
          color={isCricket ? "white" : "black"}
          onPress={() => setIsCricket(true)}
        />
        <Ionicons
          style={{ backgroundColor: !isCricket ? "green" : lightGray, ...styles.icons }}
          name="football-outline"
          size={50}
          color={!isCricket ? "white" : "black"}
          onPress={() => setIsCricket(false)}
        />
      </ThemedView>
      <ThemedView style={styles.dates}>
        {dates?.map((item, index) => (
          <DateContainer
            key={item.day}
            month={item.month}
            date={item.date}
            day={item.day}
            isSelected={selectedDate.getDate() == item.date}
            onClickHandler={() => {
              setSelectedDate(item.dateFormat);
            }}
          />
        ))}
        <Ionicons name="calendar-outline" size={50} color={"gray"} onPress={() => setCalendarVisibility(true)} />
      </ThemedView>

      {
        //react-native-calenders
        /* <Modal
        transparent={true}
        style={{ backgroundColor: "black", height: 500, display: "flex", justifyContent: "center", alignItems: "center" }}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      > */
      }
      {/* <View style={styles.modelContainer}>
          <View style={styles.modelCalendar}>
            <Calendar
              onDayPress={(date: any) => {
                setSelectedDate(new Date(date.dateString));
                setDates(getUpcomingDays(new Date(date.dateString)));
                setModalVisible(false);
              }}
            />
          </View>
        </View> */}
      <DateTimePickerModal
        isVisible={calendarVisibility}
        mode="date"
        onConfirm={(date: any) => {
          setSelectedDate(new Date(date));
          setDates(getUpcomingDays(new Date(date)));
          setCalendarVisibility(false);
        }}
        onCancel={() => setCalendarVisibility(false)}
      />
      <DateTimePickerModal
        isVisible={fromDateVisibility}
        mode="time"
        onConfirm={(date: any) => {
          const currentDate=new Date(date)
          setSelectedFromTime(currentDate);
          const newDate=new Date(date)
          newDate.setHours(newDate.getHours()+1)
          setSelectedToTime(newDate)
          setFromDateVisibility(false);
        }}
        onCancel={() => setFromDateVisibility(false)}
      />
      <DateTimePickerModal
        isVisible={toDateVisibility}
        mode="time"
        minimumDate={selectedFromTime}
        onConfirm={(date: any) => {
          setSelectedToTime(new Date(date));
          setToDateVisibility(false);
        }}
        onCancel={() => setToDateVisibility(false)}
      />
      <ThemedView style={{ backgroundColor: "transparent" ,...styles.centeredView,flexDirection:"row",justifyContent:"space-evenly",width:"100%"}}>
        <TouchableOpacity onPress={() => setFromDateVisibility(true)}>
          <ThemedText style={{ fontSize: 35, color: "green" }}>From</ThemedText>
          <ThemedText style={{ fontSize: 25 }}>{selectedFromTime==startingTime.current?"00:00":formatTime(selectedFromTime)}</ThemedText>
        </TouchableOpacity>
        <View style={styles.divider}/>
        <TouchableOpacity onPress={() => setToDateVisibility(selectedFromTime==startingTime.current?false:true) }>
          <ThemedText style={{ fontSize: 35, color: "green" }}>To</ThemedText>
          <ThemedText style={{ fontSize: 25 }}>{selectedToTime==startingTime.current?"00:00":formatTime(selectedToTime)}</ThemedText>
        </TouchableOpacity>
      </ThemedView>
      {selectedFromTime!=startingTime.current&&selectedFromTime>=selectedToTime?<ThemedText style={{color:"red"}}>Please select valid time</ThemedText>:null}
      {selectedFromTime!=startingTime.current&&selectedToTime.getTime()-selectedFromTime.getTime()<3600000?<ThemedText style={{color:"red"}}>Please select atleast 1 hour</ThemedText>:null}
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
    gap: 30,
    paddingTop: 50,
    padding: 10,
    // backgroundColor: "black",
    height: "100%",
  },
  toggle: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    backgroundColor: "transparent",
  },
  divider: {
    width: 1,                
    height: '100%',          
    backgroundColor: lightGray, 
  },
  icons: {
    padding: 5,
    borderRadius: 10,
  },
  dates: {
    display: "flex",
    flexDirection: "row",
    gap: 8,
    backgroundColor: "transparent",
    // width:200,
    justifyContent: "space-around",
    alignItems: "center",
  },
  centeredView: {
    display:'flex',
    justifyContent: "center",
    alignItems: "center",
  },
  modelContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modelCalendar: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%", // Adjust width based on your needs
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
