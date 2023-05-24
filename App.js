import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const isLoggedInValue = await AsyncStorage.getItem('isLoggedIn');
      if (isLoggedInValue && isLoggedInValue === 'true') {
        setIsLoggedIn(true);
      }
      setIsLoading(false);
    } catch (error) {
      console.log('Error retrieving login status: ', error);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return null; // Render a loading indicator or splash screen here
  }

  return (
    <AppNavigator isLoggedIn={isLoggedIn} />
  );
}
