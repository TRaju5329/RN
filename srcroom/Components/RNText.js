import { decode } from 'html-entities'
import React from 'react'
import { Text, useTheme } from 'react-native-paper'

export const RNText = ({ children, style, ...props }) => {
    const theme = useTheme()
    return (
        <Text adjustsFontSizeToFit {...props} style={[theme.fonts.regular, style]}>
              {children === null || children === undefined || children === '' ? '' : decode(typeof children == Array ? children.filter((c) => c !== '' || c !== undefined).join(' ') : children, { level: 'html5' })}
        </Text>
    )
}
