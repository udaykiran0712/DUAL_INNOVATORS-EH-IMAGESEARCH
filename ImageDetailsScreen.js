import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import { UNSPLASH_ACCESS_KEY } from '@env';//ACCESS YOUR API KEY FROM SEPERATE FILE
import styles from './ImageDetailsScreenStyles';

const ImageDetailsScreen = ({ route }) => {
  const { item } = route.params;
  const [photoDetails, setPhotoDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPhotoDetails = async () => {
      try {
        const response = await fetch(`https://api.unsplash.com/photos/${item.id}?client_id=${UNSPLASH_ACCESS_KEY}`);//USE YOUR API KEY BECAUSE I AM NOT SHARING AS IT IS SENSITIVE.
        const data = await response.json();
        setPhotoDetails(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotoDetails();
  }, [item.id]);

  return (
    <View style={styles.container}>
      <Image source={{ uri: item.urls.full }} style={styles.image} />
      <View style={styles.detailsContainer}>
        {loading && <Text style={styles.loadingText}>Loading...</Text>}
        {error && <Text style={styles.errorText}>Error: {error}</Text>}
        {photoDetails && (
          <>
            <Text style={styles.title}>Title: {item.description || item.alt_description}</Text>
            <Text style={styles.detail}>Photographer: {item.user.name}</Text>
            <Text style={styles.detail}>Likes: {item.likes}</Text>
            <Text style={styles.detail}>Downloads: {photoDetails.downloads}</Text>
            <Text style={styles.detail}>Views: {photoDetails.views}</Text>
          </>
        )}
      </View>
    </View>
  );
};



export default ImageDetailsScreen;
