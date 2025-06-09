import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TextInput, StyleSheet } from 'react-native';
import { Switch } from 'react-native-gesture-handler';

import { GlobalStyles } from '../constants/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'userSettings';

/**
 * SettingsScreen Component
 *
 * A screen that allows users to configure app settings:
 * - Sound effects toggle
 * - Vibration toggle
 * Settings are persisted using AsyncStorage
 */
function SettingsScreen() {
  const navigation = useNavigation();

  // State to manage all settings with default values
  const [settings, setSettings] = useState({
    soundEffects: true,
    vibration: true,
  });

  // Load saved settings when component mounts
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const savedSettings = await AsyncStorage.getItem('userSettings');
        if (savedSettings) {
          const parsedSettings = JSON.parse(savedSettings);
          setSettings(parsedSettings);
        }
      } catch (error) {}
    };
    loadSettings();
  }, []);

  // Save settings to AsyncStorage whenever they change
  const saveSettings = async (updatedSettings: typeof settings) => {
    try {
      await AsyncStorage.setItem('userSettings', JSON.stringify(updatedSettings));
      setSettings(updatedSettings);
    } catch (error) {}
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
              onValueChange={(value: boolean) => updateSetting('soundEffects', value)}
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
              onValueChange={(value: boolean) => updateSetting('vibration', value)}
              trackColor={{
                false: GlobalStyles.colors.primary50,
                true: GlobalStyles.colors.accent600,
              }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

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
    marginVertical: 16,
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
});

export default SettingsScreen;
