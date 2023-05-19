import React, { useState } from 'react';
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
      const response = await fetch('http://100.25.26.230:5000/api/v1/reporters/applogin', {
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
        navigation.navigate('Dashboard');
        userId = result.userId;
        console.log(userId);
      } else {
        setErrorMessage(result.message);
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
    backgroundColor: isDarkMode ? '#000' : '#fff',
  };

  const inputStyle = {
    borderColor: isDarkMode ? '#fff' : '#ccc',
    backgroundColor: isDarkMode ? '#333' : '#fff',
    color: isDarkMode ? '#fff' : '#000',
  };

  const passwordContainerStyle = {
    borderColor: isDarkMode ? '#fff' : '#ccc',
    backgroundColor: isDarkMode ? '#333' : '#fff',
  };
  const inputTextStyle = {
    color: isDarkMode ? '#fff' : '#000',
  };
  const eyeIconStyle = {
    color: isDarkMode ? '#fff' : '#000',
  };


  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.title}>Welcome back!</Text>
      <TextInput
        placeholder="Email"
        style={[styles.input, inputStyle]}
        onChangeText={setEmail}
      />
      <View style={[styles.passwordContainer, passwordContainerStyle]}>
        <TextInput
          placeholder="Password"
          style={[styles.passwordInput, inputTextStyle]}
          secureTextEntry={!showPassword}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={toggleShowPassword} style={styles.eyeIconContainer}>
          <Text style={[styles.eyeIcon, eyeIconStyle]}>{showPassword ? '🕶️' : '👁️'}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={isLoading}>
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
