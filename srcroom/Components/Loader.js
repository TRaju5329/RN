import React from 'react'
import { Platform, View } from 'react-native'
import { Flow } from 'react-native-animated-spinkit'
import Spinner from 'react-native-loading-spinner-overlay'
import { useTheme } from 'react-native-paper'
import { RNText } from './RNText'
import { useSafeAreaInsets } from 'react-native-safe-area-context'


const Loader = ({ customText, loading }) => {
    const theme = useTheme()

    const {bottom} = useSafeAreaInsets()
    return (
        <Spinner textContent="" customIndicator={
            <View style={{ flexDirection: 'row', position: 'absolute', bottom: Platform.OS === 'ios' ? bottom : 90, alignItems: 'center', backgroundColor: '#3F1076', paddingHorizontal: 25, paddingVertical: 12, borderRadius: 8 }}>
                <RNText adjustsFontSizeToFit style={[{ marginRight: 10, color: theme.colors.white, ...theme.fonts.medium }]}>{customText ? customText : 'Loading'}</RNText>
                <Flow size={19} color={theme.colors.white} />
            </View>
        } size="normal" visible={loading} />
    )
}

export default Loader