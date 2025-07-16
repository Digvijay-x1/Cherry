import {Text, View, StyleSheet, Image, TouchableOpacity} from "react-native";
import {Link} from "expo-router";
import {useAuth} from "@clerk/clerk-expo";

// we have to confirm that the request is coming from clerk
// if true, we have to listen for that event (user.create event)
// if so register the user in the database


export default function Index()  {
  const {signOut} = useAuth();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Petrick Bateman</Text>
        <Image source={{uri:"https://upload.wikimedia.org/wikipedia/en/5/52/American-psycho-patrick-bateman.jpg"}}
               style={{width: 200, height: 200, resizeMode:"cover"} }/>
        <Link style={styles.title} href={"/notification"}>GO to notification</Link>
        <TouchableOpacity onPress={()=>{signOut()}}>
            <Text style={styles.title}>
                signOUt
            </Text>
        </TouchableOpacity>
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





