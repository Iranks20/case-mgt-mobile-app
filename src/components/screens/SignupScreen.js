import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../../styleSheets/Style';
import PhoneInput from 'react-native-phone-number-input';
import { Picker } from '@react-native-picker/picker';

export default function SignUpScreen({ navigation }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [sex, setSex] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false); // State variable to track loading state
  const [showPassword, setShowPassword] = useState(false); // State variable to toggle password visibility

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };


  const handleSignUp = async () => {
    setIsLoading(true); // Start loading

    const formattedPhoneNumber = `+${phoneNumber}`; // Add country code to phone number

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
          phoneNumber: formattedPhoneNumber, // Use formatted phone number
          password: password,
        }),
      });

      const result = await response.json();

      if (result.error === false) {
        await AsyncStorage.setItem('userId', result.userId.toString());
        navigation.navigate('Dashboard');
      } else {
        setErrorMessage(result.message);
      }
    } catch (error) {
      console.log("error", error);
      setErrorMessage('An error occurred, please try again.');
    }

    setIsLoading(false); // Stop loading
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title}>Sign Up</Text>
        <TextInput placeholder="First Name" style={styles.input} value={firstName} onChangeText={setFirstName} />
        <TextInput placeholder="Last Name" style={styles.input} value={lastName} onChangeText={setLastName} />
        <TextInput placeholder="Email" style={styles.input} value={email} onChangeText={setEmail} />
        <View style={styles.input}>
          <Picker
            selectedValue={sex}
            onValueChange={(itemValue) => setSex(itemValue)}
            style={{ color: '#000', fontSize: 16 }}
          >
            <Picker.Item label="Select Sex" value="" />
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
          </Picker>
        </View>
        <View style={styles.phoneInputContainer}>
          <PhoneInput
            placeholder="Phone Number"
            defaultCode="US"
            layout="first"
            withShadow
            containerStyle={styles.phoneInput}
            onChangeText={setPhoneNumber}
            value={phoneNumber}
            textInputProps={{ style: { fontSize: 16 } }}
          />
        </View>
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
        <TouchableOpacity style={styles.button} onPress={handleSignUp} disabled={isLoading}>
          {isLoading ? (
            <ActivityIndicator color="#fff" /> // Show loading spinner while loading
          ) : (
            <Text style={styles.buttonText}>Sign Up</Text>
          )}
        </TouchableOpacity>
        {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
      </View>
    </ScrollView>
  );
}
