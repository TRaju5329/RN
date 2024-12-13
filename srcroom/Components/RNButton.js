import { View } from 'react-native'
import React from 'react'
import { Button, useTheme } from 'react-native-paper'
import Spinner from 'react-native-loading-spinner-overlay'

const RNButton = ({ mode, onPress, label, loading, style, ...props }) => {
    const theme = useTheme()
    return (
        <>
            <Spinner textContent=""  customIndicator={<View />} size="normal" visible={loading} />
            <Button loading={loading} mode={mode ? mode : "contained"} onPress={onPress} style={[{ borderRadius: 20 }, style]}  {...props}>
                {label}
            </Button>
        </>
    )
}

export default RNButton