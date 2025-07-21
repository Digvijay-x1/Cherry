import {View, Text, FlatList} from 'react-native';
import {useQuery} from "convex/react";
import {api} from "@/convex/_generated/api";
import {Loader} from "@/components/Loader";
import {styles} from "@/styles/notificatons.styles";
import {Ionicons} from "@expo/vector-icons";
import {COLORS} from "@/constants/theme";
import Notification from "@/components/Notifications";


export default function Notifications() {
    const notifications = useQuery(api.notifications.getNotifications);

    if(notifications === undefined ) return <Loader/>
    if(notifications.length === 0) return <NoNotificationsFound/>

  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.headerTitle} >Notifications</Text>
        </View>
        <FlatList
            data={notifications}
            renderItem={({ item }) => <Notification notification={item} />}
            keyExtractor={(item) => item._id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
        />
    </View>
  );
};


function NoNotificationsFound() {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Notifications</Text>
            </View>
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: COLORS.background,
                }}
            >
                <Ionicons name={"notifications-outline"} size={48} color={COLORS.primary}/>
                <Text style={{ color: COLORS.primary, fontSize: 22, fontFamily: "Roboto"}}>No notifications yet</Text>
            </View>
        </View>
    )
}