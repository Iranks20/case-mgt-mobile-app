import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, ActivityIndicator, useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ReportIncident({ navigation }) {
  const [reporterId, setReporterId] = useState('');
  const [incident, setIncident] = useState('');
  const [details, setDetails] = useState('');
  const [detailsHeight, setDetailsHeight] = useState(150);
  const [location, setLocation] = useState('');
  const [cordinates, setCordinates] = useState('');
  const [byWho, setByWho] = useState('');
  const [toWhom, setToWhom] = useState('');
  const [isLoading, setIsLoading] = useState(false); // State variable to track loading state
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    const getUserId = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        if (userId !== null) {
          setReporterId(userId);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUserId();
  }, []);

  const handleSubmit = async () => {
    setIsLoading(true); // Start loading

    try {
      const response = await fetch('http://100.25.26.230:5000/api/v1/incidences', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reporterId: reporterId,
          incident: incident,
          details: details,
          location: location,
          cordinates: cordinates,
          byWho: byWho,
          toWhom: toWhom,
        }),
      });

      console.log(incident)
      const result = await response.json();

      console.log(result)

      if (result.error === false) {
        navigation.navigate('Dashboard');
        Alert.alert(
          'Thanks for reporting incidence',
          'You can now click on "View your reported incidences" to check the status of your incidence.'
        );
      } else {
        setErrorMessage(result.message);
        Alert.alert('Network error');
      }
    } catch (error) {
      console.log("eroorrr", error);
      setErrorMessage('An error occurred, please try again.');
      Alert.alert('An error occurred, please try again.');
    }

    setIsLoading(false); // Stop loading
  };

  const onContentSizeChange = (event) => {
    const { height } = event.nativeEvent.contentSize;
    setDetailsHeight(Math.max(height, 150));
  };

  const containerStyle = {
    backgroundColor: isDarkMode ? '#000' : '#fff',
  };

  const inputStyle = {
    borderColor: isDarkMode ? '#fff' : '#ccc',
    color: isDarkMode ? '#fff' : '#000',
  };

  const submitButtonStyle = {
    backgroundColor: isDarkMode ? '#2196F3' : 'blue',
  };

  const submitButtonTextStyle = {
    color: '#fff',
  };

  return (
    <ScrollView contentContainerStyle={[styles.container, containerStyle]}>
      <Text style={styles.title}>Report an Incident</Text>
      <View style={styles.form}>
        <Text style={styles.label}>Incident:</Text>
        <TextInput style={[styles.input, inputStyle]} value={incident} onChangeText={setIncident} placeholder='Name or title of the incident'/>

        <Text style={styles.label}>Details:</Text>
        <TextInput
          style={[styles.input, styles.detailsInput, inputStyle, { height: detailsHeight }]}
          value={details}
          onChangeText={setDetails}
          multiline
          onContentSizeChange={onContentSizeChange}
          placeholder='Enter all details of the incidence'
        />

        <Text style={styles.label}>Location:</Text>
        <TextInput style={[styles.input, inputStyle]} value={location} onChangeText={setLocation} placeholder='Enter location of the incidence' />

        <Text style={styles.label}>Coordinates:</Text>
        <TextInput style={[styles.input, inputStyle]} value={cordinates} onChangeText={setCordinates} placeholder='Enter coordinates of the incident' />

        <Text style={styles.label}>By Whom:</Text>
        <TextInput style={[styles.input, inputStyle]} value={byWho} onChangeText={setByWho} placeholder='Enter your fullname' />

        <Text style={styles.label}>To Whom:</Text>
        <TextInput style={[styles.input, inputStyle]} value={toWhom} onChangeText={setToWhom} placeholder='Reporting to whom' />

        <TouchableOpacity style={[styles.submitButton, submitButtonStyle]} onPress={handleSubmit} disabled={isLoading}>
          {isLoading ? (
            <ActivityIndicator color="#fff" /> // Show loading spinner while loading
          ) : (
            <Text style={[styles.submitButtonText, submitButtonTextStyle]}>Submit</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  form: {
    width: '80%',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 20,
  },
  detailsInput: {
    height: 150,
    textAlignVertical: 'top',
  },
  submitButton: {
    borderRadius: 60,
    padding: 10,
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
