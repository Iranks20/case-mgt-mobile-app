import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

export default function ViewIncidents({ navigation }) {
  const [incidents, setIncidents] = useState([
    { id: '1', title: 'SMUGGLING OF GOODS', status: 'Read', details: 'Details about incident 1' },
    { id: '2', title: 'CORRUPTION IN OFFICE', status: 'Unread', details: 'Details about incident 2' },
    { id: '3', title: 'BAD DRIVING ON MASAKA ROAD', status: 'Read', details: 'Details about incident 3' },
  ]);

  const renderDetailsButton = (item) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('ViewDetails', { incident: item })}>
        <Text style={styles.viewDetails}>View Details</Text>
      </TouchableOpacity>
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.incident}>
      <Text style={styles.incidentTitle}>{item.title}</Text>
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
        keyExtractor={(item) => item.id}
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
