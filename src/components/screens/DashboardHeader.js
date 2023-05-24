import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ActivityIndicator, Animated } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DashboardHeader = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [welcomeAnimation] = useState(new Animated.Value(0));
  const [infoAnimation] = useState(new Animated.Value(0));
  const [userData, setUserData] = useState([]);
  // console.log(userData)

  useEffect(() => {
    startAnimations();
    fetchUserDetails();
  }, []);

  const startAnimations = () => {
    Animated.parallel([
      Animated.timing(welcomeAnimation, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(infoAnimation, {
        toValue: 1,
        duration: 1000,
        delay: 500,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const fetchUserDetails = async () => {
    try {
      // Get the userId from AsyncStorage
      const userId = await AsyncStorage.getItem('userId');

      // Make the API call to fetch user details
      const response = await fetch(`http://100.25.26.230:5000/api/v1/reporters/${userId}`);
      const data = await response.json();

      // Update the state with the userdata
      setUserData(data);
      
    // Extract firstName and lastName from the userData and store them in local storage
    if (Array.isArray(data) && data.length > 0) {
      const { firstName, lastName } = data[0];
      const byWho = `${firstName} ${lastName}`;
      console.log(byWho)
      await AsyncStorage.setItem('byWho', byWho);
    }
    } catch (error) {
      console.log('Error fetching user details:', error);
    }
  };

  const handleLogout = async () => {
    try {
      setIsLoading(true);

      // Simulate an asynchronous operation with a delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Clear AsyncStorage or delete the stored details
      await AsyncStorage.clear();

      // Navigate to the Login screen
      navigation.navigate('Login');
    } catch (error) {
      console.log('Error clearing AsyncStorage:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const welcomeTextStyles = {
    opacity: welcomeAnimation,
    transform: [
      {
        translateY: welcomeAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [20, 0],
        }),
      },
    ],
  };

  const infoTextStyles = {
    opacity: infoAnimation,
    transform: [
      {
        translateY: infoAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [20, 0],
        }),
      },
    ],
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            {/* <Image source={require('../../assets/logo_darkkk.jpg')} style={styles.logo} /> */}
            <Text style={styles.title}>Dashboard</Text>
          </View>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout} disabled={isLoading}>
            {isLoading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.logoutButtonText}>Logout</Text>
            )}
          </TouchableOpacity>
        </View>
        <Animated.View style={[styles.textContainer, welcomeTextStyles]}>
        {userData.map((users) => (
          <Text style={styles.welcomeText}>Welcome to your Dashboard, {users.lastName}!</Text>
        ))}
        </Animated.View>
        <Animated.View style={[styles.textContainer, infoTextStyles]}>
          <Text style={styles.infoText}>Feel free to report incidents using our system.</Text>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#2196F3',
    borderRadius: 10,
    padding: 20,
    // marginBottom: 20,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff', // Set the text color to white
  },
  textContainer: {
    marginTop: 10,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff', // Set the text color to white
  },
  infoText: {
    fontSize: 14,
    color: '#fff', // Set the text color to white
  },
  logoutButton: {
    backgroundColor: '#fff', // Change the background color of the login button
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  logoutButtonText: {
    fontSize: 14,
    color: '#2196F3',
    fontWeight: 'bold',
  },
});


export default DashboardHeader;
