import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  TextInput,
} from "react-native";
import { auth, db } from "../firebase/config";

export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      usuarios: [],
      searchText: "", 
      loading: true,
    };
  }

  componentDidMount() {
    db.collection("users").onSnapshot((docs) => {
      let usuario = [];
      docs.forEach((doc) => {
        usuario.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      this.setState({
        usuarios: usuario,
        loading: false,
      });
      console.log(usuario);
    });
  }

  filterUsers() {
    const { usuarios, searchText } = this.state;
    if (searchText === "") return usuarios;
    return usuarios.filter((usuario) =>
      usuario.data.userName.toLowerCase().includes(searchText.toLowerCase())
    );
  }

  render() {
    const filteredUsers = this.filterUsers();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Search</Text>
            <Text style={styles.subtitle}>Estás en Search</Text>

            <TextInput
                style={styles.searchBar}
                placeholder="Buscar usuarios"
                value={this.state.searchText}
                onChangeText={(text) => this.setState({ searchText: text })}
            />
            {filteredUsers.length === 0 ? (
                <Text style={styles.noResultsText}>
                    El usuario buscado no existe.
                </Text>
            ) : (
                <FlatList
                    style={styles.flatlist}
                    data={filteredUsers}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <Text style={styles.flat}>{item.data.userName}</Text>
                    )}
                />
            )}
        </View>
    );
  }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#ffffff",
        justifyContent: "center",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#1DA1F2",
        marginBottom: 10,
        textAlign: "center",
    },
    subtitle: {
        fontSize: 16,
        color: "#555",
        marginBottom: 20,
        textAlign: "center",
    },
    searchBar: {
        height: 50,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        backgroundColor: "#f9f9f9",
        marginBottom: 20,
        fontSize: 16,
    },
    flatlist: {
        flex: 1,
        marginTop: 10,
    },
    flat: {
        padding: 15,
        fontSize: 16,
        color: "#333",
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    noResultsText: {
        fontSize: 16,
        color: "red",
        textAlign: "center",
        marginTop: 20,
    },
});