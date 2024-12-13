import React, { useEffect, useState } from 'react'
import { Keyboard, Platform, TouchableOpacity, View } from 'react-native'
import { TextInput, useTheme } from 'react-native-paper'
import { RNText } from './RNText'
import DROPDOWNBLACK from '../Assets/Svg/Dropdown-Black.svg'
import EYEOFF from '../Assets/Svg/EyeOff.svg'
import PhoneInput from 'react-native-phone-number-input'
import { formatPhoneNumber } from '../Utils/formatPhoneNumber'
import countries from '../Utils/countries'
import { useAtom } from 'jotai'
import { accountAtom } from '../Store'
import { Dropdown } from 'react-native-element-dropdown'
import { decode } from 'html-entities'

const getCountriesList = Object.keys(countries).map((c) => c)

const RNInput = ({ error, style, showNoErrorMsg, inputRef, outlineStyle, disabled, inputStyle, dropdownPosition, searchPlaceholder, height, dropdownHeight, inputSearchStyle, flatListProps, items, dropdown, labelStyle, containerStyle, phoneInput, label: title, noTitle, phoneRef, countryCode, placeholder, value, onFocus, onBlurred, onChange, onFocusPhoneInput, textLoading, ...props }) => {
    const theme = useTheme()
    const [focus, setFocused] = useState(false)

    const [selected, setSelected] = useState([])

    const [pickerItems, setPickerItems] = useState([])

    const [passwordVisible, setPasswordVisible] = useState(false)


    const [account] = useAtom(accountAtom)

    useEffect(() => {
        if (items && items.length > 0) {
            setPickerItems(items.map((i) => ({ label: i.label?.length > 300 ? decode(`${i.label?.substring(0, 300).trim()}...`) : decode(i.label), value: i.value, icon: i.icon })))
        }
    }, [items])


    useEffect(() => {
        onFocus && onFocus(focus)
    }, [focus])

    if (dropdown) {
        return (
            <View style={containerStyle}>
                {(title !== '' && title !== undefined) && (
                    <RNText style={{ marginBottom: 5, fontSize: 18, color: theme.colors.headerColor, ...labelStyle }}>{title}</RNText>
                )}
                <Dropdown
                    style={[{
                        height: 56,
                        borderColor: error ? theme.colors.red : theme.colors.gray4,
                        borderWidth: 1,
                        borderRadius: 15,
                        paddingHorizontal: 10,
                    }, focus && { borderColor: theme.colors.primary }, disabled && { opacity: 0.5 }, { backgroundColor: theme.colors.white, ...inputStyle }]}
                    placeholderStyle={{
                        color: props.placeholderTextColor ? props.placeholderTextColor : theme.colors.textLight,
                        ...theme.fonts.regular,

                    }}
                    selectedTextStyle={[{
                        ...theme.fonts.regular,
                        textAlign: 'left',
                        color: theme.colors.black,
                    }]}
                    autoScroll={false}
                    renderRightIcon={() => (
                        <View style={{ paddingHorizontal: 5 }}>
                            <DROPDOWNBLACK />
                        </View>
                    )}
                    dropdownPosition={dropdownPosition || 'auto'}
                    selectedTextProps={{ numberOfLines: 1 }}
                    containerStyle={[{ backgroundColor: theme.colors.white, borderColor: theme.colors.lightWhite, borderWidth: 1, borderRadius: 15, paddingVertical: 8 }]}
                    itemTextStyle={{ ...theme.fonts.regular, color: theme.colors.primary, textAlign: 'left' }}
                    activeColor={theme.colors.white}
                    renderItem={(item, selected) => (
                        <View style={{ backgroundColor: selected ? theme.colors.primary : theme.colors.white, paddingHorizontal: 15, paddingVertical: 10, }}>
                            <RNText numberOfLines={2} style={[theme.fonts.regular, { textAlign: 'left', color: selected ? theme.colors.white : theme.colors.black }]}>{item.label}</RNText>
                        </View>
                    )}
                    inputSearchStyle={{ height: 40, ...theme.fonts.regular }}
                    iconStyle={{ height: 30, width: 30 }}
                    disable={disabled}

                    data={(pickerItems || []).map(i => ({ label: decode(i?.label), value: i?.value }))}
                    statusBarIsTranslucent={!Platform.OS === 'android'}
                    {...(dropdownHeight) && { maxHeight: dropdownHeight }}
                    labelField="label"
                    valueField="value"
                    placeholder={placeholder}

                    searchPlaceholder={searchPlaceholder}
                    value={value}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    onChange={item => {
                        onChange(item);
                        setFocused(false);
                    }}
                    {...props}
                />
                {error !== undefined && !showNoErrorMsg && (
                    <View style={{ marginBottom: 0, marginTop: 2 }}>
                        <RNText style={{ fontSize: 14, color: theme.colors.red }}>
                            {error}
                        </RNText>
                    </View>
                )}

            </View>

        )
    }


    if (phoneInput) {
        return (
            <View style={containerStyle}>
                {(title !== '' && title !== undefined) && (
                    <RNText style={{ marginBottom: 5, fontSize: 18, color: theme.colors.headerColor, ...labelStyle }}>{title}</RNText>
                )}

                <PhoneInput
                    ref={phoneRef}
                    defaultValue={value ? `${formatPhoneNumber(`${value}`)?.nationalNumber}` : ''}
                    value={value ? `${formatPhoneNumber(`${value}`)?.nationalNumber}` : ''}
                    defaultCode={countryCode || account?.defaultAccount?.country}
                    layout="first"
                    countryPickerProps={{ preferredCountries: ['US', 'GB', 'CA', 'AU'], countryCodes: getCountriesList, }}
                    placeholder={placeholder || ' '}
                    onChangeFormattedText={(text) => {
                        onChange(text)
                    }}
                    codeTextStyle={{ ...theme.fonts.regular }}
                    textInputProps={{
                        onFocus: () => {
                            onFocusPhoneInput && onFocusPhoneInput()
                            setFocused(true)
                        },
                        onBlur: () => {
                            onBlurred && onBlurred()
                            setFocused(false)
                        },
                        placeholderTextColor: theme.colors.textLight,
                        underlineColorAndroid: "transparent",
                        selectionColor: theme.colors.sky_blue,
                        returnKeyType: "done",
                        keyboardType: "number-pad",
                        onSubmitEditing: () => Keyboard.dismiss(),
                    }}
                    flagButtonStyle={{ backgroundColor: '#0000000d', width: 125 }}
                    textContainerStyle={[{ paddingHorizontal: 10, height: 40, backgroundColor: 'white' }]}
                    textInputStyle={{ height: 54, ...theme.fonts.regular, }}
                    containerStyle={[{
                        height: 56,
                        alignItems: 'center',
                        backgroundColor: 'white',
                        borderRadius: 15,
                        borderWidth: 1,
                        paddingRight: 10,
                        borderColor: theme.colors.textLight,
                    }, { width: '100%' }, { color: textLoading ? theme.colors.textLight : theme.colors.text }, focus && { borderColor: theme.colors.primary, }, error && { borderColor: theme.colors.red }, style]}

                />
                {error !== undefined && !showNoErrorMsg && (
                    <View style={{ marginBottom: 0, marginTop: 2 }}>
                        <RNText style={{ fontSize: 14, color: theme.colors.red }}>
                            {error}
                        </RNText>
                    </View>
                )}
            </View>
        )
    }
    return (
        <View style={containerStyle}>
            {(title !== '' && title !== undefined && !noTitle) && (
                <RNText style={{ marginBottom: 5, fontSize: 18, color: theme.colors.headerColor, ...labelStyle }}>{title}</RNText>
            )}
            <TextInput
                mode="outlined"
                disabled={disabled}
              
                // {...(noTitle ? { label: title } : {})}
                outlineColor={theme.colors.inputBorder}
                outlineStyle={[{ borderWidth: 1, borderRadius: 15, ...outlineStyle, }, error && { borderColor: theme.colors.red }]}
                value={value}
                style={[{ backgroundColor: theme.colors.white, minHeight: 40 }, style]}
                contentStyle={{...theme.fonts.regular}}
                placeholderTextColor={theme.colors.textLight}
                placeholder={placeholder}
                {...props}
                secureTextEntry={props.secureTextEntry && !passwordVisible}
                {...(props.secureTextEntry) ? { right: <TextInput.Icon onPress={() => setPasswordVisible(!passwordVisible)} icon={passwordVisible ? 'eye' : 'eye-off'} /> } : {}}
                ref={inputRef}

            />
            {error !== undefined && (
                <View style={{ marginBottom: 0, marginTop: 2 }}>
                    <RNText style={{ fontSize: 14, color: theme.colors.red }}>
                        {error}
                    </RNText>
                </View>
            )}

        </View>

    )
}

export default RNInput