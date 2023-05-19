import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DashboardHeader = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <View style={styles.container}>
      {/* <Image source={require('../../assets/logo_darkkk.jpg')} style={styles.logo} /> */}
      <Text style={styles.title}>Dashboard</Text>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout} disabled={isLoading}>
        {isLoading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.logoutButtonText}>Logout</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    backgroundColor: 'red',
    height: 64,
  },
  logo: {
    width: 32,
    height: 32,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  logoutButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  logoutButtonText: {
    fontSize: 14,
    color: '#fff',
  },
});

export default DashboardHeader;
