import { ClerkProvider } from "@clerk/clerk-expo";
import { Slot } from "expo-router";
import "../global.css";

export default function RootLayout() {
  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

  return (
    <ClerkProvider publishableKey={publishableKey}>
      <Slot />
    </ClerkProvider> 
  )
}
