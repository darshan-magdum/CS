import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, View, Text, TouchableOpacity, Image, Alert, FlatList, Linking } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import axios from 'axios';

const SafetyImage = require('../../../assets/images/safetyimage.jpg');

export default function ViewSafetyDetails({ navigation }) {
  const [safetyData, setSafetyData] = useState([]);

  useEffect(() => {
    fetchSafetyDetails();
  }, []);

  const fetchSafetyDetails = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/StudentLocation/getsafetydetails');
      setSafetyData(response.data);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch safety details.");
      console.error("Error fetching safety details:", error);
    }
  };

  const renderItem = ({ item }) => {
    const { name, contactNumber, location } = item;
    const coordinates = location.coordinates;
    const googleMapLink = `https://www.google.com/maps/@${coordinates[1]},${coordinates[0]},15z`;

    return (
      <View style={styles.helplineCard}>
        <View style={styles.helplineHeader}>
          <Image source={SafetyImage} style={styles.icon} />
          <View>
            <Text style={styles.helplineName}>{name}</Text>
            <Text style={styles.helplineNumber}>{contactNumber}</Text>
            <TouchableOpacity onPress={() => Linking.openURL(googleMapLink)}>
              <Text style={styles.mapLink}>View on Google Maps</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <FeatherIcon name="chevron-left" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Safety Details</Text>
        </View>

        {safetyData.length === 0 ? (
          <View style={styles.noRecordsContainer}>
            <Text style={styles.noRecordsText}>No records available</Text>
          </View>
        ) : (
          <FlatList
            data={safetyData}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        )}
      </View>
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
  helplineCard: {
    margin: 16,
    padding: 16,
    backgroundColor: '#EEEEEE',
    borderRadius: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  helplineHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    width: 54,
    height: 54,
    marginRight: 10,
  },
  helplineName: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#333',
  },
  helplineNumber: {
    color: '#888',
    fontSize: 14,
  },
  mapLink: {
    color: 'blue',
    textDecorationLine: 'underline',
    marginTop: 4,
  },
  noRecordsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noRecordsText: {
    fontSize: 16,
    color: '#888',
  },
});
