import { StyleSheet, View, Platform, KeyboardAvoidingView } from "react-native";
import SplashScreen from "../../components/Screens/Intro/SplashScreen";
import InfoScreen from "../../components/Screens/Intro/InfoScreen";
import SplashSceenSignup from "../../components/Screens/Intro/SplashSceenSignup";
import Signup from "../../components/Screens/Authentication/Signup";
import Login from "../../components/Screens/Authentication/Login";
import AdminMenu from "../../components/Screens/Admin/AdminMenu";
import AdminHome from "../../components/Screens/Admin/AdminHome";
import AddHelplineNumber from "../../components/Screens/Admin/AddHelplineNumber";
import ManageHelplineNumbers from "../../components/Screens/Admin/ManageHelplineNumbers";
import AdminProfile from "../../components/Screens/Admin/AdminProfile";
import AddArticle from "../../components/Screens/Admin/AddArticle";
import ManageArticle from "../../components/Screens/Admin/ManageArticle";
import StudentMenu from "../../components/Screens/Students/StudentMenu";
import ViewEmergencyContact from "../../components/Screens/Students/ViewEmergencyContact";
import ViewHelplineNumbers from "../../components/Screens/Students/ViewHelplineNumbers";
import StudentAddPost from "../../components/Screens/Students/StudentAddPost";
import IncidentAdd from "../../components/Screens/Students/IncidentAdd";
import ViewIncidents from "../../components/Screens/Admin/ViewIncidents";
import ViewHelpInfo from "../../components/Screens/Admin/ViewHelpInfo";
import StudentViewPost from "../../components/Screens/Students/StudentViewPost";
import StudentProfile from "../../components/Screens/Students/StudentProfile";
import StudentHome from "../../components/Screens/Students/StudentHome";
import StudentAddEmergencyContact from "../../components/Screens/Students/StudentAddEmergencyContact";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export default function HomeScreen() {
  const Stack = createNativeStackNavigator();

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.Container}
      >
        <Stack.Navigator screenOptions={{ headerShown: false }}>

  

                      {/* Authentication */}
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />

                      {/* info screen */}

                      {/* <Stack.Screen name="SplashScreen" component={SplashScreen} /> */}
        <Stack.Screen name="InfoScreen" component={InfoScreen} />
        <Stack.Screen name="SplashSceenSignup"component={SplashSceenSignup}/>
      
         
          {/* Admin Navigation */}
     

          <Stack.Screen name="AdminHome" component={AdminHome} />
          <Stack.Screen name="AdminMenu" component={AdminMenu} />
          <Stack.Screen name="AdminProfile" component={AdminProfile} />
          <Stack.Screen name="AddArticle" component={AddArticle} />
          <Stack.Screen name="ManageArticle" component={ManageArticle} />
          <Stack.Screen name="AddHelplineNumber" component={AddHelplineNumber} />
          <Stack.Screen name="ManageHelplineNumbers" component={ManageHelplineNumbers} />
          <Stack.Screen name="ViewIncidents" component={ViewIncidents} />
          <Stack.Screen name="ViewHelpInfo" component={ViewHelpInfo} />
     

          {/* Student Navigations  */}
          <Stack.Screen name="StudentHome" component={StudentHome} />
          <Stack.Screen name="StudentMenu" component={StudentMenu} />
          <Stack.Screen name="StudentProfile" component={StudentProfile} />
          <Stack.Screen name="StudentAddPost" component={StudentAddPost} />
          <Stack.Screen name="StudentViewPost" component={StudentViewPost} />
          <Stack.Screen name="StudentAddEmergencyContact" component={StudentAddEmergencyContact}/>
          <Stack.Screen name="ViewEmergencyContact" component={ViewEmergencyContact} />
          <Stack.Screen name="IncidentAdd" component={IncidentAdd} />
          <Stack.Screen name="ViewHelplineNumbers" component={ViewHelplineNumbers} />
      
        </Stack.Navigator>
      </KeyboardAvoidingView>
    </>
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
});
