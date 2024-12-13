import React, { useState, useRef } from 'react';
import { View, Text, Image, FlatList, StyleSheet, SafeAreaView, StatusBar, TextInput, TouchableOpacity } from 'react-native';
import { Modalize } from 'react-native-modalize';


const DATA = [
  {
    id: '1',
    title: 'iPhone 13 Pro',
    imageUrl: 'https://img.freepik.com/free-vector/realistic-white-smartphone-design-with-three-cameras_23-2148374059.jpg?ga=GA1.1.1296900795.1715853193&semt=sph', // Replace with actual iPhone 13 Pro image URL
    description: 'The latest iPhone with advanced features. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
    category: 'Mobile',
  },
  {
    id: '2',
    title: 'Samsung Galaxy S21',
    imageUrl: 'https://img.freepik.com/free-vector/silver-smartphone_23-2147694815.jpg?ga=GA1.1.1296900795.1715853193&semt=ais_user', // Replace with actual Galaxy S21 image URL
    description: 'A flagship phone from Samsung with powerful specifications. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industryLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
    category: 'Mobile',
  },
  {
    id: '3',
    title: 'MacBook Pro',
    imageUrl: 'https://img.freepik.com/free-photo/laptop-computer-with-colorful-screen-white-background-3d-render_1142-54662.jpg?ga=GA1.1.1296900795.1715853193&semt=ais_user', // Replace with actual MacBook Pro image URL
    description: 'Powerful laptop with stunning Retina display.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
    category: 'Laptop',
  },
  {
    id: '4',
    title: 'Dell XPS 13',
    imageUrl: 'https://img.freepik.com/free-psd/elegant-computer-mockup_1310-736.jpg?ga=GA1.1.1296900795.1715853193&semt=ais_user', // Replace with actual Dell XPS 13 image URL
    description: 'Premium laptop with InfinityEdge display. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
    category: 'Laptop',
  },
  {
    id: '5',
    title: 'Lenova E14',
    imageUrl: 'https://img.freepik.com/free-photo/laptop-device-with-minimalist-monochrome-background_23-2150763335.jpg?ga=GA1.1.1296900795.1715853193&semt=ais_user', // Replace with actual iPhone 13 Pro image URL
    description: 'The latest iPhone with advanced features. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
    category: 'Laptop',
  },
  {
    id: '6',
    title: 'Moto',
    imageUrl: 'https://img.freepik.com/free-vector/back-front-smartphone_23-2147698164.jpg?ga=GA1.1.1296900795.1715853193&semt=ais_user', // Replace with actual Galaxy S21 image URL
    description: 'A flagship phone from Samsung with powerful specifications.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
    category: 'Mobile',
  },
  {
    id: '7',
    title: 'Asus',
    imageUrl: 'https://img.freepik.com/free-psd/elegant-computer-mockup_1310-738.jpg?ga=GA1.1.1296900795.1715853193&semt=sph', // Replace with actual MacBook Pro image URL
    description: 'Powerful laptop with stunning Retina display. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
    category: 'Laptop',
  },
  {
    id: '8',
    title: 'One Plus',
    imageUrl: 'https://img.freepik.com/free-vector/silver-smartphone_23-2147694815.jpg?ga=GA1.1.1296900795.1715853193&semt=ais_user', // Replace with actual Dell XPS 13 image URL
    description: 'Premium laptop with InfinityEdge display. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
    category: 'Mobile',
  },
];

const data = [
  { id: '1', imageUrl: 'https://img.freepik.com/free-vector/silver-smartphone_23-2147694815.jpg?ga=GA1.1.1296900795.1715853193&semt=ais_user', title: 'One Plus' },
  { id: '2', imageUrl: 'https://img.freepik.com/free-photo/laptop-device-with-minimalist-monochrome-background_23-2150763335.jpg?ga=GA1.1.1296900795.1715853193&semt=ais_user', title: 'Lenova E14' },
  { id: '3', imageUrl: 'https://img.freepik.com/free-photo/laptop-computer-with-colorful-screen-white-background-3d-render_1142-54662.jpg?ga=GA1.1.1296900795.1715853193&semt=ais_user', title: 'Mack book pro' },
  { id: '4', imageUrl: 'https://img.freepik.com/free-psd/elegant-computer-mockup_1310-738.jpg?ga=GA1.1.1296900795.1715853193&semt=sph', title: 'Asus' },
];

const SearchFilter = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(DATA);
  const [selectedItem, setSelectedItem] = useState(null);
  const modalizeRef = useRef(null);

  const handleSearch = (text) => {
    setSearchQuery(text);
    const newData = DATA.filter((item) => {
      const itemData = `${item.title.toLowerCase()} ${item.description.toLowerCase()}`;
      const query = text.toLowerCase();
      return itemData.indexOf(query) > -1;
    });
    setFilteredData(newData);
  };

  const ListItem = ({ item }) => {
    const handlePress = () => {
      setSelectedItem(item);
      if (modalizeRef.current) {
        modalizeRef.current.open();
      }
    };

    return (
      <TouchableOpacity style={styles.item} onPress={handlePress}>
        <Image source={{ uri: item.imageUrl }} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description} numberOfLines={2}>{item.description}</Text>
        </View>
      </TouchableOpacity>
    );
  };
   
  const RecentList = ({ item }) => {
    return (
      <TouchableOpacity style={styles.Recentitem}>
        <Image source={{ uri: item.imageUrl }} style={styles.Recentimage} />
        <Text style={styles.Recenttitle}>{item.title}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <SafeAreaView style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Search..."
          onChangeText={handleSearch}
          value={searchQuery}
        />
        <View>
          <Text  style={styles.title}>Recent Viewed List</Text>
            <FlatList
              data={data}
              renderItem={({ item }) => <RecentList item={item} />}
              keyExtractor={(item) => item.id.toString()}
              horizontal={true}
              showsHorizontalScrollIndicator= {false}
            />
        </View>
        <Text  style={styles.title}>All Iteams</Text>
        <FlatList
          data={filteredData}
          renderItem={({ item }) => <ListItem item={item} />}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />

        <Modalize ref={modalizeRef} adjustToContentHeight>
          <View style={styles.modalContent}>
            {selectedItem && (
              <>
                <Image source={{ uri: selectedItem.imageUrl }} style={styles.modalImage} />
                <Text style={styles.modalTitle}>{selectedItem.title}</Text>
                <Text style={styles.modalDescription}>{selectedItem.description}</Text>
              </>
            )}
          </View>
        </Modalize>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 20,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    margin: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  modalContent: {
    padding: 20,
  },
  modalImage: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    borderRadius: 10,
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 18,
    marginBottom: 20,
  },
  test: {
    fontSize: 16,
  },
  Recentimage:{
    height: 100, 
    width:100,
    resizeMode: 'contain',
  },
  Recentitem:{
    borderWidth:0.5,
    borderColor:"#000",
    borderRadius:5,
    padding:2,
    marginHorizontal:5,
    marginVertical:10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  Recenttitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  }
});

export default SearchFilter;
