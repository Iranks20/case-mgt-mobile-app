import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, useColorScheme, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import BaseUrl from '../../services/api';
import styles from '../../styleSheets/Style';

export default function ChangePassword({ navigation }) {
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false); // State variable to track loading state
  const [showPassword, setShowPassword] = useState(false); // State variable to toggle password visibility
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    const getEmail = async () => {
      try {
        const email = await AsyncStorage.getItem('email');
        setEmail(email);
      } catch (error) {
        console.log(error);
      }
    };

    getEmail();
  }, []);

  const changePassword = async () => {
    setIsLoading(true); // Start loading

    if (password.trim() === '') {
      setErrorMessage('Please fill in the password field');
      setIsLoading(false); // Stop loading
      return;
    }

    try {
      const response = await fetch(`${BaseUrl}/api/v1/reporters/change-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      console.log(password);
      console.log(email);
      const result = await response.json();

      console.log(result);

      if (result.status === 200) {
        navigation.navigate('Login');
        Alert.alert('Password changed successfully');
      } else {
        Alert.alert('Invalid password');
        setErrorMessage(result.message);
      }
    } catch (error) {
      console.log('error', error);
      setErrorMessage('An error occurred, please try again.');
    }

    setIsLoading(false); // Stop loading
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#fff' : '#fff' }]}>
      <Text style={[styles.title, { color: isDarkMode ? '#000' : '#000' }]}>Change Your Password?</Text>
      <Text style={[styles.subtitle, { color: isDarkMode ? '#000' : '#000' }]}>Enter your new password</Text>
      <View style={[styles.passwordContainer, { backgroundColor: isDarkMode ? '#f2f2f2' : '#f2f2f2', marginTop: hp('3%') }]}>
        <TextInput
          style={[styles.passwordInput, { color: isDarkMode ? '#000' : '#000' }]}
          placeholder="Enter password"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
          placeholderTextColor={isDarkMode ? '#777' : '#777'}
        />
        <TouchableOpacity onPress={toggleShowPassword} style={styles.eyeIconContainer}>
          <Text style={[styles.eyeIcon, { color: isDarkMode ? '#000' : '#000' }]}>
            {showPassword ? '🕶️' : '👁️'}
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={changePassword} disabled={isLoading}>
        {isLoading ? (
          <ActivityIndicator color="#fff" /> // Show loading spinner while loading
        ) : (
          <Text style={styles.buttonText}>Change password</Text>
        )}
      </TouchableOpacity>
      {errorMessage ? (
        <Text style={[styles.error, { color: isDarkMode ? '#ff0000' : '#ff0000', marginTop: hp('3%') }]}>
          {errorMessage}
        </Text>
      ) : null}
    </View>
  );
}
