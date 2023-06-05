import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, useColorScheme, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import BaseUrl from '../../services/api';
import styles from '../../styleSheets/Style';

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false); // State variable to track loading state
  const isDarkMode = useColorScheme() === 'dark';

  const handleResetPassword = async () => {
    setIsLoading(true); // Start loading

    if (email.trim() === '') {
      setErrorMessage('Please fill in the email field');
      setIsLoading(false); // Stop loading
      return;
    }

    // Email format validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setErrorMessage('Invalid email format');
      setIsLoading(false); // Stop loading
      return;
    }

    try {
      const response = await fetch(`${BaseUrl}/api/v1/reporters/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
        }),
      });

      console.log(email)
      const result = await response.json();

      console.log(result)

      if (result.status === 200) {
        await AsyncStorage.setItem('email', email);
        navigation.navigate('VerifyOtp');
      } else {
        setErrorMessage(result.error);
      }
    } catch (error) {
      console.log('error', error);
      setErrorMessage('An error occurred, please try again.');
    }

    setIsLoading(false); // Stop loading
  };

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#fff' : '#fff' }]}>
      <Text style={[styles.title, { color: isDarkMode ? '#000' : '#000' }]}>Forgot Your Password?</Text>
      <Text style={[styles.subtitle, { color: isDarkMode ? '#000' : '#000', marginTop: hp('2%') }]}>
        Enter your email address and we'll send you instructions on how to reset your password.
      </Text>
      <TextInput
        style={[styles.input, { backgroundColor: isDarkMode ? '#f2f2f2' : '#f2f2f2', color: isDarkMode ? '#000' : '#000', marginTop: hp('3%') }]}
        placeholder="Email Address"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        placeholderTextColor={isDarkMode ? '#777' : '#777'}
      />
      <TouchableOpacity style={[styles.button, { marginTop: hp('3%') }]} onPress={handleResetPassword} disabled={isLoading}>
        {isLoading ? (
          <ActivityIndicator color="#fff" /> // Show loading spinner while loading
        ) : (
          <Text style={styles.buttonText}>Reset Password</Text>
        )}
      </TouchableOpacity>
      {errorMessage ? <Text style={[styles.error, { color: isDarkMode ? '#ff0000' : '#ff0000', marginTop: hp('3%') }]}>{errorMessage}</Text> : null}
    </View>
  );
}
