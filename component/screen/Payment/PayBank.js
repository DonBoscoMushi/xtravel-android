import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, TouchableOpacity, ScrollView, TextInput,Alert } from 'react-native'
import { Container, Header,Body , Right, Icon, Picker,Button} from 'native-base'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios'

const icon = (<FontAwesome5 name={'chevron-right'} size={40} color="#EFF5FF" />);
const Item = Picker.Item

export default class PayBank extends Component {

    constructor(props){
        super(props)

        this.state = {
            allDataInfo : this.props.navigation.state.params.allData,
            settings : this.props.navigation.state.params.settings,
            isChecked : false,
            formData : '',

            tran : '',
            bank: '',
            fullName : this.props.navigation.state.params.allData.allDataInfo.allinfoData.data.infodata.data.userDa.firstname,
            lastname : this.props.navigation.state.params.allData.allDataInfo.allinfoData.data.infodata.data.userDa.lastname
        }

        // console.log(this.state.allDataInfo.allDataInfo.bookid)
    }

    _getpickupData = () => {
        return this.state.allDataInfo.allDataInfo.resp.bankinfo.map( (data , i) => {
            return  <Item key={'c' + data.id} label={data.bank_name} value={data.id} />
        })
    }


    _confirmBooking = () =>{
        if(this.state.tran == '' || this.state.bank == ''){
            Alert.alert(
                this.state.settings.settings.title,
                this.state.settings.bank_booking_message,
                [
                  {},
                  {},
                  {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                { cancelable: false }
              )
        }else{
            axios.get(`${this.state.settings.base_url}Api/BankBooking?booking_id_no=${this.state.allDataInfo.allDataInfo.bookid}&bank_id=${this.state.bank}&tran_num=${this.state.tran}`)
            .then(res => {
                Alert.alert(
                    this.state.settings.settings.title,
                    this.state.settings.your_booking_complete,
                    [
                      {},
                      {},
                      {text: 'OK', onPress: () => this.props.navigation.navigate('profile', { userDa : this.props.navigation.state.params.allData.allDataInfo.allinfoData.data.infodata.data.userDa})},
                    ],
                    { cancelable: false }
                  )
                setTimeout(() => {
                    this.props.navigation.navigate('profile', {settings : this.state.settings, userDa : this.props.navigation.state.params.allData.allDataInfo.allinfoData.data.infodata.data.userDa})
                },8000)
            })
            .catch(err => console.log(err.response))
        }
    }

    ondropValueChange (value) {
        this.setState({
            ...this.state,
            bank : value
        });
    }

    _getbankdet = () =>{
        return this.state.allDataInfo.allDataInfo.resp.bankinfo.map( (data , i) => {
            if(data.id == this.state.bank){
                return <View key={i} style={{marginLeft:7}}>
                            <View>
                                <View style={{flexDirection:'row', paddingBottom:5}}>
                                    <Text style={[styles.detailsjpData,{fontFamily: 'Montserrat-SemiBold',flex:2}]}>{this.state.settings.bank_name}</Text>
                                    <Text style={[styles.detailsjpData,{fontFamily: 'Montserrat-Regular',flex:3}]}>:  {data.bank_name}</Text>
                                </View>

                                <View style={{flexDirection:'row', paddingBottom:5}}> 
                                    <Text style={[styles.detailsjpData,{fontFamily: 'Montserrat-SemiBold',flex:2}]}>{this.state.settings.account_name}</Text>
                                    <Text style={[styles.detailsjpData,{fontFamily: 'Montserrat-Regular',flex:3}]}>: {data.account_name} </Text>
                                </View>

                                <View style={{flexDirection:'row'}}>
                                    <Text style={[styles.detailsjpData,{fontFamily: 'Montserrat-SemiBold',flex:2}]}>{this.state.settings.account_number}</Text>
                                    <Text style={[styles.detailsjpData,{fontFamily: 'Montserrat-Regular',flex:3}]}>: {data.account_number} </Text>
                                </View>

                            </View>
                        </View>
            }
        })
    }
    
  render() {
    return (

        <View style={{flex: 1,backgroundColor: '#F9F9F9'}}>
            <View style={{flex:9}}>
            <Container style={{backgroundColor: '#F9F9F9'}}>

                <Header style={styles.loginHeader}>
                    <Body>
                        <View style={styles.logoD}>
                            <Image
                                style={{width: 140, height: 50,resizeMode: "contain",}}
                                source={{uri: this.state.allDataInfo.allDataInfo.allinfoData.data.infodata.data.logo}}
                            />
                        </View>
                    </Body>

                    <Right style={{marginRight:15}}>
                        <TouchableOpacity onPress={()=> this.props.navigation.openDrawer()}>
                            <Icon style={{ fontSize:22 }} type="FontAwesome" name="bars" />
                        </TouchableOpacity>
                    </Right>
                </Header>

                <View style={[styles.searchtour,{flexDirection:'row'}]}>

                <View style={{flex:2}}>
                <Button transparent onPress={()=> this.props.navigation.navigate('pay')}>
                        <Icon style={{color:'#fff'}} name='arrow-back' />
                    </Button>
                          </View>
                          <View style={{flex:14}}>
                          <Text style={[styles.searchtourtext]}>{this.state.settings.bank_transfer}</Text>
                        </View>
                
                </View>

                <ScrollView>

                <View style={styles.container}>

                    <View style={{width:'92%', marginLeft:'4%'}}>

                    { (this.state.bank != '') ? <View style={{marginBottom:10}}>
                            <View style={{marginBottom:8}}>
                                <Text style={[styles.locationDet,{color:'#003B93', marginBottom:10}]}>{this.state.settings.bank_information} :</Text>
                                {this._getbankdet()}
                            </View>
                        </View> 
                        : <View><Text style={{color:'#003B93', fontSize:16, marginBottom:20,fontFamily: 'Montserrat-SemiBold',marginLeft:7}}>{this.state.settings.select_your_bank_first}</Text></View> }
                        

                        <View style={{marginBottom:10}}>
                            <View style={{marginBottom:8}}>
                                <Text style={styles.locationDet}>{this.state.settings.select_bank_name}</Text>
                            </View>

                            <View style={{borderWidth:2, borderColor:'#fff', backgroundColor:'#fff'}}>
                                    <Picker
                                        mode='dropdown'
                                        selectedValue={this.state.bank}
                                        onValueChange={this.ondropValueChange.bind(this)}
                                        >
                                        <Item key='0' label={this.state.settings.select_bank_name} value='' />
                                        { this._getpickupData() }
                                    </Picker>
                            </View>
                        </View>

                        <View style={styles.inputbox}>
                        <Icon type="FontAwesome"  style={styles.fontIcon} name='envelope' />
                        <TextInput
                            style={styles.inpBox}
                            onChangeText={(tran) => this.setState({tran})}
                            autoCapitalize="none"
                            placeholder = {this.state.settings.transaction_id}
                            value={this.state.tran}
                        />
                        </View>

                        <View style={{borderWidth:2, borderColor:'#e3e3e3',paddingHorizontal:10, paddingVertical:15, marginTop:15}}>
                            <View style={{flexDirection:'row', paddingBottom:5}}>
                                <Text style={[styles.detailsjpData,{fontFamily: 'Montserrat-SemiBold',flex:2}]}>{this.state.settings.full_name}</Text>
                                <Text style={[styles.detailsjpData,{fontFamily: 'Montserrat-Regular',flex:3}]}>:  {this.state.fullName + ' ' +this.state.lastname}</Text>
                            </View>

                            <View style={{flexDirection:'row', paddingBottom:5}}> 
                                <Text style={[styles.detailsjpData,{fontFamily: 'Montserrat-SemiBold',flex:2}]}>{this.state.settings.total_price}</Text>
                                <Text style={[styles.detailsjpData,{fontFamily: 'Montserrat-Regular',flex:3}]}>: {this.state.allDataInfo.allDataInfo .allinfoData.total} </Text>
                            </View>

                            <View style={{flexDirection:'row', paddingBottom:5}}>
                                <Text style={[styles.detailsjpData,{fontFamily: 'Montserrat-SemiBold',flex:2}]}>{this.state.settings.seat_n}</Text>
                                <Text style={[styles.detailsjpData,{fontFamily: 'Montserrat-Regular',flex:3}]}>: {this.state.allDataInfo.allDataInfo.resp.seat_numbers} </Text>
                            </View>

                            <View style={{flexDirection:'row'}}>
                                <Text style={[styles.detailsjpData,{fontFamily: 'Montserrat-SemiBold',flex:2}]}>{this.state.settings.booking_id}</Text>
                                <Text style={[styles.detailsjpData,{fontFamily: 'Montserrat-Regular',flex:3}]}>: {this.state.allDataInfo.allDataInfo.bookid} </Text>
                            </View>
                        </View>
                    </View>
                    
                </View>
                </ScrollView>
                </Container>
            </View>
            <View style={{flex:1,justifyContent:'flex-end',backgroundColor: '#F9F9F9'}}>
                <TouchableOpacity
                    style={[styles.searchtour,{justifyContent:'center',}]}
                    onPress={()=> 
                    this._confirmBooking()
                }>
                    <Text style={styles.searchtourtext}>{this.state.settings.confirm_booking}</Text>
                </TouchableOpacity>
            </View>
        </View>
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
        fontSize:16,
        fontFamily: 'Montserrat-SemiBold',
    },
    searchtour:{
        backgroundColor:'#003B93',      
        
        alignItems:'center',
        height:50
    },
    AllDataVal : {
        width:'92%', 
        marginLeft:'4%', 
        marginVertical:15,
    },
    locationDet:{
        fontSize:16,
        fontFamily: 'Montserrat-SemiBold',
        marginLeft:7,
        color: '#333'
    },
    payimg:{
        resizeMode: "contain",
        // width: (Dimensions.get('window').height <= '600' ? 120 : 200), 
        height:60,
        width:90,
        justifyContent:'center', 
        alignItems:'center',
        // marginBottom: (Dimensions.get('window').height <= '600' ? 0 : 30),
        backgroundColor : '#EFF5FF'
    },
    switch: {
      alignSelf: "center",
      marginTop: 20,
      marginBottom: 20,
    },
    container: {
      backgroundColor: "#F5F5F5",
      paddingVertical: 25,
    },
    label: {
      color: "black",
      fontSize: 12,
    },
    input: {
      fontSize: 16,
      color: "black",
    },
    inputbox:{
        flex:1,
        flexDirection: 'row',
        borderWidth: 2,
        borderColor: '#ececec',
        paddingVertical :5,
        borderRadius: 8,
        marginTop:10,
        backgroundColor:'#ffffff'
    },
    fontIcon:{
        fontSize: 20, 
        color: '#003B93',
        paddingVertical:10, 
        paddingHorizontal:15
    },
    inpBox: {
        height: 40, 
        borderColor: 'gray', 
        borderWidth: 0,  
        width: '100%', 
        fontSize:18, 
        color:'#000', 
        paddingHorizontal: 10, 
        marginTop:2
    },
    bankinfotext:{
        fontSize:16,
        fontFamily: 'Montserrat-SemiBold',
        marginBottom:7,
    }
})
