import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const IncidentDetails = ({ route }) => {
  const { incidentId } = route.params;
  console.log({incidentId})
  const [incident, setIncident] = useState(null);

  useEffect(() => {
    const fetchIncident = async () => {
      const response = await fetch(`http://100.25.26.230:5000/api/v1/incidences/${incidentId}`);
      const data = await response.json();
      setIncident(data);
      // console.log(data)
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
    <View style={styles.container}>
    {incident.map((incidents) => (
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.title}>{incidents.incident}</Text>
          <Text style={styles.status}>{incidents.status}</Text>
        </View>
        <View style={styles.body}>
          <View style={styles.row}>
            <Text style={styles.label}>Location:</Text>
            <Text style={styles.value}>{incidents.location}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Cordinates:</Text>
            <Text style={styles.value}>{incidents.cordinates}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Reported by:</Text>
            <Text style={styles.value}>{incidents.byWho}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>To whom:</Text>
            <Text style={styles.value}>{incidents.toWhom}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Details:</Text>
            <Text style={styles.value}>{incidents.details}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Date:</Text>
            <Text style={styles.value}>{incidents.datetime}</Text>
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
    backgroundColor: '#f5f5f5',
  },
  card: {
    backgroundColor: '#fff',
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
    color: 'green',
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
