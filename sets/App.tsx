import React from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  Alert,
  TouchableOpacity,
} from 'react-native';
function App() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
      }}
    >
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '90%',
          height: '76%',
          margin: 10,
          padding: 15,
          borderRadius: 10,
          // borderWidth: 2,
          // borderColor: 'black',
          // borderStyle: 'dotted',
          backgroundColor: '#fff',
          shadowColor: '#f54b08ff',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
      >
        <Text
          style={{
            fontSize: 30,
            fontWeight: 'bold',
            color: '#000',
          }}
        >
          Registration Form
        </Text>
        <View
          style={{
            height: 7,
            width: '30%',
            marginTop: 4,
            backgroundColor: '#f54b08b2',
          }}
        ></View>

        {/* Input Fields */}
        {/* First Name */}
        <Text
          style={{
            marginTop: 20,
            marginBottom: 8,
            fontSize: 18,
            color: '#000',
          }}
        >
          First Name
        </Text>
        <TextInput
          placeholder="Jhon Deo"
          placeholderTextColor="gray"
          style={{
            height: 40,
            borderColor: '#f54b08b2',
            borderWidth: 1,
            // marginTop: 20,
            paddingLeft: 10,
            borderRadius: 3,
            backgroundColor: '#fff',
            fontSize: 16,
            color: 'gray',
          }}
        />

        {/* Last Name */}
        <Text
          style={{
            marginVertical: 8,
            fontSize: 18,
            color: '#000',
          }}
        >
          Last Name
        </Text>
        <TextInput
          placeholder="Jhon Deo"
          placeholderTextColor="gray"
          style={{
            height: 40,
            borderColor: '#f18054b2',
            borderWidth: 1,
            paddingLeft: 10,
            borderRadius: 3,
            backgroundColor: '#fff',
            fontSize: 16,
            color: 'gray',
          }}
        />

        {/* Contact Number */}
        <Text
          style={{
            marginVertical: 8,
            fontSize: 18,
            color: '#000',
          }}
        >
          Contact Number
        </Text>
        <TextInput
          placeholder="0987654321"
          placeholderTextColor="gray"
          keyboardType="numeric"
          style={{
            height: 40,
            borderColor: '#f18054b2',
            borderWidth: 1,
            paddingLeft: 10,
            borderRadius: 3,
            backgroundColor: '#fff',
            fontSize: 16,
            color: 'gray',
          }}
        />

        {/* Email */}
        <Text
          style={{
            marginVertical: 8,
            fontSize: 18,
            color: '#000',
          }}
        >
          Email
        </Text>
        <TextInput
          placeholder="jhondoe@yahoo.com"
          keyboardType="email-address"
          placeholderTextColor="gray"
          style={{
            height: 40,
            borderColor: '#f18054b2',
            borderWidth: 1,
            // marginTop: 20,
            paddingLeft: 10,
            borderRadius: 3,
            backgroundColor: '#fff',
            fontSize: 16,
            color: 'gray',
          }}
        />

        {/* UserName */}
        <Text
          style={{
            marginVertical: 8,
            fontSize: 18,
            color: '#000',
          }}
        >
          UserName
        </Text>
        <TextInput
          placeholder="Jhon_Deo"
          placeholderTextColor="gray"
          style={{
            height: 40,
            borderColor: '#f18054b2',
            borderWidth: 1,
            paddingLeft: 10,
            borderRadius: 3,
            backgroundColor: '#fff',
            fontSize: 16,
            color: 'gray',
          }}
        />

        {/* UserName */}
        <Text
          style={{
            marginVertical: 8,
            fontSize: 18,
            color: '#000',
          }}
        >
          Password
        </Text>
        <TextInput
          placeholder="Enter Password"
          placeholderTextColor="gray"
          secureTextEntry={true}
          style={{
            height: 40,
            borderColor: '#f18054b2',
            borderWidth: 1,
            paddingLeft: 10,
            borderRadius: 3,
            backgroundColor: '#fff',
            fontSize: 16,
            color: 'gray',
          }}
        />

        <TouchableOpacity
          style={{
            backgroundColor: '#f54b08b2',
            marginTop: 20,
            padding: 10,
            borderRadius: 5,
          }}
          onPress={() => Alert.alert('Registered!')}
        >
          <Text
            style={{
              color: '#fff',
              fontSize: 18,
              textAlign: 'center',
              fontWeight: 'bold',
            }}
          >
            Register Now
          </Text>
        </TouchableOpacity>

        <Text
          style={{
            fontSize: 18,
            textAlign: 'center',
            marginTop: 20,
          }}
        >
          Already Registered?{' '}
          <Text
            style={{ color: '#f54b08b2', fontSize: 18, fontWeight: 'bold' }}
          >
            SignIn
          </Text>
        </Text>
      </View>
    </View>
  );
}

export default App;

// ---- Card
{
  /* <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View
        style={{
          width: 350,
          maxHeight: 350,
          backgroundColor: 'lightblue',
          borderRadius: 20,
          padding: 10,
        }}
      >
        <Image
          source={{
            uri: 'https://cdn.pixabay.com/photo/2017/12/15/13/51/polynesia-3021072_1280.jpg',
          }}
          // source={require("./assets/test.png")}
          style={{ width: '100%', height: '60%', borderRadius: 20 }}
        />
        <Text
          style={{
            fontSize: 25,
            fontWeight: 'bold',
            color: '#2d0c6e',
          }}
        >
          Lorem ipsum
        </Text>
        <Text style={{ fontSize: 15 }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          quod.Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Quisquam, quod.Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Quisquam, quod.Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Quisquam, quod.Lorem ipsum dolor sit amet.
        </Text>
      </View>
    </View> */
}
