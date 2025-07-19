import {Text, View, StyleSheet, Image, TouchableOpacity, ScrollView} from "react-native";
import {Link} from "expo-router";
import {useAuth} from "@clerk/clerk-expo";
import {styles} from "@/styles/feed.styles"
import {Ionicons} from "@expo/vector-icons";
import {COLORS} from "@/constants/theme";
import {STORIES} from "@/constants/mock-data";
import Story from "@/components/story";
import {api} from "@/convex/_generated/api";
import {useQuery} from "convex/react";
import {Loader} from "@/components/Loader";
import Post from "@/components/post"


export default function Index()  {
  const {signOut} = useAuth();

  const posts = useQuery(api.posts.getFeedPosts);

  if(posts=== undefined) return <Loader/>
  if(posts.length === 0) return <NoPostYet/>
  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Spotlight</Text>
        <TouchableOpacity onPress={()=> signOut()}>
          <Ionicons name={"log-out-outline"} size={24} color={COLORS.white}/>
        </TouchableOpacity>
      </View>
      <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 60}}
      >
        {/* Stories */}
        <ScrollView
          horizontal
          showsVerticalScrollIndicator={false}
          style={styles.storiesContainer}
          >
          {STORIES.map((story)=>(
            <Story key={story.id} story={story}/>
          ))}
        </ScrollView>
        {posts.map((post)=>(
            <Post post={post} key={post._id}/>
        ))}
      </ScrollView>
    </View>
  );
}


const NoPostYet = () => {
  return (
      <View
          style={{
            flex: 1,
            backgroundColor: COLORS.background,
            justifyContent: "center",
            alignItems: "center",
          }}
      >
        <Text style={{fontSize: 20 , color: COLORS.primary , fontFamily: "Roboto"}}>No Posts Found </Text>
      </View>
  )
}





