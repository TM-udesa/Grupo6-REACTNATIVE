import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import { auth, db } from "../firebase/config";

export default class NewPost extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      message: "",
      errorMessage: ''
    };
  }


  handlePost = () => {
    db.collection('posts').add({
      email: auth.currentUser .email,
      posteo: this.state.message,
      likes: 0,
      createdAt: Date.now()
    })
    .then(() => {
      console.log('Post agregado exitosamente');
      this.props.navigation.navigate('Home');
    })
    .catch(error => {
      this.setState({ errorMessage: error.message });
      
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Nueva publicacion</Text>

        <TextInput
          style={styles.input}
          placeholder="¿Qué queres compartir?"
          onChangeText={(text) => this.setState({ message: text })}
          value={this.state.message}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.handlePost(this.state.message)}
        >
          <Text style={styles.buttonText}>Crear Publicacion</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ffffff", 
    justifyContent: 'center', 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1DA1F2',
    marginBottom: 10, 
    textAlign: 'center', 
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20, 
    textAlign: 'center', 
  },
  input: {
    height: 60,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 20, 
    backgroundColor: '#ffffff', 
  },
  button: {
    backgroundColor: "#1DA1F2",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
    marginVertical: 10,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
