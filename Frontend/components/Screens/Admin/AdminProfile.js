import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, View, Text, TouchableOpacity } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AdminProfile({ navigation }) {
  const [adminData, setAdminData] = useState(null); // State to hold admin data

  useEffect(() => {
    fetchAdminData(); // Fetch admin data on component mount
  }, []);

  const fetchAdminData = async () => {
    try {
      const adminId = await AsyncStorage.getItem('adminId'); // Retrieve admin ID from AsyncStorage
      console.log('Fetching admin details for adminId:', adminId);

      const response = await axios.get(`http://localhost:3000/api/admin/${adminId}`); // Fetch admin details using admin ID
      console.log('Admin Details:', response.data);

      if (response.status === 200) {
        setAdminData(response.data); // Set admin data to state
      } else {
        console.error('Failed to fetch admin details');
      }
    } catch (error) {
      console.error('Error fetching admin details:', error);
      // Handle error scenarios
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <FeatherIcon name="chevron-left" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Admin Profile</Text>
        </View>

        {adminData ? (
          <View style={styles.detailsContainer}>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Collge Name</Text>
              <Text style={styles.detailText}>{adminData.collegeName}</Text>
            </View>

            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Email</Text>
              <Text style={styles.detailText}>{adminData.email}</Text>
            </View>

            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Contact Number</Text>
              <Text style={styles.detailText}>{adminData.contactNo}</Text>
            </View>
          </View>
        ) : (
          <View style={styles.noRecordContainer}>
            <Text style={styles.noRecordText}>No Record Found</Text>
          </View>
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
  detailsContainer: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  detailItem: {
    marginBottom: 24,
  },
  detailLabel: {
    marginBottom: 8,
    fontSize: 17,
    fontWeight: '500',
    color: '#414d63',
  },
  detailText: {
    marginTop: 3,
    fontSize: 16,
    color: '#989898',
  },
  noRecordContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noRecordText: {
    fontSize: 18,
    color: '#999',
  },
});
