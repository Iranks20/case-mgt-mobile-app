import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
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

      console.log(password)
      const result = await response.json();

      console.log(result)

      if (result.error === false) {
        await AsyncStorage.setItem('userId', result.userId.toString());
        navigation.navigate('Dashboard');
        userId = result.userId
        console.log(userId)
      } else {
        setErrorMessage(result.message);
      }
    } catch (error) {
      console.log("eroorrr", error);
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome back!</Text>
      <TextInput placeholder="Email" style={styles.input} onChangeText={setEmail} />
      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Password"
          style={styles.passwordInput}
          secureTextEntry={!showPassword}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={toggleShowPassword} style={styles.eyeIconContainer}>
          <Text style={styles.eyeIcon}>{showPassword ? '🕶️' : '👁️'}</Text>
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
