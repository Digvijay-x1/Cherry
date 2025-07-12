import {Tabs} from "expo-router";
import {Ionicons} from "@expo/vector-icons";
import {COLORS} from "@/constants/theme";

const TabLayout = () => {
  return (
    <Tabs
        screenOptions={{
            tabBarShowLabel: false,
            headerShown: false,
            tabBarInactiveTintColor: COLORS.grey,
            tabBarActiveTintColor: COLORS.primary,
            tabBarStyle: {
                backgroundColor: "black",
                paddingBottom: 8,
                height: 40,
                position: "absolute",
                borderTopWidth: 0,
                elevation: 0,
            }
        }}
    >
        <Tabs.Screen name="index"
             options={{
                 tabBarIcon: ({size,color}) => <Ionicons name="home" size={size} color={color} />
             }}
        />
        <Tabs.Screen name="bookmarks"
             options={{
                 tabBarIcon: ({size,color}) => <Ionicons name="bookmark" size={size} color={color}/>
             }}
        />
        <Tabs.Screen name="create"
        options={{
            tabBarIcon: ({size,color})=> <Ionicons name="add-circle" size={size} color={color}/>
        }}/>
        <Tabs.Screen name="notification"
        options={{
            tabBarIcon: ({size,color})=> <Ionicons name="heart" size={size} color={color}/>
        }}/>
        <Tabs.Screen name='profile'
        options={{
            tabBarIcon:({size,color})=>
                <Ionicons name="person-circle" size={size} color={color}/>
        }}/>
    </Tabs>
  );
};

export default TabLayout;