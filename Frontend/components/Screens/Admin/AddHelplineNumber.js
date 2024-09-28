import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import axios from 'axios';

export default function AddHelplineNumber({ navigation }) {
    const [form, setForm] = useState({
        name: '',
        contactNo: '',
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({ name: '', contactNo: '' });

    const handleChangeName = (name) => {
        setForm({ ...form, name });
        setErrors({ ...errors, name: '' }); // Clear error on change
    };

    const handleChangeContactNumber = (contactNo) => {
        setForm({ ...form, contactNo });
        setErrors({ ...errors, contactNo: '' }); // Clear error on change
    };

    const handleSubmit = async () => {
        const phoneRegex = /^\+?\d{10,15}$/;
        let hasError = false;

        if (!form.name) {
            setErrors(prev => ({ ...prev, name: 'Name is required.' }));
            hasError = true;
        }

        if (!form.contactNo || !phoneRegex.test(form.contactNo)) {
            setErrors(prev => ({ ...prev, contactNo: 'Please enter a valid contact number.' }));
            hasError = true;
        }

        if (hasError) return; // Stop if there are validation errors

        setLoading(true);
        try {
            const response = await axios.post('http://localhost:3000/api/HelplineNumbers/addnewNumber', form);
            Alert.alert('Success', 'Helpline number added successfully', [
                { text: 'OK', onPress: () => navigation.goBack() }
            ]);
            setForm({ name: '', contactNo: '' }); // Reset form
        } catch (error) {
            if (error.response && error.response.data) {
                Alert.alert('Error', error.response.data.message);
            } else {
                Alert.alert('Error', 'Network error. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <FeatherIcon name="chevron-left" size={24} color="#333" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Add Helpline Number</Text>
                </View>

                <View style={styles.sectionContainer}>
                    <View style={styles.formContainer}>
                        <View style={styles.inputContainer}>
                            <Text style={styles.inputLabel}>Name</Text>
                            <TextInput
                                style={styles.textInput}
                                value={form.name}
                                onChangeText={handleChangeName}
                                placeholder="Enter name"
                                placeholderTextColor="#999"
                            />
                            {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null} {/* Error Message */}
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.inputLabel}>Contact Number</Text>
                            <TextInput
                                style={styles.textInput}
                                value={form.contactNo}
                                onChangeText={handleChangeContactNumber}
                                keyboardType="phone-pad"
                                placeholder="Enter contact number"
                                placeholderTextColor="#999"
                            />
                            {errors.contactNo ? <Text style={styles.errorText}>{errors.contactNo}</Text> : null} {/* Error Message */}
                        </View>
                    </View>
                </View>

                {loading ? (
                    <ActivityIndicator size="large" color="#FF8613" />
                ) : (
                    <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                        <Text style={styles.submitButtonText}>Submit</Text>
                    </TouchableOpacity>
                )}
            </View>
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
    textInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 8,
        fontSize: 16,
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
    errorText: {
        color: 'red',
        marginTop: 4,
        fontSize: 14,
    },
});
