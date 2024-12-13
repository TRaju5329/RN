import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, ActivityIndicator, TouchableOpacity, FlatList } from 'react-native';
import axios from 'axios';
import cities from '../data/cities.json'; // Import the city list JSON

const WeatherScreen = () => {
  const [city, setCity] = useState('');
  const [filteredCities, setFilteredCities] = useState([]);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const apiKey = '72956f57b70b9870f7031c5b77b68075';

  const findCity = (query) => {
    if (query) {
      const filtered = cities.filter(city => city.name.toLowerCase().startsWith(query.toLowerCase()));
      setFilteredCities(filtered);
    } else {
      setFilteredCities([]);
    }
  };

  const fetchWeather = async (cityName) => {
    const cityData = cities.find(c => c.name.toLowerCase() === cityName.toLowerCase());

    if (!cityData) {
      setError('City not found');
      setLoading(false);
      return;
    }

    const cityId = cityData.id;

    setLoading(true);
    setError('');
    setWeather(null);

    try {
      const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
          id: cityId,
          appid: apiKey,
          units: 'metric',
        },
      });
      if (response.data) {
        setWeather(response.data);
      } else {
        setError('Weather data not available');
      }
    } catch (err) {
      setError('Failed to fetch weather information');
    } finally {
      setLoading(false);
    }
  };

  const renderCity = ({ item }) => (
    <TouchableOpacity onPress={() => {
      setCity(item.name);
      setFilteredCities([]);
      fetchWeather(item.name);
    }}>
      <Text>{item.name}, {item.country}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weather App</Text>
      <TextInput
        style={styles.input}
        value={city}
        onChangeText={(text) => {
          setCity(text);
          findCity(text);
        }}
        placeholder="Enter city name"
      />
      <FlatList
        data={filteredCities}
        keyExtractor={item => item.id.toString()}
        renderItem={renderCity}
        style={styles.list}
      />
      <Button title="Get Weather" onPress={() => fetchWeather(city)} />
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {weather && (
        <View style={styles.weatherContainer}>
          <Text style={styles.city}>{weather.name}</Text>
          <Text style={styles.temperature}>{weather.main.temp}°C</Text>
          <Text style={styles.description}>{weather.weather[0].description}</Text>
          <Image
            style={styles.icon}
            source={{ uri: `https://openweathermap.org/img/wn/${weather.weather[0].icon}.png` }}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    width: '80%',
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginBottom: 16,
  },
  list: {
    width: '80%',
    maxHeight: 200,
    marginBottom: 16,
  },
  loading: {
    marginTop: 16,
    fontSize: 16,
  },
  error: {
    marginTop: 16,
    fontSize: 16,
    color: 'red',
  },
  weatherContainer: {
    marginTop: 32,
    alignItems: 'center',
  },
  city: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  temperature: {
    fontSize: 48,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  description: {
    fontSize: 24,
    fontStyle: 'italic',
    marginBottom: 8,
  },
  icon: {
    width: 100,
    height: 100,
  },
});

export default WeatherScreen;
