import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native-web';
import { auth, db } from '../firebase/config';
import Posts from "../components/Post"

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      loading: true,
    };
  }

  componentDidMount() {
    db.collection("posts").onSnapshot(
      docs => {
        let posts = []
        docs.forEach((doc) => {
          posts.push({
            id: doc.id,
            data: doc.data()
          })
        })
        this.setState({
          posts: posts
        })
      }
    )
  }

  render() {
    return (
      <View>
        <Text>Bienvenido</Text>
        <Posts />
      </View>
    );
  }
}