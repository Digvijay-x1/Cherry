import { useRouter} from "expo-router";
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from "react-native"
import {Image} from "expo-image";
import { useUser } from "@clerk/clerk-expo";
import {useState} from "react";
import {styles} from "@/styles/create.styles";
import {Ionicons} from "@expo/vector-icons";
import {COLORS} from "@/constants/theme";
import * as ImagePicker from "expo-image-picker";

export default function CreateScreen() {
    const router = useRouter();
    const {user} = useUser();
    const [caption , setCaption] = useState('');
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [isSharing , setIsSharing] = useState(false);

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: "images",
            allowsEditing: true,
            aspect: [1,1],
            quality: 0.8,
        })

        if (!result.canceled) setSelectedImage(result.assets[0].uri)
    }


    if(!selectedImage) {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={()=> router.back()}>
                        <Ionicons name={"arrow-back"} size={28} color={COLORS.primary}/>
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>New Post</Text>
                    <View style={{width:28}}/>
                </View>
                <TouchableOpacity style={styles.emptyImageContainer} onPress={pickImage} >
                    <Ionicons name={"image-outline"} size={48} color={COLORS.grey}/>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
            keyboardVerticalOffset={Platform.OS === "ios" ? 20:0}
        >
            <View style={styles.contentContainer}>
                {/*HEADER*/}

                <View style={styles.header}>
                   <TouchableOpacity
                       onPress={()=>{
                           setSelectedImage(null);
                           setCaption("");
                       }}
                       disabled={isSharing}
                       >
                       <Ionicons name={"close-outline"} size={28} color={isSharing ? COLORS.grey : COLORS.white}/>
                   </TouchableOpacity>
                    <Text style={styles.headerTitle}>New Post</Text>
                    <TouchableOpacity style={[styles.shareButton,isSharing && styles.shareButtonDisabled]}
                                      disabled={isSharing || !selectedImage}
                                      >
                        {isSharing ? (
                            <ActivityIndicator size={"small"} color={COLORS.primary}/>

                        ) : (
                            <Text style={styles.shareText}>Share</Text>
                        )}
                    </TouchableOpacity>
                </View>

                {/*Scroll view*/}
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    bounces={false}
                    keyboardShouldPersistTaps={"handled"}
                >
                    <View style={[styles.content , isSharing && styles.contentDisabled]}>
                        {/* IMAGE SECTION */}
                        <View style={styles.imageSection}>
                            <Image
                                source={selectedImage}
                                style={styles.previewImage}
                                contentFit={"cover"}
                                transition={200}
                            />
                            <TouchableOpacity
                                style={styles.changeImageButton}
                                onPress={pickImage}
                                disabled={isSharing}
                            >
                                <Ionicons name={"image-outline"} size={20} color={COLORS.white}/>
                                <Text style={styles.changeImageText}>Change</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/* INPUT SECTION */}

                </ScrollView>
            </View>
        </KeyboardAvoidingView>
    )
}