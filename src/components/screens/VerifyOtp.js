import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, useColorScheme, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import BaseUrl from '../../services/api';
import styles from '../../styleSheets/Style';

export default function VerifyOtp({ navigation }) {
  const [otp, setOtp] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false); // State variable to track loading state
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

  const verifyOtp = async () => {
    setIsLoading(true); // Start loading

    if (otp.trim() === '') {
      setErrorMessage('Please fill in the OTP field');
      setIsLoading(false); // Stop loading
      return;
    }

    try {
      const response = await fetch(`${BaseUrl}/api/v1/reporters/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          otp: otp,
        }),
      });

      console.log(otp);
      console.log(email);
      const result = await response.json();

      console.log(result);

      if (result.status === 200) {
        navigation.navigate('ChangePassword');
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
        Enter the OTP you received in your email to reset your password.
      </Text>
      <TextInput
        style={[styles.input, { backgroundColor: isDarkMode ? '#f2f2f2' : '#f2f2f2', color: isDarkMode ? '#000' : '#000', marginTop: hp('3%') }]}
        placeholder="Enter OTP"
        keyboardType="numeric"
        value={otp}
        onChangeText={setOtp}
        autoCapitalize="none"
        placeholderTextColor={isDarkMode ? '#777' : '#777'}
      />
      <TouchableOpacity style={[styles.button, { marginTop: hp('3%') }]} onPress={verifyOtp} disabled={isLoading}>
        {isLoading ? (
          <ActivityIndicator color="#fff" /> // Show loading spinner while loading
        ) : (
          <Text style={styles.buttonText}>Verify OTP</Text>
        )}
      </TouchableOpacity>
      {errorMessage ? <Text style={[styles.error, { color: isDarkMode ? '#ff0000' : '#ff0000', marginTop: hp('3%') }]}>{errorMessage}</Text> : null}
    </View>
  );
}
