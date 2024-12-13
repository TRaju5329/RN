import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Logo } from '../../assets/svg'
import { User1, User2 } from '../../assets/img'


const CustomFonts = () => {
  return (
     <>
      <Text>picktime</Text>
      <Image source={User1} style={{height:50, width:50}} resizeMode='contain'/>
      <Image source={User2} style={{height:50, width:50}} resizeMode='contain'/>
      
      <Logo style={styles.logo}/> 
      <Text style={styles.googlefonts}>picktime</Text>
      <Text style={styles.googlefont}>picktime</Text>
     </>
  )
}

export default CustomFonts

const styles = StyleSheet.create({
 
  googlefont: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 50,
  },
  googlefonts: {
    fontFamily: 'Poppins-Thin',
    fontSize: 50,
  },
  logo:{
    height: 50,
    width:50
  }
})