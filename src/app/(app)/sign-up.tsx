import { useSignUp } from '@clerk/clerk-expo'
import { Ionicons } from '@expo/vector-icons'
import { Link, useRouter } from 'expo-router'
import * as React from 'react'
import { KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function SignUp() {
  const { isLoaded, signUp, setActive } = useSignUp()
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter()

  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [pendingVerification, setPendingVerification] = React.useState(false)
  const [code, setCode] = React.useState('')

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded) return

    console.log(emailAddress, password);
    // Start sign-up process using email and password provided
    try {
      await signUp.create({
        emailAddress,
        password,
      })

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

      // Set 'pendingVerification' to true to display second form
      // and capture OTP code
      setPendingVerification(true)
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      })

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId })
        router.replace('/')
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signUpAttempt, null, 2))
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }

  if (pendingVerification) {
    return (
      <SafeAreaView className='flex-1 bg-gray-50'>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className='flex-1'
        >
          <View className='flex-1 px-6'>
            <View className='flex-1 justify-center'>
              {/* Logo/Branding */  }
              <View className='items-center mb-8'>
                <View className='w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 
                  rounded-2xl items-center justify-center mb-4 shadown-lg'>
                  <Ionicons name="mail" size={40} color="white" />
                </View>
                <Text className='text-3xl font-bold text-gray-900 mb-2'>
                  Check Your Email
                </Text>
                <Text className='text-lg text-center text-gray-600'>
                  We've sent a verification code to{"\n"} 
                  {emailAddress} 
                </Text>
            </View>
          </View>
          </View>
        {/* Verification Form */ }
        <Text>Verify your email</Text>
        <TextInput
          value={code}
          placeholder="Enter your verification code"
          onChangeText={(code) => setCode(code)}
        />
        <TouchableOpacity onPress={onVerifyPress}>
          <Text>Verify</Text>
        </TouchableOpacity>
        </KeyboardAvoidingView>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView className='flex-1 bg-gray-50'>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className='flex-1 justify-center px-6'
      >
        <View className='flex-1 justify-center'>
          {/* Main */ }
          <View className='items-center mb-8'>
            <View className='w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 
              rounded-2xl items-center justify-center mb-4 shadown-lg'>
              <Ionicons name="fitness" size={40} color="white" />
            </View>
            <Text className='text-3xl font-bold text-gray-900 mb-2'>Join FitTracker</Text>
            <Text className='text-gray-700 text-base mb-6'>Start your fitness journey{"\n"} and achieve your goals</Text>
          </View>

          {/* Sign up form */ }
          <View className='bg-white rounded-2xl p-6 shadown-sm border border-gray-100 mb-8'>
            <Text className='text-xl font-semibold text-gray-800 mb-6 text-center'>Create your account</Text>
            <View className='mb-4'>
                    <Text className='text-sm font-medium text-gray-700 mb-2'>Email</Text>
                    <View className='flex-row items-center bg-gray-50 rounded-xl px-4 py-4 border border-gray-200'>
                      <Ionicons name='mail-outline' size={20} color="#6B7280" />
                      <TextInput autoCapitalize='none' 
                        value={emailAddress} 
                        placeholder='Enter your email' 
                        placeholderTextColor="#9CA3AF"
                        className='ml-3 flex-1 text-gray-900'
                        editable={true}
                        onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
                      />
                    </View>
                  </View>
        
                  <View className='mb-4'>
                    <Text className='text-sm font-medium text-gray-700 mb-2'>Password</Text>
                    <View className='flex-row items-center bg-gray-50 rounded-xl px-4 py-4 border border-gray-200'>
                      <Ionicons name='lock-closed-outline' size={20} color="#6B7280" />
                      <TextInput autoCapitalize='none' 
                        value={password} 
                        placeholder='Enter your password' 
                        placeholderTextColor="#9CA3AF"
                        className='ml-3 flex-1 text-gray-900'
                        editable={!isLoading}
                        onChangeText={(password) => setPassword(password)}
                      />
                    </View>
                    <Text className='text-xs text-gray-500 mt-1'>
                      Password must be at least 8 characters long.
                    </Text>
                  </View>

                  <TouchableOpacity
                    onPress={onSignUpPress}
                    disabled={isLoading}
                    className={`rounded-xl py-4 shadow-sm mb-4 ${isLoading ?  "bg-gray-400" : "bg-blue-600" }`}
                    activeOpacity={0.8}
                  >
                    <View className='flex-row justify-center items-center'>
                      {isLoading ? (
                        <Ionicons name="refresh" size={20} color="white" />
                      ) : (
                        <Ionicons name="person-add-outline" size={20} color="white" />
                      )}
                    <Text className='text-center text-white text-lg ml-2 font-semibold'>
                      {isLoading ? (
                        'Creating account...'
                      ) : (
                        'Create Account'
                      )}
                    </Text>
                    </View>
                  </TouchableOpacity>
                  {/* Terms */}
                  <Text className='text-xs text-gray-500 text-center'>
                    By signing up, you agree to our Terms of Service and Privacy Policy.
                  </Text>
            </View>

            {/* Sign in link */ }
            <View className='flex-row justify-center items-center mb-6'>
              <Text className='text-gray-600'>Already have an account?</Text>
              <Link href="/sign-in" asChild>
                <TouchableOpacity>
                  <Text className='text-blue-600 font-medium ml-2'>Sign in</Text>
                </TouchableOpacity>
              </Link>
            </View>
          {/* footer */}
          <View className='pb-6'>
            <Text className='text-center text-gray-500 text-sm'>
              Ready to transform your fitness?
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}