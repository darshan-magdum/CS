import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, View, Text, TouchableOpacity, Modal, TextInput, Image } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';

const mockArticleData = {
  id: 1,
  title: 'Sample Article Title',
  author: 'Jane Doe',
  date: '2024-09-20',
  image: 'https://via.placeholder.com/300',
  description: 'This is a sample description for the article.',
};

export default function ManageArticle({ navigation }) {
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [updatedDescription, setUpdatedDescription] = useState(mockArticleData.description);

  const handleEdit = () => {
    setEditModalVisible(true);
  };

  const handleDelete = () => {
    setDeleteModalVisible(true);
  };

  const confirmDelete = () => {
    alert('Article deleted successfully');
    navigation.goBack(); // Navigate back after deletion
  };

  const handleSave = () => {
    mockArticleData.description = updatedDescription; // Simulate saving the updated description
    alert('Article updated successfully');
    setEditModalVisible(false);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <FeatherIcon name="chevron-left" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Manage Article</Text>
        </View>

        <View style={styles.article}>
          <View style={styles.articleHeader}>
            <View>
              <Text style={styles.articleTitle}>{mockArticleData.title}</Text>
              <Text style={styles.articleAuthor}>{mockArticleData.author}</Text>
              <Text style={styles.articleDate}>{mockArticleData.date}</Text>
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
          <Image source={{ uri: mockArticleData.image }} style={styles.articleImage} />
          <Text style={styles.articleDescription}>{mockArticleData.description}</Text>
        </View>

        {/* Edit Modal */}
        <Modal visible={editModalVisible} animationType="slide" transparent={true}>
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
              <Text style={styles.modalTitle}>Are you sure you want to delete this article?</Text>
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
  article: {
    margin: 16,
    backgroundColor: '#EFEFEF',
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  articleHeader: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  articleTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#333333',
  },
  articleAuthor: {
    fontSize: 14,
    color: '#666666',
  },
  articleDate: {
    color: '#888888',
    fontSize: 12,
  },
  actionButtons: {
    flexDirection: 'row',
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
  articleImage: {
    width: '100%',
    height: 200,
  },
  articleDescription: {
    padding: 10,
    fontSize: 15,
    color: '#444444',
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
