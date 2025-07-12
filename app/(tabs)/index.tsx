import { Text, View , StyleSheet , Image } from "react-native";
import {Link} from "expo-router";


export default function Index() {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Petrick Bateman</Text>
        <Image source={{uri:"https://upload.wikimedia.org/wikipedia/en/5/52/American-psycho-patrick-bateman.jpg"}}
               style={{width: 200, height: 200, resizeMode:"cover"} }/>
        <Link style={styles.title} href={"/notification"}>GO to notification</Link>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title : {
        color: '#fff',
        fontSize: 30,
    }
})





