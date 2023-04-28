import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

export default function ReportIncident({ navigation }) {
  const [incident, setIncident] = useState('');
  const [details, setDetails] = useState('');
  const [detailsHeight, setDetailsHeight] = useState(150);
  const [location, setLocation] = useState('');
  const [coordinates, setCoordinates] = useState('');
  const [reportedBy, setReportedBy] = useState('');
  const [reportedTo, setReportedTo] = useState('');

  const handleSubmit = () => {
    // Handle form submission logic here
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

        <Text style={styles.label}>Coordinates:</Text>
        <TextInput style={styles.input} value={coordinates} onChangeText={setCoordinates} placeholder='enter cordinates of thr incident' />

        <Text style={styles.label}>By Whom:</Text>
        <TextInput style={styles.input} value={reportedBy} onChangeText={setReportedBy} placeholder='Enter your fullname' />

        <Text style={styles.label}>To Who:</Text>
        <TextInput style={styles.input} value={reportedTo} onChangeText={setReportedTo} placeholder='reporting to who' />

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
