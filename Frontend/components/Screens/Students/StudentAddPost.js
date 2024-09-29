import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, View, Text, TextInput, TouchableOpacity, Modal, FlatList } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { launchImageLibrary } from 'react-native-image-picker';

export default function StudentAddPost({ navigation }) {
  const [form, setForm] = useState({ description: '' });
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMediaType, setSelectedMediaType] = useState('');
  const [photo, setPhoto] = useState(null);
  const [video, setVideo] = useState(null);

  const handleChangeDescription = (description) => {
    setForm({ ...form, description });
  };

  const handleSubmit = () => {
    console.log('Post submitted:', form.description, selectedMediaType, photo, video);
    alert('Post submitted successfully');
    setForm({ description: '' });
    setSelectedMediaType('');
    setPhoto(null);
    setVideo(null);
  };

  const handleUploadPhoto = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (!response.didCancel && !response.error) {
        setPhoto(response.assets[0]);
        alert('Photo uploaded successfully');
      }
    });
  };

  const handleUploadVideo = () => {
    launchImageLibrary({ mediaType: 'video' }, (response) => {
      if (!response.didCancel && !response.error) {
        setVideo(response.assets[0]);
        alert('Video uploaded successfully');
      }
    });
  };

  const renderPickerItem = ({ item }) => (
    <TouchableOpacity style={styles.pickerItem} onPress={() => { setSelectedMediaType(item); setModalVisible(false); }}>
      <Text style={styles.pickerItemText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <FeatherIcon name="chevron-left" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Add Post</Text>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Create a New Post</Text>

          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Media Type</Text>
              <TouchableOpacity style={styles.picker} onPress={() => setModalVisible(true)}>
                <Text style={styles.pickerText}>{selectedMediaType || 'Please select Media Type'}</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Description</Text>
              <TextInput
                style={styles.textArea}
                value={form.description}
                onChangeText={handleChangeDescription}
                multiline
                placeholder="Enter your description here"
                placeholderTextColor="#999"
              />
            </View>

            {selectedMediaType === 'Photo' && (
              <TouchableOpacity style={styles.uploadButton} onPress={handleUploadPhoto}>
                <Text style={styles.uploadButtonText}>Upload Photo</Text>
              </TouchableOpacity>
            )}

            {selectedMediaType === 'Video' && (
              <TouchableOpacity style={styles.uploadButton} onPress={handleUploadVideo}>
                <Text style={styles.uploadButtonText}>Pick Video</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Media Type</Text>
            <FlatList
              data={['Photo', 'Video']}
              renderItem={renderPickerItem}
              keyExtractor={(item) => item}
            />
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
    marginBottom: 25,
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
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  pickerText: {
    fontSize: 16,
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
  pickerItem: {
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  pickerItemText: {
    fontSize: 16,
    color: '#333',
  },
  closeButton: {
    marginTop: 24,
    backgroundColor: '#007bff',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  uploadButton: {
    marginTop: 12,
    backgroundColor: '#007bff',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
