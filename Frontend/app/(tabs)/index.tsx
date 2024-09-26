import { StyleSheet, View, Platform, KeyboardAvoidingView } from "react-native";
import SplashScreen from "../../components/Screens/Intro/SplashScreen";
import InfoScreen from "../../components/Screens/Intro/InfoScreen";
import SplashSceenSignup from "../../components/Screens/Intro/SplashSceenSignup";
import Signup from "../../components/Screens/Authentication/Signup";
import Login from "../../components/Screens/Authentication/Login";
import AdminMenu from "../../components/Screens/Admin/AdminMenu";
import StudentMenu from "../../components/Screens/Students/StudentMenu";
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

        <Stack.Screen name="AdminMenu" component={AdminMenu} />
        <Stack.Screen name="StudentMenu" component={StudentMenu} />
       
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
