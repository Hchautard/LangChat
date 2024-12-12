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
  const [text, setText] = useState('');
  const [language, setLanguage] = useState('')

  const createNewLine = () => {
  }

  const fetchApi = async () => {
    try {
      const response = await fetch('http://localhost:3000/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          text: text,
          language: language
        }),
      });
      const data = await response.json();

      // Set the chat state
      setChat(data.msg.message.content[0].text);

    } catch (error) {
      console.error(error);
    }
  }

  const handleChange = (e:any) => {
    console.log(e.target.value)
    setLanguage(e.target.value)
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
      <div>
    	<h1>Choose a language</h1>
      <select onChange={(e) => handleChange(e)}>
    		<option value="french">French</option>
    		<option value="english">English</option>
    		<option value="korean">Korean</option>
   		</select>
      </div>
      <ThemedView style={styles.stepContainer}>
        <span style={styles.titleContainer}>{chat}</span>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={setText}
          placeholder="useless placeholder"
          value={text}
        />
        <Button title="Envoyer" onPress={() => fetchApi()} />
      </ThemedView>
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
