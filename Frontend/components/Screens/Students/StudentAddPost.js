import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, View, Text, TextInput, TouchableOpacity, Image, ScrollView, Modal, Alert } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from "@react-navigation/native";

export default function StudentAddPost({ navigation }) {
  const [form, setForm] = useState({
    description: '',
    postImage: null,
    studentID: '',
  });

  const [userData, setUserData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [fullSizeImage, setFullSizeImage] = useState('');

  const fetchUserData = useCallback(async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      const response = await axios.get(`http://localhost:3000/api/student/${userId}`);
      if (response.status === 200) {
        setUserData(response.data);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  }, []);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  useFocusEffect(
    useCallback(() => {
      fetchUserData();
    }, [fetchUserData])
  );

  useEffect(() => {
    const fetchStudentId = async () => {
      const storedStudentId = await AsyncStorage.getItem('userId');
      setForm(prevForm => ({ ...prevForm, studentID: storedStudentId }));
    };
    
    fetchStudentId();
  }, []);

  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      setForm({ ...form, postImage: result.assets[0] });
    }
  };

  const handleSubmit = async () => {
    try {
      const { description, postImage, studentID } = form;
      const formData = new FormData();
      formData.append('description', description);
      formData.append('studentID', studentID);
      if (userData) {
        formData.append('studentName', userData.name);
      }
      if (postImage) {
        const response = await fetch(postImage.uri);
        const blob = await response.blob();
        formData.append('postImage', blob, postImage.fileName || 'photo.jpg');
      }

      const response = await axios.post('http://localhost:3000/api/UploadPosts/createnewpost', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      Alert.alert(response.data.message);
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error creating post:', error.message);
    }
  };

  const showFullSizeImage = (uri) => {
    setFullSizeImage(uri);
    setModalVisible(true);
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <FeatherIcon name="chevron-left" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>New Post</Text>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Create New Post</Text>

          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Description</Text>
              <TextInput
                style={styles.textArea}
                value={form.description}
                onChangeText={(description) => setForm({ ...form, description })}
                multiline
                placeholder="Enter Description"
                placeholderTextColor="#999"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Photo</Text>
              <TouchableOpacity style={styles.photoPicker} onPress={handleImagePick}>
                <Text style={styles.pickerText}>{form.postImage ? 'Photo Selected' : 'Pick a photo'}</Text>
              </TouchableOpacity>
              {form.postImage && (
                <TouchableOpacity onPress={() => showFullSizeImage(form.postImage.uri)}>
                  <Image source={{ uri: form.postImage.uri }} style={styles.selectedImage} />
                </TouchableOpacity>
              )}
            </View>
          </View>

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>

        {/* Modal for Full-Size Image */}
        <Modal visible={modalVisible} transparent={true} animationType="slide">
          <View style={styles.modalContainer}>
            <TouchableOpacity style={styles.modalOverlay} onPress={() => setModalVisible(false)}>
              <Image source={{ uri: fullSizeImage }} style={styles.fullSizeImage} />
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </ScrollView>
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
    marginBottom: 12,
  },
  formContainer: {
    marginTop: 8,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    marginBottom: 8,
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    fontSize: 16,
    height: 100,
    textAlignVertical: 'top',
    color: '#333',
  },
  photoPicker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    alignItems: 'center',
  },
  selectedImage: {
    marginTop: 10,
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 4,
  },
  submitButton: {
    backgroundColor: '#FF8613',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 4,
    marginTop: 20,
    marginHorizontal: 24,
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullSizeImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});
