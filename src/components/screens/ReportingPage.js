import React, { useState, useEffect } from 'react';
import BaseUrl from '../../services/api';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, ActivityIndicator, useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoder-reborn';
import { request, PERMISSIONS } from 'react-native-permissions';

export default function ReportIncident({ navigation }) {
  const [reporterId, setReporterId] = useState('');
  const [incident, setIncident] = useState('');
  const [details, setDetails] = useState('');
  const [detailsHeight, setDetailsHeight] = useState(150);
  const [location, setLocation] = useState('');
  const [cordinates, setCordinates] = useState('');
  const [byWho, setByWho] = useState('');
  const [isLoading, setIsLoading] = useState(false);
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

  useEffect(() => {
    const byWhoValue = async () => {
      try {
        const byWho = await AsyncStorage.getItem('byWho');
        if (byWho !== null) {
          setByWho(byWho);
        }
      } catch (error) {
        console.log(error);
      }
    };
    byWhoValue();
  }, []);

  const fetchDeviceLocation = async () => {
    try {
      const granted = await request(
        Platform.select({
          android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
          ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
        })
      );
  
      if (granted === 'granted') {
        Geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setCordinates(`${latitude}, ${longitude}`);
            setLocation('Device Location');
            console.log('Device Location:', latitude, longitude);
  
            Geocoder.geocodePosition({ lat: latitude, lng: longitude })
              .then((response) => {
                if (response.length > 0) {
                  const address = response[0].formattedAddress;
                  console.log('Address:', address);
                  setLocation(address);
                } else {
                  console.log('No address found for the given coordinates');
                }
              })
              .catch((error) => {
                console.log('Error fetching address:', error);
              });
          },
          (error) => {
            console.log('Error fetching device location:', error.message);
            Alert.alert('Error', 'Failed to fetch device location.');
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
      } else {
        Alert.alert('Permission Denied', 'Please grant location permissions to use this feature.');
      }
    } catch (error) {
      console.log('Error requesting location permission:', error);
      Alert.alert('Error', 'Failed to request location permission.');
    }
  };

  const handleSubmit = async () => {
    if (!incident || !details) {
      Alert.alert('Missing fields', 'Please fill in all the required fields.');
      return;
    }
    // Check if any field contains emojis or non-text characters
    const hasEmojis = /[\uD800-\uDBFF\uDC00-\uDFFF]|[^0-9a-zA-Z\uD800-\uDBFF\uDC00-\uDFFF\s.,:;'"!@#$%^&*<>?/\[\]{}+=_`~|\\()-]+/.test(
      `${incident}${details}${cordinates}${byWho}`
    );    
       
  
    if (hasEmojis) {
      Alert.alert('Invalid input', 'Please remove any non-text data from the form fields.');
      return;
    }
  
    setIsLoading(true);
  
    try {
      console.log('Details sent to API:', {
        reporterId: reporterId,
        incident: incident,
        details: details,
        location: location,
        cordinates: cordinates,
        byWho: byWho,
        toWhom: 'null',
      });
  
      const response = await fetch(`${BaseUrl}/api/v1/incidences`, {
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
          toWhom: 'null',
        }),
      });
      console.log(location)
      const result = await response.json();
  
      if (result.error === false) {
        navigation.navigate('Dashboard');
        Alert.alert(
          'Thanks for reporting incidence',
          'You can now click on "View your incidences" to check the status of your incidence.'
        );
      } else {
        // setErrorMessage(result.message);
        Alert.alert('Network error');
      }
    } catch (error) {
      console.log('Error:', error);
      // setErrorMessage('An error occurred, please try again.');
      Alert.alert('An error occurred, please try again.');
    }
  
    setIsLoading(false);
  };
  

  const onContentSizeChange = (event) => {
    const { height } = event.nativeEvent.contentSize;
    setDetailsHeight(Math.max(height, 150));
  };

  const containerStyle = {
    backgroundColor: isDarkMode ? '#fff' : '#fff',
  };

  const inputStyle = {
    borderColor: isDarkMode ? '#ccc' : '#ccc',
    color: isDarkMode ? '#000' : '#000',
  };

  const submitButtonStyle = {
    backgroundColor: '#2196F3',
  };

  const submitButtonTextStyle = {
    color: '#fff',
  };

  const textColor = isDarkMode ? '#000' : '#000';

  useEffect(() => {
    fetchDeviceLocation();
  }, []);

  return (
    <ScrollView contentContainerStyle={[styles.container, containerStyle]}>
      {/* <Text style={styles.title}>Report</Text> */}
      <View style={styles.form}>
        <Text style={[styles.label, { color: textColor }]}>Incident</Text>
        <TextInput
          style={[styles.input, inputStyle]}
          value={incident}
          onChangeText={setIncident}
          placeholder='Name or title of the incident'
          placeholderTextColor={isDarkMode ? '#ccc' : '#ccc'}
        />

        <Text style={[styles.label, { color: textColor }]}>Details</Text>
        <TextInput
          style={[styles.input, styles.detailsInput, inputStyle, { height: detailsHeight }]}
          value={details}
          onChangeText={setDetails}
          multiline
          onContentSizeChange={onContentSizeChange}
          placeholder='Enter all details of the incidence'
          placeholderTextColor={isDarkMode ? '#ccc' : '#ccc'}
        />

        {/* <Text style={[styles.label, { color: textColor }]}>Location</Text>
        <TextInput
          style={[styles.input, inputStyle]}
          value={location}
          onChangeText={setLocation}
          placeholder='Location of the incidence'
          placeholderTextColor={isDarkMode ? '#ccc' : '#ccc'}
          editable={false}
        /> */}

        {isLoading ? (
          <ActivityIndicator style={styles.loading} size='large' color='#000' />
        ) : (
          <TouchableOpacity style={[styles.button, submitButtonStyle]} onPress={handleSubmit}>
            <Text style={[styles.buttonText, submitButtonTextStyle]}>Submit</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  form: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    // fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  detailsInput: {
    textAlignVertical: 'top',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loading: {
    marginTop: 20,
  },
});
