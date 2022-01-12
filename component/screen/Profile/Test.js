import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, TouchableOpacity, ScrollView } from 'react-native'
import { Container, Header,Body , Right, Icon, Picker} from 'native-base'
import axios from 'axios'
import Spinner from 'react-native-spinkit'
export default class JourneyDetails extends Component {

  constructor(props){
    super(props)

    this.state = {
      data : this.props.navigation.state.params.data,
      searchdataInfo : '',
      index: 0,
      size: 80,
      color: "#324191",
    }
  }

  componentDidMount = () =>{

          axios.get(`http://go.seat2u.com/Api/search?start_point=${this.state.data.startPointVal}&end_point=${this.state.data.endPointVal}&date=${this.state.data.chosenDate}&fleet_type=${this.state.data.fleetsData}`)
            .then(res => {
                this.setState({
                    ...this.state,
                    searchdataInfo : res.data.response
                })
            })
            .catch(err => console.log(err.response))

  }

  _seatplan = (val) =>{
    const day = this.state.searchdataInfo.date
    const fleetType = this.state.searchdataInfo.fleet_type
    this.props.navigation.navigate('seatplan', {data : val, day :day, fleetType : fleetType, userDat : this.state})
    //console.log(val+ ' ' +day + ' ' + fleetType)
  }

  _getHeadInfoData = () => {
    if(this.state.searchdataInfo == ''){
      return <View>
                
      </View>
    }else{
      const routeName = <View style={styles.searchtour}>
        <Text style={styles.searchtourtext}>{this.state.searchdataInfo.route_name == null ? 'No Route Available' : this.state.searchdataInfo.route_name.toUpperCase()}</Text>
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
          return <View 
                  style={styles.AllDataVal}
                  key={i}>

                    <View style={styles.departureView}>
                      <View style={styles.depCont}>
                        <Text style={styles.depText}>Departure</Text>
                      </View>

                      <View style={{flex:1}}>
                        <Text style={styles.firstTextVal}>{ value.start }</Text>
                        <Text style={styles.secondTextVal}>{ value.pickup_trip_location }</Text>
                      </View>
                    </View>

                    <View style={styles.departureView}>
                      <View style={styles.depCont}>
                        <Text style={styles.depText}>Duration</Text>
                      </View>

                      <View style={{flex:1}}>
                        <Text style={styles.firstTextVal}>{ value.duration }</Text>
                      </View>
                    </View>

                    <View style={styles.departureView}>
                      <View style={styles.depCont}>
                        <Text style={styles.depText}>Distance</Text>
                      </View>

                      <View style={{flex:1}}>
                        <Text style={styles.firstTextVal}>{ value.distance }</Text>
                      </View>
                    </View>

                    <View style={styles.departureView}>
                      <View style={styles.depCont}>
                        <Text style={styles.depText}>Arrival</Text>
                      </View>

                      <View style={{flex:1}}>
                        <Text style={styles.firstTextVal}>{ value.end }</Text>
                        <Text style={styles.secondTextVal}>{ value.drop_trip_location }</Text>
                      </View>
                    </View>

                    <View style={styles.departureView}>
                      <View style={styles.depCont}>
                        <Text style={styles.depText}>Adult Fate</Text>
                      </View>

                      <View style={{flex:1}}>
                        <Text style={styles.firstTextVal}>{ value.price }</Text>
                      </View>
                    </View>

                    <View style={styles.departureView}>
                      <View style={styles.depCont}>
                        <Text style={styles.depText}>Children Fare</Text>
                      </View>

                      <View style={{flex:1}}>
                        <Text style={styles.firstTextVal}>{ value.children_price }</Text>
                      </View>
                    </View>

                    <View style={styles.departureView}>
                      <View style={styles.depCont}>
                        <Text style={styles.depText}>Special Price</Text>
                      </View>

                      <View style={{flex:1}}>
                        <Text style={styles.firstTextVal}>{ value.special_price }</Text>
                      </View>
                    </View>

                    <View style={{flexDirection:'row',backgroundColor:'#ffffff'}}>
                      <View style={styles.depCont}>
                        <Text style={styles.depText}>Operator</Text>
                      </View>

                      <View style={{flex:1}}>
                        <TouchableOpacity onPress={()=> this._seatplan(value)}>
                            <Text style={styles.bookbtn}>Book</Text>
                        </TouchableOpacity>

                        <Text style={[styles.secondTextVal, {color:'green'}]}>{ value.fleet_seats } Seats Available</Text>
                      </View>
                    </View>

                </View>
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
                            style={styles.logoImage}
                            source={require('../../assets/logo.png')}
                        />
                    </View>
                </Body>

                <Right style={{marginRight:15}}>
                    <TouchableOpacity>
                        <Icon type="FontAwesome" name="ellipsis-v" />
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
      height:30,
      justifyContent:'center', 
      alignItems:'center',
  },
  searchtourtext:{
    color: '#ffffff',
    fontSize:20,
    fontFamily: 'Aleo-Bold',
  },
  searchtour:{
      backgroundColor:'#003B93',      
      justifyContent:'center',
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
    width:'96%', 
    marginLeft:'2%', 
    marginVertical:15,
    borderWidth:4, 
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
    fontFamily: 'Aleo-Bold',
    fontSize:17
  },
  firstTextVal : { 
    marginVertical:10,
    marginHorizontal: 15,
    justifyContent:'center',
    fontFamily: 'Aleo-Bold',
    fontSize:17
  },
  secondTextVal: { 
    marginLeft:15 , 
    marginBottom:15, 
    justifyContent:'center',
    fontFamily: 'Aleo-Bold',
    fontSize:17
  },
  bookbtn: {
    marginVertical:10,
    marginHorizontal: 15,
    backgroundColor:'#5B69BC',
    color:'#fff', 
    paddingHorizontal:17, 
    paddingVertical:5, 
    width:80,
    fontFamily: 'Aleo-Bold',
    fontSize:17
  }
})









