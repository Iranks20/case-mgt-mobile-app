import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../../styleSheets/Style';

export default function SignUpScreen({ navigation }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [sex, setSex] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignUp = async () => {
    // Handle sign up logic here
    try {
      const response = await fetch('http://100.25.26.230:5000/api/v1/reporters', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          email: email,
          sex: sex,
          phoneNumber: phoneNumber,
          password: password,
        }),
      });

      console.log(email)
      const result = await response.json();
      console.log('jfhfhfhhf')

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
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput placeholder="firstName" style={styles.input} value={firstName} onChangeText={setFirstName} />
      <TextInput placeholder="lastName" style={styles.input} value={lastName} onChangeText={setLastName} />
      <TextInput placeholder="Email" style={styles.input} value={email} onChangeText={setEmail} />
      <TextInput placeholder="Sex" style={styles.input} value={sex} onChangeText={setSex} />
      <TextInput placeholder="phoneNumber" style={styles.input} value={phoneNumber} onChangeText={setPhoneNumber} />
      <TextInput placeholder="Password" style={styles.input} secureTextEntry={true} value={password} onChangeText={setPassword} />
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
    </View>
  );
}
