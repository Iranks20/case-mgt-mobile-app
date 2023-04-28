import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const IncidentDetails = () => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.title}>Theft</Text>
          <Text style={styles.status}>Read</Text>
        </View>
        <View style={styles.body}>
          <View style={styles.row}>
            <Text style={styles.label}>Location:</Text>
            <Text style={styles.value}>Uganda</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Coordinates:</Text>
            <Text style={styles.value}>200</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Reported by:</Text>
            <Text style={styles.value}>True citizens</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>To whom:</Text>
            <Text style={styles.value}>Government</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Details:</Text>
            <Text style={styles.value}>This is a provisional offer made on the basis of the statement of your qualifications as presented on your application form. It is subject to the satisfactory verification of those qualifications by the office of the Academic Registrar at the time of registration. Registration is a mandatory requirement for all students and this must be done within the first three weeks of the Semester.</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Date:</Text>
            <Text style={styles.value}>Monday</Text>
          </View>
        </View>
      </View>
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
