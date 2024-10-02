import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const StudentHome = () => {
  const navigation = useNavigation();
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/UploadPosts/getallpost');
        const data = await response.json();

        if (Array.isArray(data)) {
          const formattedPosts = data.map(post => ({
            id: post._id,
            name: post.studentName,
            date: new Date(post.createdAt).toLocaleDateString(),
            image: `http://localhost:3000/${post.postImage.replace(/\\/g, '/')}`, // Normalize the image path
            description: post.description,
          }));
          setUserPosts(formattedPosts);
        } else {
          console.warn('Expected an array, but got:', data);
          setUserPosts([]);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
        Alert.alert('Error', 'Failed to load posts. Please try again.');
      }
    };

    fetchPosts();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Campus Shield</Text>
        <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate('StudentMenu')}>
          <Ionicons name="menu" size={24} color="#FF8613" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.safetyButton}>
        <Ionicons name="shield" size={24} color="white" style={styles.safetyIcon} />
        <Text style={styles.safetyButtonText}>Women's Safety Alert</Text>
      </TouchableOpacity>
      <View style={styles.postsContainer}>
        {userPosts.length === 0 ? (
          <Text style={styles.noPostsText}>No posts available</Text>
        ) : (
          userPosts.map((post) => (
            <View key={post.id} style={styles.post}>
              <View style={styles.postHeader}>
                <Text style={styles.posterName}>{post.name}</Text>
                <Text style={styles.postDate}>{post.date}</Text>
              </View>
              {post.image && (
                <Image
                  source={{ uri: post.image }}
                  style={styles.postImage}
                  onError={() => console.log('Failed to load image')}
                />
              )}
              <Text style={styles.postDescription}>{post.description}</Text>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eaeaea',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FF8613',
  },
  headerText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  menuButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  safetyButton: {
    margin: 16,
    padding: 20,
    backgroundColor: '#d5006d', // Dark pink
    borderRadius: 25,
    alignItems: 'center',
    flexDirection: 'row', // Align icon and text horizontally
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  safetyIcon: {
    marginRight: 10, // Space between icon and text
  },
  safetyButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  postsContainer: {
    padding: 16,
  },
  post: {
    marginBottom: 16,
    backgroundColor: '#ffffff',
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
  postImage: {
    width: '100%',
    height: 340,
    marginTop: 10,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  postDescription: {
    padding: 10,
    fontSize: 15,
    color: '#444444',
  },
  noPostsText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
    color: '#888888',
  },
});

export default StudentHome;
