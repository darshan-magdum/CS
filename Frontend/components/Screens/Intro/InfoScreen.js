import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const InfoScreen = () => {
  const navigation = useNavigation();
  const [currentInfoIndex, setCurrentInfoIndex] = useState(0);

  const infoItems = [
    {
      title: "Emergency SOS",
      description: "Quickly alert your emergency contacts with a single button."
    },
    {
      "title": "Police Contacts",
      "description": "Stay informed with updates and helpline numbers for all nearby police stations. Access critical information quickly when you need it most."
    },
    {
      "title": "Post Information",
      "description": "Students can share articles and updates, just like on social media."
    },
    {
      title: "Safety Tips",
      description: "Access helpful tips and resources tailored for your safety."
    }
  ];
  

  const handleNext = () => {
    if (currentInfoIndex < infoItems.length - 1) {
      setCurrentInfoIndex(currentInfoIndex + 1);
    } else {
      navigation.navigate('SplashSceenSignup'); 
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Campus Sheild</Text>
      
      <View style={styles.infoContainer}>
        <Text style={styles.infoItem}>
          <Text style={styles.bold}>{infoItems[currentInfoIndex].title}:</Text> {infoItems[currentInfoIndex].description}
        </Text>
      </View>

      <TouchableOpacity 
      style={styles.buttonstyles}
  onPress={handleNext} 
>
  <Text style={{ color: '#fff', fontSize: 18, textAlign: 'center' }}>Next</Text>
</TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  buttonstyles:{
    backgroundColor: '#FF8613', 
    paddingVertical: 12, 
    paddingHorizontal: 22, 
    borderRadius: 10 

  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#FF8613',
  },
  infoContainer: {
    backgroundColor: 'transparent', 
    padding: 20,
    width: '100%',
    marginBottom: 20,
  },  
  infoItem: {
    fontSize: 18,
    textAlign: 'left',
    lineHeight: 24,
    color: '#333',
  },
  bold: {
    fontWeight: 'bold',
    color: '#FF8613',
  },
});

export default InfoScreen;
