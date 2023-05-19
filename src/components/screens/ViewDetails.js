import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';

const IncidentDetails = ({ route }) => {
  const { incidentId } = route.params;
  console.log({ incidentId })
  const [incident, setIncident] = useState(null);
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    const fetchIncident = async () => {
      const response = await fetch(`http://100.25.26.230:5000/api/v1/incidences/${incidentId}`);
      const data = await response.json();
      setIncident(data);
    };

    fetchIncident();
  }, []);

  console.log(incident)

  if (!incident) {
    return (
      <View style={[styles.container, { backgroundColor: isDarkMode ? '#000' : '#f5f5f5' }]}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#000' : '#f5f5f5' }]}>
      {incident.map((incidents) => (
        <View key={incidents.id} style={[styles.card, { backgroundColor: isDarkMode ? '#111' : '#fff' }]}>
          <View style={styles.header}>
            <Text style={[styles.title, { color: isDarkMode ? '#fff' : '#000' }]}>{incidents.incident}</Text>
            <Text style={[styles.status, { color: 'green' }]}>
              {incidents.status}
            </Text>
          </View>
          <View style={styles.body}>
            <View style={styles.row}>
              <Text style={[styles.label, { color: isDarkMode ? '#888' : '#000' }]}>Location:</Text>
              <Text style={[styles.value, { color: isDarkMode ? '#fff' : '#000' }]}>{incidents.location}</Text>
            </View>
            <View style={styles.row}>
              <Text style={[styles.label, { color: isDarkMode ? '#888' : '#000' }]}>Coordinates:</Text>
              <Text style={[styles.value, { color: isDarkMode ? '#fff' : '#000' }]}>{incidents.coordinates}</Text>
            </View>
            <View style={styles.row}>
              <Text style={[styles.label, { color: isDarkMode ? '#888' : '#000' }]}>Reported by:</Text>
              <Text style={[styles.value, { color: isDarkMode ? '#fff' : '#000' }]}>{incidents.byWho}</Text>
            </View>
            <View style={styles.row}>
              <Text style={[styles.label, { color: isDarkMode ? '#888' : '#000' }]}>To whom:</Text>
              <Text style={[styles.value, { color: isDarkMode ? '#fff' : '#000' }]}>{incidents.toWhom}</Text>
            </View>
            <View style={styles.row}>
              <Text style={[styles.label, { color: isDarkMode ? '#888' : '#000' }]}>Details:</Text>
              <Text style={[styles.value, { color: isDarkMode ? '#fff' : '#000' }]}>{incidents.details}</Text>
            </View>
            <View style={styles.row}>
              <Text style={[styles.label, { color: isDarkMode ? '#888' : '#000' }]}>Date:</Text>
              <Text style={[styles.value, { color: isDarkMode ? '#fff' : '#000' }]}>{incidents.datetime}</Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    borderRadius: 20,
    padding: 20,
    width: '90%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  status: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  body: {
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    width: '30%',
    fontWeight: 'bold',
  },
  value: {
    width: '70%',
  },
});

export default IncidentDetails;
