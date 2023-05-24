import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, useColorScheme } from 'react-native';
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
      <View style={styles.content}>
        <TouchableOpacity style={[styles.card, cardStyle, { marginRight: wp('2%') }]} onPress={handleReportIncident}>
          <Text style={[styles.cardTitle, cardTitleStyle]}>Report an Incident</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.card, cardStyle, { marginLeft: wp('2%') }]} onPress={handleViewIncidents}>
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
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp('2%'), // Adjust the value as per your needs
  },
  card: {
    width: wp('45%'), // Adjust the value as per your needs
    height: hp('25%'), // Adjust the value as per your needs
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: wp('5%'), // Adjust the value as per your needs
    fontWeight: 'bold',
  },
});
