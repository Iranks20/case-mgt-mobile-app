import React, { useState, useEffect } from 'react';
import BaseUrl from '../../services/api';
import { View, Text, TouchableOpacity, Image, StyleSheet, ActivityIndicator, Animated } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DashboardHeader = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [welcomeAnimation] = useState(new Animated.Value(0));
  const [infoAnimation] = useState(new Animated.Value(0));
  const [userData, setUserData] = useState([]);

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
      const userId = await AsyncStorage.getItem('userId');
      const response = await fetch(`${BaseUrl}/api/v1/reporters/${userId}`);
      const data = await response.json();
      setUserData(data);

      if (Array.isArray(data) && data.length > 0) {
        const { firstName, lastName } = data[0];
        const byWho = `${firstName} ${lastName}`;
        console.log(byWho);
        await AsyncStorage.setItem('byWho', byWho);
      }
    } catch (error) {
      console.log('Error fetching user details:', error);
    }
  };

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      await AsyncStorage.clear();
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
            <Text style={styles.title}>Dashboard</Text>
          </View>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout} disabled={isLoading}>
            {isLoading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Image source={require('../../assets/logout.png')} style={styles.logoutButtonIcon} />
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  textContainer: {
    marginTop: 10,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  infoText: {
    fontSize: 14,
    color: '#fff',
  },
  logoutButton: {
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  logoutButtonIcon: {
    width: 35,
    height: 24,
    tintColor: '#fff',
  },
});

export default DashboardHeader;
