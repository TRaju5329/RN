import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SerchFilter from './src/Raff/SerchFilter'
import { Modeldemo } from './src/Raff/Modeldemo'
import { GestureHandlerRootView } from 'react-native-gesture-handler'



const App = () => {
  return (
  
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Modeldemo/>
     </GestureHandlerRootView>
  
  )
}

export default App

const styles = StyleSheet.create({})