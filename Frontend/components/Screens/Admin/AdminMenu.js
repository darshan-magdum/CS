import React, { useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Switch,
  Image,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import FeatherIcon from "react-native-vector-icons/Feather";
import profile from "../../../assets/images/collgelogo.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions } from '@react-navigation/native'; 


export default function AdminMenu({ setUserType }) {
  const navigation = useNavigation();



  const handleLogout = async () => {
    try {
      await AsyncStorage.clear(); // Clear AsyncStorage
      console.warn("Logged out and clearing AsyncStorage.");
      setUserType(null); // Reset user type
      navigation.replace("Login"); // Navigate to the login screen
    } catch (error) {
      console.error("Error clearing AsyncStorage:", error);
      Alert.alert("Logout Failed", "Please try again.");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.container}>
        <View style={styles.profile}>
          <TouchableOpacity onPress={() => navigation.navigate("AdminHome")}>
            <View style={styles.profileAvatarWrapper}>
              <Image alt="" source={profile} style={styles.profileAvatar} />

              {/* <TouchableOpacity
                onPress={() => navigation.navigate("EditAdminProfile")}
              >
                <View style={styles.profileAction}>
                  <FeatherIcon color="#fff" name="edit-3" size={15} />
                </View>
              </TouchableOpacity> */}
            </View>
          </TouchableOpacity>

          <View>
      
              <Text style={styles.profileName}>
             DR JJMCOE
              </Text>
          

            <Text style={styles.profileAddress}>
             Jaysingpur
            </Text>
          </View>
        </View>

        <ScrollView>
          <View style={styles.section}>
            {/* Home */}
            <TouchableOpacity
              onPress={() => navigation.navigate("AdminHome")}
              style={styles.row}
            >
              <View style={[styles.rowIcon, { backgroundColor: "#007afe" }]}>
                <FeatherIcon color="#fff" name="home" size={20} />
              </View>
              <Text style={styles.rowLabel}>Home</Text>
              <View style={styles.rowSpacer} />
              <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
            </TouchableOpacity>

            {/* Your Profile */}
            <TouchableOpacity
              onPress={() => navigation.navigate("AdminProfile")}
              style={styles.row}
            >
              <View style={[styles.rowIcon, { backgroundColor: "#32c759" }]}>
                <FeatherIcon color="#fff" name="user" size={20} />
              </View>
              <Text style={styles.rowLabel}>Your Profile</Text>
              <View style={styles.rowSpacer} />
              <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
            </TouchableOpacity>


 {/* View Safety Alerts */}
 <TouchableOpacity
              onPress={() => navigation.navigate("ViewSafetyDetails")}
              style={styles.row}
            >
              <View style={[styles.rowIcon, { backgroundColor: "orange" }]}>
                <FeatherIcon color="#fff" name="alert-circle" size={20} />
              </View>
              <Text style={styles.rowLabel}>View Safety Alerts</Text>
              <View style={styles.rowSpacer} />
              <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
            </TouchableOpacity>


     {/* Add Article */}
            <TouchableOpacity
              onPress={() => navigation.navigate("AddArticle")}
              style={styles.row}
            >
              <View style={[styles.rowIcon, { backgroundColor: "#fe9400" }]}>
                <FeatherIcon color="#fff" name="file-text" size={20} />
              </View>
              <Text style={styles.rowLabel}>Add New Article</Text>
              <View style={styles.rowSpacer} />
              <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
            </TouchableOpacity>


     {/* Manage Article */}
            <TouchableOpacity
              onPress={() => navigation.navigate("ManageArticle")}
              style={styles.row}
            >
              <View style={[styles.rowIcon, { backgroundColor: "tomato" }]}>
                <FeatherIcon color="#fff" name="eye" size={20} />
              </View>
              <Text style={styles.rowLabel}>Manage Article</Text>
              <View style={styles.rowSpacer} />
              <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
            </TouchableOpacity>

            {/* Add Helpline Contacts */}
            <TouchableOpacity
              onPress={() => navigation.navigate("AddHelplineNumber")}
              style={styles.row}
            >
              <View style={[styles.rowIcon, { backgroundColor: "purple" }]}>
                <FeatherIcon color="#fff" name="phone" size={20} />
              </View>
              <Text style={styles.rowLabel}>Add Helpline Numbers</Text>
              <View style={styles.rowSpacer} />
              <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
            </TouchableOpacity>

            {/* Add Emergency Contacts */}
            <TouchableOpacity
              onPress={() => navigation.navigate("ManageHelplineNumbers")}
              style={styles.row}
            >
              <View style={[styles.rowIcon, { backgroundColor: "blue" }]}>
                <FeatherIcon color="#fff" name="phone" size={20} />
              </View>
              <Text style={styles.rowLabel}>Manage Helpline Numbers</Text>
              <View style={styles.rowSpacer} />
              <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
            </TouchableOpacity>

            {/* View Incidents */}
            <TouchableOpacity
              onPress={() => navigation.navigate("ViewIncidents")}
              style={styles.row}
            >
              <View style={[styles.rowIcon, { backgroundColor: "red" }]}>
                <FeatherIcon color="#fff" name="eye" size={20} />
              </View>
              <Text style={styles.rowLabel}>View Incidents</Text>
              <View style={styles.rowSpacer} />
              <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
            </TouchableOpacity>

        

   {/* Logout */}
            <TouchableOpacity onPress={handleLogout} style={styles.row}>
              <View style={[styles.rowIcon, { backgroundColor: "#8e8d91" }]}>
                <FeatherIcon color="#fff" name="log-out" size={20} />
              </View>

              <Text style={styles.rowLabel}>Logout</Text>

              <View style={styles.rowSpacer} />

              <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 0,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  /** Profile */
  profile: {
    padding: 24,
    backgroundColor: "#fff",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  profileAvatarWrapper: {
    position: "relative",
  },
  profileAvatar: {
    width: 48,
    height: 80,
    borderRadius: 9999,
  },
  profileAction: {
    position: "absolute",
    right: -4,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    width: 28,
    height: 28,
    borderRadius: 9999,
    backgroundColor: "#007bff",
  },
  profileName: {
    marginTop: 20,
    fontSize: 19,
    fontWeight: "600",
    color: "#414d63",
    textAlign: "center",
  },
  profileAddress: {
    marginTop: 5,
    fontSize: 16,
    color: '#989898',
    textAlign: 'center',
  },
  /** Section */
  section: {
    paddingHorizontal: 24,
  },
  /** Row */
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    height: 50,
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
    marginBottom: 12,
    paddingHorizontal: 12,
  },
  rowIcon: {
    width: 32,
    height: 32,
    borderRadius: 9999,
    marginRight: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  rowLabel: {
    fontSize: 17,
    fontWeight: "400",
    color: "#0c0c0c",
  },
  rowSpacer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
});
