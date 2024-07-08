import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDuqLX7jnjDqmAHcoUNB9nGjDZltJu4gQ0",
  authDomain: "examen2-dd59b.firebaseapp.com",
  projectId: "examen2-dd59b",
  storageBucket: "examen2-dd59b.appspot.com",
  messagingSenderId: "421305594041",
  appId: "1:421305594041:web:1444efbb083a99cc342b68",
  measurementId: "G-Q69KL0F1KM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

const AuthScreen = ({ email, setEmail, password, setPassword, isLogin, setIsLogin, handleAuthentication }) => {
  return (
    <View style={styles.authContainer}>
      <Text style={styles.title}>{isLogin ? 'Sign In' : 'Sign Up'}</Text>
      <TextInput
        style={styles.input}
        placeholder='Email'
        value={email}
        onChangeText={setEmail}
        autoCapitalize='none'
      />
      <TextInput
        style={styles.input}
        placeholder='Password'
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <View style={styles.buttonContainer}>
        <Button
          title={isLogin ? 'Sign In' : 'Sign Up'}
          onPress={handleAuthentication}
          color={'#3498db'}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Text style={styles.toggleText} onPress={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Create an account' : 'Login'}
        </Text>
      </View>
    </View>
  );
};

const AuthenticationScreen = ({ user, handleLogout }) => {
  return (
    <View style={styles.authContainer}>
      <Text style={styles.title}>Logged in as {user.email}</Text>
      <Text style={styles.emailText}>Logged in as {user.email}</Text>
      <Button
        title='Logout'
        onPress={handleLogout}
        color={'#e74c3c'}
      />
    </View>
  );
};

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe; // Cleanup subscription on unmount
  }, []);

  const handleAuthentication = () => {
    if (isLogin) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          setUser(userCredential.user);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          setUser(userCredential.user);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      {user ? (
        <AuthenticationScreen user={user} handleLogout={handleLogout} />
      ) : (
        <AuthScreen
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          isLogin={isLogin}
          setIsLogin={setIsLogin}
          handleAuthentication={handleAuthentication}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#e0e0e0',
  },
  authContainer: {
    width: '85%',
    maxWidth: 450,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  title: {
    fontSize: 26,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  input: {
    height: 45,
    borderColor: '#bbb',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    borderRadius: 6,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  toggleText: {
    color: '#2980b9',
    textAlign: 'center',
    fontSize: 16,
  },
  bottomContainer: {
    marginTop: 25,
  },
  emailText: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 25,
  },
});
