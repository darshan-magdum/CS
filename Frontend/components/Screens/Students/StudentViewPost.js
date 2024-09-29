import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, View, Text, TouchableOpacity, Modal, TextInput, Image, Alert, ScrollView } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function StudentViewPost({ navigation }) {
  const [posts, setPosts] = useState([]);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [updatedDescription, setUpdatedDescription] = useState('');
  const [currentPost, setCurrentPost] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const userId = await AsyncStorage.getItem("userId");
      if (userId) {
        try {
          const response = await fetch(`http://192.168.0.113:3000/api/UploadPosts/getbystudent/${userId}`);
          const data = await response.json();

          if (Array.isArray(data)) {
            const sortedPosts = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setPosts(sortedPosts);
          } else {
            console.warn('Expected an array, but got:', data);
            setPosts([]);
          }
        } catch (error) {
          console.error('Error fetching posts:', error);
          Alert.alert('Error', 'Failed to load posts. Please try again.');
        }
      }
    };

    fetchPosts();
  }, []);

  const handleEdit = (post) => {
    setCurrentPost(post);
    setUpdatedDescription(post.description);
    setEditModalVisible(true);
  };

  const handleDelete = (post) => {
    setCurrentPost(post);
    setDeleteModalVisible(true);
  };

  const confirmDelete = async () => {
    if (currentPost) {
      try {
        await axios.delete(`http://192.168.0.113:3000/api/UploadPosts/delete/${currentPost._id}`);
        setPosts((prevPosts) => prevPosts.filter((post) => post._id !== currentPost._id));
        Alert.alert('Post deleted successfully');
      } catch (error) {
        console.error(error);
        Alert.alert('Error deleting post. Please try again.');
      } finally {
        setDeleteModalVisible(false);
        setCurrentPost(null);
      }
    }
  };

  const handleSave = () => {
    if (currentPost) {
      const updatedPost = { ...currentPost, description: updatedDescription };
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === updatedPost._id ? updatedPost : post
        )
      );
      Alert.alert('Post updated successfully');
      setEditModalVisible(false);
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
            <Text style={styles.headerTitle}>View Posts</Text>
          </View>

          {posts.length === 0 ? (
            <View style={styles.noPostsContainer}>
              <Text style={styles.noPostsText}>No posts available</Text>
            </View>
          ) : (
            posts.map((post) => (
              <View key={post._id} style={styles.post}>
                <View style={styles.postHeader}>
                  <View>
                    <Text style={styles.posterName}>{post.studentName}</Text>
                    <Text style={styles.postDate}>
                      {new Date(post.createdAt).toLocaleString()}
                    </Text>
                  </View>
                  <View style={styles.actionButtons}>
                    <TouchableOpacity
                      style={styles.editButton}
                      onPress={() => handleEdit(post)}
                    >
                      <Text style={styles.actionButtonText}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.deleteButton}
                      onPress={() => handleDelete(post)}
                    >
                      <Text style={styles.actionButtonText}>Delete</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {(post.media && Array.isArray(post.media) && post.media.length > 0) ? (
                  post.media.map((image, index) => (
                    <Image
                      key={index}
                      source={{ uri: `http://192.168.0.113:3000/${image.replace(/\\/g, '/')}` }}
                      style={styles.postImage}
                      onError={() => console.log('Failed to load image')}
                    />
                  ))
                ) : post.postImage ? (
                  <Image
                    source={{ uri: `http://192.168.0.113:3000/${post.postImage.replace(/\\/g, '/')}` }}
                    style={styles.postImage}
                    onError={() => console.log('Failed to load image')}
                  />
                ) : null}

                <Text style={styles.postDescription}>{post.description}</Text>
              </View>
            ))
          )}

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
                  <TouchableOpacity
                    style={styles.noButton}
                    onPress={() => setEditModalVisible(false)}
                  >
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
                <Text style={styles.modalTitle}>Are you sure you want to delete this post?</Text>
                <View style={styles.modalButtonContainer}>
                  <TouchableOpacity style={styles.confirmButton} onPress={confirmDelete}>
                    <Text style={styles.confirmButtonText}>Yes</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.noButton}
                    onPress={() => setDeleteModalVisible(false)}
                  >
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
  post: {
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
  postHeader: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  posterName: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#333333',
  },
  postDate: {
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
  postImage: {
    width: '100%',
    height: 200,
  },
  postDescription: {
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
  noPostsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  noPostsText: {
    fontSize: 18,
    color: '#888',
  },
});
