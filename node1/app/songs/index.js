const taSongs = "0号漂泊者.小笛-点歌单 v1.312";  
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
    let ss = [ 
              "明天你是否依然爱我:童安格:purple",
              "与你到永久:伍佰:black",
              "突然的自我:伍佰",
              "白鸽:伍佰",
              "浪人情歌:伍佰",
              "挪威的森林:伍佰",
              "如果再回到从前:李镐哲",
              "再回首:姜育恒",
              "驿动的心:姜育恒",  
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
              "朋友别哭:吕方",
              "站台:佚名",
              "路灯下的小姑娘:佚名",
              "十年:陈奕迅",
              "西海情歌:刀郎",
              "留什么给你:孙楠",
              "祝你一路顺风:吴奇隆",
              "爱:小虎队",
              "朋友:臧天朔",
              "朋友:周华健",
              "恰似你的温柔:佚名",
              "老男孩:筷子兄弟",
              "失恋阵线联盟:草蜢",
              "众人划桨开大船:付笛声",
              "原创* 我的故乡在南方:小笛(littleflute):brown", 
              "原创* 请你放心的走:小笛(littleflute):brown",
              "原创* 唱自己的歌，走自己的路:小笛(littleflute):brown",
              "原创* 南方雨季:小笛(littleflute):brown ", 
              "原创* 近视歌手:小笛(littleflute):brown ",
              "原创* 关于学院路:小笛(littleflute):brown ",
              "原创* 彩色的梦:小笛(littleflute):brown ", 
              "原创* 城市的夜晚:小笛(littleflute):brown ",
              "原创* 辞职之歌:小笛(littleflute):brown ",
              "原创* 程序员之歌:小笛(littleflute):brown",
              "我想有个家:潘美辰",
              "张三的歌:李寿全",
              "大海:张雨生",
              "我的未来不是梦:张雨生",
              "英文_ 500 miles:佚名:darkgreen",
              "英文_ Yesterday once more:Carpenter:darkgreen",
              "英文_ Yellow submarine:beatles:darkgreen",
              "英文_ The sound of silence:Paul Simn:darkgreen",
              "英文_ ElCondorPasa秃鹰飞去:Paul Simn",
              "英文_ I don't like to sleep alone:beatles", 
              "蜗牛与黄鹂鸟:佚名",
              "让我们荡起双桨:佚名",
              "听妈妈讲过去的事情:佚名",
              "我们的节日:佚名",
              "同桌的你:老狼",
              "睡在我上铺的兄弟:老狼",
              "春天里:汪峰",
              "怒放的生命:汪峰",
              "真的爱你:Beyond",
              "光辉岁月:Beyond",
              "海阔天空:Beyond",
              "海阔天空:Beyond",
              "蓝莲花:许巍",
              "故乡:许巍",
              "晴朗:许巍",
              "星空:许巍",
              "时光:许巍",
              "执着:许巍",
              "漫步:许巍",
              "礼物:许巍",
              "像风一样自由:许巍",
              "完美生活:许巍",
              "朋友:谭咏麟",
              "讲不出再见:谭咏麟",
              "一生中最爱:谭咏麟",
              "水中花:谭咏麟",
              "大约在冬季:齐秦",
              "外面的世界:齐秦",
              "原来的我:齐秦",
    ];
    let n = 0;
    for(i in ss){
      n++;
      let s = {};
      let a = ss[i].split(":");
      s.no = n;
      s.title = a[0];
      s.singer = a[1];
      s.color = a[2];
      ls.push(s);
    }
    return ls;
  }();
   
  var othis = {};
  const text2p = function(p,txt){
    p.addText(txt, { font_face: 'Arial' }) 
  };
  const song2p = function(p,s){ 
    if(60==s.no){
      p.addText("\n *"+s.no + " - 《" + s.title+ "》 ~ " + s.singer,
       { font_face: 'Arial' }); 
      let puURL = "https://mp.weixin.qq.com/s?__biz=MzI3MDQyODk3Ng==&mid=2247497179&idx=1&sn=8eb364c3cfc7744ce9f0be9e5ef14c12&chksm=ead38b84dda40292adfdc889ac5a358e4488b8a37c9c02eea9ad1d465a06a8c7fc807d18a6b2&scene=21#wechat_redirect";
      p.addText('乐谱', { underline: true, color: '000088', link: puURL
      });
    
    } 
    else{
      p.addText("\n "+s.no + " - 《" + s.title+ "》 ~ " + s.singer, { font_face: 'Arial',color: s.color?s.color:'gray'});

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
    text2p(p,"\n\n泉州向阳树琴行大院  " + Date());
  
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
 