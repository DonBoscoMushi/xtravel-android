import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  TextInput,
} from 'react-native';
import {Header, Body, Right, Icon, Button} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import md5 from 'react-native-md5';

import Spinner from 'react-native-spinkit';

export default class EditProfile extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);

    this.state = {
      active: true,
      userDa: '',
      logo: '',
      settings: '',
      image: '',
      fname: '',
      lname: '',
      ephone: '',
      eaddress: '',
      password: '',
      old_password: '',

      avatarSource: null,
      pic: null,

      size: 90,
      color: '#324191',
      id: '',
      id_no: '',
      is_passenger: '',
      old_p: '',
    };
  }

  componentDidMount = () => {
    this._isMounted = true;
    AsyncStorage.getItem('state_data', (error, res) => {
      let d = JSON.parse(res);

      AsyncStorage.getItem('user_data', (error, resData) => {
        let p = JSON.parse(resData);

        this.setState({
          image: p.image,
          fname: p.firstname,
          lname: p.lastname,
          ephone: p.phone,
          eaddress: p.address,
          userDa: p,
          logo: d.logo,
          settings: d.settings,
          email: p.email,

          id: p.id,
          id_no: p.id_no,
          is_passenger: p.is_passenger,
        });
        console.log(this.state.userDa.password);
      });
    });
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  _saveProfile = () => {
    const old_one = md5.hex_md5(this.state.old_password);

    console.log(this.state.old_password);
    console.log(old_one);
    console.log(this.state.userDa.password);

    if (
      this.state.old_password == '' ||
      this.state.fname == '' ||
      this.state.lname == ''
    ) {
      Alert.alert(
        `${this.state.settings.settings.title}`,
        `${this.state.settings.pass_username_cant_be_empty}`,
        [{}, {}, {text: 'CONFIRM'}],
        {cancelable: false},
      );
    } else {
      if (this.state.userDa.password == old_one) {
        if (this.state.password == '') {
          axios
            .get(
              `${this.state.settings.base_url}Api/user_update?id_no=${this.state.userDa.id_no}&firstname=${this.state.fname}&lastname=${this.state.lname}&email=${this.state.email}&password=${this.state.old_password}&phone=${this.state.ephone}&nid&address=${this.state.eaddress}`,
            )
            .then(res => {
              if (res.data.response.status == 'ok') {
                const userDetails = {
                  id: this.state.id,
                  id_no: this.state.id_no,
                  firstname: this.state.fname,
                  lastname: this.state.lname,
                  email: this.state.email,
                  image: this.state.image,
                  phone: this.state.ephone,
                  address: this.state.eaddress,
                  is_passenger: this.state.is_passenger,
                  password: this.state.old_password,
                };

                AsyncStorage.setItem('user_data', JSON.stringify(userDetails));

                this.setState({
                  image: this.state.image,
                  fname: this.state.fname,
                  lname: this.state.lname,
                  ephone: this.state.ephone,
                  eaddress: this.state.eaddress,

                  password: '',
                });

                Alert.alert(
                  `${this.state.settings.settings.title}`,
                  `${this.state.settings.login_again}`,
                  [
                    {},
                    {},
                    {
                      text: `${this.state.settings.confirm}`,
                      onPress: () => {
                        this.props.navigation.navigate('login');
                      },
                    },
                  ],
                  {cancelable: false},
                );
              } else {
                Alert.alert(
                  `${this.state.settings.settings.title}`,
                  `${res.data.response.message}`,
                  [{}, {}, {text: `${this.state.settings.confirm}`}],
                  {cancelable: false},
                );
              }
            })
            .catch(error => console.log(error.response));
        } else {
          axios
            .get(
              `${this.state.settings.base_url}Api/user_update?id_no=${this.state.userDa.id_no}&firstname=${this.state.fname}&lastname=${this.state.lname}&email=${this.state.email}&password=${this.state.password}&phone=${this.state.ephone}&nid&address=${this.state.eaddress}`,
            )
            .then(res => {
              if (res.data.response.status == 'ok') {
                const userDetails = {
                  id: this.state.id,
                  id_no: this.state.id_no,
                  firstname: this.state.fname,
                  lastname: this.state.lname,
                  email: this.state.email,
                  image: this.state.image,
                  phone: this.state.ephone,
                  address: this.state.eaddress,
                  is_passenger: this.state.is_passenger,
                  password: this.state.password,
                };

                AsyncStorage.setItem('user_data', JSON.stringify(userDetails));

                this.setState({
                  image: this.state.image,
                  fname: this.state.fname,
                  lname: this.state.lname,
                  ephone: this.state.ephone,
                  eaddress: this.state.eaddress,

                  password: '',
                });

                Alert.alert(
                  `${this.state.settings.settings.title}`,
                  `${this.state.settings.login_again}`,
                  [
                    {},
                    {},
                    {
                      text: `${this.state.settings.confirm}`,
                      onPress: () => {
                        this.props.navigation.navigate('login');
                      },
                    },
                  ],
                  {cancelable: false},
                );
              } else {
                Alert.alert(
                  `${this.state.settings.settings.title}`,
                  `${res.data.response.message}`,
                  [{}, {}, {text: `${this.state.settings.confirm}`}],
                  {cancelable: false},
                );
              }
            })
            .catch(error => console.log(error.response));
        }
      } else {
        Alert.alert(
          `${this.state.settings.settings.title}`,
          `${this.state.settings.email_and_password_d_match}`,
          [{}, {}, {text: 'CONFIRM'}],
          {cancelable: false},
        );
      }
    }
  };

  _viewPro = () => {
    return (
      <ScrollView>
        <View style={[styles.searchtour, {flexDirection: 'row'}]}>
          <View style={{flex: 2}}>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate('profile')}>
              <Icon style={{color: '#fff'}} name="arrow-back" />
            </Button>
          </View>
          <View style={{flex: 14}}>
            <Text style={[styles.searchtourtext]}>
              {this.state.settings.edit_profile}
            </Text>
          </View>
        </View>

        <View style={{marginHorizontal: 15, marginVertical: 10}}>
          <View style={{paddingVertical: 5}}>
            <Text style={styles.fonttext}>{this.state.settings.email}</Text>
            <TextInput
              style={{
                backgroundColor: '#e3e3e3',
                borderWidth: 1,
                borderColor: '#B21D21',
                paddingVertical: 3,
                paddingHorizontal: 15,
                marginVertical: 7,
              }}
              placeholder={this.state.settings.email}
              value={this.state.email}
              editable={false}
              selectTextOnFocus={false}
            />
          </View>

          <View style={{paddingVertical: 5}}>
            <Text
              style={
                styles.fonttext
              }>{`${this.state.settings.first_name} *`}</Text>
            <TextInput
              style={{
                backgroundColor: '#e3e3e3',
                borderWidth: 1,
                borderColor: '#B21D21',
                paddingVertical: 3,
                paddingHorizontal: 15,
                marginVertical: 7,
              }}
              placeholder={this.state.settings.first_name}
              value={this.state.fname}
              onChangeText={text => this.setState({fname: text})}
            />
          </View>

          <View style={{paddingVertical: 5}}>
            <Text
              style={
                styles.fonttext
              }>{`${this.state.settings.last_name} *`}</Text>
            <TextInput
              style={{
                backgroundColor: '#e3e3e3',
                borderWidth: 1,
                borderColor: '#B21D21',
                paddingVertical: 3,
                paddingHorizontal: 15,
                marginVertical: 7,
              }}
              placeholder={this.state.settings.last_name}
              value={this.state.lname}
              onChangeText={text => this.setState({lname: text})}
            />
          </View>

          <View style={{paddingVertical: 5}}>
            <Text style={styles.fonttext}>{this.state.settings.phone}</Text>
            <TextInput
              style={{
                backgroundColor: '#e3e3e3',
                borderWidth: 1,
                borderColor: '#B21D21',
                paddingVertical: 3,
                paddingHorizontal: 15,
                marginVertical: 7,
              }}
              placeholder={this.state.settings.phone}
              value={this.state.ephone}
              onChangeText={text => this.setState({ephone: text})}
            />
          </View>

          <View style={{paddingVertical: 5}}>
            <Text style={styles.fonttext}>{this.state.settings.address}</Text>
            <TextInput
              style={{
                backgroundColor: '#e3e3e3',
                borderWidth: 1,
                borderColor: '#B21D21',
                paddingVertical: 3,
                paddingHorizontal: 15,
                marginVertical: 7,
              }}
              placeholder={this.state.settings.address}
              value={this.state.eaddress}
              onChangeText={text => this.setState({eaddress: text})}
            />
          </View>

          <View style={{paddingVertical: 5}}>
            <Text style={styles.fonttext}>{this.state.settings.password}</Text>
            <TextInput
              style={{
                backgroundColor: '#e3e3e3',
                borderWidth: 1,
                borderColor: '#B21D21',
                paddingVertical: 3,
                paddingHorizontal: 15,
                marginVertical: 7,
              }}
              placeholder={this.state.settings.password}
              value={this.state.password}
              onChangeText={text => this.setState({password: text})}
            />
          </View>

          <View style={{paddingVertical: 5}}>
            <Text
              style={
                styles.fonttext
              }>{`Old ${this.state.settings.password} *`}</Text>
            <TextInput
              style={{
                backgroundColor: '#e3e3e3',
                borderWidth: 1,
                borderColor: '#B21D21',
                paddingVertical: 3,
                paddingHorizontal: 15,
                marginVertical: 7,
              }}
              placeholder={`Old ${this.state.settings.password}`}
              value={this.state.old_password}
              onChangeText={text => this.setState({old_password: text})}
            />
          </View>

          <View style={{paddingTop: 10, paddingBottom: 25}}>
            <TouchableOpacity
              style={{
                width: '100%',
                borderRadius: 5,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#B21D21',
                paddingVertical: 8,
              }}
              onPress={() => this._saveProfile()}>
              <Text style={[styles.fonttext, {color: '#fff'}]}>
                {this.state.settings.save_profile.toUpperCase()}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  };

  render() {
    if (
      this.state.userDa == '' ||
      this.state.settings == '' ||
      this.state.logo == ''
    ) {
      return (
        <View style={{marginTop: 270, alignItems: 'center'}}>
          <Spinner
            style={styles.spinner}
            size={this.state.size}
            type={'Pulse'}
            color={this.state.color}
          />
        </View>
      );
    } else {
      return (
        <View style={{flex: 1}}>
          <Header style={styles.loginHeader}>
            <Body>
              <View style={styles.logoD}>
                <Image
                  style={{width: 140, height: 30}}
                  source={{uri: this.state.logo}}
                />
              </View>
            </Body>

            <Right style={{marginRight: 15}}>
              <TouchableOpacity
                onPress={() => this.props.navigation.openDrawer()}>
                <Icon style={{fontSize: 22}} type="FontAwesome" name="bars" />
              </TouchableOpacity>
            </Right>
          </Header>

          <View style={{flex: 1, backgroundColor: '#fff'}}>
            <ScrollView>{this._viewPro()}</ScrollView>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  loginHeader: {
    backgroundColor: '#ffffff',
    borderBottomColor: '#333',
    borderBottomWidth: 2,
  },
  logoD: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    resizeMode: 'contain',
    width: 140,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonSt: {
    color: '#fff',
    paddingVertical: 7,
    paddingHorizontal: 18,
    fontFamily: 'Montserrat-SemiBold',
    borderRadius: 7,
    borderWidth: 1,
    borderColor: '#B21D21',
  },
  viewProfile: {
    fontSize: 16,
    marginBottom: 7,
    paddingBottom: 7,
    borderBottomWidth: 1,
    paddingLeft: 8,
    borderBottomColor: '#B21D21',
    fontFamily: 'Montserrat-SemiBold',
  },
  fonttext: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
  },
  searchtourtext: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchtour: {
    backgroundColor: '#B21D21',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },
});
