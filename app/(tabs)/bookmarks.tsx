import {View, Text, ScrollView} from 'react-native';
import {COLORS} from "@/constants/theme";
import {api} from "@/convex/_generated/api";
import {useQuery} from "convex/react";
import {Loader} from "@/components/Loader";
import {Image} from "expo-image";
import {styles} from "@/styles/feed.styles";

const Bookmarks = () => {
    const bookmarkedPosts = useQuery(api.bookmark.getBookmarkedPosts)
    if(bookmarkedPosts===undefined) {
        return <Loader/>
    }
    if(bookmarkedPosts.length===0) {
        return <NoBookmarksFound/>
    }
  return (
      <View style={styles.container}>
          <View style={styles.header}>
              <Text style={styles.headerTitle}>Bookmarks</Text>
          </View>

          {/* POSTS */}
          <ScrollView
              contentContainerStyle={{
                  padding: 8,
                  flexDirection: "row",
                  flexWrap: "wrap",
              }}
          >
              {bookmarkedPosts.map((post) => {
                  if (!post) return null;
                  return (
                      <View key={post._id} style={{ width: "33.33%", padding: 1 }}>
                          <Image
                              source={post.imageUrl}
                              style={{ width: "100%", aspectRatio: 1 }}
                              contentFit="cover"
                              transition={200}
                              cachePolicy="memory-disk"
                          />
                      </View>
                  );
              })}
          </ScrollView>
      </View>
  );
};

export default Bookmarks;

function NoBookmarksFound() {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Bookmarks</Text>
            </View>
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: COLORS.background,
            }}
        >
            <Text style={{ color: COLORS.primary, fontSize: 22, fontFamily: "Roboto"}}>No bookmarked posts yet</Text>
        </View>
        </View>
    );
}