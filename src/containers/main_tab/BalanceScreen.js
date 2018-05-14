/**
 * 模块名称：
 * 功能说明：
 * @Author: bin-donnie
 * @Date: 2018/4/27 下午11:16
 */


import React, {Component} from 'react';
import {
    View,
    Image,
    Text,
    ImageBackground,
    TouchableOpacity,
    Platform,
    ScrollView,
    DeviceEventEmitter
} from 'react-native';
import Images from "../../theme/Images";
import {CommonStyle} from "../../theme/Styles";
import Colors from "../../theme/Colors";
import CurrentUser from "../../global/CurrentUser";
import DeviceUtil from "../../utils/DeviceUtil";
import NavUtil from "../../utils/NavUtil";
import QrScannerScreen from "../qrcode/QrScannerScreen";
import NetUtil from "../../utils/NetUtil";
import EtmAPI from "../../api/EtmAPI";
import DeviceEventKey from "../../constants/DeviceEventKey";
import CustomToast from "../../components/CustomToast";

export default class BalanceScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            avatar: Images.default_avatar,
            account_name: CurrentUser.base_info.account_name,
            balance: CurrentUser.account.balance,
            income: 0,
            outcome: 0,
        }
    }

    componentDidMount() {
        DeviceEventEmitter.addListener(DeviceEventKey.OnLoadAccountInfo,()=>{
            this.getAccountInfo();
        })
        this.getAccountInfo();
    }

    componentWillUnmount() {

    }

    render() {
        return (
            <ScrollView style={CommonStyle.container}>
                <View style={CommonStyle.page_header}>
                    {/*<TouchableOpacity style={{*/}
                        {/*alignSelf: 'flex-end',*/}
                        {/*top: 32,*/}
                        {/*right: 12,*/}
                    {/*}}>*/}
                        {/*<Image style={{width: 23, height: 23}} source={Images.account_beifen}/>*/}
                    {/*</TouchableOpacity>*/}
                </View>
                <ImageBackground
                    style={{height: 184}}
                    source={Images.bg_top}
                >
                    <TouchableOpacity activeOpacity={0.8}
                                      style={{justifyContent: 'center', alignItems: 'center'}}
                                      onPress={()=>{
                                          NavUtil.navigateTo('AccountDetail')
                                      }}
                    >
                        <Image style={{width: 70, height: 70, borderRadius: 35, marginTop: 5}}
                               source={this.state.avatar}/>
                        <Text style={{
                            backgroundColor: 'transparent',
                            color: '#fff',
                            fontSize: 17,
                            fontWeight: 'bold',
                            marginTop: 14
                        }}>
                            {this.state.account_name}
                        </Text>
                    </TouchableOpacity>
                    <View style={{
                        position: 'absolute',
                        bottom: -44,
                        flexDirection: 'row',
                        height: 88,
                        width: DeviceUtil.width - 24,
                        marginLeft: 12,
                        borderRadius: 5,
                        backgroundColor: "#ffffff",
                        shadowColor: "rgba(0, 0, 0, 0.15)",
                        shadowOffset: {
                            width: 0,
                            height: 0
                        },
                        shadowRadius: 17,
                        shadowOpacity: 0.5,
                        elevation: 1,
                    }}>
                        <View style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            alignSelf: 'center'
                        }}>
                            <TouchableOpacity style={{alignItems: 'center'}} onPress={()=>{
                                NavUtil.navigateTo('QrScanner',{
                                    fromType:'home',
                                    callback:(value1, value2)=> {
                                        NavUtil.navigateTo('TransferAccounts', {
                                            address: value1,
                                            money: value2
                                        })
                                    }
                                });
                            }}>
                                <Image style={{width: 33, height: 33}} source={Images.icon_scan}/>
                                <Text style={{
                                    backgroundColor: 'transparent',
                                    color: '#000',
                                    fontSize: 15,
                                    fontWeight: 'bold',
                                    marginTop: 16
                                }}>扫一扫</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{
                            marginTop: 14,
                            marginBottom: 14,
                            width: 1,
                            backgroundColor: Colors.line
                        }}/>
                        <View style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            alignSelf: 'center'
                        }}>
                            <TouchableOpacity style={{alignItems: 'center'}} onPress={()=>{
                                NavUtil.navigateTo('QrCodeReceiveMoney');
                            }}>
                                <Image style={{width: 33, height: 33}} source={Images.icon_qrcode}/>
                                <Text style={{
                                    backgroundColor: 'transparent',
                                    color: '#000',
                                    fontSize: 15,
                                    fontWeight: 'bold',
                                    marginTop: 16
                                }}>二维码</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground>
                <TouchableOpacity activeOpacity={0.8} style={{marginTop: 72 - 12,}} onPress={()=>{
                    NavUtil.navigateTo('ExchMole');
                }}>
                    <ImageBackground
                        style={{
                            // height: 204,
                            width: DeviceUtil.width,
                            // marginTop: 72 - 12,
                            justifyContent: 'center',
                            alignItems: 'center',
                            // backgroundColor:'red',
                        }}
                        source={Images.bg_balance}
                        resizeMode={'stretch'}
                    >
                        <Text style={{
                            backgroundColor: 'transparent',
                            color: '#fff',
                            fontSize: 15,
                            fontWeight: 'bold',
                            marginTop:30,
                        }}>余额</Text>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 21,
                            alignSelf:'stretch'
                        }}>
                            <Text style={{
                                backgroundColor: 'transparent',
                                color: '#fff',
                                fontSize: 40,
                                fontWeight: 'bold',
                                marginLeft:50,
                                marginRight:50,
                                textAlign:'center'

                            }}>{this.state.balance}</Text>
                            <Image style={{
                                position:'absolute',
                                right:24,
                                marginLeft: 9,
                                marginTop: 0,
                                width: 22,
                                height: 16,
                            }}
                                   source={Images.flag_balance_open}
                                   resizeMode={'contain'}
                            />
                        </View>
                        <Text style={{
                            backgroundColor: 'transparent',
                            color: '#fff',
                            fontSize: 18,
                            fontWeight: 'bold',
                            marginTop: 17,
                            marginBottom:30,
                        }}>Mole Coin</Text>
                    </ImageBackground>
                </TouchableOpacity>

                {/*<View style={{flex: 1}}/>*/}
                <View style={{
                    flexDirection: 'row',
                    borderTopWidth: 1,
                    borderTopColor: Colors.line,
                    backgroundColor: '#ffffff',
                    marginTop:18,
                    paddingTop:6
                }}
                >
                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 10
                    }}>
                        <Text style={{fontSize: 12, color: "#b7b7b7"}}>收入</Text>
                        <Text style={{fontSize: 19, color: '#4efb83', marginTop: 8}}>{this.state.income}</Text>
                    </View>
                    <View style={{
                        marginTop: 12,
                        marginBottom: 12,
                        width: 1,
                        backgroundColor: Colors.line
                    }}/>
                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 10
                    }}>
                        <Text style={{fontSize: 16, color: '#b7b7b7'}}>支出</Text>
                        <Text style={{fontSize: 19, color: '#4efb83', marginTop: 8}}>{this.state.outcome}</Text>
                    </View>
                </View>
            </ScrollView>
        )
    }

    async getAccountInfo(){
        let params = {
            address:CurrentUser.local_account.address,
        }
        let result = await NetUtil.asyncGet(EtmAPI.GET_ACCOUNT_INFO,params);
        // let params = {
        //     publicKey: CurrentUser.local_account.publicKey
        // }
        // let result = await NetUtil.asyncPostJson(EtmAPI.LOGIN_ACCOUNT, params);
        if(result.success){
            CurrentUser.account = result.account;
            CurrentUser.latestBlock = result.latestBlock;
            CurrentUser.version = result.version;
        }else{
            CustomToast.fail('账户信息获取失败，请稍后重试');
        }
        this.setState({
            account_name: CurrentUser.base_info.account_name,
            balance: CurrentUser.account.balance,
            income: 0,
            outcome: 0,
        })
    }
}