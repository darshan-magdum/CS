import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, View, Text, TextInput, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from "@react-navigation/native";

export default function AddArticle({ navigation }) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    articleImage: null,
    postedBy: 'JJMCOE - ADMIN', // Static value for postedBy
  });

  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      setForm({ ...form, articleImage: result.assets[0] });
    }
  };

  const handleSubmit = async () => {
    try {
      const { title, description, articleImage, postedBy } = form;
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('postedBy', postedBy);
      if (articleImage) {
        const response = await fetch(articleImage.uri);
        const blob = await response.blob();
        formData.append('image', blob, articleImage.fileName || 'photo.jpg');
      }

      const response = await axios.post('http://localhost:3000/api/Article/addarticle', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      Alert.alert(response.data.message);
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error creating article:', error.message);
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <FeatherIcon name="chevron-left" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>New Article</Text>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Create New Article</Text>

          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Title</Text>
              <TextInput
                style={styles.textArea}
                value={form.title}
                onChangeText={(title) => setForm({ ...form, title })}
                placeholder="Enter Title"
                placeholderTextColor="#999"
              />
            </View>

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
                <Text style={styles.pickerText}>{form.articleImage ? 'Photo Selected' : 'Pick a photo'}</Text>
              </TouchableOpacity>
              {form.articleImage && (
                <Image source={{ uri: form.articleImage.uri }} style={styles.selectedImage} />
              )}
            </View>
          </View>

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
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
});
