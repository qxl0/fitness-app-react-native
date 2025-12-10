import { useAuth } from '@clerk/clerk-expo';
import { Stack } from 'expo-router';
import React from 'react';

function Layout() {
  const { isLoaded, isSignedIn, userId, sessionId, getToken } = useAuth();

  console.log('isSignedIn: ', isSignedIn)
  return (
    <Stack>
      <Stack.Protected guard={isSignedIn}>
        <Stack.Screen name="(tabs)" options={ {headerShown: false}}/>
      </Stack.Protected>
      <Stack.Protected guard={!isSignedIn}>
        <Stack.Screen name="sign-in" options={ {headerShown: false}}/>
        <Stack.Screen name="sign-up" options={ {headerShown: false}}/>
      </Stack.Protected>
    </Stack>
)
}

export default Layout