import React from 'react';
import { StyleSheet, SafeAreaView, View, Text, TouchableOpacity, Image, Linking } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';

const helpInfoImage = require('../../../assets/images/AlertMessages.png'); 

const mockHelpInfoData = {
  id: 1,
  name: 'Local Help Center',
  mobile: '987-654-3210',
  mapLink: 'https://www.google.com/maps',
};

export default function ViewHelpInfo({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <FeatherIcon name="chevron-left" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>View Help Info</Text>
        </View>

        <View style={styles.contactCard}>
          <View style={styles.contactHeader}>
            <Image source={helpInfoImage} style={styles.icon} />
            <View>
              <Text style={styles.contactName}>{mockHelpInfoData.name}</Text>
              <Text style={styles.contactMobile}>{mockHelpInfoData.mobile}</Text>
              <TouchableOpacity onPress={() => Linking.openURL(mockHelpInfoData.mapLink)}>
                <Text style={styles.mapLink}>View on Google Maps</Text>
              </TouchableOpacity>
            </View>
          </View>
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
  contactCard: {
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
  contactHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    width: 45,
    height: 55,
    marginRight: 10,
  },
  contactName: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#333',
  },
  contactMobile: {
    color: '#888',
    fontSize: 14,
  },
  mapLink: {
    color: '#007bff',
    textDecorationLine: 'underline',
    marginTop: 4,
  },
});
