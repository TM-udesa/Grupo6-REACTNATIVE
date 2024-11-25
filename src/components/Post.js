import { Text, View, StyleSheet } from 'react-native';
import React, { Component } from 'react';
import { FlatList } from 'react-native-web';
import { auth, db } from '../firebase/config';

export default class Posts extends Component {
  constructor() {
    super();
    this.state = {
      posteos: [],
      loading: true,
    };
  }

  componentDidMount() {
    db.collection('posts').onSnapshot((docs) => {
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
        <FlatList
          data={this.state.posteos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.postContainer}>
              <Text style={styles.email}>{item.data.email}</Text>
              <Text style={styles.message}>{item.data.posteo}</Text>
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
    backgroundColor: '#f8f9fa', 
  },
  postContainer: {
    backgroundColor: '#ffffff', 
    borderRadius: 8, 
    padding: 15, 
    marginBottom: 10, 
    shadowColor: '#000', 
    },
  email: {
    fontSize: 16,
    fontWeight: 'bold', 
    color: '#333', 
  },
  message: {
    fontSize: 14,
    color: '#555', 
    marginTop: 5, 
  },
});