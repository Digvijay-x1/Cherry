import { View, Text } from 'react-native';
import {useAuth} from "@clerk/clerk-expo";
import {Stack, useRouter, useSegments} from "expo-router";
import {useEffect} from "react";

export const InitialLayout = () => {
    const {isLoaded , isSignedIn} = useAuth();
    const segments = useSegments();
    const router = useRouter();

    useEffect(()=>{
        if(!isLoaded) return;
        const isAuthScreen = segments[0] === "(auth)";
        if(!isSignedIn && !isAuthScreen) {
            router.replace("/(auth)/sign-up")
        } else if(isSignedIn && isAuthScreen) {
            router.replace("/(tabs)");
        }

    },[isLoaded,isSignedIn,segments]);

    if(!isLoaded) return null;


return <Stack screenOptions={{headerShown: false}}/>

};