import React, { useEffect } from 'react'
import { Dialog, Portal, Text, TouchableRipple, useTheme } from 'react-native-paper';
import { RNText } from './RNText';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import { TouchableOpacity, View } from 'react-native';
import RNButton from './RNButton';


const MessageBox = ({ title, subtitle, visible : visiblity, loading, button1, button2, onPressButton1, onPressButton2, buttonColor1, buttonColor2 }) => {
    const [visible, setVisible] = React.useState(false);

    useEffect(() => {
        if(visiblity){
            setVisible(true)
        }else{
            setVisible(false)
        }
       
    }, [visiblity])

    const theme = useTheme()
    return (
        <Portal>
            <Dialog style={{width: responsiveWidth(40), alignSelf:'center', borderRadius: 10, paddingBottom: 20, paddingHorizontal: 15}} visible={visible}>
                <Dialog.Title style={{ alignSelf:'center', ...theme.fonts.bold, fontSize: 20}}>{title}</Dialog.Title>
                {subtitle !== '' && (
                    <Dialog.Content>
                        <RNText style={{textAlign:'center'}} variant="bodyMedium">{subtitle}</RNText>
                    </Dialog.Content>
                )}
                <View style={{flexDirection:'row', marginLeft: 'auto'}}>
                    <RNButton buttonColor={buttonColor1} style={{marginRight: 20}} label={button1} onPress={onPressButton1} />
                    <RNButton loading={loading} label ={button2} buttonColor={buttonColor2} onPress={onPressButton2} />
                </View>
                {/* <TouchableOpacity onPress={() => {
                    setVisible(false)
                    onDismiss()
                }} style={{ marginLeft: 'auto', marginRight: 20 }}><RNText style={{color: theme.colors.primary, ...theme.fonts.semibold}}>OK</RNText></TouchableOpacity> */}
            </Dialog>
        </Portal>
    )
}

export default MessageBox