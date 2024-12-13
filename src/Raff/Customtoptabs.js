import { StyleSheet, Text, TouchableOpacity, View, Dimensions, FlatList, Image, SafeAreaView, } from 'react-native'
import React, { useState } from 'react'


const Listtab = [
    {
        status : 'All',
    },
    {
        status : 'Purple',
    },
    {
        status : 'Green',
    },
]

const data = [
    {
        name : 'Sameer',
        status : 'Green',
    },
    {
        name : 'Divya',
        status : 'Green',
    },
    {
        name : 'Sowmya',
        status : 'Purple',
    },
    {
        name : 'Pravallika',
        status : 'Purple',
    },
    {
        name : 'Siva',
        status : 'Green',
    },
    {
        name : 'Dakshitha',
        status : 'Purple',
    },
]



const Customtoptabs = () => {

    const [status, setStatus] = useState('All')

    const [dataList, setDataList] = useState(data)

    const renderItem = ({item, index}) => {
        return (
            <View key={index} style = {styles.itemContainer} >
                <View  style = {styles.itemLogo} >
                    {/* <Image source={require('../Images/AnimalSir.png')} style = {styles.itemImage} /> */}
                    <Image source={{uri:'https://e7.pngegg.com/pngimages/81/570/png-clipart-profile-logo-computer-icons-user-user-blue-heroes-thumbnail.png'}} style = {styles.itemImage} />
                </View>
                <View style = {styles.itemBody } >
                    <Text style = {styles.itemBodyText } >{item.name}</Text>
                </View>
                <View style = {[styles.itemststusBox, { backgroundColor: item.status === 'Purple' ? '#E5848E' : '#69C080', borderRadius : 8, } ]}>
                    <Text style = {styles.itemststusText}>{item.status}</Text>
                </View>
            </View>
        )
    }

    const setStatusFilter = (status) => {
        if (status !== 'All') {
            setDataList([...data.filter(e => e.status === status)])
        } else {
            setDataList(data)
        }
        setStatus(status)
    }

    return (
        <SafeAreaView style = {styles.container} >
            <View style = {styles.cuntomBox} >
                {
                    Listtab.map( (e, k) => (
                        <TouchableOpacity 
                            key={k} 
                            style = {[styles.subBox, status === e.status && styles.activesubBox]} 
                            onPress={() => setStatusFilter(e.status)} 
                        >
                            <Text style = {[styles.subBoxText, status === e.status && styles.avtivesubBoxText]}>{e.status}</Text>
                        </TouchableOpacity>
                    ))
                }
            </View>
            <FlatList 
                data={dataList}
                keyExtractor={(e, i) => i.toString()}
                renderItem={renderItem}
            />
        </SafeAreaView>
    )
}

export default Customtoptabs

const styles = StyleSheet.create({
    container : {
        flex : 1,
        paddingTop: 20,
    },
    cuntomBox : {
        flexDirection: 'row',
        alignSelf: 'center'
    },
    subBox : {
        width: Dimensions.get('window').width/3.5,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0.5,
        borderColor: '#EFEFEF',
        padding: 12
    },
    subBoxText : {
        fontSize: 20,
        fontWeight: '600',
        color: '#000',
        marginLeft: 12,
    },
    activesubBox : {
        backgroundColor: '#E6838D'
    },
    avtivesubBoxText : {
        color : '#fff'
    },
    itemContainer : {
        flexDirection: 'row',
        paddingVertical: 15,
        alignItems: 'center',
        justifyContent : 'space-between',
    },
    itemLogo : {
        padding: 10,
    },
    itemImage : {
        width: 75,
        height: 75,
        borderRadius: 75,
    },
    itemBody : {
        justifyContent: 'center',
    },
    itemBodyText : {
        fontWeight : '600',
        color : 'black',
        fontSize : 24, 
    },
    itemststusBox : {
        marginRight: 12,
    },
    itemststusText: {
        paddingHorizontal : 20,
        paddingVertical: 10,
        color: 'white',
        fontSize: 20,
    },
})
