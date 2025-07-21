import {Text, View, TouchableOpacity, ScrollView, FlatList, RefreshControl} from "react-native";
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
import {useState} from "react";


export default function Index()  {

  const {signOut} = useAuth();
  const [refreshing, setRefreshing] = useState(false)



  const posts = useQuery(api.posts.getFeedPosts);

  if(posts=== undefined) return <Loader/>
  if(posts.length === 0) return <NoPostYet/>

    const onRefresh = () => {
        setRefreshing(true),
        setTimeout(()=>{
        setRefreshing(false);
    },2000);
};

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Cherry</Text>
        <TouchableOpacity onPress={()=> signOut()}>
          <Ionicons name={"log-out-outline"} size={24} color={COLORS.white}/>
        </TouchableOpacity>
      </View>
        {/* use flat list to render posts */}
      <FlatList
          data={posts}
          renderItem={({item})=><Post post={item}/>}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 60}}
          ListHeaderComponent={<StoriesSection/>}
          refreshControl={
           <RefreshControl
               refreshing={refreshing}
               onRefresh={onRefresh}
               tintColor={COLORS.primary}
           />
          }
      />

    </View>
  );
}

const StoriesSection = () => {
    return (
    <ScrollView
        horizontal
        showsVerticalScrollIndicator={false}
        style={styles.storiesContainer}
    >
        {STORIES.map((story)=>(
            <Story key={story.id} story={story}/>
        ))}
    </ScrollView>
)
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





