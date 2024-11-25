import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { db, firebase, auth } from "../firebase/config";


export default class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: Array.isArray(this.props.postData.likes) 
        ? this.props.postData.likes.includes(auth.currentUser.email) 
        : false, // Si no es un array, asumimos que no está "liked"
    };
  }

  like() {
    const { postId } = this.props;
    db.collection("posts")
      .doc(postId)
      .update({
        likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email),
      })
      .then(() => {
        
        this.setState({ liked: true });
      })
      .catch((error) => console.error("Error al dar like:", error));
  }
  
  unLike() {
    const { postId } = this.props;
  
    db.collection("posts")
      .doc(postId)
      .update({
        likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email),
      })
      .then(() => {
        this.setState({ liked: false });
      })
      .catch((error) => console.error("Error al quitar like:", error));
  }
  
  render() {
    const { postData } = this.props;
    const { liked } = this.state;

    const likeCount = Array.isArray(postData.likes) ? postData.likes.length : 0;

    return (
      <View style={styles.postContainer}>
        <Text style={styles.email}>{postData.email}</Text>
        <Text style={styles.message}>{postData.posteo}</Text>
        <Text style={styles.likes}>Likes: {likeCount}</Text>
        <TouchableOpacity
          style={liked ? styles.unlikeButton : styles.likeButton}
          onPress={() => (liked ? this.unLike() : this.like())}
        >
          <Text style={liked ? styles.unlikeText : styles.likeText}>
            {liked ? "Unlike" : "Like"}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
  likeButton: {
    marginTop: 10,
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
  },
  unlikeButton: {
    marginTop: 10,
    backgroundColor: "#dc3545",
    padding: 10,
    borderRadius: 5,
  },
  likeText: {
    color: "#ffffff",
    textAlign: "center",
    fontWeight: "bold",
  },
  unlikeText: {
    color: "#ffffff",
    textAlign: "center",
    fontWeight: "bold",
  },
});
