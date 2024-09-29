import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, View, Text, Image, TouchableOpacity } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import axios from 'axios';
const policeImage = require('../../../assets/images/police.png');

export default function ViewHelplineNumbers({ navigation }) {
  const [helplineData, setHelplineData] = useState([]);

  useEffect(() => {
    fetchHelplineNumbers();
  }, []);

  const fetchHelplineNumbers = async () => {
    try {
      const response = await axios.get('http://192.168.0.113:3000/api/HelplineNumbers/getallHelplineNumbers');
      setHelplineData(response.data);
    } catch (error) {
      console.error('Error fetching helpline numbers:', error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <FeatherIcon name="chevron-left" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>View Helpline Numbers</Text>
        </View>

        {helplineData.map((helpline) => (
          <View key={helpline._id} style={styles.helplineCard}>
            <View style={styles.helplineHeader}>
              <Image source={policeImage} style={styles.icon} />
              <View>
                <Text style={styles.helplineName}>{helpline.name}</Text>
                <Text style={styles.helplineNumber}>{helpline.contactNo}</Text>
              </View>
            </View>
          </View>
        ))}
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
    marginBottom:0,
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
});