// ! PickUp






import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import { Container, Header,Body , Right, Icon, Content, Picker,DatePicker} from 'native-base'

import SplashScreen from 'react-native-smart-splash-screen'
const Item = Picker.Item

export default class PickUp extends Component {

    constructor(props){
        super(props)

        this.state = {
            data : this.props.navigation.state.params.data,
            infoData : this.props.navigation.state.params.userInfo,

            pickupData : '',
            dropData : '',

            adult : '',
            child : '',
            special : '',
            offer : ''
        }
    }

    componentDidMount = () => {
        //SplashScreen.close
        SplashScreen.close({
          animationType: SplashScreen.animationType.scale,
          duration: 1100,
          delay: 600,
        })
    }

    _getpickupData = () => {
        return this.state.data.stopages.map( (data , i) => {
            return  <Item key={'f' + i} label={data} value={data} />
        })
    }

    onpickupValueChange (value) {
        this.setState({
            ...this.state,
            pickupData : value
        });
    }

    ondropValueChange (value) {
        this.setState({
            ...this.state,
            dropData : value
        });
    }

    onChanged(text){
        let newText = '';
        let numbers = '0123456789';
    
        for (var i=0; i < text.length; i++) {
            if(numbers.indexOf(text[i]) > -1 ) {
                newText = newText + text[i];
            }
            else {
                // your call back function
                alert("please enter numbers only");
            }
        }
        this.setState({ adult : newText });
    }

    onChilsChanged(text){
        let newText = '';
        let numbers = '0123456789';
    
        for (var i=0; i < text.length; i++) {
            if(numbers.indexOf(text[i]) > -1 ) {
                newText = newText + text[i];
            }
            else {
                // your call back function
                alert("please enter numbers only");
            }
        }
        this.setState({ child : newText });
    }

    onSpecialChanged(text){
        let newText = '';
        let numbers = '0123456789';
    
        for (var i=0; i < text.length; i++) {
            if(numbers.indexOf(text[i]) > -1 ) {
                newText = newText + text[i];
            }
            else {
                // your call back function
                alert("please enter numbers only");
            }
        }
        this.setState({ special : newText });
    }

