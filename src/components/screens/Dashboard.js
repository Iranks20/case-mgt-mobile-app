import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Dashboard({ navigation }) {
  // const [lastName, setLastName] = useState('');
  // console.log(lastName)

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const userId = await AsyncStorage.getItem('userId');
  //       // console.log(userId)
  //       const response = await fetch(`http://100.25.26.230:5000/api/v1/reporters/${userId}`);
  //       const data = await response.json();
  //       console.log(data)
  //       setLastName(data.lastName);
  //       console.log(data.lastName)
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }

  //   fetchData();
  // }, []);
  const handleReportIncident = () => {
    navigation.navigate('ReportingPage');
  };

  const handleViewIncidents = () => {
    navigation.navigate('ViewPage');
  };

  const isDarkMode = useColorScheme() === 'dark';

  const containerStyle = {
    backgroundColor: isDarkMode ? '#000' : '#fff',
  };

  const cardStyle = {
    backgroundColor: isDarkMode ? '#2c3e50' : '#2196F3',
  };

  const cardTitleStyle = {
    color: isDarkMode ? '#fff' : '#fff',
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {/* <View style={styles.header}>
        <Image source={require('../../assets/logo_darkkk.jpg')} style={styles.logo} />
        <Text style={styles.title}>Welcome {lastName}</Text>
      </View> */}
      <View style={styles.content}>
        <TouchableOpacity style={[styles.card, cardStyle]} onPress={handleReportIncident}>
          <Text style={[styles.cardTitle, cardTitleStyle]}>Report an Incident</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.card, cardStyle]} onPress={handleViewIncidents}>
          <Text style={[styles.cardTitle, cardTitleStyle]}>View Your Reported Incidents</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  content: {
    flex: 2,
    width: '100%',
    paddingHorizontal: 20,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  card: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
