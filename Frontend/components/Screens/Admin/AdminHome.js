import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const AdminHome = () => {
  const navigation = useNavigation();
  const [userReports, setUserReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/UploadPosts/getallpost');
        const data = await response.json();

        if (Array.isArray(data)) {
          const formattedReports = data.map(report => ({
            id: report._id,
            name: report.studentName,
            date: new Date(report.createdAt).toLocaleDateString(),
            image: `http://localhost:3000/${report.postImage.replace(/\\/g, '/')}`, // Normalize the image path
            report: report.description,
          }));
          setUserReports(formattedReports);
        } else {
          console.warn('Expected an array, but got:', data);
          setUserReports([]);
        }
      } catch (error) {
        console.error('Error fetching reports:', error);
        Alert.alert('Error', 'Failed to load reports. Please try again.');
      }
    };

    fetchReports();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Campus Shield Admin</Text>
        <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate('AdminMenu')}>
          <Ionicons name="menu" size={24} color="#FF8613" />
        </TouchableOpacity>
      </View>
      <View style={styles.reportsContainer}>
        {userReports.length === 0 ? (
          <Text style={styles.noReportsText}>No reports available</Text>
        ) : (
          userReports.map((report) => (
            <View key={report.id} style={styles.report}>
              <View style={styles.reportHeader}>
                <Text style={styles.reporterName}>{report.name}</Text>
                <Text style={styles.reportDate}>{report.date}</Text>
              </View>
              {report.image && (
                <Image
                  source={{ uri: report.image }}
                  style={styles.reportImage}
                  onError={() => console.log('Failed to load image')}
                />
              )}
              <Text style={styles.reportDescription}>{report.report}</Text>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eaeaea',
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
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    width: '100%',
    height: 340,
    marginTop: 10,
  },
  reportDescription: {
    padding: 10,
    fontSize: 15,
    color: '#444444',
  },
  noReportsText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
    color: '#888888',
  },
});

export default AdminHome;
