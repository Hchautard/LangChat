import { Image, StyleSheet, Platform, Button, View, Text, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { TextInput } from 'react-native-gesture-handler';

export default function HomeScreen() {
  const [chat, setChat] = useState<string[]>([]); // Chat is now stateful
  const [text, setText] = useState('');
  const [language, setLanguage] = useState('english');
  const [isTyping, setIsTyping] = useState(false); // Shows if the bot is "typing"
  
  const fetchApi = async () => {
    try {
      setIsTyping(true); // Start typing animation
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
      const message = data.msg.message.content[0].text;
      simulateTypingEffect(message); // Call the typing effect function
    } catch (error) {
      console.error(error);
    }
  }

  const simulateTypingEffect = (message: string) => {
    let index = 0;
  
    // Add an empty string to the chat as a placeholder for the typing message
    setChat((prevChat) => [...prevChat, ""]);
  
    const typingInterval = setInterval(() => {
      setChat((prevChat) => {
        const updatedChat = [...prevChat];
        updatedChat[updatedChat.length - 1] = message.slice(0, index + 1); // Update the last entry
        return updatedChat;
      });
  
      index++;
      if (index === message.length) {
        clearInterval(typingInterval); // Stop the interval when the message is fully typed
        setIsTyping(false);
      }
    }, 50); // Adjust typing speed here
  };
  

  const handleChange = (e: any) => {
    setLanguage(e.target.value);
  }

  const handleKeypress = (e: any) => {
    if (e.nativeEvent.key === 'Enter') {
      fetchApi();
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <View>
        <ThemedText>Choose a language</ThemedText>
        <select onChange={(e) => handleChange(e)}>
          <option value="french">French</option>
          <option value="english">English</option>
          <option value="korean">Korean</option>
        </select>
      </View>

      <ThemedView style={styles.stepContainer}>
        {chat.map((element: string, index: number) => (
          <ThemedText key={index}>{element}</ThemedText> 
        ))}

        {isTyping && (
          <View style={styles.typingContainer}>
            <ActivityIndicator size="small" color="#0000ff" />
            <ThemedText>Typing...</ThemedText>
          </View>
        )}

        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={setText}
          placeholder="Type a message"
          value={text}
          onKeyPress={handleKeypress}
        />

        <Button title="Send" onPress={() => fetchApi()} />
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
  typingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  }
});
