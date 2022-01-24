import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Header, Body, Right, Icon, Thumbnail} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-spinkit';

export default class ViewProfile extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      active: true,
      userDa: '',
      logo: '',
      settings: '',
      firstname: '',
      lastname: '',
      email: '',
      phone: '',
      address: '',
      image: '',
      size: 90,
      color: '#324191',
    };
  }

  componentDidMount = () => {
    this._isMounted = true;
    setInterval(() => {
      AsyncStorage.getItem('state_data', (error, res) => {
        let d = JSON.parse(res);

        AsyncStorage.getItem('user_data', (error, resData) => {
          let p = JSON.parse(resData);

          this.setState({
            firstname: p.firstname,
            lastname: p.lastname,
            email: p.email,
            phone: p.phone,
            address: p.address,
            image: p.image,
            userDa: p,
            logo: d.logo,
            settings: d.settings,
          });
        });
      });
    }, 3000);
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  _viewPro = () => {
    return (
      <View>
        <View
          style={{
            width: '100%',
            height: 170,
            backgroundColor: '#0288D1',
            justifyContent: 'center',
            alignItems: 'center',
            opacity: 0.8,
          }}>
          <View
            style={{
              width: 90,
              height: 90,
              borderRadius: 50,
              backgroundColor: '#fff',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {this.state.userDa.image == null ? (
              <Thumbnail
                large
                source={require('../../assets/no-profile.png')}
              />
            ) : (
              <Thumbnail large source={{uri: this.state.image}} />
            )}
          </View>
          <View style={{position: 'absolute', top: 5, left: 15}}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('profile')}>
              <Icon
                style={{color: '#fff', fontFamily: 'Montserrat-SemiBold'}}
                name="arrow-back"
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{paddingHorizontal: 15, paddingVertical: 20}}>
          <View style={styles.viewProfile}>
            <View style={{flexDirection: 'row'}}>
              <Text style={[styles.fonttext, {flex: 2}]}>
                {this.state.settings.name}
              </Text>
              <Text style={[styles.fonttext, {flex: 5}]}>
                {`:  ${this.state.firstname} ${this.state.lastname}`}
              </Text>
            </View>
          </View>

          <View style={styles.viewProfile}>
            <View style={{flexDirection: 'row'}}>
              <Text style={[styles.fonttext, {flex: 2}]}>Email</Text>
              <Text style={[styles.fonttext, {flex: 5}]}>
                {this.state.email != '' ? `:  ${this.state.email}` : 'N/A'}
              </Text>
            </View>
          </View>

          <View style={styles.viewProfile}>
            <View style={{flexDirection: 'row'}}>
              <Text style={[styles.fonttext, {flex: 2}]}>Phone</Text>
              <Text style={[styles.fonttext, {flex: 5}]}>
                {this.state.phone != '' ? `:  ${this.state.phone}` : ':  N/A'}
              </Text>
            </View>
          </View>

          <View style={{paddingLeft: 8}}>
            <View style={{flexDirection: 'row'}}>
              <Text style={[styles.fonttext, {flex: 2}]}>Address</Text>
              <Text style={[styles.fonttext, {flex: 5}]}>
                {this.state.address != ''
                  ? `:  ${this.state.address}`
                  : ':  N/A'}
              </Text>
            </View>
          </View>
        </View>
      </View>
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
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.openDrawer()}>
                  <Icon style={{fontSize: 22}} type="FontAwesome" name="bars" />
                </TouchableOpacity>
              </View>
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
