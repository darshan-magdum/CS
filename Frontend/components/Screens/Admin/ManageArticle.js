import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, View, Text, TouchableOpacity, Modal, TextInput, Image, Alert, ScrollView } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function ManageArticle({ navigation }) {
  const [articles, setArticles] = useState([]);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [updatedDescription, setUpdatedDescription] = useState('');
  const [currentArticle, setCurrentArticle] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/Article/getallarticles`);
        const data = await response.json();
        if (Array.isArray(data)) {
          setArticles(data);
        } else {
          console.warn('Expected an array, but got:', data);
          setArticles([]);
        }
      } catch (error) {
        console.error('Error fetching articles:', error);
        Alert.alert('Error', 'Failed to load articles. Please try again.');
      }
    };

    fetchArticles();
  }, []);

  const handleEdit = (article) => {
    setCurrentArticle(article);
    setUpdatedTitle(article.title);
    setUpdatedDescription(article.description);
    setEditModalVisible(true);
  };

  const handleDelete = (article) => {
    setCurrentArticle(article);
    setDeleteModalVisible(true);
  };

  const confirmDelete = async () => {
    if (currentArticle) {
      try {
        await axios.delete(`http://localhost:3000/api/Article/deletearticle/${currentArticle._id}`);
        setArticles((prevArticles) => prevArticles.filter((article) => article._id !== currentArticle._id));
        Alert.alert('Article deleted successfully');
      } catch (error) {
        console.error(error);
        Alert.alert('Error deleting article. Please try again.');
      } finally {
        setDeleteModalVisible(false);
        setCurrentArticle(null);
      }
    }
  };

  const handleSave = async () => {
    if (currentArticle) {
      const trimmedTitle = updatedTitle.trim();
      const trimmedDescription = updatedDescription.trim();

      // Validation: Check if either field is empty
      if (!trimmedTitle || !trimmedDescription) {
        Alert.alert('Validation Error', 'Both title and description cannot be empty.');
        return; // Stop the function if validation fails
      }

      const updatedArticle = { ...currentArticle, title: trimmedTitle, description: trimmedDescription };
      try {
        await axios.put(`http://localhost:3000/api/Article/editarticle/${updatedArticle._id}`, updatedArticle);
        setArticles((prevArticles) =>
          prevArticles.map((article) =>
            article._id === updatedArticle._id ? updatedArticle : article
          )
        );
        Alert.alert('Article updated successfully');
      } catch (error) {
        console.error('Error updating article:', error);
        Alert.alert('Error', 'Failed to update article. Please try again.');
      } finally {
        setEditModalVisible(false);
        setCurrentArticle(null);
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <FeatherIcon name="chevron-left" size={24} color="#333" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Manage Articles</Text>
          </View>

          {articles.length === 0 ? (
            <View style={styles.noArticlesContainer}>
              <Text style={styles.noArticlesText}>No articles available</Text>
            </View>
          ) : (
            articles.map((article) => (
              <View key={article._id} style={styles.article}>
                <View style={styles.articleHeader}>
                  <Text style={styles.articleTitle}>{article.title}</Text>
                  <Text style={styles.articlePostedBy}>{article.postedBy}</Text>
                  <View style={styles.actionButtons}>
                    <TouchableOpacity style={styles.editButton} onPress={() => handleEdit(article)}>
                      <Text style={styles.actionButtonText}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(article)}>
                      <Text style={styles.actionButtonText}>Delete</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {article.image ? (
                  <Image
                    source={{ uri: `http://localhost:3000/${article.image.replace(/\\/g, '/')}` }}
                    style={styles.articleImage}
                    onError={() => console.log('Failed to load image')}
                  />
                ) : null}

                <Text style={styles.articleDescription}>{article.description}</Text>
              </View>
            ))
          )}

          {/* Edit Modal */}
          <Modal visible={editModalVisible} animationType="slide" transparent={true}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Edit Article</Text>
                <TextInput
                  style={styles.input}
                  value={updatedTitle}
                  onChangeText={setUpdatedTitle}
                  placeholder="Edit title"
                  placeholderTextColor="#999"
                />
                <TextInput
                  style={styles.textArea}
                  value={updatedDescription}
                  onChangeText={setUpdatedDescription}
                  multiline
                  placeholder="Edit description"
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
      </ScrollView>
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
    margin: 13,
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
    flexDirection: 'column',
  },
  articleTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#333333',
  },
  articlePostedBy: {
    color: '#888888',
    fontSize: 12,
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
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 15,
    color: '#333',
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
  noArticlesContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  noArticlesText: {
    fontSize: 18,
    color: '#888',
  },
});
