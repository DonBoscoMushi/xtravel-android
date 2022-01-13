import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, TouchableOpacity, ScrollView } from 'react-native'
import { Container, Header,Body , Right, Icon,Button} from 'native-base'
import axios from 'axios'
import Spinner from 'react-native-spinkit'
import moment from 'moment'

export default class JourneyDetails extends Component {
  _isMounted = false
  constructor(props){
    super(props)

    this.state = {
      data : this.props.navigation.state.params.data,
      settings : this.props.navigation.state.params.settings,
      searchdataInfo : '',

      //''Bounce',  'Pulse', 'ChasingDots',  'Circle', '9CubeGrid',

      index: 0,
      size: 80,
      color: "#324191",
    }
  }

  componentDidMount = () =>{
    // console.warn(this.state.data.startPointVal)
    // console.warn(this.state.data.endPointVal)
    // console.warn(this.state.data.chosenDate)
    // console.warn(this.state.data.fleetsData)
    _isMounted = true
          axios.get(`${this.state.settings.base_url}Api/search?start_point=${this.state.data.startPointVal}&end_point=${this.state.data.endPointVal}&date=${this.state.data.chosenDate}&fleet_type=${this.state.data.fleetsData}`)
            .then(res => {
                this.setState({
                    ...this.state,
                    searchdataInfo : res.data.response
                })
                // console.log(res.data.response)
            })
            .catch(err => console.log(err.response))

  }

  componentWillUnmount = () =>{
    _isMounted = false
  }

  _seatplan = (val, ava) =>{
    const day = this.state.searchdataInfo.date
    const fleetType = this.state.searchdataInfo.fleet_type
    this.props.navigation.navigate('pickUp', {infodata: this.state,data : val, day :day, fleetType : fleetType, userDat : this.state, ava : ava, settings : this.state.settings})
    // console.log(ava)
  }

  _getHeadInfoData = () => {
    if(this.state.searchdataInfo == ''){
      return <View>
                
      </View>
    }else{
      const routeName =<View style={[styles.searchtour,{flexDirection:'row'}]}>
                          <View style={{flex:2}}>
                              <Button transparent onPress={()=> this.props.navigation.navigate('profile')}>
                                  <Icon style={{color:'#fff'}} name='arrow-back' />
                              </Button>
                          </View>
                          <View style={{flex:14}}>
                          <Text style={[styles.searchtourtext]}>{this.state.searchdataInfo.route_name == null ? this.state.settings.no_rout_available : this.state.searchdataInfo.route_name}</Text>
                          </View>
                      </View>
      return routeName
    }
  } 

  _getSearchInfoData = () => {
    if(this.state.searchdataInfo == ''){
      return <View style={{marginTop:270, alignItems:'center'}}>
                <Spinner 
                style={styles.spinner}
                size={this.state.size} 
                type={'Pulse'} 
                color={this.state.color} />
      </View>
    }else{
      const d = this.state.searchdataInfo.trip_list.map((value, i) => {
          // return this.state.searchdataInfo.available.map((val,key)=>{
            return <View 
            style={styles.AllDataVal}
            key={value.trip_id_no}>

              <View style={styles.departureView}>
                <View style={styles.depCont}>
                  <Text style={styles.depText}>{this.state.settings.departure}</Text>
                </View>

                <View style={{flex:1}}>
                  <Text style={styles.firstTextVal}>{ value.start }</Text>
                  <Text style={styles.secondTextVal}>{ value.pickup_trip_location }</Text>
                </View>
              </View>

              <View style={styles.departureView}>
                <View style={styles.depCont}>
                  <Text style={styles.depText}>{this.state.settings.duration}</Text>
                </View>

                <View style={{flex:1}}>
                  <Text style={styles.firstTextVal}>{ value.duration }</Text>
                </View>
              </View>

              <View style={styles.departureView}>
                <View style={styles.depCont}>
                  <Text style={styles.depText}>{this.state.settings.distance}</Text>
                </View>

                <View style={{flex:1}}>
                  <Text style={styles.firstTextVal}>{ value.distance }</Text>
                </View>
              </View>

              <View style={styles.departureView}>
                <View style={styles.depCont}>
                  <Text style={styles.depText}>{this.state.settings.arrival}</Text>
                </View>

                <View style={{flex:1}}>
                  <Text style={styles.firstTextVal}>{ value.end }</Text>
                  <Text style={styles.secondTextVal}>{ value.drop_trip_location }</Text>
                </View>
              </View>

              <View style={styles.departureView}>
                <View style={styles.depCont}>
                  <Text style={styles.depText}>{this.state.settings.adult_fare}</Text>
                </View>

                <View style={{flex:1}}>
                  <Text style={styles.firstTextVal}>{ value.price }</Text>
                </View>
              </View>

              <View style={styles.departureView}>
                <View style={styles.depCont}>
                  <Text style={styles.depText}>{this.state.settings.child_fare}</Text>
                </View>

                <View style={{flex:1}}>
                  <Text style={styles.firstTextVal}>{ value.children_price }</Text>
                </View>
              </View>

              <View style={styles.departureView}>
                <View style={styles.depCont}>
                  <Text style={styles.depText}>{this.state.settings.special_fare}</Text>
                </View>

                <View style={{flex:1}}>
                  <Text style={styles.firstTextVal}>{ value.special_price }</Text>
                </View>
              </View>

              <View style={{flexDirection:'row',backgroundColor:'#ffffff'}}>
                <View style={styles.depCont}>
                  <Text style={styles.depText}>{this.state.settings.seat_details}</Text>
                </View>

                <View style={{flex:1}}>
                  <Text style={[styles.secondTextVal, {color:'#003B93'}]}>{ value.fleet_seats + ' ' + this.state.settings.total_seats}</Text>
                  <Text style={[styles.secondTextVal, {color:(this.state.searchdataInfo.available[i] > 5) ? 'green' : 'red'}]}>{ this.state.searchdataInfo.available[i] + ' ' + this.state.settings.seats_available} </Text>
                </View>
              </View>

              <View style={{backgroundColor:'#ffffff', borderTopWidth:2,borderTopColor:'#e3e3e3'}}>
                <View style={{flex:1, justifyContent:"center", alignItems:'center'}}>
                  <TouchableOpacity onPress={()=> this._seatplan(value,this.state.searchdataInfo.available[i])}>
                      <Text style={styles.bookbtn}>{this.state.settings.book.toUpperCase()}</Text>
                  </TouchableOpacity>
                </View>
              </View>

          </View>
          // })
      })

      return d
    }
  }

