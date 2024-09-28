import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const AdminHome = () => {
const navigation = useNavigation();
  const userReports = [
    {
      id: 1,
      name: 'Alice Williams',
      date: '2024-09-20',
      image: 'https://via.placeholder.com/300',
      report: 'Increased security needed in parking areas.',
    },
    {
      id: 2,
      name: 'Mark Lee',
      date: '2024-09-21',
      image: 'https://via.placeholder.com/300',
      report: 'Noise disturbances late at night.',
    },
    {
      id: 3,
      name: 'Sophia Green',
      date: '2024-09-22',
      image: 'https://via.placeholder.com/300',
      report: 'Request for better lighting in walkways.',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Campus Shield Admin</Text>
        <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate('AdminMenu')}>
          <Ionicons name="menu" size={24} color="#FF8613" />
        </TouchableOpacity>
      </View>
      <View style={styles.reportsContainer}>
        {userReports.map((report) => (
          <View key={report.id} style={styles.report}>
            <View style={styles.reportHeader}>
              <Text style={styles.reporterName}>{report.name}</Text>
              <Text style={styles.reportDate}>{report.date}</Text>
            </View>
            <Image source={{ uri: report.image }} style={styles.reportImage} />
            <Text style={styles.reportDescription}>{report.report}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FF8613',
  },
  headerText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  menuButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  reportsContainer: {
    padding: 16,
  },
  report: {
    marginBottom: 16,
    backgroundColor: '#ffffff',
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  reportHeader: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee',
  },
  reporterName: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#333333',
  },
  reportDate: {
    color: '#888888',
    fontSize: 12,
  },
  reportImage: {
    width: '100%',
    height: 200,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  reportDescription: {
    padding: 10,
    fontSize: 15,
    color: '#444444',
  },
});

export default AdminHome;
