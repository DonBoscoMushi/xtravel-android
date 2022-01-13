import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {
  Container,
  Header,
  Body,
  Right,
  Icon,
  Content,
  Picker,
  DatePicker,
} from 'native-base';
import axios from 'axios';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Spinner from 'react-native-spinkit';
const Item = Picker.Item;
const timeIcon = <MaterialIcons name="schedule" size={25} color="#000" />;
const locationIcon = <MaterialIcons name="place" size={25} color="#000" />;
const searchIcon = <MaterialIcons name="search" size={20} color="#fff" />;

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
      chosenDate: new Date(),
      userDa: '',
      logo: '',
      settings: '',

      size: 90,
      color: '#324191',
    };
    this.setDate = this.setDate.bind(this);
  }

  componentDidMount = () => {
    this._isMounted = true;
    setInterval(() => {
      AsyncStorage.getItem('state_data', (error, res) => {
        let d = JSON.parse(res);

        AsyncStorage.getItem('user_data', (error, resData) => {
          let p = JSON.parse(resData);

          this._pointAllData();
          this.getfleetType();

          this.setState({
            userDa: p,
            logo: d.logo,
            settings: d.settings,
          });
        });
      });
    }, 2000);
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

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
        .catch(err => console.log(err.response));
    }, 3000);
  };

  _searchJourneyTour = () => {
    if (
      this.state.startPointVal == '' ||
      this.state.endPointVal == '' ||
      this.state.fleetsData == '' ||
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
        fleetsData: '',
        chosenDate: new Date(),
      });
    }
  };

  getfleetType = () => {
    axios
      .get(`${this.state.settings.base_url}Api/fleet_list`)
      .then(res => {
        if (res.data.response.fleets == undefined) {
          this.setState({
            ...this.state,
            fleetsAllData: [],
          });
        } else {
          this.setState({
            ...this.state,
            fleetsAllData: res.data.response.fleets,
          });
        }
      })
      .catch(err => console.log(err.response));
  };

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

  logOutUser = () => {
    Alert.alert(
      'LOGOUT',
      'Are You Sure?',
      [
        {},
        {text: 'NO', onPress: () => console.log('OK Pressed')},
        {
          text: 'CONFIRM',
          onPress: () => {
            AsyncStorage.removeItem('intro_tokenr');
            this.props.navigation.navigate('login');
          },
        },
      ],
      {cancelable: false},
    );
  };

  _getProDataAll = () => {
    if (
      this.state.settings == '' ||
      this.state.userDa == '' ||
      this.state.pointData.length == 0
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
          <View style={{flex: 9}}>
            <Container>
              <Header style={styles.loginHeader}>
                <Body>
                  <View style={styles.logoD}>
                    <Image
                      style={{width: 140, height: 30, resizeMode: 'contain'}}
                      source={{uri: this.state.logo}}
                    />
                  </View>
                </Body>

                <Right style={{marginRight: 15}}>
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
                </Right>
              </Header>

              <Content style={{backgroundColor: '#F9F9F9'}}>
                <View style={[styles.searchtour]}>
                  <Text style={[styles.searchtourtext]}>
                    {this.state.settings.search_tour.toUpperCase()}
                  </Text>
                </View>

                <View style={{flex: 1}}>
                  <View
                    style={{
                      width: '96%',
                      marginLeft: '2%',
                      marginVertical: 15,
                    }}>
                    <View style={styles.locksearchDet}>
                      <View style={{flexDirection: 'row'}}>
                        {locationIcon}
                        <Text style={styles.locationDet}>
                          {this.state.settings.location_details}
                        </Text>
                      </View>

                      <View style={{flexDirection: 'row', marginTop: 15}}>
                        <View style={{flex: 4}}>
                          <Text style={styles.startpoint}>
                            {this.state.settings.start_point}
                          </Text>
                          <Picker
                            mode="dropdown"
                            selectedValue={this.state.startPointVal}
                            onValueChange={this.onstartValueChange.bind(this)}>
                            <Item
                              key="k"
                              label={this.state.settings.select_start_point}
                              value=""
                            />
                            {this._getStatData()}
                          </Picker>
                        </View>

                        <View
                          style={{
                            flex: 2,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <Image
                            style={styles.payimg}
                            source={require('../../assets/arrow.png')}
                          />
                        </View>

                        <View style={{flex: 4}}>
                          <Text style={styles.startpoint}>
                            {this.state.settings.end_point}
                          </Text>
                          <Picker
                            mode="dropdown"
                            selectedValue={this.state.endPointVal}
                            onValueChange={this.onendValueChange.bind(this)}>
                            <Item
                              key="k"
                              label={this.state.settings.select_end_point}
                              value=""
                            />
                            {this._getStatData()}
                          </Picker>
                        </View>
                      </View>
                    </View>

                    <View style={styles.locksearchDet}>
                      <View style={{flexDirection: 'row', marginBottom: 8}}>
                        {timeIcon}
                        <Text style={styles.locationDet}>
                          {this.state.settings.journey_date}
                        </Text>
                      </View>

                      <View style={{flexDirection: 'row'}}>
                        <View style={{flex: 8}}>
                          <DatePicker
                            defaultDate={new Date()}
                            minimumDate={new Date(2018, 1, 1)}
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
                            placeHolderTextStyle={{color: '#000'}}
                            onDateChange={this.setDate}
                          />
                        </View>
                        <View style={{flex: 1}}>
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

                    <View style={styles.locksearchDet}>
                      <View style={{flexDirection: 'row', marginBottom: 8}}>
                        {/* {timeIcon} */}
                        <Text style={styles.locationDet}>
                          {this.state.settings.fleet_type}
                        </Text>
                      </View>

                      <View style={{flexDirection: 'row'}}>
                        <Picker
                          mode="dropdown"
                          selectedValue={this.state.fleetsData}
                          onValueChange={this.onfleetsValueChange.bind(this)}>
                          <Item
                            key="k"
                            label={this.state.settings.select_fleet_type}
                            value=""
                          />
                          {this._getfleetsData()}
                        </Picker>
                      </View>
                    </View>
                  </View>
                </View>
              </Content>
            </Container>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              backgroundColor: '#F9F9F9',
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
          </View>
        </View>
      );
    }
  };

  render() {
    return <View style={{flex: 1}}>{this._getProDataAll()}</View>;
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
  searchtourtext: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchtour: {
    backgroundColor: '#003B93',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },
  locksearchDet: {
    backgroundColor: '#ffffff',
    borderWidth: 3,
    borderColor: '#e3e7e9',
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  locationDet: {
    fontSize: 15,
    fontFamily: 'Montserrat-SemiBold',
    marginLeft: 15,
  },
  startpoint: {
    fontSize: 14,
    fontFamily: 'Montserrat-SemiBold',
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
