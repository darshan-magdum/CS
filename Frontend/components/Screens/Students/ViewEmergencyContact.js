import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, View, Text, TouchableOpacity, Modal, TextInput, Image, Alert, FlatList } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const emergencyContactsImage = require('../../../assets/images/emergenycontacts.png');

export default function ViewEmergencyContact({ navigation }) {
  const [contacts, setContacts] = useState([]);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [updatedName, setUpdatedName] = useState('');
  const [updatedMobile, setUpdatedMobile] = useState('');
  const [validationError, setValidationError] = useState('');

  useEffect(() => {
    const fetchEmergencyContacts = async () => {
      try {
        const studentId = await AsyncStorage.getItem('userId');
        const response = await axios.get(`http://192.168.0.113:3000/api/EmergencyNumbers/getEmergencyContactsByStudentId/${studentId}`);
        setContacts(response.data);
      } catch (error) {
        Alert.alert('Error', 'Could not fetch contact data.');
      }
    };

    fetchEmergencyContacts();
  }, []);

  const handleEdit = (contact) => {
    setSelectedContact(contact);
    setUpdatedName(contact.name);
    setUpdatedMobile(contact.contactNo);
    setEditModalVisible(true);
    setValidationError('');
  };

  const handleDelete = (contact) => {
    setSelectedContact(contact);
    setDeleteModalVisible(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://192.168.0.113:3000/api/EmergencyNumbers/deleteEmergencyContact/${selectedContact._id}`);
      setContacts(contacts.filter(c => c._id !== selectedContact._id));
      Alert.alert('Success', 'Contact deleted successfully');
      setDeleteModalVisible(false);
    } catch (error) {
      Alert.alert('Error', 'Could not delete contact');
    }
  };

  const handleSave = async () => {
    setValidationError('');
    
    if (!updatedName.trim() || !updatedMobile.trim()) {
      setValidationError('Both fields are required.');
      return;
    }

    try {
      const response = await axios.put(`http://192.168.0.113:3000/api/EmergencyNumbers/updateEmergencyContact/${selectedContact._id}`, {
        name: updatedName,
        contactNo: updatedMobile,
        studentId: selectedContact.studentId,
      });
      const updatedContacts = contacts.map(contact =>
        contact._id === selectedContact._id ? response.data : contact
      );
      setContacts(updatedContacts);
      Alert.alert('Success', 'Contact updated successfully');
      setEditModalVisible(false);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        Alert.alert('Validation Error', error.response.data.message);
      } else {
        Alert.alert('Error', 'Could not update contact');
      }
    }
  };

  const renderContact = ({ item }) => (
    <View style={styles.contactCard}>
      <View style={styles.contactHeader}>
        <Image source={emergencyContactsImage} style={styles.icon} />
        <View>
          <Text style={styles.contactName}>{item.name}</Text>
          <Text style={styles.contactMobile}>{item.contactNo}</Text>
        </View>
      </View>
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.editButton} onPress={() => handleEdit(item)}>
          <Text style={styles.actionButtonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item)}>
          <Text style={styles.actionButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <FeatherIcon name="chevron-left" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>View Emergency Contacts</Text>
        </View>

        {contacts.length === 0 ? (
          <Text style={styles.noContactsMessage}>No Emergency Contacts</Text>
        ) : (
          <FlatList
            data={contacts}
            renderItem={renderContact}
            keyExtractor={(item) => item._id}
            contentContainerStyle={{ paddingBottom: 100 }}
          />
        )}

        {/* Edit Modal */}
        <Modal visible={editModalVisible} animationType="slide" transparent={true}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Edit Emergency Contact</Text>
              {validationError ? <Text style={styles.validationError}>{validationError}</Text> : null}
              <Text style={styles.label}>Contact Name</Text>
              <TextInput
                style={styles.textInput}
                value={updatedName}
                onChangeText={setUpdatedName}
                placeholder="Enter contact name"
                placeholderTextColor="#999"
              />
              <Text style={styles.label}>Mobile Number</Text>
              <TextInput
                style={styles.textInput}
                value={updatedMobile}
                onChangeText={setUpdatedMobile}
                placeholder="Enter mobile number"
                placeholderTextColor="#999"
              />
              <View style={styles.modalButtonContainer}>
                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                  <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.noButton} onPress={() => setEditModalVisible(false)}>
                  <Text style={styles.noButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal visible={deleteModalVisible} animationType="slide" transparent={true}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Are you sure you want to delete this contact?</Text>
              <View style={styles.modalButtonContainer}>
                <TouchableOpacity style={styles.confirmButton} onPress={confirmDelete}>
                  <Text style={styles.confirmButtonText}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.noButton} onPress={() => setDeleteModalVisible(false)}>
                  <Text style={styles.noButtonText}>No</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
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
  noContactsMessage: {
    textAlign: 'center',
    fontSize: 18,
    color: '#888',
    marginTop: 20,
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
    width: 35,
    height: 35,
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
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  editButton: {
    backgroundColor: '#007bff',
    padding: 5,
    borderRadius: 5,
    marginLeft: 10,
  },
  deleteButton: {
    backgroundColor: '#ff4d4d',
    padding: 5,
    borderRadius: 5,
    marginLeft: 10,
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 24,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
  },
  validationError: {
    color: 'red',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    fontSize: 16,
    height: 50,
    marginBottom: 15,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  saveButton: {
    backgroundColor: '#007bff',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginRight: 5,
  },
  confirmButton: {
    backgroundColor: '#007bff',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginRight: 5,
  },
  noButton: {
    backgroundColor: '#ff4d4d',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  noButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
