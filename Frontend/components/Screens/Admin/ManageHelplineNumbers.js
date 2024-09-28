import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, View, Text, TouchableOpacity, Modal, TextInput, Image } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';

// Replace this with the path to your local image
const policeImage = require('../../../assets/images/police.png');

const mockHelplineData = {
  id: 1,
  name: 'Local Police',
  number: '911',
};

export default function ManageHelplineNumbers({ navigation }) {
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [updatedName, setUpdatedName] = useState(mockHelplineData.name);
  const [updatedNumber, setUpdatedNumber] = useState(mockHelplineData.number);

  const handleEdit = () => {
    setEditModalVisible(true);
  };

  const handleDelete = () => {
    setDeleteModalVisible(true);
  };

  const confirmDelete = () => {
    alert('Helpline number deleted successfully');
    navigation.goBack(); // Navigate back after deletion
  };

  const handleSave = () => {
    mockHelplineData.name = updatedName; // Simulate saving the updated name
    mockHelplineData.number = updatedNumber; // Simulate saving the updated number
    alert('Helpline number updated successfully');
    setEditModalVisible(false);
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

        <View style={styles.helplineCard}>
          <View style={styles.helplineHeader}>
            <Image source={policeImage} style={styles.icon} />
            <View>
              <Text style={styles.helplineName}>{mockHelplineData.name}</Text>
              <Text style={styles.helplineNumber}>{mockHelplineData.number}</Text>
            </View>
          </View>
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
              <Text style={styles.actionButtonText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
              <Text style={styles.actionButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Edit Modal */}
        <Modal visible={editModalVisible} animationType="slide" transparent={true}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Edit Helpline Number</Text>
              <Text style={styles.label}>Helpline Name</Text>
              <TextInput
                style={styles.textInput}
                value={updatedName}
                onChangeText={setUpdatedName}
                placeholder="Enter helpline name"
                placeholderTextColor="#999"
              />
              <Text style={styles.label}>Helpline Number</Text>
              <TextInput
                style={styles.textInput}
                value={updatedNumber}
                onChangeText={setUpdatedNumber}
                placeholder="Enter helpline number"
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
              <Text style={styles.modalTitle}>Are you sure you want to delete this helpline number?</Text>
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
  helplineCard: {
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
