import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView } from 'react-native';
import { SvgUri } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const avatarTypes = [
  { name: 'Adventurer', type: 'adventurer' },
  { name: 'Avataaars', type: 'avataaars' },
  { name: 'Big Smile', type: 'big-smile' },
  { name: 'Micah', type: 'micah' },
  { name: 'Open Peeps', type: 'open-peeps' },
  { name: 'Pixel Art', type: 'pixel-art' },
];

const getRandomAvatarUrl = (type) => {
  return `https://api.dicebear.com/6.x/${type}/svg?seed=${Math.random().toString(36).substring(7)}`;
};

function HomeScreen() {
  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>IconGenerator</Text>
      <Text style={styles.description}>
        O app perfeito para gerar ícones e avatares aleatórios e divertidos de acordo com o seu nome
      </Text>

      <Text style={styles.subtitle}>Selecione um tipo de avatar</Text>

      {avatarTypes.map((avatar) => (
        <TouchableOpacity
          key={avatar.type}
          style={styles.avatarOption}
          onPress={() => navigation.navigate('Avatar', { avatarType: avatar.type, avatarName: avatar.name })}
        >
          <SvgUri
            width="40"
            height="40"
            uri={getRandomAvatarUrl(avatar.type)}
            style={styles.avatarImage}
          />
          <Text style={styles.avatarText}>{avatar.name}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

function AvatarScreen({ route }) {
  const { avatarType, avatarName } = route.params;
  const [name, setName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState(`https://api.dicebear.com/6.x/${avatarType}/svg?seed=default`);

  const handleNameChange = (text) => {
    setName(text);
    setAvatarUrl(`https://api.dicebear.com/6.x/${avatarType}/svg?seed=${text || 'default'}`);
  };

  return (
    <View style={styles.avatarContainer}>
      <Text style={styles.avatarTitle}>Tipo de avatar: <Text style={styles.avatarType}>{avatarName}</Text></Text>
      <Text style={styles.description}>Informe o seu nome no campo abaixo para gerarmos um novo avatar de acordo com você!</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Informe o seu nome"
        placeholderTextColor="#CCCCCC"
        value={name}
        onChangeText={handleNameChange}
      />

      <SvgUri width="150" height="150" uri={avatarUrl} style={styles.avatarImage} />
    </View>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Avatar" component={AvatarScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#1c1c1c',
  },
  title: {
    color: '#1E90FF',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 48,
    marginBottom: 10,
  },
  description: {
    color: '#CCCCCC',
    fontSize: 16,
    marginBottom: 30,
    textAlign: 'center',
  },
  subtitle: {
    color: '#CCCCCC',
    fontSize: 18,
    marginBottom: 10,
  },
  avatarOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  avatarImage: {
    marginRight: 10,
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  avatarContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#1c1c1c',
  },
  avatarTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  avatarType: {
    color: '#1E90FF',
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: '#1E90FF',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    color: '#FFFFFF',
    marginBottom: 20,
  },
  avatarImage: {
    marginTop: 20,
  },
});
