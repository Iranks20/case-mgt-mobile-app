import React, { useState, useEffect } from 'react';
import BaseUrl from '../../services/api';
import { View, Text, StyleSheet, useColorScheme, ScrollView } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';

const IncidentDetails = ({ route }) => {
  const { incidentId } = route.params;
  console.log({ incidentId })
  const [incident, setIncident] = useState([]);
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    const fetchIncident = async () => {
      const response = await fetch(`${BaseUrl}/api/v1/incidences/${incidentId}`);
      const data = await response.json();
      setIncident(data);
    };

    fetchIncident();
  }, []);

  console.log(incident)

  if (!incident) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={[styles.container, { backgroundColor: isDarkMode ? '#f5f5f5' : '#f5f5f5' }]}
    >
      {incident.map((incidents) => (
        <View key={incidents.id}>
          <Text style={[styles.title, { color: isDarkMode ? '#000' : '#000' }]}>Incident:</Text>
          <Text style={[styles.value, { color: isDarkMode ? '#000' : '#000' }]}>{incidents.incident}</Text>

          <Text style={[styles.title, { color: isDarkMode ? '#000' : '#000' }]}>Status:</Text>
          <Text style={[styles.value, { color: incidents.status === 'Read' ? 'green' : 'black' }]}>
            {incidents.status}
          </Text>

          <Text style={[styles.title, { color: isDarkMode ? '#000' : '#000' }]}>Location:</Text>
          <Text style={[styles.value, { color: isDarkMode ? '#000' : '#000' }]}>{incidents.location}</Text>

          <Text style={[styles.title, { color: isDarkMode ? '#000' : '#000' }]}>Cordinates:</Text>
          <Text style={[styles.value, { color: isDarkMode ? '#000' : '#000' }]}>{incidents.cordinates}</Text>

          <Text style={[styles.title, { color: isDarkMode ? '#000' : '#000' }]}>Reported by:</Text>
          <Text style={[styles.value, { color: isDarkMode ? '#000' : '#000' }]}>{incidents.byWho}</Text>

          {/* <Text style={[styles.title, { color: isDarkMode ? '#000' : '#000' }]}>To whom:</Text>
          <Text style={[styles.value, { color: isDarkMode ? '#000' : '#000' }]}>{incidents.toWhom}</Text> */}

          <Text style={[styles.title, { color: isDarkMode ? '#000' : '#000' }]}>Details:</Text>
          <Text style={[styles.value, { color: isDarkMode ? '#000' : '#000' }]}>{incidents.details}</Text>

          <Text style={[styles.title, { color: isDarkMode ? '#000' : '#000' }]}>Date:</Text>
          <Text style={[styles.value, { color: isDarkMode ? '#000' : '#000' }]}>{incidents.datetime}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: RFPercentage(2),
  },
  title: {
    fontSize: RFPercentage(2.5),
    fontWeight: 'bold',
    marginBottom: RFPercentage(1),
  },
  value: {
    fontSize: RFPercentage(2),
    marginBottom: RFPercentage(2),
  },
});

export default IncidentDetails;
