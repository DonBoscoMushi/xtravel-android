import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, TouchableOpacity, ScrollView, Alert, TextInput } from 'react-native'
import { Header,Body , Right, Icon, Button} from 'native-base'
import AsyncStorage from '@react-native-community/async-storage';
import IconS from 'react-native-vector-icons/FontAwesome5'
import Spinner from 'react-native-spinkit'
import NetInfo from "@react-native-community/netinfo";
import base_url from '../base_url'

export default class BookingList extends Component {
    _isMounted = false;
    constructor(props){
        super(props)
        this.state = {
            title :'UB Compartilhado',
            active : true,
            logo : '',
            BookingData:[],
            size: 90,
            base_url : base_url,
            color: "#324191"
        }
    }

    componentDidMount = () =>{
        this._isMounted = true;  
        AsyncStorage.getItem('state_data', (error, res) => {
            let d = JSON.parse(res)
            this.setState({
                logo : d.logo,
                })
        })
        this._GetBookingApiData()
        this._GetBookingList()
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    _GetBookingApiData = ()=>{
        NetInfo.fetch().then(state=>{
            if(state.isConnected){
                AsyncStorage.getItem('user_data', (error, resData) => {
                    let p = JSON.parse(resData)
                    if(p != null){
                        fetch(`${this.state.base_url}Api/user_booking?userid=${p.id_no}`,{
                            method:'GET', 
                        })
                        .then(response=>response.json())
                        .catch(error=>console.log(error))
                        .then(res=>{
                            if(res.response.status == 'Ok'){
                                this.setState({
                                    BookingData:res.response.booking
                                })
                            }else{
                                this.setState({
                                    BookingData:null
                                })
                            }
                        })
                    }
                })
            }else{
                Alert.alert(
                    this.state.title,
                    'please Check Your Data Connection',
                    [
                      {text: 'OK'}
                    ],
                    { cancelable: false }
                  )
            }
        })
    }

    _GetBookingList = ()=>{
        if(this.state.BookingData == ''){
            return <View style={{marginTop:270, alignItems:'center'}}>
                        <Spinner 
                            style={styles.spinner}
                            size={this.state.size} 
                            type={'ThreeBounce'} 
                            color={this.state.color}
                        />
                    </View>
        }
        // if(this.state.BookingData.length == 0){
        //     return  <View style={{marginTop:270, alignItems:'center'}}>
        //                 <Text>Booking List Not Found</Text>
        //             </View>
        // }
        else{
            if(this.state.BookingData == null){
                return  <View style={{marginTop:270, alignItems:'center'}}>
                            <Text>Booking List Not Found</Text>
                        </View>
            }else{
                return  this.state.BookingData.map((data,i)=>{
                    return  <View key={i} style={{ flexDirection:'row',backgroundColor:(i%2 == 0) ? '#d3d3d3' : '#ddd',paddingHorizontal:10,paddingVertical:10  }}>
                                <View style={{ flex:5,backgroundColor:(i%2 == 0) ? '#d3d3d3' : '#ddd',alignItems:'center',justifyContent:'center',}}>
                                    <Text style={{ color:'#003B93',fontSize:16}} >{data.date}</Text>
                                </View>
                                <View style={{ flex:4,backgroundColor:(i%2 == 0) ? '#d3d3d3' : '#ddd',alignItems:'center',justifyContent:'center',}}>
                                    <Text style={{ alignItems:'center',color:'#003B93',fontSize:16}}>{data.firstname}</Text>
                                </View>
                                <View style={{ flex:3,backgroundColor:(i%2 == 0) ? '#d3d3d3' : '#ddd',alignItems:'center',justifyContent:'center',}}>
                                <TouchableOpacity onPress={()=> this.props.navigation.navigate('ViewBooking',{data:data}) }>
                                        <View style={{ flexDirection:'row' }}> 
                                            <IconS name="eye" style={{ fontSize:15,color:'#003B93',marginRight:5,marginTop:4 }} />
                                            <Text style={{  alignItems:'center',color:'#003B93',fontSize:16 }}>View</Text>
                                        </View>
                                </TouchableOpacity>
                                </View>
                            </View>
                })
            }
        }
    }

    render() {
        return (
            <View style={{flex:1}}>
                    <Header style={styles.loginHeader}>
                        <Body>
                            <View style={styles.logoD}>
                                <Image
                                    style={{width: 140,height: 30}}
                                    source={{uri:this.state.logo}}
                                />
                            </View>
                        </Body>
        
                        <Right style={{marginRight:15}}>
                            <TouchableOpacity onPress={()=> this.props.navigation.openDrawer()}>
                                <Icon style={{ fontSize:22 }} type="FontAwesome" name="bars" />
                            </TouchableOpacity>
                        </Right>
                    </Header>
        
                    <View style={{ flex:1,backgroundColor:'#fff'}}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View style={{ flexDirection:'row',backgroundColor:'#003B93',paddingHorizontal:5,paddingVertical:10 }}>
                                <View style={{ flex:5,alignItems:'center',justifyContent:'center',}}>
                                    <Text style={{ alignItems:'center',color:'#fff',fontWeight:'bold',fontSize:16}} >Date & Time</Text>
                                </View>
                                <View style={{ flex:4,alignItems:'center',justifyContent:'center',}}>
                                    <Text style={{ alignItems:'center',color:'#fff',fontWeight:'bold',fontSize:16}}>Name</Text>
                                </View>
                                <View style={{ flex:3,alignItems:'center',justifyContent:'center',}}>
                                    <View style={{ flexDirection:'row' }}> 
                                        <Text style={{  alignItems:'center',color:'#fff',fontWeight:'bold',fontSize:16 }}>List View</Text>
                                    </View>
                                </View>
                            </View>
                            <View>
                                {
                                    this._GetBookingList()
                                }
                            </View>
                        </ScrollView>
                    </View>
                </View>
        );
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
})

