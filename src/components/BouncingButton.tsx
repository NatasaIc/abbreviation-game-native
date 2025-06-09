import { useEffect, useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text } from 'react-native';

const BouncingButton = ({
  onPress,
  children,
}: {
  onPress: () => void;
  children: React.ReactNode;
}) => {
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(translateY, {
          toValue: -10,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <Animated.View style={[styles.button, { transform: [{ translateY }] }]}>
      <Pressable style={styles.button} onPress={onPress}>
        <Text style={styles.text}>{children}</Text>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FFD700',
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 16,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#333',
    textAlign: 'center',
  },
});

export default BouncingButton;
