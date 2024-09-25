import React, { useEffect, useRef } from 'react';
import { View, Image, Text, StyleSheet, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import logo from '../../../assets/images/logo.png';

const SplashScreen = () => {
  const navigation = useNavigation();
  const fadeInDuration = 1000; 
  const fadeOutDuration = 1000; 

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
   
    const animateSplash = () => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: fadeInDuration,
        useNativeDriver: true,
      }).start(() => {
        setTimeout(() => {
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: fadeOutDuration,
            useNativeDriver: true,
          }).start(() => {
            navigation.navigate('InfoScreen'); 
          });
        }, 2000);
      });
    };

    animateSplash(); 

    return () => {
      fadeAnim.setValue(0); 
    };
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Image
        alt="App Logo"
        resizeMode="contain"
        style={styles.logo}
        source={logo}
      />
      <Text style={styles.description}>
        Empower Your College Experience: Safety at your Fingertips.
      </Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  logo: {
    width: 250,
    height: 250,
    marginBottom: 10,
  },
  description: {
    fontSize: 19,
    textAlign: 'center',
    paddingHorizontal: 10,
    fontWeight: '500',
    color: '#FF8613',
  },
});

export default SplashScreen;
