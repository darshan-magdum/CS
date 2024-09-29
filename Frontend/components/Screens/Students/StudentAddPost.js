import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, View, Text, TextInput, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function StudentAddPost({ navigation }) {
  const [form, setForm] = useState({
    description: '',
    postImage: null, // Changed from foodImage to postImage
    studentID: '', // Changed from vendorId to studentID
  });

  useEffect(() => {
    const fetchStudentId = async () => {
      const storedStudentId = await AsyncStorage.getItem('userId');
      setForm(prevForm => ({ ...prevForm, studentID: storedStudentId }));
    };
    
    fetchStudentId();
  }, []);

  const [errors, setErrors] = useState({
    description: '',
    postImage: '', // Changed from foodImage to postImage
  });

  const handleChangeDescription = (description) => {
    setForm({ ...form, description });
    setErrors({ ...errors, description: description.trim() ? '' : 'Please enter Food Description' });
  };

  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setForm({ ...form, postImage: result.assets[0] }); // Changed from foodImage to postImage
      setErrors({ ...errors, postImage: '' }); // Clear the error message when an image is selected
    }
  };

  const handleSubmit = async () => {
    try {
      const { description, postImage, studentID } = form; // Removed name
  
      let formValid = true;
      const newErrors = {
        description: description.trim() ? '' : 'Please enter Food Description',
        postImage: postImage ? '' : 'Please select an image', // Changed from foodImage to postImage
      };
  
      setErrors(newErrors);
  
      if (Object.values(newErrors).some(error => error !== '')) {
        formValid = false;
      }
  
      if (!formValid) {
        return;
      }
  
      const formData = new FormData();
      formData.append('description', description);
      formData.append('studentID', studentID); // Changed from vendorId to studentID
      
      if (postImage) { // Changed from foodImage to postImage
        const response = await fetch(postImage.uri); // Changed from foodImage to postImage
        const blob = await response.blob();
        formData.append('postImage', blob, postImage.fileName || 'photo.jpg'); // Changed from foodImage to postImage
      }
  
      const response = await axios.post('http://localhost:3000/api/UploadPosts/createnewpost', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      Alert.alert(response.data.message);
      navigation.goBack(); 
    } catch (error) {
      Alert.alert('Error submitting food item:', error.message);
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <FeatherIcon name="chevron-left" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Food Collection</Text>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Add Food Item To Collection</Text>

          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Description</Text>
              <TextInput
                style={styles.textArea}
                value={form.description}
                onChangeText={handleChangeDescription}
                multiline
                placeholder="Enter Food Description"
                placeholderTextColor="#999"
              />
              {errors.description ? <Text style={styles.errorText}>{errors.description}</Text> : null}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Photo</Text>
              <TouchableOpacity style={styles.photoPicker} onPress={handleImagePick}>
                <Text style={styles.pickerText}>{form.postImage ? 'Photo Selected' : 'Pick a photo'}</Text>
              </TouchableOpacity>
              {form.postImage && <Image source={{ uri: form.postImage.uri }} style={styles.selectedImage} />}
              {errors.postImage ? <Text style={styles.errorText}>{errors.postImage}</Text> : null} 
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
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
    fontSize: 16,
    marginBottom: 4,
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
    backgroundColor: '#007bff',
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
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 4,
  },
});
