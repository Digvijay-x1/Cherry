import {View, Text, Image, TouchableOpacity} from 'react-native';
import { styles} from "@/styles/auth.styles";
import {Ionicons, MaterialCommunityIcons} from "@expo/vector-icons";
import {COLORS} from "@/constants/theme";
import {useSSO} from "@clerk/clerk-expo";
import {useRouter} from "expo-router";

export default function login() {
    const {startSSOFlow} = useSSO();

    const router = useRouter();

    const handleGoogleSignIn = async () => {
        try {
            const {setActive,createdSessionId} = await startSSOFlow({strategy:"oauth_google"});
            if(createdSessionId  &&  setActive) {
                setActive({session: createdSessionId});
                router.replace({pathname: "/(tabs)"});
            }
        } catch (error){
            return console.error("outh error", error);
        }
    }

    return (
        <View style={styles.container} >

            {/* Brand Section */}
            <View style={styles.brandSection}>
                <View style={styles.logoContainer}>
                    <MaterialCommunityIcons name="fruit-cherries" color={COLORS.primary} size={31} />
                </View>
                <Text style={styles.appName}>Cherry</Text>
                <Text style={styles.tagline}>don't miss the frame</Text>
            </View>

            {/* Illustrations */}
            <View style={styles.illustrationContainer}>
                <Image
                    source={require("../../assets/images/auth-image.png")}
                    style={styles.illustration}
                    resizeMode={"contain"}
                />
            </View>

            {/* Styles for login page */}
            <View style={styles.loginSection}>
                <TouchableOpacity
                    style={styles.googleButton}
                    onPress={handleGoogleSignIn}
                    activeOpacity={0.8}
                >
                    <View style={styles.googleIconContainer}>
                        <Ionicons name={"logo-google"} size={20} color={COLORS.surface}/>

                    </View>
                    <Text style={styles.googleButtonText}>Continue with Google</Text>
                </TouchableOpacity>
            </View>
        </View>
    )

}