import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
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
    // Handle form submission logic here beg
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
        Alert.alert(result.message);
      } else {
        setErrorMessage(result.message);
        Alert.alert('Network error');

      }
    } catch (error) {
      console.log("eroorrr", error);
      setErrorMessage('An error occurred, please try again.');
      Alert.alert('An error occurred, please try again.')
    }
    // fhhfjfhjdffhd
  };
  const onContentSizeChange = (event) => {
    const { height } = event.nativeEvent.contentSize;
    setDetailsHeight(Math.max(height, 150));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Report an Incident</Text>
      <View style={styles.form}>
        <Text style={styles.label}>Incident:</Text>
        <TextInput style={styles.input} value={incident} onChangeText={setIncident} placeholder='Name or title of the incident'/>

        <Text style={styles.label}>Details:</Text>
        <TextInput
          style={[styles.input, { height: detailsHeight }]}
          value={details}
          onChangeText={setDetails}
          multiline
          onContentSizeChange={onContentSizeChange}
          placeholder='Enterall details of the incidence'
        />

        <Text style={styles.label}>Location:</Text>
        <TextInput style={styles.input} value={location} onChangeText={setLocation} placeholder='Enter location of the incidence' />

        <Text style={styles.label}>Cordinates:</Text>
        <TextInput style={styles.input} value={cordinates} onChangeText={setCordinates} placeholder='enter cordinates of thr incident' />

        <Text style={styles.label}>By Whom:</Text>
        <TextInput style={styles.input} value={byWho} onChangeText={setByWho} placeholder='Enter your fullname' />

        <Text style={styles.label}>To Who:</Text>
        <TextInput style={styles.input} value={toWhom} onChangeText={setToWhom} placeholder='reporting to who' />

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
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
    borderColor: '#ccc',
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
    backgroundColor: 'blue',
    borderRadius: 60,
    padding: 10,
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});
