import React, { useState } from 'react';
import BaseUrl from '../../services/api';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../../styleSheets/Style';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false); // State variable to track loading state
  const [showPassword, setShowPassword] = useState(false); // State variable to toggle password visibility

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  const handleLogin = async () => {
    setIsLoading(true); // Start loading

    try {
      if (!email || !password) {
        setErrorMessage('Please fill in all required fields.'); // Show error message if any required field is empty
        setIsLoading(false);
        return;
      }

      // Additional email validation
      if (!validateEmail(email)) {
        setErrorMessage('Please enter a valid email.'); // Show error message if email is invalid
        setIsLoading(false);
        return;
         
      }

      const response = await fetch(`${BaseUrl}/api/v1/reporters/applogin`, {
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
      const result = await response.json();

      console.log(result);

      if (result.error === false) {
        await AsyncStorage.setItem('userId', result.userId.toString());
        // After successful login
       await AsyncStorage.setItem('isLoggedIn', 'true');
        navigation.navigate('Dashboard');
        userId = result.userId;
        console.log(userId);
      } else {
        setErrorMessage(result.error);
      }
    } catch (error) {
      console.log('eroorrr', error);
      setErrorMessage('An error occurred, please try again.');
    }

    setIsLoading(false); // Stop loading
  };

  const handleSignUp = () => {
    navigation.navigate('SignUp');
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const isDarkMode = useColorScheme() === 'dark';

  const containerStyle = {
    backgroundColor: isDarkMode ? '#fff' : '#fff',
  };

  const inputStyle = {
    borderColor: isDarkMode ? '#ccc' : '#ccc',
    backgroundColor: isDarkMode ? '#fff' : '#fff',
    color: isDarkMode ? '#000' : '#000',
  };

  const passwordContainerStyle = {
    borderColor: isDarkMode ? '#ccc' : '#ccc',
    backgroundColor: isDarkMode ? '#fff' : '#fff',
  };
  const inputTextStyle = {
    color: isDarkMode ? '#000' : '#000',
  };
  const eyeIconStyle = {
    color: isDarkMode ? '#000' : '#000',
  };

  // ... (previous code)

const validateEmail = (email) => {
  // Regular expression to validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// ... (remaining code)


  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.title, { color: isDarkMode ? '#000' : '#000' }]}>Welcome back!</Text>
      <TextInput
        placeholder="Email"
        placeholderTextColor={isDarkMode ? '#999' : '#777'}
        style={[styles.input, inputStyle]}
        onChangeText={setEmail}
      />
      <View style={[styles.passwordContainer, passwordContainerStyle]}>
        <TextInput         
          style={[styles.passwordInput, inputTextStyle]}
          placeholder="Password"
          placeholderTextColor={isDarkMode ? '#999' : '#777'}
          secureTextEntry={!showPassword}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={toggleShowPassword} style={styles.eyeIconContainer}>
          <Text style={[styles.eyeIcon, eyeIconStyle]}>{showPassword ? '🕶️' : '👁️'}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={[styles.button, !email || !password ? styles.disabledButton : null]}
        onPress={handleLogin}
        // disabled={isLoading || !email || !password} 
        // Disable the button if loading or any required field is empty
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" /> // Show loading spinner while loading
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSignUp}>
        <Text style={styles.signUp}>New here? Sign up</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
    </View>
  );
}
