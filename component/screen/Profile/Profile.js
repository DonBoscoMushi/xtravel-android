import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  ImageBackground,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
// import DatePicker from 'react-native-date-picker';
import {
  Container,
  Header,
  Body,
  Right,
  Left,
  Icon,
  DatePicker,
  Content,
  Picker,
} from 'native-base';
import axios from 'axios';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Spinner from 'react-native-spinkit';
import NetInfo from '@react-native-community/netinfo';
import base_url from '../base_url';

const Item = Picker.Item;
const timeIcon = <MaterialIcons name="schedule" size={25} color="#000" />;
const locationIcon = <MaterialIcons name="place" size={25} color="#000" />;
const searchIcon = <MaterialIcons name="search" size={20} color="#fff" />;
const image = {uri: '../../assets/bg-img.png'};

export default class Profile extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);

    this.inputRefs = {};
    this.state = {
      pointData: [],
      fleetsAllData: [],
      searchdataInfo: [],
      startPointVal: '',
      endPointVal: '',
      fleetsData: '',
      loading: true,
      chosenDate: new Date(),
      userDa: '',
      logo: '',
      settings: '',
      base_url: base_url,
      size: 90,
      color: '#880C0C',
    };
    this.setDate = this.setDate.bind(this);
  }

  _checkNetwork = () => {
    //check network and fetch web settings
    NetInfo.fetch()
      .then(state => {
        if (state.isConnected) {
          console.log('Network :' + state.isConnected);
          this._callwebSettings();

          //get locations and fleet
          this._pointAllData();
          // this.getfleetType();
        } else {
          Alert.alert(
            this.state.title,
            'Please Check Your Data Connection',
            [
              {},
              {},
              {
                text: 'OK',
                onPress: () =>
                  setTimeout(() => {
                    this._checkNetwork();
                  }, 5000),
              },
            ],
            {cancelable: false},
          );
        }
      })
      .catch(err => console.log('Somethings happened '.err));
  };

  componentDidMount = () => {
    this._isMounted = true;
    this._checkNetwork();

    setInterval(() => {
      // this._checkNetwork();
      // AsyncStorage.getItem('state_data', (error, res) => {
      //   let d = JSON.parse(res);
      //   AsyncStorage.getItem('user_data', (error, resData) => {
      //     let p = JSON.parse(resData);
      this._pointAllData();
      //     // this.getfleetType();
      //     this.setState({
      //       // userDa: p,
      //       // logo: d.logo,
      //       // settings: d.settings,
      //     });
      //   });
      // });
    }, 5000);
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  _callwebSettings = () => {
    axios
      .get(`${this.state.base_url}Api/webSetting`)
      .then(res => {
        // console.log('Settings: ' + JSON.stringify(res.data.response));
        this.setState({
          logo: res.data.response.logo_url,
          settings: res.data.response,
          loading: false,
        });

        AsyncStorage.setItem('state_data', JSON.stringify(this.state));
      })
      .catch(error => console.log('from web settings ' + error.response));
  };

  _pointAllData = () => {
    setTimeout(() => {
      axios
        .get(`${this.state.settings.base_url}Api/location`)
        .then(res => {
          if (res.data.response.locations == undefined) {
            this.setState({
              ...this.state,
              pointData: [],
            });
          } else {
            this.setState({
              ...this.state,
              pointData: res.data.response.locations,
            });
          }
        })
        .catch(err => console.log('fetch locations: ' + err.gete));
    }, 3000);
  };

  _searchJourneyTour = () => {
    if (
      this.state.startPointVal == '' ||
      this.state.endPointVal == '' ||
      this.state.chosenDate == ''
    ) {
      Alert.alert(
        this.state.settings.settings.title,
        this.state.settings.required_field,
        [{}, {}, {text: 'OK', onPress: () => console.log('OK Pressed')}],
        {cancelable: false},
      );
    } else {
      this.props.navigation.navigate('JourneyDetails', {
        data: this.state,
        settings: this.state.settings,
      });
      this.setState({
        startPointVal: '',
        endPointVal: '',
        chosenDate: new Date(),
      });
    }
  };

  // i dont need car types
  // getfleetType = () => {
  //   axios
  //     .get(`${this.state.settings.base_url}Api/fleet_list`)
  //     .then(res => {
  //       if (res.data.response.fleets == undefined) {
  //         this.setState({
  //           ...this.state,
  //           fleetsAllData: [],
  //         });
  //       } else {
  //         this.setState({
  //           ...this.state,
  //           fleetsAllData: res.data.response.fleets,
  //         });
  //       }
  //     })
  //     .catch(err => console.log('get fleet type: ' + err.response));
  // };

  _getfleetsData = () => {
    return this.state.fleetsAllData.map((data, i) => {
      return <Item key={'f' + data.id} label={data.type} value={data.id} />;
    });
  };

  onstartValueChange(value) {
    this.setState({
      ...this.state,
      startPointVal: value,
    });
  }

  onendValueChange(value) {
    this.setState({
      ...this.state,
      endPointVal: value,
    });
  }

  onfleetsValueChange(value) {
    this.setState({
      ...this.state,
      fleetsData: value,
    });
  }

  _getStatData = () => {
    return this.state.pointData.map((data, i) => {
      return <Item key={'l' + data.id} label={data.name} value={data.name} />;
    });
  };

  setDate(newDate) {
    let d = new Date(newDate),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    let selectDate = [year, month, day].join('-');

    this.setState({chosenDate: selectDate});
  }

  // logOutUser = () => {
  //   Alert.alert(
  //     'LOGOUT',
  //     'Are You Sure?',
  //     [
  //       {},
  //       {text: 'NO', onPress: () => console.log('OK Pressed')},
  //       {
  //         text: 'CONFIRM',
  //         onPress: () => {
  //           AsyncStorage.removeItem('intro_tokenr');
  //           this.props.navigation.navigate('login');
  //         },
  //       },
  //     ],
  //     {cancelable: false},
  //   );
  // };

  _getProDataAll = () => {
    if (this.state.loading == true) {
      <View style={{marginTop: 270, alignItems: 'center'}}>
        <Spinner
          style={styles.spinner}
          size={this.state.size}
          type={'Pulse'}
          color={this.state.color}
        />
      </View>;
    } else {
      if (this.state.pointData.length == 0) {
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
            <ScrollView>
              <Container>
                <Header style={styles.loginHeader}>
                  <Left style={(styles.marginLeft = 2)}>
                    <View style={{flexDirection: 'row'}}>
                      <TouchableOpacity
                        onPress={() => this.props.navigation.openDrawer()}>
                        <Icon
                          style={{fontSize: 22}}
                          type="FontAwesome"
                          name="bars"
                        />
                      </TouchableOpacity>
                    </View>
                  </Left>

                  <Body>
                    <View style={styles.logoD}>
                      <Image
                        style={{
                          width: 138,
                          height: 90,
                          resizeMode: 'center',
                        }}
                        source={{uri: this.state.logo}}
                      />
                    </View>
                  </Body>

                  <Right style={(styles.marginLeft = 2)}>
                    <View style={{flexDirection: 'row'}}>
                      <TouchableOpacity
                        onPress={() => this.props.navigation.openDrawer()}>
                        <Icon
                          style={{fontSize: 22}}
                          type="FontAwesome"
                          name="mobile-phone"
                        />
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={() => this.props.navigation.openDrawer()}>
                        <Icon
                          style={{fontSize: 22, marginLeft: 7}}
                          type="FontAwesome"
                          name="envelope"
                        />
                      </TouchableOpacity>
                    </View>
                  </Right>
                </Header>

                <Content style={{backgroundColor: '#D21B21'}}>
                  <View style={[styles.searchtour, {backgroundColor: '#fff'}]}>
                    <Text style={[styles.searchtourtext]}>
                      {'Chagua Safari'}
                    </Text>
                  </View>

                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: '#fff',
                      borderBottomLeftRadius: 15,
                      borderBottomRightRadius: 80,
                    }}>
                    <View
                      style={{
                        width: '80%',
                        marginLeft: '2%',
                        marginVertical: 15,
                      }}>
                      <View style={styles.locksearchDet}>
                        <View
                          style={{
                            flexDirection: 'column',
                            marginTop: 5,
                            marginBottom: 7,
                          }}>
                          <View style={{flex: 4, marginBottom: 5}}>
                            <Text style={styles.startpoint}>
                              {this.state.settings.start_point}
                            </Text>
                            <View style={styles._Rectangle_10}>
                              <Picker
                                mode="dropdown"
                                selectedValue={this.state.startPointVal}
                                onValueChange={this.onstartValueChange.bind(
                                  this,
                                )}>
                                <Item
                                  key="k"
                                  label={this.state.settings.select_start_point}
                                  value=""
                                  style={{fontSize: 14}}
                                />
                                {this._getStatData()}
                              </Picker>
                            </View>
                          </View>

                          {/* <View
                              style={{
                                flex: 2,
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}>
                              <Image
                                style={styles.payimg}
                                source={require('../../assets/arrow.png')}
                              />
                            </View> */}

                          <View style={{flex: 4, marginBottom: 5}}>
                            <Text style={styles.startpoint}>
                              {this.state.settings.end_point}
                            </Text>
                            <View style={styles._Rectangle_10}>
                              <Picker
                                mode="dropdown"
                                selectedValue={this.state.endPointVal}
                                onValueChange={this.onendValueChange.bind(
                                  this,
                                )}>
                                <Item
                                  key="k"
                                  label={this.state.settings.select_end_point}
                                  value=""
                                  style={{fontSize: 14}}
                                />
                                {this._getStatData()}
                              </Picker>
                            </View>
                          </View>
                        </View>

                        <View style={{flexDirection: 'row', marginBottom: 5}}>
                          <Text style={styles.locationDet}>
                            {this.state.settings.journey_date}
                          </Text>
                        </View>

                        <View style={styles._Rectangle_10}>
                          <View style={{flexDirection: 'row'}}>
                            <View style={{flex: 8}}>
                              <DatePicker
                                defaultDate={new Date()}
                                minimumDate={new Date(Date.now())}
                                maximumDate={new Date(2040, 12, 31)}
                                locale={'en'}
                                timeZoneOffsetInMinutes={undefined}
                                modalTransparent={false}
                                animationType={'slide'}
                                androidMode={'default'}
                                placeHolderText={
                                  this.state.settings.select_journey_date
                                }
                                textStyle={{color: '#000'}}
                                placeHolderTextStyle={{
                                  color: '#000',
                                  fontSize: 14,
                                }}
                                onDateChange={this.setDate}
                              />
                            </View>
                            <View style={{flex: 1, marginEnd: 7}}>
                              <Image
                                style={{
                                  width: 25,
                                  height: 25,
                                  resizeMode: 'contain',
                                  marginTop: 8,
                                }}
                                source={require('../../assets/cal.png')}
                              />
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                  <View
                    style={{
                      alignContent: 'center',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: 20,
                    }}>
                    <View
                      style={{
                        flex: 1,
                        width: 175,
                        justifyContent: 'center',
                        alignContent: 'center',
                      }}>
                      <View>
                        <TouchableOpacity
                          style={[
                            styles.searchtour,
                            {justifyContent: 'center', borderRadius: 40},
                          ]}
                          onPress={() => this._searchJourneyTour()}>
                          <View style={{flexDirection: 'row'}}>
                            {/* {searchIcon} */}
                            <Text style={[styles.searchtourtext]}>
                              {this.state.settings.search}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </Content>
              </Container>
            </ScrollView>

            {/* <View
                style={{
                  flex: 1,
                  justifyContent: 'flex-end',
                  backgroundColor: '#F9F9F9AF',
                }}>
                <View style={{justifyContent: 'flex-end'}}>
                  <TouchableOpacity
                    style={[styles.searchtour, {flexDirection: 'row'}]}
                    onPress={() => this._searchJourneyTour()}>
                    {searchIcon}
                    <Text style={[styles.searchtourtext, {marginLeft: 8}]}>
                      {this.state.settings.search}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View> */}
          </View>
        );
      }
    }
    // if (
    //   this.state.settings == '' ||
    //   this.state.userDa == '' ||
    //   this.state.pointData.length == 0
    // ) {
    //   return (
    //     <View style={{marginTop: 270, alignItems: 'center'}}>
    //       <Spinner
    //         style={styles.spinner}
    //         size={this.state.size}
    //         type={'Pulse'}
    //         color={this.state.color}
    //       />
    //     </View>
    //   );
    // } else {
    // return deleted
    // }
  };

  render() {
    return <View style={{flex: 1}}>{this._getProDataAll()}</View>;
  }
}

