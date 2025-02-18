import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import { Link } from 'expo-router';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { Video } from 'expo-av';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const ONBOARDING_DATA = [
  {
    title: "Bienvenue sur CryptoApp",
    description: "Suivez l'évolution des cryptomonnaies en temps réel",
  },
  {
    title: "Gérez votre Portfolio",
    description: "Visualisez vos investissements en un coup d'œil",
  },
  {
    title: "Restez Informé",
    description: "Recevez les dernières actualités crypto",
  },
];

export default function Onboarding() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef(null);
  const videoRef = useRef(null);

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Video
          ref={videoRef}
          source={require('../../assets/onboarding/onboarding.mp4')}
          style={styles.backgroundVideo}
          resizeMode="cover"
          shouldPlay
          isLooping
          isMuted
        />
        
        <SafeAreaView style={styles.safeArea} edges={['left', 'right']}>
          <Link href="/(tabs)" asChild>
            <TouchableOpacity style={styles.skipButton}>
              <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>
          </Link>

          <View style={styles.scrollViewContainer}>
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
                <View key={index} style={styles.slide}>
                  <View style={styles.contentContainer}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.description}>{item.description}</Text>
                  </View>
                </View>
              ))}
            </Animated.ScrollView>
          </View>

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
            {activeIndex === ONBOARDING_DATA.length - 1 && (
              <View style={styles.buttonContainer}>
                <Link href="/(tabs)" asChild>
                  <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Commencer</Text>
                  </TouchableOpacity>
                </Link>
              </View>
            )}
          </View>
        </SafeAreaView>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  safeArea: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  scrollViewContainer: {
    flex: 1,
  },
  slide: {
    width: SCREEN_WIDTH,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    alignItems: 'center',
    paddingHorizontal: 24,
    marginTop: 32,
  },
  skipButton: {
    position: 'absolute',
    top: 60,
    right: 24,
    zIndex: 1,
  },
  skipText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  title: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    opacity: 0.8,
  },
  footer: {
    position: 'absolute',
    bottom: 55,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  indicators: {
    flexDirection: 'row',
    alignItems: 'center',
    left: 24,
  },
  buttonContainer: {
    position: 'absolute',
    right: 24,
    bottom: -19,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: '#FFFF',
    width: 24,
  },
  inactiveIndicator: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  button: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});