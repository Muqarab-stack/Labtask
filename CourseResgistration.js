import React, { useState, useEffect } from 'react';
import { View, Button, Alert, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNPickerSelect from 'react-native-picker-select';

const CourseRegistrationScreen = ({ route }) => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const availableCourses = [
          { label: 'Math', value: 'MATH101' },
          { label: 'Science', value: 'SCI201' },
          { label: 'History', value: 'HIST301' },
 
        ];

        setCourses(availableCourses);
      } catch (error) {
        console.error('Course fetch error:', error);
        Alert.alert('An error occurred while fetching courses');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleCourseRegistration = async () => {
    try {
      if (!selectedCourse) {
        Alert.alert('Please select a course');
        return;
      }

      setLoading(true);

      const registrationNumber = route.params.registrationNumber;
      const key = `@courses_${registrationNumber}`;
      const existingCourses = JSON.parse(
        (await AsyncStorage.getItem(key)) || '[]'
      );

      const newCourse = {
        courseId: selectedCourse.value,
        courseTitle: selectedCourse.label,
      };
      existingCourses.push(newCourse);

      await AsyncStorage.setItem(key, JSON.stringify(existingCourses));

      Alert.alert('Course registration successful');
    } catch (error) {
      console.error('Course registration error:', error);
      Alert.alert('An error occurred during course registration');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
      <RNPickerSelect
        placeholder={{ label: 'Select a course', value: null }}
        items={courses}
        onValueChange={(value) => setSelectedCourse(value)}
        value={selectedCourse}
      />

      <Button
        title="Register Course"
        onPress={handleCourseRegistration}
        disabled={loading}
      />

      {loading && <ActivityIndicator size="small" color="#0000ff" />}
    </View>
  );
};

export default CourseRegistrationScreen;
