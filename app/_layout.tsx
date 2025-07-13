import { Stack } from "expo-router";
import {SafeAreaProvider , SafeAreaView} from "react-native-safe-area-context";
import {ClerkProvider} from "@clerk/clerk-expo";
import { tokenCache} from "@clerk/clerk-expo/token-cache";

export default function RootLayout() {
  return (
      <ClerkProvider tokenCache={tokenCache}>
      <SafeAreaProvider>
        <SafeAreaView style={{flex:1, backgroundColor: "black"}}>
          <Stack >
            <Stack.Screen name="(auth)" options={{headerShown:false}}/>
            <Stack.Screen name="(tabs)" options={{title: "Home" , headerShown:false}}/>
          </Stack>
        </SafeAreaView>
   </SafeAreaProvider>
      </ClerkProvider>
);
}
