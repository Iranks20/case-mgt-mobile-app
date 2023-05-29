import React, { useState, useEffect } from 'react';
import BaseUrl from '../../services/api';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ViewIncidents({ navigation }) {
  const [incidents, setIncidents] = useState([]);
  const [userId, setUserId] = useState(null);
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    const getUserId = async () => {
      try {
        const id = await AsyncStorage.getItem('userId');
        setUserId(id);
        console.log(id)
      } catch (error) {
        console.log(error);
      }
    };

    getUserId();
  }, []);

  useEffect(() => {
    if (userId) {
      fetch(`${BaseUrl}/api/v1/incidences/new/${userId}`)
        .then((response) => response.json())
        .then((data) => setIncidents(data))
        .catch((error) => console.error(error));
    }
  }, [userId]);

  // const renderDetailsButton = (item) => {
  //   return (
  //     <TouchableOpacity onPress={() => navigation.navigate('ViewDetails', { incidentId: item.id })}>
  //       <Text style={[styles.viewDetails, { color: '#2196F3' }]}>View Details</Text>
  //     </TouchableOpacity>
  //   );
  // };

  const truncateCharacters = (text, characterLimit) => {
    if (text.length > characterLimit) {
      return text.substring(0, characterLimit) + '...';
    }
    return text;
  };

  const renderItem = ({ item }) => (
    <View style={[styles.incident, cardStyle]}>
      <View style={styles.incidentDetails}>
      <Text style={[styles.incidentTitle, { color: 'black' }]}>
        Title: <Text style={{ fontWeight: 'normal' }}>{truncateCharacters(item.incident, 25)}</Text>
      </Text>
      <Text style={[styles.incidentDescription, { color: 'black' }]}>
        Status: <Text tyle={{ color: item.status === 'Read' ? 'green' : 'black' }}>{truncateCharacters(item.status, 10)}</Text>
      </Text>
      <Text style={[styles.incidentDescription, { color: 'black' }]}>
        Details: <Text style={{ fontWeight: 'normal' }}>{truncateCharacters(item.details, 67)}</Text>
      </Text>
      <TouchableOpacity onPress={() => navigation.navigate('ViewDetails', { incidentId: item.id })}>
        <Text style={[styles.viewDetails, { color: '#2196F3' }]}>Read More</Text>
      </TouchableOpacity>
      </View>
      {/* {renderDetailsButton(item)} */}
    </View>
  );

  const cardStyle = {
    backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.9)',
    shadowColor: isDarkMode ? '#000' : '#000',
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 6,
    elevation: 6,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    height: 170,
    padding: 20,
  };

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#000' : '#fff' }]}>
      {incidents.length > 0 ? (
        <Text style={[styles.title, { color: 'black' }]}>Your Reported Incidents</Text>
      ) : (
        <Text style={[styles.title, { color: 'black' }]}>You haven't reported any Incidents!</Text>
      )}
      <FlatList
        data={incidents}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        style={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    // fontWeight: 'bold',
    marginBottom: 20,
  },
  list: {
    width: '100%',
    paddingHorizontal: 20,
  },
  incident: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  incidentDetails: {
    flex: 1,
    marginRight: 10,
  },
  incidentTitle: {
    fontSize: 16,
    // fontWeight: 'bold',
    marginBottom: 5,
  },
  incidentDescription: {
    fontSize: 16,
  },
  viewDetails: {
    textDecorationLine: 'underline',
    marginTop: 5,
  },
});
