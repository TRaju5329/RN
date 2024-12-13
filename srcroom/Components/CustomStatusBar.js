import * as React from 'react';
import { View, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


const CustomStatusBar = (
    {
        backgroundColor,
        hidden,
    }
) => {

    const insets = useSafeAreaInsets();

    return (
        <View style={{ height: insets.top, backgroundColor, zIndex:999999999 }}>
            <StatusBar
                animated={true}
                hidden={true}
                backgroundColor={backgroundColor}
                barStyle={(backgroundColor === '#ffffff' || backgroundColor === '#fff') ? 'dark-content' : 'light-content'} />
        </View>
    );
}

export default CustomStatusBar
