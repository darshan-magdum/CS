import React from 'react';
import { StyleSheet, SafeAreaView, View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import emergencysafetybutton from "../../../assets/images/emergencysafetybutton.png"; // Ensure the correct path

export default function SafetyAlert({ navigation }) {
  const handleEmergencyHelp = () => {
    // Show alert on emergency help button press
    Alert.alert(
      "Emergency Help",
      "You have pressed the emergency help button.",
      [{ text: "OK" }]
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Safety Alert</Text>
        </View>

        <View style={styles.detailsContainer}>
          {/* Centered Emergency Help Button with Image */}
          <TouchableOpacity style={styles.emergencyButton} onPress={handleEmergencyHelp}>
            <Image source={emergencysafetybutton} style={styles.iconImage} />
          </TouchableOpacity>

          {/* Description below the button */}
          <Text style={styles.description}>
            Press the button for emergency help only.
          </Text>
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
    width: 100, // Adjust size for the button
    height: 100, // Adjust size for the button
    borderRadius: 50, // Circle shape
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5, // Add shadow for Android
    shadowColor: '#000', // Add shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    marginBottom: 20, // Space between button and image
  },
  iconImage: {
    width: 60, // Adjust size for the icon
    height: 60, // Adjust size for the icon
  },
  description: {
    textAlign: 'center',
    fontSize: 16,
    color: '#333',
  },
});
