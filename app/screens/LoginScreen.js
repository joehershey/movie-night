import React from "react";
import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  TextInput,
  Keyboard,
  Platform,
} from "react-native";

function LoginScreen(props) {
  const [username, changeUsername] = React.useState("");
  const [password, changePassword] = React.useState("");

  //this is
  function loginAPI(user, pass) {
    fetch(props.url + "login", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
      },
      method: "POST",
      body: JSON.stringify({
        username: user,
        password: pass,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        if (responseJson.user_id === undefined) {
          alert("Username or password is incorrect");
        } else {
          props.setId(responseJson.user_id);
          if (responseJson.is_manager) {
            props.navigation.navigate("Manager home");
          } else {
            props.navigation.navigate("Tenant home");
          }
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  //called by the login button
  function checkCredentials() {
    loginAPITest(username, password);
    //loginAPI(username, password);
  }

  //just testing where the information goes, and that it comes in correct
  function loginAPITest(user, pass) {
    props.setUser(1, user); // 1 as a test for user_id
  }

  const keyboardControl = () => {
    if (Platform.OS == "web") {
    } else {
      Keyboard.dismiss();
    }
  };

  return (
    <View style={styles.background}>
      <TouchableWithoutFeedback onPress={keyboardControl} accessible={false}>
        <View style={styles.content}>
          <TextInput
            style={styles.input}
            onChangeText={changeUsername}
            value={username}
            placeholder="Enter username:"
          />

          <TextInput
            style={styles.input}
            onChangeText={changePassword}
            value={password}
            placeholder="Enter password:"
            secureTextEntry={true}
          />

          <TouchableWithoutFeedback
            // onPress={() => props.navigation.navigate("Tenant home")}
            onPress={() => checkCredentials()} //checking w/ API and navigating
          >
            <View style={[styles.loginButton, styles.btn]}>
              <Text
                style={{ color: "white", fontSize: 20, alignContent: "center" }}
              >
                Log in
              </Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => props.navigation.navigate("Welcome")}
          >
            <View style={[styles.returnbtn]}>
              <Text
                style={{
                  color: "white",
                  fontSize: 15,
                  alignContent: "center",
                  textAlign: "center",
                }}
              >
                Return
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
      <View style={styles.spacer}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch", //stretch allows content to fill screen
  },
  content: {
    //used with spacer to push content up the screen
    flex: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  spacer: {
    //used with content ^ to push content up the screen
    flex: 2,
  },
  logo: {
    width: 275,
    height: 200,
    margin: 30,
  },
  loginButton: {
    top: 30,
    width: "50%",
    height: 70,
    backgroundColor: "#CF1717",
  },
  registerButton: {
    top: 30,
    width: "50%",
    height: 70,
    backgroundColor: "#202020",
  },
  btn: {
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    borderRadius: 20,
  },
  input: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    height: 50,
    width: "60%",
    margin: 4,
    borderWidth: 0,
    borderRadius: 10,
    padding: 10,
  },
  returnbtn: {
    position: "absolute",
    left: 5,
    top: 45,
    width: "25%",
    height: 20,
    borderRadius: 20,
    backgroundColor: "#CF1717",
  },
});

export default LoginScreen;
