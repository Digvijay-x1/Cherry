import {View, Text, TouchableOpacity} from 'react-native';
import {styles} from "@/styles/feed.styles";
import {Link} from "expo-router";
import {Image} from "expo-image";

// type PostProps = {
//     post: {
//         _id: Id<"posts">;
//         imageUrl: string;
//         caption?: string;
//         likes: number;
//         comments: number;
//         _creationTime: number;
//         isLiked: boolean;
//         isBookmarked: boolean;
//         author: {
//             _id: string;
//             username: string;
//             image: string;
//         };
//     };
// }

export default function Post({post} : {post: any}) {
  return (
    <View style={styles.post}>
        {/* POST HEADER */}
        <View style={styles.postHeader}>
            <Link
                href={"/(tabs)/notification"}

            >
                <TouchableOpacity style={styles.postHeaderLeft}>
                    <Image
                        source={post.author.image}
                        style={styles.postAvatar}
                        contentFit="cover"
                        transition={200}
                        cachePolicy="memory-disk"
                    />
                    <Text style={styles.postUsername}>{post.author.username}</Text>
                </TouchableOpacity>
            </Link>
        </View>
    </View>
  );
};
