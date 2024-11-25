import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { TextInput } from "react-native";
import { StyleSheet } from "react-native";
import {auth,db} from "../firebase/config"

export default class Register extends Component {
  constructor() {
    super();
    this.state = {
    email: "",
    userName: "",
    password: "",
    registered:false,
    errors:{ email: "", userName: "", password: "" }
    }
  }

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if(user && !this.state.registered){
        this.props.navigation.navigate("homeMenu")
      }
    })
  }

  validacion() {
    const { email, userName, password } = this.state;
    let errors = { email: "", userName: "", password: "" };
    let isValid = true;
    if (!email) {
      errors.email = "El campo email está vacío.";
      isValid = false;
    }
    if (!userName) {
      errors.userName = "El campo username de usuario está vacío.";
      isValid = false;
    }
    if (!password) {
      errors.password = "El campo contraseña está vacío.";
      isValid = false;
    }
    this.setState({ errors });
    return isValid;
  }

  onSubmit() {
    if (!this.validacion()) {
      return;
    }
    console.log(
      "email: ",this.state.email,
      "userName: ",this.state.userName,
      "password: ",this.state.password,
      auth.createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(response => {
          this.setState({ registered: true });
          db.collection("users").add({
            email: this.state.email,
            password: this.state.password,
            userName: this.state.userName,
            createdAt: Date.now()
          })
            .then(() => this.props.navigation.navigate("Login"))
        })
        .catch(error => {
          console.error("Error de registro:", error);
          if (error.code === "auth/email-already-in-use") {
            this.setState({ errors: { email: "El email ya está en uso." } });
          } else if (error.code === "auth/invalid-email") {
            this.setState({ errors: { email: "El formato del email es inválido." } });
          } else if (error.code === "auth/weak-password") {
            this.setState({ errors: { password: "La contraseña debe tener al menos 6 caracteres." } });
          } else {
            this.setState({ errors: { email: "", password: error.message } });
          }
        })

    );
  } 

  render() {
    const datos = this.state.email !== "" && this.state.userName !== "" && this.state.password !== "";
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Registro</Text>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Login")}
        >
          <Text style={styles.link}>¿Ya tienes cuenta? Ir a login</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          keyboardType="email-address"
          placeholder="email"
          onChangeText={(text) => this.setState({ email: text })}
          value={this.state.email}
        />
        {this.state.errors.email === "" ? null : <Text style={styles.error}>{this.state.errors.email}</Text>}
        <TextInput
          style={styles.input}
          placeholder="username"
          onChangeText={(text) => this.setState({ userName: text })}
          value={this.state.userName}
        />
        {this.state.errors.userName === "" ? null : <Text style={styles.error}>{this.state.errors.userName}</Text>}
        <TextInput
          style={styles.input}
          placeholder="password"
          secureTextEntry={true}
          onChangeText={(text) => this.setState({ password: text })}
          value={this.state.password}
        />
        {this.state.errors.password === "" ? null : <Text style={styles.error}>{this.state.errors.password}</Text>}
        <TouchableOpacity onPress={() => this.onSubmit()}
          style={[styles.button,
          { backgroundColor: datos ? '#1DA1F2' : '#CCCCCC' }
          ]}
          disabled={!datos}>
          <Text style={styles.buttonText}> Registrarme </Text>
        </TouchableOpacity>

      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1DA1F2",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 25,
    padding: 15,
    marginVertical: 10,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
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
  link: {
    color: "#1DA1F2",
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
  error: {
    color: "red",
    fontSize: 14,
    marginTop: -5,
    marginBottom: 10,
  },
});