const taSongs = "0号漂泊者.小笛-点歌单 v1.135";  
const l = require('../../logger');
var ofg = require('officegen');
var fs = require('fs');
 

l.tag1(taSongs,"-----------------------app\\songs\\index.js------") 
console.log(taSongs);

var e = { 
};
module.exports = e;

e.songs = function(req,res){ 
    u.fnCreateWordFile(req,res);
}
const u = function(){
  let songList = function(){
    let ls = [];
    let ss = ["与你到永久:伍佰",
              "突然的自我:伍佰",
              "白鸽:伍佰",
              "浪人情歌:伍佰",
              "约在冬季:齐秦",
              "外面的世界:齐秦",
              "如果再回到从前:李镐哲",
              "再回首:姜育恒",
              "驿动的心:姜育恒",
              "约在冬季:齐秦",
              "如果再回到从前:李镐哲", 
              "童年:罗大佑",
              "光阴的故事:罗大佑",
              "恋曲1990:罗大佑",
              "真心英雄:李宗盛",
              "鬼迷心窍:李宗盛",
              "凡人歌:李宗盛",
              "我是一只小小鸟:赵传",
              "水手:郑智化",
              "星星点灯:郑智化",
              "成都:赵雷",
              "真的爱你:Beyond",
              "光辉岁月:Beyond",
              "海阔天空:Beyond",
              "朋友别哭:吕方",
              "站台:佚名",
              "路灯下的小姑娘:佚名",
              "十年:陈奕迅",
              "蓝莲花:许巍",
              "故乡:许巍",
              "西海情歌:刀郎",
              "留什么给你:孙楠",
              "祝你一路顺风:吴奇隆",
              "爱:小虎队",
              "朋友:臧天朔",
              "恰似你的温柔:佚名",
              "老男孩:筷子兄弟",
              "失恋阵线联盟:草蜢",
              "众人划桨开大船:付笛声",
              "原创* 我的故乡在南方:小笛(littleflute)", 
              "原创* 请你放心的走:小笛(littleflute)",
              "原创* 唱自己的歌，走自己的路:小笛(littleflute)",
              "原创* 南方雨季:小笛(littleflute) ", 
              "原创* 近视歌手:小笛(littleflute) ",
              "原创* 关于学院路:小笛(littleflute) ",
              "原创* 彩色的梦:小笛(littleflute) ", 
              "原创* 城市的夜晚:小笛(littleflute) ",
              "原创* 辞职之歌:小笛(littleflute) ",
              "原创* 程序员之歌:小笛(littleflute) ",
              "我想有个家:潘美辰",
              "张三的歌:李寿全",
              "大海:张雨生",
              "我的未来不是梦:张雨生",
              "英文_ 500 miles:佚名",
              "英文_ Yesterday once more:Carpenter",
              "英文_ Yellow submarine:beatles",
              "英文_ The sound of silence:Paul Simn",
              "英文_ ElCondorPasa秃鹰飞去:Paul Simn",
              "英文_ I don't like to sleep alone:beatles", 
              "蜗牛与黄鹂鸟:佚名",
              "让我们荡起双桨:佚名",
              "听妈妈讲过去的事情:佚名",
              "我们的节日:佚名",
              "同桌的你:老狼",
              "睡在我上铺的兄弟:老狼",
              "春天里:汪峰",
    ];
    let n = 0;
    for(i in ss){
      n++;
      let s = {};
      let a = ss[i].split(":");
      s.no = n;
      s.title = a[0];
      s.singer = a[1];
      ls.push(s);
    }
    return ls;
  }();
   
  var othis = {};
  const text2p = function(p,txt){
    p.addText(txt, { font_face: 'Arial' })
    // 添加一个链接
    p.addText('\n 漂泊者乐园主页链接: ')
    p.addText('点我', { underline: true, color: '000088', link: 'http://mp.weixin.qq.com/mp/homepage?__biz=MzIxMTUzOTUzOA==&hid=13&sn=aab5a9a934bad54ecd823bca0201e226&scene=18#wechat_redirect' })
    p.addText('!')
  };
  const song2p = function(p,s){ 
    if(66==s.no){
      p.addText("\n *"+s.no + " - 《" + s.title+ "》 ~ " + s.singer,
       { font_face: 'Arial' }); 
      let puURL = "https://mp.weixin.qq.com/s?__biz=MzI3MDQyODk3Ng==&mid=2247497179&idx=1&sn=8eb364c3cfc7744ce9f0be9e5ef14c12&chksm=ead38b84dda40292adfdc889ac5a358e4488b8a37c9c02eea9ad1d465a06a8c7fc807d18a6b2&scene=21#wechat_redirect";
      p.addText('乐谱', { underline: true, color: '000088', link: puURL
      });
   
    }
    else if(40<=s.no && 49>=s.no){
      p.addText("\n "+s.no + " - 《" + s.title+ "》 ~ " + s.singer,
       {color: '880011'});

    } 
    else if(54<=s.no && 59>=s.no){
      p.addText("\n "+s.no + " - 《" + s.title+ "》 ~ " + s.singer,
       {color: '008811'});

    } 
    else{
      p.addText("\n "+s.no + " - 《" + s.title+ "》 ~ " + s.singer, { font_face: 'Arial' });

    }
  };
  othis.fnCreateWordFile = function (req, res) {  

    const docx = ofg('docx')
    docx.on('finalize', function (written) {
          console.log(' finished to create word file.')
    })
    docx.on('error', function (err) {
          console.log(err)
    })
   
    let p = docx.createP();
    

    text2p(p,taSongs);
    //*

    for(i in songList){   
      song2p(p,songList[i]);
    }

    
    //*/
    text2p(p,"\n 浙江义乌淼木俱乐部 " + Date());
  
    //* 服务器生成文件
    let out = fs.createWriteStream('public/songs.docx')
  
    out.on('error', function (err) {
      console.log(err)
    })
  
    
    // Async call to generate the output file:
    docx.generate(out) 
  
    res.status(200); 
    var r = {};
    r.api = "songs"; 
    r.date = Date();
    r.tag = taSongs;
    
    r.url =  req.url; 
    res.json(r); 
  }
  return othis;
}();
 