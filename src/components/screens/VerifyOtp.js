import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../../styleSheets/Style';

export default function VerifyOtp({ navigation }) {
  const [otp, setOtp] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [email, setEmail] = useState('');
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
    try {
      const response = await fetch('http://100.25.26.230:5000/api/v1/reporters/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          otp: otp,
        }),
      });

      console.log(otp)
      console.log(email)
      const result = await response.json();

      console.log(result)

      if (result.status === 200) {
        // await AsyncStorage.setItem('userId', result.userId.toString());
        navigation.navigate('ChangePassword');
        Alert.alert('OTP verified successfully');
        // userId = result.userId
        // console.log(userId)
      } else {
        Alert.alert('Invalid OTP');
        setErrorMessage(result.message);
      }
    } catch (error) {
      console.log("eroorrr", error);
      setErrorMessage('An error occurred, please try again.');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#000' : '#fff' }]}>
      <Text style={[styles.title, { color: isDarkMode ? '#fff' : '#000' }]}>Forgot Your Password?</Text>
      <Text style={[styles.subtitle, { color: isDarkMode ? '#fff' : '#000' }]}>Enter your otp address and we'll send you instructions on how to reset your password.</Text>
      <TextInput
        style={[styles.input, { backgroundColor: isDarkMode ? '#333' : '#f2f2f2', color: isDarkMode ? '#fff' : '#000' }]}
        placeholder="Enter OTP"
        keyboardType="numeric"
        value={otp}
        onChangeText={setOtp}
        autoCapitalize="none"
        placeholderTextColor={isDarkMode ? '#888' : '#777'}
      />
      <TouchableOpacity style={styles.button} onPress={verifyOtp}>
        <Text style={styles.buttonText}>Verify OTP</Text>
      </TouchableOpacity>
      {errorMessage ? <Text style={[styles.error, { color: isDarkMode ? 'red' : '#ff0000' }]}>{errorMessage}</Text> : null}
    </View>
  );
}
