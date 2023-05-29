import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, useColorScheme, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function Dashboard({ navigation }) {
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
    backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.9)',
    shadowColor: isDarkMode ? '#000' : '#000',
    shadowOpacity: 0.8,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 20,
    elevation: 3,
  };

  const cardTitleStyle = {
    color: isDarkMode ? '#fff' : 'black',
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.welcomeMessage}>Welcome to your dashboard!</Text>
      <View style={styles.content}>
        <TouchableOpacity style={[styles.card, cardStyle, { marginRight: wp('2%') }]} onPress={handleReportIncident}>
          <Image source={require('../../assets/report_incident.png')} style={styles.icon} />
          <Text style={[styles.cardTitle, cardTitleStyle]}>Report an Incident</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.card, cardStyle, { marginLeft: wp('2%') }]} onPress={handleViewIncidents}>
          <Image source={require('../../assets/view_incident.png')} style={styles.icon} />
          <Text style={[styles.cardTitle, cardTitleStyle]}>View Incidents</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: hp('3%'), // Adjust the value as per your needs
    paddingHorizontal: wp('5%'), // Adjust the value as per your needs
  },
  welcomeMessage: {
    fontSize: wp('6%'), // Adjust the value as per your needs
    fontWeight: 'bold',
    marginBottom: hp('2%'), // Adjust the value as per your needs
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp('2%'), // Adjust the value as per your needs
  },
  card: {
    width: wp('45%'), // Adjust the value as per your needs
    height: hp('25%'), // Adjust the value as per your needs
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: wp('10%'), // Adjust the value as per your needs
    height: wp('10%'), // Adjust the value as per your needs
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: wp('5%'), // Adjust the value as per your needs
    // fontWeight: 'bold',
  },
});
