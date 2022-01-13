import React, { Component } from 'react'
import { Text, StyleSheet, View,TextInput,TouchableOpacity, Dimensions, Keyboard, Alert } from 'react-native'
import { Container, Header, Left, Body , Right, Icon, Title, Content, Button} from 'native-base'
import axios from 'axios'
export default class Registration extends Component {

  constructor(props){
    super(props)

    this.state = {
      firstname: '',
      lastname : '',
      email    : '',
      pass     : '',
      address     : '',
      phone : '',
      confirmP : '',
      nid      : '',
      logo : this.props.navigation.state.params.logo,
      settings : this.props.navigation.state.params.settings
    }
  }

  _regBus365 = () =>{
    // alert(this.state.fname + " "+this.state.lname + " "+this.state.email + " "+this.state.pass + " "+this.state.confirmP )

    if(this.state.firstname == '' || this.state.lastname == '' || this.state.email == '' || this.state.pass == '' || this.state.confirmP == ''){

      Alert.alert(
        this.state.settings.settings.title,
        '* ' + this.state.settings.required_field,
        [
          {},
          {},
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      )
      
  }else{

    if(this.state.pass != this.state.confirmP){
      
      Alert.alert(
        this.state.settings.settings.title,
        "Password & Confirm password doesn't match",
        [
          {},
          {},
          {text: 'OK', onPress: () => this.setState({...this.state, pass: '', confirmP:''})},
        ],
        { cancelable: false }
      )
    }else{
      axios.get(`${this.state.settings.base_url}Api/user_registration?firstname=${this.state.firstname}&lastname=${this.state.lastname}&email=${this.state.email}&password=${this.state.pass}&nid=${this.state.nid}&address=${this.state.address}&phone=${this.state.phone}`)
      .then( res  => {
          
        if(res.data.response.status == 'ok'){
            Alert.alert(
              this.state.settings.settings.title,
              res.data.response.message,
              [
                {},
                {},
                {text: 'OK', onPress: () => this.props.navigation.navigate('login')},
              ],
              { cancelable: false }
            )
            
            this.setState({
              address     : '',
              firstname: '',
              lastname : '',
              email    : '',
              pass     : '',
              confirmP : '',
              nid      : ''
            })
        }else{
            Alert.alert(
              this.state.settings.settings.title,
              res.data.response.message,
              [
                {},
                {},
                {text: 'OK', onPress: () => console.log('OK Pressed')},
              ],
              { cancelable: false }
            )
        }
          
          // console.log(res.data.response.status)
        })
      .catch( error => console.log(error.response) )
    }
    
      Keyboard.dismiss()
  }

  }

  render() {
    return (
      <Container>

        <Header style={styles.loginHeader}>
          <Left>
            <Button transparent onPress={()=> this.props.navigation.navigate('login')}>
              <Icon style={{color:'#FFF', paddingLeft:10}} name='arrow-back' />
            </Button>
          </Left>

          <Body>
            <Title style={{fontFamily:'Montserrat-SemiBold', fontSize:16, color:'#FFF'}}>Registration</Title>
          </Body>

          <Right></Right>
        </Header>

        <Content style={{backgroundColor:'#F9F9F9'}}>

          {/* <View style={styles.logoD}>
            <Image
               style={{width: 180, height: 50}}
               source={{uri: this.state.logo}}
            />
          </View> */}

          <View style={{width:'94%', marginLeft:'3%', marginTop:15}}>

            <View style={styles.inputbox}>
              <Icon type="FontAwesome" style={styles.fontIcon} name='user' />
              <TextInput
                style={styles.inpBox}
                onChangeText={(firstname) => this.setState({firstname})}
                // autoCapitalize="none"
                placeholder = {this.state.settings.first_name + ' *'}
                value={this.state.firstname}
              />
            </View>

            <View style={styles.inputbox}>
              <Icon type="FontAwesome" style={styles.fontIcon} name='user' />
              <TextInput
                style={styles.inpBox}
                onChangeText={(lastname) => this.setState({lastname})}
                // autoCapitalize="none"
                placeholder = {this.state.settings.last_name + ' *'}
                value={this.state.lastname}
              />
            </View>

            <View style={styles.inputbox}>
              <Icon type="FontAwesome" style={styles.fontIcon} name='envelope' />
              <TextInput
                style={styles.inpBox}
                onChangeText={(email) => this.setState({email})}
                autoCapitalize="none"
                placeholder = {this.state.settings.email + ' *'}
                value={this.state.email}
              />
            </View>

            <View style={styles.inputbox}>
              <Icon type="FontAwesome" style={styles.fontIcon} name='address-card' />
              <TextInput
                style={styles.inpBox}
                onChangeText={(address) => this.setState({address})}
                // autoCapitalize="none"
                autoCorrect={false}
                placeholder = {this.state.settings.address }
                value={this.state.address}
              />
            </View>

            <View style={styles.inputbox}>
              <Icon type="FontAwesome" style={styles.fontIcon} name='phone' />
              <TextInput
                style={styles.inpBox}
                onChangeText={(phone) => this.setState({phone})}
                // autoCapitalize="none"
                keyboardType='numeric'
                placeholder = {this.state.settings.phone }
                value={this.state.phone}
              />
            </View>

            <View style={styles.inputbox}>
              <Icon type="FontAwesome" style={styles.lockicon} name='book' />
              <TextInput
                style={styles.inpBox}
                keyboardType='numeric'
                onChangeText={(nid) => this.setState({nid})}
                autoCapitalize="none"
                placeholder = 'NID'
                value={this.state.nid}
              />
            </View>

            <View style={styles.inputbox}>
              <Icon type="FontAwesome" style={styles.lockicon} name='lock' />
              <TextInput
                style={styles.inpBox}
                onChangeText={(pass) => this.setState({pass})}
                secureTextEntry={true}
                autoCapitalize="none"
                placeholder = {this.state.settings.password + ' *'}
                value={this.state.pass}
              />
            </View>

            <View style={styles.inputbox}>
              <Icon type="FontAwesome" style={styles.lockicon} name='lock' />
              <TextInput
                style={styles.inpBox}
                onChangeText={(confirmP) => this.setState({confirmP})}
                secureTextEntry={true}
                autoCapitalize="none"
                placeholder = {this.state.settings.confirm_password + ' *'}
                value={this.state.confirmP}
              />
            </View>

            <TouchableOpacity 
              onPress={()=> this._regBus365()}
              style={styles.regbtn}>
              <Text style={styles.regtext}>{this.state.settings.registrantion }</Text>
            </TouchableOpacity>

          </View>
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  loginHeader:{
    backgroundColor: '#003B93'
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
  logoD:{
    width:'100%',
    justifyContent:'center', 
    alignItems:'center',
    height:80,
    marginBottom:15,
    marginTop: 15,
  },
  logoImage:{
    resizeMode: "contain",
    width: (Dimensions.get('window').height <= '600' ? 180 : 200), 
    justifyContent:'center', 
    alignItems:'center',
    marginBottom: (Dimensions.get('window').height <= '600' ? 0 : 60),
    marginTop: (Dimensions.get('window').height <= '600' ? 15 : 60)
  },
  fontIcon:{
    fontSize: 20, 
    color: '#003B93',
    paddingVertical:10, 
    width: 50,
    alignItems:'center',
    justifyContent:'center',
    textAlign:'center'
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
  regbtn:{
    backgroundColor:'#003B93',
    fontSize: 20,
    borderRadius: 8,
    marginTop:(Dimensions.get('window').height <= '600' ? 15 : 20),
    marginBottom:(Dimensions.get('window').height <= '600' ? 15 : 20),
    borderColor: '#003B93',
    borderWidth: 2,
    alignItems:"center"
  },
  regtext:{
    color:'#ffffff', 
    fontSize:16,
    paddingVertical:8,
    fontFamily: 'Montserrat-SemiBold',
  },
  lockicon:{
    fontSize: 20, 
    color: '#003B93',
    paddingVertical:10, 
    paddingHorizontal:19
  }
})
