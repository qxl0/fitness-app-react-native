import AntDesign from '@expo/vector-icons/AntDesign';
import { Tabs } from 'expo-router';
import React from 'react';

function Layout(){ 
  return (
    <Tabs>
      <Tabs.Screen name="index" 
        options={{ 
          title: 'Home',
          headerShown: false,

          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" color={color} size={size} />
          ),
        }}
      />
     

    <Tabs.Screen name="exercises" 
        options={{ 
          title: 'Exercises',
          headerShown: false,

          tabBarIcon: ({ color, size }) => (
            <AntDesign name="plus-circle" color={color} size={size} />
          ),
        }}
      /> 
      <Tabs.Screen name="workout" 
        options={{ 
          title: 'Workout',
          headerShown: false,

          tabBarIcon: ({ color, size }) => (
            <AntDesign name="plus-circle" color={color} size={size} />
          ),
        }}
      /> 

      <Tabs.Screen name="active-workout" 
        options={{ 
          title: 'Active Workout',
          headerShown: false,
          tabBarStyle: { display: 'none' },
        }}
      /> 

       <Tabs.Screen name="history" 
        options={{ 
          title: 'History',
          headerShown: false,

          tabBarIcon: ({ color, size }) => (
            <AntDesign name="clock-circle" color={color} size={size} />
          ),
        }}
      /> 

       <Tabs.Screen name="profile/index" 
        options={{ 
          title: 'Profile',
          headerShown: false,

          // tabBarIcon: ({ color, size }) => (
          //   <AntDesign name="clock-circle" color={color} size={size} />
          // ),
        }}
      /> 
    </Tabs>
  )
}


  export default Layout