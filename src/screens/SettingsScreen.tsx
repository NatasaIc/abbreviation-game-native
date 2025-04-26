import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TextInput, StyleSheet } from 'react-native';
import { Switch } from 'react-native-gesture-handler';
import { Picker } from '@react-native-picker/picker';
import { GlobalStyles } from '../constants/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'userSettings';

/**
 * SettingsScreen Component
 *
 * A screen that allows users to configure various app settings including:
 * - Sound effects toggle
 * - Vibration toggle
 * - Notification preferences
 * - Font size selection
 * - Username input
 *
 * Settings are persisted using AsyncStorage
 */
function SettingsScreen() {
  const navigation = useNavigation();

  // State to manage all settings with default values
  const [settings, setSettings] = useState({
    soundEffects: true,
    vibration: true,
    fontSize: 'Medium',
    notification: true,
    username: '',
  });

  // Load saved settings when component mounts
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const savedSettings = await AsyncStorage.getItem(STORAGE_KEY);
        console.log('Raw settings from AsyncStorage:', savedSettings);
        if (savedSettings) {
          const parsedSettings = JSON.parse(savedSettings);
          console.log('Parsed settings in GameScreen:', parsedSettings);
          setSettings(parsedSettings);
        }
      } catch (error) {
        console.log('Failed to load settings', error);
      }
    };
    loadSettings();
  }, []);

  // Save settings to AsyncStorage whenever they change
  const saveSettings = async (updatedSettings: typeof settings) => {
    try {
      console.log('Settings saved successfully:', updatedSettings);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedSettings));
      console.log('Settings saved successfully');
    } catch (error) {
      console.log('Faild to save settings', error);
    }
  };

  const updateSetting = (key: keyof typeof settings, value: any) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    saveSettings(newSettings);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Preferences Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>

          {/* Sound Effects Toggle */}
          <View style={styles.settingItem}>
            <Text style={styles.settingsLabel}>Sound Effects</Text>
            <Switch
              value={settings.soundEffects}
              onValueChange={value => updateSetting('soundEffects', value)}
              trackColor={{
                false: GlobalStyles.colors.primary50,
                true: GlobalStyles.colors.accent600,
              }}
            />
          </View>

          {/* Vibration Toggle */}
          <View style={styles.settingItem}>
            <Text style={styles.settingsLabel}>Vibration</Text>
            <Switch
              value={settings.vibration}
              onValueChange={value => updateSetting('vibration', value)}
              trackColor={{
                false: GlobalStyles.colors.primary50,
                true: GlobalStyles.colors.accent600,
              }}
            />
          </View>

          {/* Notification Toggle */}
          <View style={styles.settingItem}>
            <Text style={styles.settingsLabel}>Notification</Text>
            <Switch
              value={settings.notification}
              onValueChange={value => updateSetting('notification', value)}
              trackColor={{
                false: GlobalStyles.colors.primary50,
                true: GlobalStyles.colors.accent600,
              }}
            />
          </View>
        </View>

        {/* Appearance Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Appearance</Text>

          {/* Font Size Picker */}
          <View style={styles.settingItem}>
            <Text style={styles.settingsLabel}>Font Size</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={settings.fontSize}
                onValueChange={value => updateSetting('fontSize', value)}
                style={styles.picker}
              >
                <Picker.Item label="Small" value="Small" />
                <Picker.Item label="Medium" value="Medium" />
                <Picker.Item label="Large" value="Large" />
              </Picker>
            </View>
          </View>
        </View>

        {/* Profile Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Profile</Text>

          {/* Username Input */}
          <View style={styles.settingItem}>
            <Text style={styles.settingsLabel}>Username</Text>
            <TextInput
              style={styles.input}
              value={settings.username}
              onChangeText={text => updateSetting('username', text)}
              placeholder="Enter your username"
              placeholderTextColor={GlobalStyles.colors.gray300}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Styles for the SettingsScreen component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary500,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    marginHorizontal: 16,
    marginVertical: 5,
    backgroundColor: GlobalStyles.colors.primary400,
    borderRadius: 16,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
    color: GlobalStyles.colors.text500,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: GlobalStyles.colors.gray200,
  },
  settingsLabel: {
    fontSize: 16,
    color: GlobalStyles.colors.text500,
  },
  pickerContainer: {
    width: 150,
    backgroundColor: GlobalStyles.colors.gray200,
    borderRadius: 8,
  },
  picker: {
    color: GlobalStyles.colors.text500,
  },
  input: {
    backgroundColor: GlobalStyles.colors.primary400,
    padding: 12,
    borderRadius: 8,
    color: GlobalStyles.colors.text500,
    width: 200,
  },
});

export default SettingsScreen;
