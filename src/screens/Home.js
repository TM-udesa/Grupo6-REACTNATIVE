import React, { Component } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { db } from "../firebase/config";
import Post from "../components/Post"; 

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      posteos: [],
      loading: true,
    };
  }

  componentDidMount() {
    db.collection("posts")
      .orderBy("createdAt", "desc")
      .onSnapshot((docs) => {
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
            <Post
              postId={item.id}
              postData={item.data}
            />
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
});
