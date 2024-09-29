import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function StudentAddEmergencyContact({ navigation }) {
  const [form, setForm] = useState({
    name: '',
    contactNumber: '',
  });

  const handleChangeName = (name) => {
    setForm({ ...form, name });
  };

  const handleChangeContactNumber = (contactNumber) => {
    setForm({ ...form, contactNumber });
  };

  const validateContactNumber = (contactNumber) => {
    const regex = /^\+?\d{10,15}$/; // Adjust regex as needed
    return regex.test(contactNumber);
  };

  const handleSubmit = async () => {
    const studentId = await AsyncStorage.getItem('userId'); 
    if (!form.name || !form.contactNumber) {
      Alert.alert('Error', 'Please fill out both fields.');
      return;
    }

    if (!validateContactNumber(form.contactNumber)) {
      Alert.alert('Error', 'Please enter a valid contact number.');
      return;
    }

    // Handle the emergency contact submission
    try {
      const response = await axios.post('http://localhost:3000/api/EmergencyNumbers/addNewContact', {
        name: form.name,
        contactNo: form.contactNumber,
        studentId: studentId,
      });

      Alert.alert('Success', 'Emergency contact added successfully');
      setForm({ name: '', contactNumber: '' });
    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 2xx
        Alert.alert('Error', error.response.data.message || 'Failed to add contact');
      } else {
        // Other errors (network error, etc.)
        Alert.alert('Error', 'An unexpected error occurred.');
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <FeatherIcon name="chevron-left" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Add Emergency Contact</Text>
        </View>

        <View style={styles.sectionContainer}>
          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Name</Text>
              <TextInput
                style={styles.textInput}
                value={form.name}
                onChangeText={handleChangeName}
                placeholder="Enter name"
                placeholderTextColor="#999"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Contact Number</Text>
              <TextInput
                style={styles.textInput}
                value={form.contactNumber}
                onChangeText={handleChangeContactNumber}
                keyboardType="phone-pad"
                placeholder="Enter contact number"
                placeholderTextColor="#999"
              />
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
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
  sectionContainer: {
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  formContainer: {
    marginTop: 12,
  },
  inputContainer: {
    marginBottom: 24,
  },
  inputLabel: {
    marginBottom: 8,
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    fontSize: 16,
    color: '#333',
  },
  submitButton: {
    marginHorizontal: 24,
    marginTop: 24,
    backgroundColor: '#FF8613',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
