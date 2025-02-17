import React, { useCallback, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions, ImageBackground, StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import { Link } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const ONBOARDING_DATA = [
  {
    title: "Bienvenue sur CryptoApp",
    description: "Suivez l'évolution des cryptomonnaies en temps réel",
    image: require('../../assets/onboarding/onboarding1.png'),
  },
  {
    title: "Gérez votre Portfolio",
    description: "Visualisez vos investissements en un coup d'œil ",
    image: require('../../assets/onboarding/onboarding2.png'),
  },
  {
    title: "Restez Informé",
    description: "Recevez les dernières actualités crypto",
    image: require('../../assets/onboarding/onboarding3.png'),
  },
];

export default function Onboarding() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef(null);

  const handleNext = useCallback(() => {
    if (activeIndex < ONBOARDING_DATA.length - 1) {
      scrollViewRef.current?.scrollTo({
        x: SCREEN_WIDTH * (activeIndex + 1),
        animated: true,
      });
      setActiveIndex(activeIndex + 1);
    }
  }, [activeIndex]);

  const handleSkip = useCallback(() => {
    scrollViewRef.current?.scrollTo({
      x: SCREEN_WIDTH * (ONBOARDING_DATA.length - 1),
      animated: true,
    });
    setActiveIndex(ONBOARDING_DATA.length - 1);
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['left', 'right']}>
        <Link href="/(tabs)" asChild>
          <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
            <Text style={styles.skip}>Skip</Text>
          </TouchableOpacity>
        </Link>
        <Animated.ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={e => {
            const newIndex = Math.round(e.nativeEvent.contentOffset.x / SCREEN_WIDTH);
            if (newIndex !== activeIndex) setActiveIndex(newIndex);
          }}
          scrollEventThrottle={16}>
          {ONBOARDING_DATA.map((item, index) => (
            <ImageBackground
              key={index}
              source={item.image}
              style={styles.image}
              resizeMode="cover"
            >
              <View style={styles.overlay}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
              </View>
            </ImageBackground>
          ))}
        </Animated.ScrollView>

        <View style={styles.footer}>
          <View style={styles.indicators}>
            {ONBOARDING_DATA.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.indicator,
                  index === activeIndex ? styles.activeIndicator : styles.inactiveIndicator,
                ]}
              />
            ))}
          </View>
          {activeIndex === ONBOARDING_DATA.length - 1 ? (
            <Link href="/(tabs)" asChild>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Commencer</Text>
              </TouchableOpacity>
            </Link>
          ) : (
            <TouchableOpacity onPress={handleNext} style={styles.button}>
              <FontAwesome name="arrow-right" size={24} color="white" />
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 24,
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 24,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  skipButton: {
    position: 'absolute',
    top: 50,
    right: 24,
    zIndex: 1,
  },
  skip: {
    color: 'white',
    fontSize: 16,
  },
  indicators: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: 'blue',
  },
  inactiveIndicator: {
    backgroundColor: 'gray',
  },
  button: {
    backgroundColor: 'blue',
    padding: 12,
    borderRadius: 24,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});