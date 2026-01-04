import { useAuth } from '@clerk/clerk-expo'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Alert, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function ProfilePage() {
  const { signOut } = useAuth();
  const handleSignOut = () => {
    // Implement sign-out logic here
    console.log('Sign out pressed')
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      { text: "Cancel", style: "cancel" },
      { text: "Sign Out", onPress: () => signOut(), style: "destructive" }
    ]);

  }
  return (
    <SafeAreaView className='flex-1 flex'>
      <Text>Profile</Text>

      {/* Sign Out */}
      <View className='px-6 mb-8'>
        <TouchableOpacity className='bg-red-600 rounded-full py-3 items-center'
          onPress={handleSignOut}
        >
          <View className='flex-row items-center justify-center'>
            <Ionicons name="log-out-outline" size={20} color="white" />
            <Text className='ml-3 text-white font-medium text-base'>
              Sign Out
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}