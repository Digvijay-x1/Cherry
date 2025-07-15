import {View, Text, Image, TouchableOpacity} from 'react-native';
import { styles} from "@/styles/auth.styles";
import {Ionicons} from "@expo/vector-icons";
import {COLORS} from "@/constants/theme";

export default function login() {
    return (
        <View style={styles.container} >

            {/* Brand Section */}
            <View style={styles.brandSection}>
                <View style={styles.logoContainer}>
                    <Ionicons name="planet-sharp" size={32} color={COLORS.primary}/>
                </View>
                <Text style={styles.appName}>Agora</Text>
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
                    onPress={()=>{}}
                    activeOpacity={0.8}
                >
                    <View style={styles.googleIconContainer}>
                        <Ionicons name={"logo-google"} size={20} color={COLORS.surface}/>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )

}