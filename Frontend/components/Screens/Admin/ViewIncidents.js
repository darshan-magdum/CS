import React from 'react';
import { StyleSheet, SafeAreaView, View, Text, Image } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';

const mockIncidentData = {
  id: 1,
  reporterName: 'Jane Smith',
  date: '2024-09-22',
  image: 'https://via.placeholder.com/300',
  description: 'This is a sample description for the incident.',
};

const ViewIncidents = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <FeatherIcon name="chevron-left" size={24} color="#333" onPress={() => navigation.goBack()} />
          <Text style={styles.headerTitle}>View Incident</Text>
        </View>

        <View style={styles.incident}>
          <View style={styles.incidentHeader}>
            <View>
              <Text style={styles.reporterName}>{mockIncidentData.reporterName}</Text>
              <Text style={styles.incidentDate}>{mockIncidentData.date}</Text>
            </View>
          </View>
          <Image source={{ uri: mockIncidentData.image }} style={styles.incidentImage} />
          <Text style={styles.incidentDescription}>{mockIncidentData.description}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    flex: 1,
  },
  incident: {
    margin: 16,
    backgroundColor: '#EFEFEF',
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  incidentHeader: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee',
  },
  reporterName: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#333333',
  },
  incidentDate: {
    color: '#888888',
    fontSize: 12,
  },
  incidentImage: {
    width: '100%',
    height: 200,
  },
  incidentDescription: {
    padding: 10,
    fontSize: 15,
    color: '#444444',
  },
});

export default ViewIncidents;
