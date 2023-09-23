import { StyleSheet } from "react-native";
import { StatusBar, View } from "react-native";
import Chat from "./src/screens/Chat";


export default function App() {

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Chat />
    </View>
  );
}

 const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
  });
