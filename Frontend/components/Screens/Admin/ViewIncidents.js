import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, View, Text, Image, Alert, ScrollView, TouchableOpacity } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';

export default function ViewIncidents({ navigation }) {
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/Incidence/getallincidents`);
        const data = await response.json();

        if (Array.isArray(data)) {
          const sortedIncidents = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setIncidents(sortedIncidents);
        } else {
          console.warn('Expected an array, but got:', data);
          setIncidents([]);
        }
      } catch (error) {
        console.error('Error fetching incidents:', error);
        Alert.alert('Error', 'Failed to load incidents. Please try again.');
      }
    };

    fetchIncidents();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <FeatherIcon name="chevron-left" size={24} color="#333" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>View Incidents</Text>
          </View>

          {incidents.length === 0 ? (
            <View style={styles.noIncidentsContainer}>
              <Text style={styles.noIncidentsText}>No incidents available</Text>
            </View>
          ) : (
            incidents.map((incident) => (
              <View key={incident._id} style={styles.incident}>
                <View style={styles.incidentHeader}>
                  <Text style={styles.reportedBy}>Reported By: {incident.reportedBy}</Text>
                  <Text style={styles.incidentDate}>
                    Date: {new Date(incident.incidentDate).toLocaleDateString()}
                  </Text>
                  <Text style={styles.incidentLocation}>Location: {incident.incidentLocation}</Text>
                </View>
                
                {incident.incidentImage && (
                  <Image
                    source={{ uri: `http://localhost:3000/${incident.incidentImage.replace(/\\/g, '/')}` }}
                    style={styles.incidentImage}
                    onError={() => console.log('Failed to load image')}
                  />
                )}

                <Text style={styles.incidentDescription}>{incident.incidentDescription}</Text>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

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
    margin: 13,
    backgroundColor: '#EFEFEF',
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    padding: 10,
  },
  incidentHeader: {
    marginBottom: 10,
  },
  reportedBy: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  incidentDate: {
    fontSize: 12,
    color: '#888',
  },
  incidentLocation: {
    fontSize: 14,
    color: '#444',
  },
  incidentImage: {
    width: '100%',
    height: 340,
    marginTop: 10,
  },
  incidentDescription: {
    fontWeight: 'normal',
    fontSize: 16,
    color: '#333',
    marginTop: 10,
  },
  noIncidentsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  noIncidentsText: {
    fontSize: 18,
    color: '#888',
  },
});
