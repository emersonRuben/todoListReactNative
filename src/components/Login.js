import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  auth,
} from '../../config/fb';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    // Observador de cambios en la autenticación
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // El usuario está autenticado
        console.log('Usuario autenticado:', user);
        // Puedes redirigir a otra pantalla o realizar acciones adicionales aquí
      } else {
        // El usuario no está autenticado
        console.log('Usuario no autenticado');
      }
    });

    // Detener el observer cuando ya no sea necesario
    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result.user);
    } catch (error) {
      console.error(error.message);
    }
  };

  const loginWithEmail = async () => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      console.log(result.user);
      // Redirigir al usuario a la pantalla de inicio u otra pantalla después del registro
      // Puedes utilizar la navegación de React Navigation para cambiar de pantalla aquí
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <View>
      <Text>Login Screen</Text>
      <Button title="Login with Google" onPress={loginWithGoogle} />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      <Button title="Login with Email" onPress={loginWithEmail} />
    </View>
  );
};

export default Login;
