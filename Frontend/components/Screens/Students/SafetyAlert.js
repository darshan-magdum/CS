import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import * as Location from 'expo-location'; // Use expo-location if you are using Expo
import axios from 'axios'; // Import Axios
import emergencysafetybutton from "../../../assets/images/emergencysafetybutton.png"; // Ensure the correct path

export default function SafetyAlert() {
  const [location, setLocation] = useState(null);
  const [fetchingLocation, setFetchingLocation] = useState(false); // Track if location is being fetched

  useEffect(() => {
    const getLocation = async () => {
      setFetchingLocation(true);
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
        setFetchingLocation(false);
        return;
      }

      // Get current location
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

  const handleEmergencyHelp = async () => {
    console.log("Button clicked");

    const username = "darshan"; // Hardcoded username
    const contactNumber = "9307741995"; // Hardcoded contact number

    if (location) {
      const { latitude, longitude } = location;

      // Prepare emergency data
      const emergencyData = {
        name: username,
        contactNumber,
        location: {
          latitude,
          longitude,
        },
      };

      console.log("Emergency Data: ", emergencyData); // Log data for testing

      try {
        // Send data to the backend using Axios
        const response = await axios.post('http://localhost:3000/api/StudentLocation/addlocation', emergencyData);
        console.log("Response from server: ", response.data);
        Alert.alert("Success", "Emergency data sent successfully.");
      } catch (error) {
        Alert.alert("Error", `Failed to send emergency data: ${error.message}`);
        console.error("Axios error:", error);
      }
    } else {
      Alert.alert("Fetching Location", "Please wait while we get your location...");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.container}>
        <View style={styles.header}>
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
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
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