    render() {
        return (
            <Container style={{backgroundColor: '#F9F9F9'}}>
    
            <Header style={styles.loginHeader}>
                <Body>
                    <View style={styles.logoD}>
                        <Image
                            style={styles.logoImage}
                            source={require('../../assets/logo.png')}
                        />
                    </View>
                </Body>
    
                <Right style={{marginRight:15}}>
                    <TouchableOpacity>
                        <Icon type="FontAwesome" name="ellipsis-v" />
                    </TouchableOpacity>
                </Right>
            </Header>
            
            <View style={styles.searchtour}>
                <Text style={styles.searchtourtext}>Pick Up & Drop</Text>
            </View>

            <ScrollView>
                <View style={styles.AllDataVal}>
                    
                    <View style={{marginBottom:10}}>
                        <View style={{marginBottom:8}}>
                            <Text style={styles.locationDet}>Pickup Location</Text>
                        </View>

                        <View style={{borderWidth:2, borderColor:'#e3e3e3'}}>
                                <Picker
                                    mode='dropdown'
                                    selectedValue={this.state.pickupData}
                                    onValueChange={this.onpickupValueChange.bind(this)}
                                    >
                                    <Item key='k' label='Select Your Pickup location' value='' />
                                    { this._getpickupData() }
                                </Picker>
                        </View>
                    </View>

                    <View style={{marginBottom:10}}>
                        <View style={{marginBottom:8}}>
                            <Text style={styles.locationDet}>Drop Location</Text>
                        </View>

                        <View style={{borderWidth:2, borderColor:'#e3e3e3'}}>
                                <Picker
                                    mode='dropdown'
                                    selectedValue={this.state.dropData}
                                    onValueChange={this.ondropValueChange.bind(this)}
                                    >
                                    <Item key='k' label='Select Your Pickup location' value='' />
                                    { this._getpickupData() }
                                </Picker>
                        </View>
                    </View>

                    <View style={{flexDirection:'row',marginBottom:10, }}>

                        <View style={{flex:1}}>
                            <View style={{marginBottom:8}}>
                                <Text style={styles.locationDet}>Adult</Text>
                            </View>

                            <View style={{paddingHorizontal:3}}>
                                <View style={{borderWidth:2, borderColor:'#e3e3e3'}}>
                                    <TextInput 
                                        style={styles.textInput}
                                        keyboardType='numeric'
                                        onChangeText={(text)=> this.onChanged(text)}
                                        value={this.state.adult}
                                        maxLength={3}  //setting limit of input
                                        />
                                </View>
                            </View>
                        </View>

                        <View style={{flex:1}}>
                            <View style={{marginBottom:8}}>
                                <Text style={styles.locationDet}>Child</Text>
                            </View>

                            <View style={{paddingHorizontal:3}}>
                                <View style={{borderWidth:2, borderColor:'#e3e3e3'}}>
                                    <TextInput 
                                        style={styles.textInput}
                                        keyboardType='numeric'
                                        onChangeText={(text)=> this.onChilsChanged(text)}
                                        value={this.state.child}
                                        maxLength={3}  //setting limit of input
                                        />
                                </View>
                            </View>
                        </View>

                        <View style={{flex:1}}>
                            <View style={{marginBottom:8}}>
                                <Text style={styles.locationDet}>Special</Text>
                            </View>

                            <View style={{paddingHorizontal:3}}>
                                <View style={{borderWidth:2, borderColor:'#e3e3e3'}}>
                                    <TextInput 
                                    style={styles.textInput}
                                    keyboardType='numeric'
                                    onChangeText={(text)=> this.onSpecialChanged(text)}
                                    value={this.state.special}
                                    maxLength={3}  //setting limit of input
                                    />
                                </View>
                            </View>
                        </View>

                    </View>

                    <View style={{marginBottom:10}}>
                        <View style={{marginBottom:8}}>
                            <Text style={styles.locationDet}>Offer Code</Text>
                        </View>

                        <View style={{borderWidth:2, borderColor:'#e3e3e3'}}>
                        <TextInput 
                            style={styles.textInput}
                            onChangeText={(text)=> this.setState({offer : text})}
                            value={this.state.offer}
                            maxLength={10}  //setting limit of input
                            />
                        </View>
                    </View>
                    
                    <View>
                        <TouchableOpacity 
                            style={styles.searchtour}
                            onPress={()=> this.props.navigation.navigate('passenger', { pickup : this.state})}
                            >
                            <Text style={styles.searchtourtext}>CONTINUE</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </ScrollView>
    
        </Container>
        )
    }
}
    
const styles = StyleSheet.create({
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
        fontSize:20,
        fontFamily: 'Aleo-Bold',
    },
    searchtour:{
        backgroundColor:'#003B93',      
        justifyContent:'center',
        alignItems:'center',
        height:50
    },
    AllDataVal : {
        width:'92%', 
        marginLeft:'4%', 
        marginVertical:15,
    },
    locationDet:{
        fontSize:18,
        fontFamily: 'Aleo-Bold',
        marginLeft:7
    },
    textInput:{
        paddingHorizontal:15,
        fontSize:17,
        backgroundColor:'#ffffff'
    },
    searchtourtext:{
        color: '#ffffff',
        fontSize:20,
        fontFamily: 'Aleo-Bold',
    },
    searchtour:{
        backgroundColor:'#003B93',      
        justifyContent:'center',
        alignItems:'center',
        height:50
    },
})








