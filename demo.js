const URL = 'http://172.24.61.114/WXMP/UI/DataServices/DataServices.asmx/GetWebAppServiceDataForXml'
Mock.mock(URL, function (options) {
    let bodyStr = decodeURIComponent(options.body);
    let { RequestHead } = JSON.parse(bodyStr.split('=')[1]);
    let resultData;
    switch (RequestHead.EventType) {
        case 'GetWeChatStatisticsData':
            resultData = {
                "WechatAppName": Mock.Random.string('upper', 4, 4),
                "WechatName": "测试公众号" + Mock.Random.natural(0, 10),
                "WechatUserTypeInfo": {
                    "WhiteUser|1-100": Mock.Random.natural(0, 10),
                    "BlackUser|1-100": Mock.Random.natural(0, 10)
                },
                "WechatUserRelationInfo": {
                    "TotalRelationUserCount|1-100": Mock.Random.natural(0, 10),
                    "RelatedUserCount|1-100": Mock.Random.natural(0, 10)
                },
                "WechatEventTypeInfo": {
                    "WechatEventTypeCount|1-100": Mock.Random.natural(0, 10)
                },
                "WechatHeadImgUrl":Mock.Random.image('60x60', '#4A7BF7', '#fff','png', '头像')
            }
            break;
        case 'GetWeChatLastSendRecordData':
            resultData = {
                "WechatMsgRecordNum|+1":1,
                "WechatEventTypeName":"设备告警提醒",
                "WechatMsgRecordTime":"2021-03-15 10:47:20",
                "WechatMsgSendStatusInfo":{
                    "Success|+5":Mock.Random.natural(0, 10),
                    "Fail|+5":Mock.Random.natural(0, 10)
                }
            }
            break;
        case 'GetWeChatEventTypeStatisticsData':
            resultData = {
                "WechatEventTypeNum|+1":1,
                "WechatEventTypeName":"设备告警提醒",
                "WhecatEventTypeMsgCount":Mock.Random.natural(0, 10)
            }
            break;
        default:
            break;
    }
    let dataArr = Mock.mock({
        "array|1-5": [
            resultData
        ]
    })
    let jsonResultData = {
        ResponseHead: RequestHead,
        ResponseBody: {
            "OperCode": 0,
            "OperMsg": 'ok',
            "ResultData":JSON.stringify(dataArr.array)
        }
    }
    return jsonResultData
})