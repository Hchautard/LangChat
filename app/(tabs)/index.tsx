import { Image, StyleSheet, Platform, Button } from 'react-native';
import React, { useState } from 'react';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { TextInput } from 'react-native-gesture-handler';

export default function HomeScreen() {

  const [state, setState] = useState({});
  const [chat, setChat] = useState([]);

  const fetchApi = async () => {
    try {
      const response = await fetch('http://localhost:3000/');
      const data = await response.json();

      // Set the chat state
      setChat(data.msg.message.content[0].text);

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
        <span style={styles.titleContainer}>{chat}</span>
        <Button title="Test api" onPress={() => fetchApi()} />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
