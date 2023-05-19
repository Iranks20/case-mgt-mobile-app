import React, { useState, useEffect } from 'react';
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
      fetch(`http://100.25.26.230:5000/api/v1/incidences/new/${userId}`)
        .then((response) => response.json())
        .then((data) => setIncidents(data))
        .catch((error) => console.error(error));
    }
  }, [userId]);

  const renderDetailsButton = (item) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('ViewDetails', { incidentId: item.id })}>
        <Text style={[styles.viewDetails, { color: isDarkMode ? '#2196F3' : 'darkblue' }]}>View Details</Text>
      </TouchableOpacity>
    );
  };    

  const renderItem = ({ item }) => (
    <View style={[styles.incident, { backgroundColor: isDarkMode ? '#333' : 'lightblue' }]}>
      <Text style={[styles.incidentTitle, { color: isDarkMode ? '#fff' : '#000' }]}>{item.incident}</Text>
      <Text style={[styles.incidentDescription, { color: isDarkMode ? '#fff' : '#000' }]}>Status: {item.status}</Text>
      {renderDetailsButton(item)}
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#000' : '#fff' }]}>
      {incidents.length > 0 ? (
        <Text style={[styles.title, { color: isDarkMode ? '#fff' : '#000' }]}>Your Reported Incidents</Text>
      ) : (
        <Text style={[styles.title, { color: isDarkMode ? '#fff' : '#000' }]}>You haven't reported any Incidents!</Text>
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
    fontWeight: 'bold',
    marginBottom: 20,
  },
  list: {
    width: '100%',
    paddingHorizontal: 20,
  },
  incident: {
    width: '100%',
    height: 100,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  incidentTitle: {
    fontSize: 20,
    fontWeight: 'bold',
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
