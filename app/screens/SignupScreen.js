import React from "react";
import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  TextInput,
  Alert,
  Keyboard,
  Platform,
} from "react-native";

function SignupScreen(props) {
  const [username, changeUsername] = React.useState("");
  const [email, changeEmail] = React.useState("");
  const [password, changePassword] = React.useState("");

  //TODO replace spike code
  function signupAPI(user, pass, setEmail) {
    console.log(name, user, pass, isManager);
    fetch(props.url + "signup", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
      },
      method: "POST",
      body: JSON.stringify({
        full_name: name,
        username: user,
        password: pass,
        is_manager: isManager,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        if (responseJson.user_id === undefined) {
          alert("Unable to sign up");
        } else {
          props.setId(responseJson.user_id);
          if (isManager) {
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

  function testOrAPI(user, pass, setEmail) {
    signupAPITest(user, pass, setEmail);
    //signupAPI(user,pass,setEmail);
  }

  //test input without api
  function signupAPITest(user, pass, email) {
    console.log(user + ":" + pass + ":" + setEmail);
    props.setUser(2, user); //sets user_id as 2, username as input for username
  }

  const keyboardControl = () => {
    if (Platform.OS == "web") {
    } else {
      Keyboard.dismiss();
    }
  };

  return (
    <View style={styles.background}>
      <TouchableWithoutFeedback onPress={keyboardControl}>
        <View style={styles.content}>
          <TextInput
            style={styles.input}
            onChangeText={changeUsername}
            value={username}
            placeholder="Enter username:"
          />

          <TextInput
            style={styles.input}
            onChangeText={changeEmail}
            value={email}
            placeholder="Enter email:"
          />

          <TextInput
            style={styles.input}
            onChangeText={changePassword}
            value={password}
            placeholder="Enter password:"
            secureTextEntry={true}
          />

          <TouchableWithoutFeedback
            onPress={() => {
              if (username == "" || password == "" || email) {
                Alert.alert("Please fill out all fields");
              } else {
                testOrAPI(username, password, email);
              }
            }}
          >
            <View style={[styles.signupButton, styles.btn]}>
              <Text
                style={{ color: "white", fontSize: 20, alignContent: "center" }}
              >
                Sign up
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
  separate: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 20,
    top: 15,
  },
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch",
  },
  content: {
    //used with spacer to push content up the screen
    flex: 11,
    justifyContent: "center",
    alignItems: "center",
  },
  spacer: {
    //used with content ^ to push content up the screen
    flex: 1,
  },
  logo: {
    width: 275,
    height: 200,
    margin: 30,
  },
  signupButton: {
    top: 30,
    width: "50%",
    height: 70,
    backgroundColor: "#CF1717",
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

export default SignupScreen;
