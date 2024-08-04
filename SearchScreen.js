import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, Text, TouchableOpacity, Image } from 'react-native';
import { UNSPLASH_ACCESS_KEY } from '@env';//ACCESS YOUR API KEY FROM SEPERATE FILE
import styles from './SearchScreenStyles';

const SearchScreen = ({ navigation }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  let isMounted = true;

  useEffect(() => {
    return () => {
      isMounted = false;
    };
  }, []);

  const handleSearch = async () => {
    if (searchTerm.trim() === '') {
      setError('Please enter a valid search term.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://api.unsplash.com/search/photos?query=${searchTerm}&client_id=${UNSPLASH_ACCESS_KEY}`);//USE YOUR API KEY BECAUSE I AM NOT SHARING AS IT IS SENSITIVE.
      
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const data = await response.json();
      if (isMounted) {
        setImages(data.results);
      }
    } catch (err) {
      if (isMounted) {
        setError('Failed to fetch images. Please try again later.');
      }
    } finally {
      if (isMounted) {
        setLoading(false);
      }
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search for images"
        value={searchTerm}
        onChangeText={setSearchTerm}
        style={styles.input}
      />
      <Button title="Search" onPress={handleSearch} />
      {loading && <Text style={styles.loadingText}>Loading...</Text>}
      {error && <Text style={styles.errorText}>{error}</Text>}
      <FlatList
        data={images}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.imageContainer} onPress={() => navigation.navigate('ImageDetails', { item })}>
            <Image source={{ uri: item.urls.small }} style={styles.image} />
            <Text style={styles.imageDescription}>{item.description || item.alt_description}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default SearchScreen;

