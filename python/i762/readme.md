百度AI开发者语音转文字python实现

官方技术文档 https://ai.baidu.com/ai-doc/SPEECH/Vk38lxily
需要先安装百度aip: pip install baidu-aip

登录百度云控制台，文字识别 --> 创建应用 --> 应用名称等内容自己根据需要填写
应用创建完成后，会生成一个应用，字段代表的含义

需要用到 Application key 和 security key.

AI接入指南：https://ai.baidu.com/ai-doc/REFERENCE/Ck3dwjgn3

鉴权认证机制 https://ai.baidu.com/ai-doc/REFERENCE/Ck3dwjhhu

### Baidu AIP项目： https://github.com/Baidu-AIP/[speech-demo](https://github.com/Baidu-AIP/speech-demo)

测试结果：
SUCCESS WITH TOKEN: 24.8be8aa8465b7d3035c4afd70ecc390c1.2592000.1659962231.282335-26666535 EXPIRES IN SECONDS: 2592000
Request time cost 2.623368
{"err_msg":"request pv too much","err_no":3305,"sn":"201484547341657370234"}

错误原因: 出现这种错误request pv too much', 'err_no': 3305, 'sn': '386874002531595317040'} 如果是第一次使用，是因为还未领取接口的免费次数，您在控制台--语音技术--概览处领取接口的免费次数。 如果不是第一次使用，那么代表免费次数已经耗尽，在相同位置开通接口的付费功能即可。

后续工作 :领取免费试用需要实名认证，由于我还没有认证所以暂没测试。下一步只需实名认证即可进一步测试。

使用SDK，应该注册一个开发者账号，我没有注册，从网上找了一个别人的，我测试了一下可以用
private static final String APP_ID = "11404467";
private static final String API_KEY = "quY2ax3X7NwqB7WyZoc9xWvR";
private static final String SECRET_KEY = "TEMatGKh35RPMhjMGj3ptb6PsEWsl6oV";
#163 使用jeremy的验证信息，测试结果显示同样的错误信息
SUCCESS WITH TOKEN: 24.52ae6d804ad607c158444014c8553e8f.2592000.1660537831.282335-11404467 EXPIRES IN SECONDS: 2592000
Request time cost 3.095345
{"err_msg":"request pv too much","err_no":3305,"sn":"72515761191657945834"}

20220806: 下周继续推进此工程，找一个新账号继续测试。如果有时间研究一下dockers的使用。

20220816：如果实名认证百度智能云，需要上传身份证并刷脸。之后就能得到免费的试用权。