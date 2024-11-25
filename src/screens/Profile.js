import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { auth, db } from "../firebase/config";
export default class Profile extends Component {
  constructor() {
    super();
    this.state = {
      usuario: [],
      posts: [],
      loading: true,
      userName: ""

    };
  }
  componentDidMount() {
    const currentUserEmail = auth.currentUser.email;
    db.collection("users")
      .where("email", "==", currentUserEmail)
      .onSnapshot((docs) => {
        let usuario = [];
        docs.forEach((doc) => {
          usuario.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        this.setState({
          usuario: usuario,
          loading: false,
        });
      });
    db.collection("posts")
      .where("email", "==", currentUserEmail)
      .onSnapshot((docs) => {
        let posts = [];
        docs.forEach((doc) => {
          posts.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        posts.sort((a, b) => b.data.createdAt - a.data.createdAt)
        this.setState({
          posts: posts,
          loading: false,
        });
      });
  }
  handleLogOut() {
    auth.signOut().then(this.props.navigation.navigate("Login"));
  }
  render() {
    const { posts } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Tu Perfil</Text>
        <Text style={styles.subtitle}>Bienvenido</Text>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => this.handleLogOut()}
        >
          <Text style={styles.logoutText}>LogOut</Text>
        </TouchableOpacity>
        <Text style={styles.header}>Aquí están tus posteos:</Text>
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.postContainer}>
              <Text style={styles.email}>{item.data.email}</Text>
              <Text style={styles.message}>{item.data.posteo}</Text>
              <Text style={styles.likes}>Likes: {item.data.likes.length}</Text>
            </View>
          )}
        />
      </View>
      
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F7F9FC",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
    color: "#666",
   
  },
  logoutButton: {
    backgroundColor: "#D9534F",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
    width: 150,
    
  },
  
  logoutText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1DA1F2",
    marginBottom: 10,
    marginTop:10,
  },
  postContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  email: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  message: {
    fontSize: 14,
    color: "#555",
    marginTop: 5,
  },
  likes: {
    fontSize: 14,
    color: "#888",
    marginTop: 10,
  },
});
