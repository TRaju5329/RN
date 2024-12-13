import { Modal, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Avatar, useTheme } from 'react-native-paper'
import ImageView from 'react-native-image-viewing'
import getInitials from '../Utils/getInitials'

const CustomAvatar = ({ source: uri, disabled, style, size, title }) => {

    const [visible, setIsVisible] = useState(false)

    const theme = useTheme()


    if (!uri) {
        return (
            <View style={style}>
                <Avatar.Text backgroundColor={theme.colors.imageBg} size={size || 100} color={theme.colors.black} label={getInitials(title)} />
            </View>
        )
    }

    return (
        <>
            {disabled ? (
                <View style={style}>
                    <Avatar.Image size={size || 100} source={uri} />
                </View>
            ) : (

                <>
                    {/* <ImageView
                        images={[uri]}
                        imageIndex={0}
                        visible={visible}
                        onRequestClose={() => setIsVisible(false)}
                    /> */}
                    <View style={style}>
                        <Avatar.Image size={size || 100} source={uri} />
                    </View>
                </>

            )}



        </>
    )
}

export default CustomAvatar