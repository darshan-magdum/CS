import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, View, Text, TouchableOpacity, Modal, TextInput } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';

const mockPostData = {
  mediaType: 'Photo', // or 'Video'
  description: 'This is a sample description for the post.',
  name: 'John Doe',
  date: '2024-09-20',
  likes: 5,
  comments: 2,
};

export default function StudentViewPost({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [updatedDescription, setUpdatedDescription] = useState(mockPostData.description);

  const handleEdit = () => {
    setModalVisible(true);
  };

  const handleSave = () => {
    mockPostData.description = updatedDescription; // Simulate saving the updated description
    alert('Post updated successfully');
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <FeatherIcon name="chevron-left" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>View Post</Text>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Media Type: {mockPostData.mediaType}</Text>
          <View style={styles.mediaContainer}>
            {/* Replace this Text with an Image or Video component based on mediaType */}
            <Text style={styles.mediaPlaceholder}>{mockPostData.mediaType}</Text>
          </View>

          <Text style={styles.descriptionTitle}>Description:</Text>
          <Text style={styles.descriptionText}>{mockPostData.description}</Text>

          <View style={styles.postDetails}>
            <Text style={styles.detailText}>Posted by: {mockPostData.name}</Text>
            <Text style={styles.detailText}>Date: {mockPostData.date}</Text>
            <Text style={styles.detailText}>Likes: {mockPostData.likes}</Text>
            <Text style={styles.detailText}>Comments: {mockPostData.comments}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Description</Text>
            <TextInput
              style={styles.textArea}
              value={updatedDescription}
              onChangeText={setUpdatedDescription}
              multiline
              placeholder="Edit your description here"
              placeholderTextColor="#999"
            />
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  sectionTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  mediaContainer: {
    backgroundColor: '#f0f0f0',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 15,
  },
  mediaPlaceholder: {
    fontSize: 18,
    color: '#777',
  },
  descriptionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 24,
  },
  postDetails: {
    marginTop: 20,
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  detailText: {
    fontSize: 14,
    color: '#333',
  },
  editButton: {
    marginHorizontal: 24,
    backgroundColor: '#FF8613',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
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
  textArea: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    fontSize: 16,
    height: 120,
    textAlignVertical: 'top',
    color: '#333',
    marginBottom: 15,
  },
  saveButton: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  closeButton: {
    marginTop: 12,
    backgroundColor: '#ccc',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
  },
});