const styles = StyleSheet.create({
  _Chagua_Safari: {
    width: 365,
    fontFamily: 'Manrope-Bold',
    color: 'rgba(0, 0, 0, 1)',
    textAlign: 'center',
    textAlignVertical: 'center',
    letterSpacing: 0.1,
  },
  _search_bus_bg: {
    width: '100%',
    height: 300,
    marginLeft: '2%',
    paddingBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    opacity: 1,
    top: 10,
    bottom: 'auto',
    transform: [{translateX: 0}, {translateY: 0}, {rotate: '0deg'}],
    shadowColor: 'rgb(0, 0, 0)',
  },
  _kutoka: {
    width: '80%',
    height: 50,
    overflow: 'hidden',
    backgroundColor: 'rgba(0,0,0,0)',
  },
  _Rectangle_10: {
    borderWidth: 1,
    opacity: 1,
    borderColor: '#e3e7e9',
    shadowColor: 'rgb(0, 0, 0)',
    shadowOffset: {
      width: 0,
      height: 5,
    },

    shadowOpacity: 0.25,
    elevation: 1,
    shadowRadius: 10,
    borderRadius: 5,

    backgroundColor: 'rgba(255, 255, 255, 1)',
  },

  _tafuta_basi: {
    width: 175,
    borderRadius: 30,
    opacity: 1,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 35,
    shadowColor: 'rgb(0, 0, 0)',
    shadowOpacity: 0.5099999904632568,
    shadowRadius: 10,
  },

  loginHeader: {
    backgroundColor: '#ffffff',
    borderBottomColor: '#333',
    borderBottomWidth: 2,
    elevation: 1,
    shadowOpacity: 2,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
  logoD: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'baseline',
  },
  logoImage: {
    resizeMode: 'contain',
    width: 140,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchtourtext: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchtour: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    height: 50,
  },
  locksearchDet: {
    backgroundColor: '#fff',
    borderWidth: 1,
    opacity: 1,
    borderColor: '#e3e7e9',
    shadowColor: 'rgb(0, 0, 0)',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    elevation: 1,
    shadowRadius: 10,
    paddingBottom: 50,
    borderRadius: 7,
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginBottom: 15,
  },

  locationDet: {
    fontSize: 14,
    fontFamily: 'Monrope-Bold',
    color: 'rgba(159, 159, 159, 1)',
    alignItems: 'center',
    marginLeft: 5,
  },
  startpoint: {
    fontSize: 14,
    fontFamily: 'Monrope-Bold',
    color: 'rgba(159, 159, 159, 1)',
    alignItems: 'center',
    marginLeft: 5,
  },
  payimg: {
    resizeMode: 'contain',
    height: 25,
    width: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    //fontSize: 16,
    paddingTop: 13,
    paddingHorizontal: 10,
    paddingBottom: 12,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    backgroundColor: 'white',
    color: 'black',
    fontFamily: 'Montserrat-Regular',
    fontSize: 13,
  },
  inputAndroid: {
    //fontSize: 16,
    paddingTop: 13,
    paddingHorizontal: 10,
    paddingBottom: 12,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    backgroundColor: 'white',
    color: 'black',
    fontFamily: 'Montserrat-Regular',
    fontSize: 13,
  },
});
