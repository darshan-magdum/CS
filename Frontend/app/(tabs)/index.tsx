import { StyleSheet, View, Platform, KeyboardAvoidingView } from "react-native";
import SplashScreen from "../../components/Screens/Intro/SplashScreen";
import InfoScreen from "../../components/Screens/Intro/InfoScreen";
import SplashSceenSignup from "../../components/Screens/Intro/SplashSceenSignup";
import Signup from "../../components/Screens/Authentication/Signup";
import Login from "../../components/Screens/Authentication/Login";
import AdminMenu from "../../components/Screens/Admin/AdminMenu";
import StudentMenu from "../../components/Screens/Students/StudentMenu";
import ViewEmergencyContact from "../../components/Screens/Students/ViewEmergencyContact";
import ViewHelplineNumbers from "../../components/Screens/Students/ViewHelplineNumbers";
import StudentAddPost from "../../components/Screens/Students/StudentAddPost";
import StudentViewPost from "../../components/Screens/Students/StudentViewPost";
import StudentProfile from "../../components/Screens/Students/StudentProfile";
import StudentHome from "../../components/Screens/Students/StudentHome";
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
        


        <Stack.Screen name="ViewEmergencyContact" component={ViewEmergencyContact} />        
        <Stack.Screen name="ViewHelplineNumbers" component={ViewHelplineNumbers} />

        <Stack.Screen name="StudentMenu" component={StudentMenu} />
   

          <Stack.Screen name="StudentViewPost" component={StudentViewPost} />

          <Stack.Screen name="StudentAddPost" component={StudentAddPost} />

          <Stack.Screen name="StudentProfile" component={StudentProfile} />

          <Stack.Screen name="StudentHome" component={StudentHome} />
          <Stack.Screen name="AdminMenu" component={AdminMenu} />

          <Stack.Screen name="InfoScreen" component={InfoScreen} />
          <Stack.Screen
            name="SplashSceenSignup"
            component={SplashSceenSignup}
          />
          <Stack.Screen name="SplashScreen" component={SplashScreen} />

          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
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
