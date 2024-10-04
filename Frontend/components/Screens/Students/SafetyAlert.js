import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import * as Location from 'expo-location'; 
import axios from 'axios'; 
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import emergencysafetybutton from "../../../assets/images/emergencysafetybutton.png"; 
import FeatherIcon from 'react-native-vector-icons/Feather';

export default function SafetyAlert({ navigation }) { // Receive navigation prop
  const [location, setLocation] = useState(null);
  const [fetchingLocation, setFetchingLocation] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const getLocation = async () => {
      setFetchingLocation(true);
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
        setFetchingLocation(false);
        return;
      }

      try {
        let currentLocation = await Location.getCurrentPositionAsync({});
        setLocation({
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
        });
      } catch (error) {
        Alert.alert("Error", "Failed to get location. Please try again.");
      } finally {
        setFetchingLocation(false);
      }
    };

    getLocation();
  }, []);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      const response = await axios.get(`http://localhost:3000/api/student/${userId}`);
      if (response.status === 200) {
        setUserData(response.data);
      } else {
        console.error('Failed to fetch user details');
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const handleEmergencyHelp = async () => {
    if (!userData) {
      Alert.alert("Error", "User data is not available.");
      return;
    }

    const { name: username, mobile: contactNumber } = userData;

    if (location) {
      const { latitude, longitude } = location;
      const emergencyData = { name: username, contactNumber, location: { latitude, longitude } };

      try {
        const response = await axios.post('http://localhost:3000/api/StudentLocation/addlocation', emergencyData);
        Alert.alert("Success", "Emergency data sent successfully.");
      } catch (error) {
        Alert.alert("Error", `Failed to send emergency data: ${error.message}`);
      }
    } else {
      Alert.alert("Fetching Location", "Please wait while we get your location...");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <FeatherIcon name="chevron-left" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Safety Alert</Text>
        </View>

        <View style={styles.detailsContainer}>
          <TouchableOpacity 
            style={styles.emergencyButton} 
            onPress={handleEmergencyHelp}
          >
            <Image source={emergencysafetybutton} style={styles.iconImage} />
          </TouchableOpacity>

          <Text style={styles.description}>
            Press the button for emergency help only.
          </Text>

          {fetchingLocation && <Text style={styles.loadingText}>Fetching location...</Text>}
        </View>
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
  detailsContainer: {
    paddingHorizontal: 24,
    paddingTop: 0,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emergencyButton: {
    backgroundColor: 'white',
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    marginBottom: 20,
  },
  iconImage: {
    width: 60,
    height: 60,
  },
  description: {
    textAlign: 'center',
    fontSize: 16,
    color: '#333',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 14,
    color: 'grey',
  },
});
