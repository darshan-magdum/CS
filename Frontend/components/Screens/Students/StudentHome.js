import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const StudentHome = () => {
  const navigation = useNavigation();
  const [userPosts, setUserPosts] = useState([]);
  const [adminPosts, setAdminPosts] = useState([]);
  const [isStudentView, setIsStudentView] = useState(true); // Track the selected view

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
      }
    };

    const fetchAdminPosts = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/Article/getallarticles');
        const data = await response.json();

        if (Array.isArray(data)) {
          const formattedAdminPosts = data.map(article => ({
            id: article._id,
            title: article.title, // Assuming the articles have a title field
            image: `http://localhost:3000/${article.image.replace(/\\/g, '/')}`, // Adjust based on your API response
            description: article.description,
          }));
          setAdminPosts(formattedAdminPosts);
        } else {
          console.warn('Expected an array, but got:', data);
          setAdminPosts([]);
        }
      } catch (error) {
        console.error('Error fetching admin posts:', error);
      }
    };

    fetchPosts();
    fetchAdminPosts();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Campus Shield</Text>
        <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate('StudentMenu')}>
          <Ionicons name="menu" size={24} color="#FF8613" />
        </TouchableOpacity>
      </View>

      <View style={styles.selectionContainer}>
        <TouchableOpacity
          style={[styles.selectionButton, isStudentView && styles.selectedButton]}
          onPress={() => setIsStudentView(true)}
        >
          <Text style={styles.buttonText}>Student</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.selectionButton, !isStudentView && styles.selectedButton]}
          onPress={() => setIsStudentView(false)}
        >
          <Text style={styles.buttonText}>Admin</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>{isStudentView ? 'Student Posts' : 'Admin Articles'}</Text>
      <View style={styles.postsContainer}>
        {(isStudentView ? userPosts : adminPosts).length === 0 ? (
          <Text style={styles.noPostsText}>No {isStudentView ? 'student' : 'admin'} posts available</Text>
        ) : (
          (isStudentView ? userPosts : adminPosts).map((post) => (
            <View key={post.id} style={styles.post}>
              <View style={styles.postHeader}>
                <Text style={styles.posterName}>{isStudentView ? post.name : post.title}</Text>
                {isStudentView && <Text style={styles.postDate}>{post.date}</Text>} {/* Show date only for student posts */}
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
    padding: 8,
    backgroundColor: '#FF8613',
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  menuButton: {
    width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 16,
  },
  selectionButton: {
    flex: 1,
    padding: 10,
    borderRadius: 15,
    backgroundColor: '#007BFF', // Blue background
    marginHorizontal: 5,
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: '#0056b3', // Darker blue when selected
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 10,
    paddingHorizontal: 16,
    color: '#333',
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