//! SeatPlan


import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, TouchableOpacity, ListView, FlatList, ScrollView } from 'react-native'
import { Container, Header,Body , Right, Icon, Content, Picker,DatePicker} from 'native-base'

import axios from 'axios'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Spinner from 'react-native-spinkit'

export default class SeatPlan extends Component {

    constructor(props){
        super(props)

        this.state = {
            data : this.props.navigation.state.params.data,
            day : this.props.navigation.state.params.day,
            fleetType : this.props.navigation.state.params.fleetType,
            seatdataInfo : '',
            userDat :this.props.navigation.state.params.userDat,
            colorChangeItem : false,

            index: 0,
            size: 70,
            color: "#324191",
        }
    }

    componentDidMount = () => {
        this._getSeatPan()

        console.log(this.state.seatdataInfo)
    }

    _getSeatPan = () => {
        axios.get(`http://softest8.bdtask.com/bus_demo_v5/Api/findBookingInformation?route=${this.state.data.route}&trip_id_no=${this.state.data.trip_id_no}&booking_date=${this.state.day}&type=${this.state.fleetType}`)
            .then(res => {
                console.log(res.data)
                this.setState({
                    ...this.state,
                    seatdataInfo : res.data.response
                })
            })
            .catch(err => console.log(err.response))
    }

    _getLeftSeatData = () => {
        if(this.state.seatdataInfo == ''){
            return <View></View>
        }else{
            return <FlatList
            data={this.state.seatdataInfo.leftsite}
            renderItem={({item}) => this.getsetDesignView(item)}
            numColumns={2}
            keyExtractor={(item, index) => index.toString()}
            />
        }
    }

    _getRightSeatData = () => {
        if(this.state.seatdataInfo == ''){
            return <View></View>
        }else{
            return <FlatList
            data={this.state.seatdataInfo.right}
            renderItem={({item}) => this.getsetDesignView(item)}
            numColumns={2}
            keyExtractor={(item, index) => index.toString()}
            />
        }
    }

    getsetDesignView = (item) =>{
        if(item.status == 'Free'){
            return <View>
                    <TouchableOpacity
                         style={{padding:15, justifyContent:'center', alignItems:'center'}}
                        onPress={()=> {
                            console.log(this.state.colorChangeItem)}}>
                        <Text 
                            style={{color: 'blue',fontSize:13}}>
                            {item.name}
                        </Text>
                        <FontAwesome5
                            name={'chair'} 
                            size={40} 
                            color='#003B93' 
                            />
                    </TouchableOpacity>
                </View>
        }else{
            return <View style={{padding:15, justifyContent:'center', alignItems:'center'}}>
                    <Text 
                        style={{color: 'red',fontSize:13}}>
                        {item.name}
                    </Text>
                    <FontAwesome5 
                        // style={{ backgroundColor : this.state.colorChangeItem == false ? 'green': 'red' }}
                        // opacity={0.4}
                        name={'chair'} 
                        size={40} 
                        color="red"
                        />
                    </View>
        }
    }

