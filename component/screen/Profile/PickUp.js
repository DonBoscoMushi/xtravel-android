import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import {
  Container,
  Header,
  Body,
  Right,
  Icon,
  Picker,
  Button,
} from 'native-base';

import axios from 'axios';
// const Item = Picker.Item

class MyListItem extends Component {
  _onPress = () => {
    this.props.onPressItem(this.props.id);
  };

  render() {
    const textColor = this.props.selected ? '#194F9E' : '#9E9E9E';
    return (
      <TouchableOpacity
        style={{
          paddingVertical: 7,
          paddingRight: 12,
          margin: 5,
          flexWrap: 'wrap',
        }}
        onPress={this._onPress}>
        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              height: 13,
              width: 13,
              borderWidth: 1,
              borderColor: '#9E9E9E',
              backgroundColor: textColor,
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 10,
              marginTop: 3,
            }}></View>
          <Text
            style={{
              color: '#194F9E',
              fontFamily: 'Montserrat-SemiBold',
              fontSize: 15,
            }}>
            {this.props.title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default class PickUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      infodata: this.props.navigation.state.params.infodata,
      settings: this.props.navigation.state.params.settings,
      ava: this.props.navigation.state.params.ava,
      data: this.props.navigation.state.params.data,
      day: this.props.navigation.state.params.day,
      fleetType: this.props.navigation.state.params.fleetType,
      seatdataInfo: '',
      userDat: this.props.navigation.state.params.userDat,

      pickupData: '',
      dropData: '',

      adult: '',
      child: '',
      special: '',
      offer: '',
      // breakfast: false,
      // wifi: false,
      selected: new Map(),
      FasilityNum: [],
    };
  }

  componentDidMount = () => {
    this._getSeatPan();
  };

  _getSeatPan = () => {
    axios
      .get(
        `${this.state.settings.base_url}Api/findBookingInformation?route=${this.state.data.route}&trip_id_no=${this.state.data.trip_id_no}&booking_date=${this.state.day}&type=${this.state.fleetType}`,
      )
      .then(res => {
        this.setState({
          ...this.state,
          seatdataInfo: res.data.response,
        });
      })
      .catch(err => console.log(err.response));
  };

  _getpickupData = () => {
    if (this.state.seatdataInfo == '') {
      return <Picker.Item label="Select" />;
    } else {
      return this.state.seatdataInfo.stopages.map((data, i) => {
        return <Picker.Item key={i} label={data} value={data} />;
      });
    }
  };

  onpickupValueChange(value) {
    this.setState({
      ...this.state,
      pickupData: value,
    });
  }

  ondropValueChange(value) {
    this.setState({
      ...this.state,
      dropData: value,
    });
  }

  _countNavi = () => {
    let total_Seat = this.state.adult * 1;

    if (this.state.pickupData == '' || this.state.dropData == '') {
      Alert.alert(
        this.state.settings.settings.title,
        this.state.settings.select_pickup_and_drop_location,
        [{}, {}, {text: 'OK', onPress: () => console.log('OK Pressed')}],
        {cancelable: false},
      );
    } else {
      if (this.state.ava > total_Seat) {
        this.props.navigation.navigate('seatplan', {
          pickup: this.state,
          settings: this.state.settings,
        });
      } else {
        Alert.alert(
          this.state.settings.settings.title,
          this.state.ava + ' ' + this.state.settings.seats_available,
          [{}, {}, {text: 'OK', onPress: () => console.log('OK Pressed')}],
          {cancelable: false},
        );
      }
    }
  };

  onChanged(text) {
    let newText = '';
    let numbers = '0123456789';

    for (var i = 0; i < text.length; i++) {
      if (numbers.indexOf(text[i]) > -1) {
        newText = newText + text[i];
      } else {
        alert('please enter numbers only');
      }
    }
    this.setState({adult: newText});
  }

  // onChilsChanged(text) {
  //   let newText = '';
  //   let numbers = '0123456789';

  //   for (var i = 0; i < text.length; i++) {
  //     if (numbers.indexOf(text[i]) > -1) {
  //       newText = newText + text[i];
  //     } else {
  //       alert('please enter numbers only');
  //     }
  //   }
  //   this.setState({child: newText});
  // }

  // onSpecialChanged(text) {
  //   let newText = '';
  //   let numbers = '0123456789';

  //   for (var i = 0; i < text.length; i++) {
  //     if (numbers.indexOf(text[i]) > -1) {
  //       newText = newText + text[i];
  //     } else {
  //       // your call back function
  //       alert('please enter numbers only');
  //     }
  //   }
  //   this.setState({special: newText});
  // }

  _getoffergenerator = () => {
    if (this.state.seatdataInfo == '') {
      return <View></View>;
    } else {
      if (this.state.seatdataInfo.offers == null) {
        return <View></View>;
      } else {
        return (
          <View style={{marginBottom: 10}}>
            <View style={{marginBottom: 8}}>
              <Text style={styles.locationDet}>
                {this.state.settings.offer_code}
              </Text>
            </View>
            <View style={{borderWidth: 2, borderColor: '#e3e3e3'}}>
              <TextInput
                style={styles.textInput}
                onChangeText={text => this.setState({offer: text})}
                value={this.state.offer}
                maxLength={10} //setting limit of input
              />
            </View>
          </View>
        );
      }
    }
  };

  _keyExtractor = (item, index) => item;

  _onPressItem = id => {
    this.setState(state => {
      const selected = new Map(state.selected);
      selected.set(id, !selected.get(id));
      return {selected};
    });
  };

  _getFacilitiesData = () => {
    if (this.state.seatdataInfo == '') {
      return <View></View>;
    } else {
      if (
        this.state.seatdataInfo.facilities == '' ||
        this.state.seatdataInfo.facilities == null
      ) {
        return (
          <View>
            <Text style={{marginLeft: 7}}>
              {this.state.settings.no_facilities_available}
            </Text>
          </View>
        );
      } else {
        return (
          <FlatList
            data={this.state.seatdataInfo.facilities}
            extraData={this.state}
            keyExtractor={this._keyExtractor}
            renderItem={({item}) => this.getfasDesignView(item)}
            numColumns={3}
            columnWrapperStyle={{flexWrap: 'wrap', flex: 1}}
          />
        );
      }
    }
  };

  getfasDesignView = item => {
    return (
      <MyListItem
        style={{flexDirection: 'row', flexWrap: 'wrap'}}
        id={item}
        onPressItem={this._onPressItem}
        selected={!!this.state.selected.get(item)}
        title={item}
      />
    );
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 9}}>
          <Container style={{backgroundColor: '#F2F0F0'}}>
            <Header style={styles.loginHeader}>
              <Body>
                <View style={styles.logoD}>
                  <Image
                    style={{width: 140, height: 30, resizeMode: 'contain'}}
                    source={{uri: this.state.infodata.data.logo}}
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
                  {this.state.settings.pickup_and_drop}
                </Text>
              </View>
            </View>

            <ScrollView>
              <View style={styles.AllDataVal}>
                <View style={{marginBottom: 10}}>
                  <View style={{marginBottom: 8}}>
                    <Text style={styles.locationDet}>
                      {this.state.settings.pickup_location}
                    </Text>
                  </View>

                  <View
                    style={{
                      borderWidth: 2,
                      borderColor: '#fff',
                      backgroundColor: '#fff',
                      borderRadius: 15,
                      paddingHorizontal: 10,
                    }}>
                    <Picker
                      note
                      mode="dropdown"
                      style={{width: '100%'}}
                      selectedValue={this.state.pickupData}
                      onValueChange={this.onpickupValueChange.bind(this)}>
                      <Picker.Item
                        key="k"
                        label={this.state.settings.select_pickup_location}
                        value=""
                      />
                      {this._getpickupData()}
                    </Picker>
                  </View>
                </View>

                <View style={{marginBottom: 10}}>
                  <View style={{marginBottom: 8}}>
                    <Text style={styles.locationDet}>
                      {this.state.settings.drop_location}
                    </Text>
                  </View>
                  <View
                    style={{
                      borderWidth: 2,
                      borderColor: '#fff',
                      backgroundColor: '#fff',
                      borderRadius: 15,
                      paddingHorizontal: 10,
                    }}>
                    <Picker
                      note
                      mode="dropdown"
                      style={{width: '100%'}}
                      selectedValue={this.state.dropData}
                      onValueChange={this.ondropValueChange.bind(this)}>
                      <Picker.Item
                        key="k"
                        label={this.state.settings.select_pickup_location}
                        value=""
                      />
                      {this._getpickupData()}
                    </Picker>
                  </View>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginBottom: 10,
                  width: '92%',
                  marginLeft: '4%',
                }}>
                <View style={{flex: 1}}>
                  <View style={{marginBottom: 8}}>
                    <Text style={styles.locationDet}>
                      {/* {this.state.settings.adult } */}Number of Passengers
                    </Text>
                  </View>

                  <View style={{paddingHorizontal: 3}}>
                    <View style={{borderWidth: 1, borderColor: '#e3e3e3'}}>
                      <TextInput
                        style={styles.textInput}
                        keyboardType="numeric"
                        onChangeText={text => this.onChanged(text)}
                        value={this.state.adult}
                        maxLength={3} //setting limit of input
                      />
                    </View>
                  </View>
                </View>
              </View>

              {this._getoffergenerator()}

              <View
                style={{
                  alignContent: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    flex: 1,
                    width: 175,
                    justifyContent: 'center',
                    alignContent: 'center',

                    backgroundColor: '#F9F9F9',
                    marginTop: 40,
                  }}>
                  <View>
                    <TouchableOpacity
                      style={[
                        styles.searchtour,
                        {justifyContent: 'center', borderRadius: 40},
                      ]}
                      onPress={() => this._countNavi()}
                      // onPress={()=> console.log(this.state.selected)}
                    >
                      <Text style={styles.searchtourtext}>
                        {this.state.settings.continue}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </ScrollView>
          </Container>
        </View>
      </View>
    );
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
  },
  searchtour: {
    backgroundColor: '#B21D21',
    // justifyContent:'center',
    alignItems: 'center',
    height: 50,
  },
  AllDataVal: {
    width: '92%',
    marginLeft: '4%',
    marginVertical: 15,
    marginBottom: 20,
  },
  locationDet: {
    fontSize: 15,
    fontFamily: 'Montserrat-SemiBold',
    marginLeft: 7,
  },
  textInput: {
    paddingHorizontal: 15,
    fontSize: 17,
    backgroundColor: '#ffffff',
    height: 40,
    textAlign: 'center',
  },
  searchtourtext: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
  },
  searchtour: {
    backgroundColor: '#B21D21',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },
});
