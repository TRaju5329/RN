import { View } from 'react-native'
import React from 'react'
import RNButton from './RNButton'
import { useTheme } from 'react-native-paper'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const BottomBar = (props) => {
    const theme = useTheme()
    const {bottom} = useSafeAreaInsets()
    return (
        <View style={{ flexDirection: 'row', marginTop: 20, bottom: 0, alignItems: 'center', paddingHorizontal: 25, paddingVertical: 20, paddingBottom: bottom, marginHorizontal: 15, backgroundColor: theme.colors.white, borderTopLeftRadius: 30, borderTopRightRadius: 30 }}>
            <View style={{ flexDirection: 'row', marginLeft: 'auto' }}>
                <RNButton disabled={props.disabled} onPress={props.onCancel} mode="outlined" labelStyle={{ color: props.disabled ? theme.colors.textLight : theme.colors.black }} style={{ borderRadius: 10, marginRight: 20, width: 115 }} label={'Cancel'} />
                <RNButton disabled={props.disabled} loading={props.loading} onPress={props.onSave} style={{ borderRadius: 10, width: 115 }} label={'Save'} />
            </View>
        </View>
    )
}

export default BottomBar