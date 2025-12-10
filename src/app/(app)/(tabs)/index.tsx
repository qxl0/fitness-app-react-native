import React from "react";
import { SafeAreaView, Text, View } from "react-native";

export default function Page() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
        <Text style={{ fontSize: 32, fontWeight: 'bold', marginBottom: 16 }}>
          Home Page
        </Text>
        <Text style={{ fontSize: 18, textAlign: 'center' }}>
          Welcome to your home screen!
        </Text>
      </View>
    </SafeAreaView>
  )
}