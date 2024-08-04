import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      backgroundColor: '#f8f8f8',
    },
    image: {
      width: '100%',
      height: 300,
      borderRadius: 10,
    },
    detailsContainer: {
      marginTop: 15,
      padding: 10,
      backgroundColor: '#fff',
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 3,
    },
    loadingText: {
      textAlign: 'center',
    },
    errorText: {
      color: 'red',
      textAlign: 'center',
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    detail: {
      fontSize: 16,
      marginBottom: 5,
    },
  });

  export default styles;