import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import styles from '../../styleSheets/Style';

export default function SignUpScreen() {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [sex, setSex] = useState('')
  const [phonenumber, setPhonenumber] = useState('')
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    // Handle sign up logic here
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput placeholder="firstname" style={styles.input} value={firstname} onChangeText={setFirstname} />
      <TextInput placeholder="Lastname" style={styles.input} value={lastname} onChangeText={setLastname} />
      <TextInput placeholder="Email" style={styles.input} value={email} onChangeText={setEmail} />
      <TextInput placeholder="Sex" style={styles.input} value={sex} onChangeText={setSex} />
      <TextInput placeholder="phonenumber" style={styles.input} value={phonenumber} onChangeText={setPhonenumber} />
      <TextInput placeholder="Password" style={styles.input} secureTextEntry={true} value={password} onChangeText={setPassword} />
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}
