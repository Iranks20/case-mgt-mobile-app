import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ViewIncidents({ navigation }) {
  const [incidents, setIncidents] = useState([]);
  const [userId, setUserId] = useState(null);

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
        <Text style={styles.viewDetails}>View Details</Text>
      </TouchableOpacity>
    );
  };    

  const renderItem = ({ item }) => (
    <View style={styles.incident}>
      <Text style={styles.incidentTitle}>{item.incident}</Text>
      <Text style={styles.incidentDescription}>Status: {item.status}</Text>
      {renderDetailsButton(item)}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Reported Incidents</Text>
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
    backgroundColor: '#fff',
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
    backgroundColor: 'lightblue',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  incidentTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  incidentDescription: {
    fontSize: 16,
    color: '#fff',
  },
  viewDetails: {
    color: 'darkblue',
    textDecorationLine: 'underline',
    marginTop: 5,
  },
});