    _getDataPrice = () => {

        if(this.state.seatdataInfo == ''){
            return <View style={{ alignItems:'center', paddingVertical:160}}>
            <Spinner 
            style={styles.spinner}
            size={this.state.size} 
            type={'ChasingDots'} 
            color={this.state.color} />
        </View>
        }else{
            return <View style={[styles.AllDataVal,{marginBottom:20}]}>
                <View style={{flexDirection:'row',padding:10, backgroundColor:'#003B93',}}>
                        <Text style={{flex:2,fontFamily: 'Aleo-Bold',fontSize:17,alignItems:'flex-start', justifyContent:'flex-start', color:'#fff'}}>{'Adult Price'.toUpperCase()}</Text>
                        <Text style={{flex:1, fontFamily: 'Aleo-Bold',fontSize:17,alignItems:'flex-end', justifyContent:'flex-end',color:'#fff'}}>{':  ' + this.state.seatdataInfo.prices.price }  </Text>
                    </View>
                    <View style={{flexDirection:'row',padding:10, backgroundColor:'#003B93',}}>
                        <Text style={{flex:2,fontFamily: 'Aleo-Bold',fontSize:17,alignItems:'flex-start', justifyContent:'flex-start', color:'#fff'}}>{'Child  Price'.toUpperCase()}</Text>
                        <Text style={{flex:1, fontFamily: 'Aleo-Bold',fontSize:17,alignItems:'flex-end', justifyContent:'flex-end',color:'#fff'}}>{':  ' + this.state.seatdataInfo.prices.children_price }  </Text>
                    </View>
                    <View style={{flexDirection:'row',padding:10, backgroundColor:'#003B93',}}>
                        <Text style={{flex:2,fontFamily: 'Aleo-Bold',fontSize:17,alignItems:'flex-start', justifyContent:'flex-start', color:'#fff'}}>{'Special Price'.toUpperCase()}</Text>
                        <Text style={{flex:1, fontFamily: 'Aleo-Bold',fontSize:17,alignItems:'flex-end', justifyContent:'flex-end',color:'#fff'}}>{':  ' + this.state.seatdataInfo.prices.special_price }  </Text>
                    </View>
                    <View style={{flexDirection:'row',padding:10, backgroundColor:'#003B93',}}>
                        <Text style={{flex:2,fontFamily: 'Aleo-Bold',fontSize:17,alignItems:'flex-start', justifyContent:'flex-start', color:'#fff'}}>{'Group Price (min 3)'.toUpperCase()}</Text>
                        <Text style={{flex:1, fontFamily: 'Aleo-Bold',fontSize:17,alignItems:'flex-end', justifyContent:'flex-end',color:'#fff'}}>{':  ' + this.state.seatdataInfo.prices.group_price_per_person }  </Text>
                    </View>
            </View>
        }
    }

    render() {
        return (
            <Container style={{backgroundColor: '#F9F9F9'}}>

            <Header style={styles.loginHeader}>
                <Body>
                    <View style={styles.logoD}>
                        <Image
                            style={styles.logoImage}
                            source={require('../../assets/logo.png')}
                        />
                    </View>
                </Body>

                <Right style={{marginRight:15}}>
                    <TouchableOpacity>
                        <Icon type="FontAwesome" name="ellipsis-v" />
                    </TouchableOpacity>
                </Right>
            </Header>

            <ScrollView>
                <View style={styles.searchtour}>
                    <Text style={styles.searchtourtext}>Tap to Select Your Seat</Text>
                </View>

                <View style={styles.AllDataVal}>
                    <View style={{flexDirection:'row',padding:10, backgroundColor:'#003B93',}}>
                        <Text style={{flex:2,fontFamily: 'Aleo-Bold',fontSize:17,alignItems:'flex-start', justifyContent:'flex-start', color:'#fff'}}>{'Seat Layout'.toUpperCase()}</Text>
                        <Text style={{flex:1, fontFamily: 'Aleo-Bold',fontSize:17,alignItems:'flex-end', justifyContent:'flex-end',color:'#fff'}}>{this.state.data.fleet_seats + '  Seats'.toUpperCase() }  </Text>
                    </View>
                </View>

                <View style={{flexDirection:'row' , marginBottom:20}}>
                    <View style={{flex:1,alignItems:'flex-start',paddingLeft:12}}>
                        { this._getLeftSeatData() }
                    </View>
                    <View style={{flex:1,justifyContent:'flex-end', alignItems:'flex-end',paddingRight:18}}>
                        { this._getRightSeatData() }
                    </View>
                </View>

                
                {this._getDataPrice()}
                

                <TouchableOpacity 
                    style={styles.searchtour}
                    onPress={() => this.props.navigation.navigate('pickUp', {data : this.state.seatdataInfo, userInfo : this.state})}>
                    <View><Text style={styles.searchtourtext}>Continue</Text></View>
                </TouchableOpacity>
            </ScrollView>
      </Container>
        )
    }
}

const styles = StyleSheet.create({
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
    fontSize:20,
    fontFamily: 'Aleo-Bold',
    },
    searchtour:{
        backgroundColor:'#003B93',      
        justifyContent:'center',
        alignItems:'center',
        height:50
    },
    AllDataVal : {
    width:'96%', 
    marginLeft:'2%', 
    marginVertical:15,
    borderWidth:4, 
    borderColor:'#e3e3e3'
    },
})
