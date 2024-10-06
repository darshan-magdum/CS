import { StyleSheet, View, Platform, KeyboardAvoidingView, ActivityIndicator } from "react-native";
import InfoScreen from "../../components/Screens/Intro/InfoScreen";
import SplashSceenSignup from "../../components/Screens/Intro/SplashSceenSignup";
import SplashScreen from "../../components/Screens/Intro/SplashScreen";
import Signup from "../../components/Screens/Authentication/Signup";
import Login from "../../components/Screens/Authentication/Login";
import AdminMenu from "../../components/Screens/Admin/AdminMenu";
import AdminHome from "../../components/Screens/Admin/AdminHome";
import AddHelplineNumber from "../../components/Screens/Admin/AddHelplineNumber";
import ManageHelplineNumbers from "../../components/Screens/Admin/ManageHelplineNumbers";
import AdminProfile from "../../components/Screens/Admin/AdminProfile";
import ViewSafetyDetails from "../../components/Screens/Admin/ViewSafetyDetails";
import AddArticle from "../../components/Screens/Admin/AddArticle";
import ManageArticle from "../../components/Screens/Admin/ManageArticle";
import StudentMenu from "../../components/Screens/Students/StudentMenu";
import ViewEmergencyContact from "../../components/Screens/Students/ViewEmergencyContact";
import ViewHelplineNumbers from "../../components/Screens/Students/ViewHelplineNumbers";
import StudentAddPost from "../../components/Screens/Students/StudentAddPost";
import IncidentAdd from "../../components/Screens/Students/IncidentAdd";
import ViewIncidents from "../../components/Screens/Admin/ViewIncidents";
import StudentViewPost from "../../components/Screens/Students/StudentViewPost";
import StudentProfile from "../../components/Screens/Students/StudentProfile";
import StudentHome from "../../components/Screens/Students/StudentHome";
import SafetyAlert from "../../components/Screens/Students/SafetyAlert";
import StudentAddEmergencyContact from "../../components/Screens/Students/StudentAddEmergencyContact";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen() {
  const Stack = createNativeStackNavigator();
  const [isLoading, setIsLoading] = useState(true);
  const [userType, setUserType] = useState<'student' | 'admin' | null>(null); // Updated type definition

  console.log("userType",userType)
  const checkAuthStatus = async () => {
    try {
      const studentToken = await AsyncStorage.getItem('token');
      const adminToken = await AsyncStorage.getItem('adminToken');

      if (studentToken) {
        setUserType('student');
      } else if (adminToken) {
        setUserType('admin');
      } else {
        setUserType(null);
      }
    } catch (error) {
      console.error('Error checking authentication status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);


  


  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF8613" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.Container}
    >
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {userType === 'student' ? (
          <>
            <Stack.Screen name="StudentHome" component={StudentHome} />
            <Stack.Screen name="StudentMenu">
  {(props) => <StudentMenu {...props} setUserType={setUserType} />}
</Stack.Screen> 
            <Stack.Screen name="StudentProfile" component={StudentProfile} />
            <Stack.Screen name="SafetyAlert" component={SafetyAlert} />
            <Stack.Screen name="StudentAddPost" component={StudentAddPost} />
            <Stack.Screen name="StudentViewPost" component={StudentViewPost} />
            <Stack.Screen name="StudentAddEmergencyContact" component={StudentAddEmergencyContact} />
            <Stack.Screen name="ViewEmergencyContact" component={ViewEmergencyContact} />
            <Stack.Screen name="IncidentAdd" component={IncidentAdd} />
            <Stack.Screen name="ViewHelplineNumbers" component={ViewHelplineNumbers} />
          </>
        ) : userType === 'admin' ? (
          <>
          <Stack.Screen name="AdminMenu">
  {(props) => <AdminMenu {...props} setUserType={setUserType} />}
</Stack.Screen>          
         
            <Stack.Screen name="AdminProfile" component={AdminProfile} />
            <Stack.Screen name="ViewSafetyDetails" component={ViewSafetyDetails} />
            <Stack.Screen name="AddArticle" component={AddArticle} />
            <Stack.Screen name="ManageArticle" component={ManageArticle} />
            <Stack.Screen name="AddHelplineNumber" component={AddHelplineNumber} />
            <Stack.Screen name="ManageHelplineNumbers" component={ManageHelplineNumbers} />
            <Stack.Screen name="ViewIncidents" component={ViewIncidents} />
          </>
        ) : (
          <>
        
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
    
            <Stack.Screen name="Login">
              {(props) => <Login {...props} setUserType={setUserType} />}
            </Stack.Screen>
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="SplashSceenSignup" component={SplashSceenSignup} />
          </>
        )}
        
        
      </Stack.Navigator>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  Container: {
    padding: 0,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    paddingTop: Platform.OS === "ios" ? 50 : 38,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
});
