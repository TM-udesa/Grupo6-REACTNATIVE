import React, { Component } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { db } from "../firebase/config";

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      posteos: [],
      loading: true,
    };
  }

  componentDidMount() {
    db.collection("posts").orderBy('createdAt', 'desc').onSnapshot((docs) => {
      let posts = [];
      docs.forEach((doc) => {
        posts.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      this.setState({
        posteos: posts,
        loading: false,
      });
      console.log(posts);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Bienvenido</Text>
        <FlatList
          data={this.state.posteos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.postContainer}>
              <Text style={styles.email}>{item.data.email}</Text>
              <Text style={styles.message}>{item.data.posteo}</Text>
              <Text style={styles.likes}>
                Likes: {item.data.likes ? item.data.likes.length : 0}
              </Text>
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
    padding: 10,
    backgroundColor: "#f8f9fa",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    color: "#333",
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