  render() {
    return (
      <Container style={{backgroundColor: '#F9F9F9'}}>

            <Header style={styles.loginHeader}>
                <Body>
                    <View style={styles.logoD}> 
                        <Image
                            style={{width: 140, height: 30,resizeMode: "contain",}}
                            source={{uri: this.state.data.logo}}
                        />
                    </View>
                </Body>

                <Right style={{marginRight:15}}>
                    <TouchableOpacity onPress={()=> this.props.navigation.openDrawer()}>
                        <Icon style={{ fontSize:22 }} type="FontAwesome" name="bars" />
                    </TouchableOpacity>
                </Right>
            </Header>
          <View>
            { this._getHeadInfoData()}
          </View>
          <ScrollView>
            { this._getSearchInfoData()}
          </ScrollView>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  spinner: {
    marginBottom: 50
  },
  loginHeader:{
    backgroundColor: '#ffffff',
    borderBottomColor: '#333',
    borderBottomWidth: 2,
  },
  logoD:{
      width:'100%',
      justifyContent:'center', 
      alignItems:'center',
  },
  logoImage:{
      resizeMode: "contain",
      width: 140, 
      justifyContent:'center', 
      alignItems:'center',
  },
  searchtourtext:{
    color: '#ffffff',
    fontSize:16,
    fontFamily: 'Montserrat-SemiBold',
  },
  searchtour:{
      backgroundColor:'#003B93',      
      // justifyContent:'center',
      alignItems:'center',
      height:50
  },
  departureView: {
    flexDirection:'row',
    backgroundColor:'#ffffff', 
    borderBottomWidth:1, 
    borderBottomColor:'#e3e3e3'
  },
  AllDataVal : {
    width:'94%', 
    marginLeft:'3%', 
    marginVertical:15,
    borderWidth:2, 
    borderColor:'#e3e3e3'
  },
  depCont : {
    flex:1, 
    borderRightWidth:2, 
    borderRightColor:'#e3e3e3' 
  },
  depText : { 
    marginVertical:10,
    marginHorizontal: 15,
    justifyContent:'center',
    fontFamily: 'Montserrat-SemiBold',
    fontSize:14
  },
  firstTextVal : { 
    marginVertical:10,
    marginHorizontal: 15,
    justifyContent:'center',
    fontFamily: 'Montserrat-Regular',
    fontSize:14
  },
  secondTextVal: { 
    marginHorizontal: 15,
    marginVertical:10,
    justifyContent:'center',
    fontFamily: 'Montserrat-Regular',
    fontSize:14
  },
  bookbtn: {
    marginVertical:13,
    backgroundColor:'#5B69BC',
    color:'#fff', 
    paddingHorizontal:70, 
    paddingVertical:5, 
    fontFamily: 'Montserrat-SemiBold',
    fontSize:16,
    justifyContent: 'center',
    alignItems:'center'
  }
})
