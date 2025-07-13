import { View, Text } from 'react-native';
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
        </View>
    )

}