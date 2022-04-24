const tagWord = "index.js bv0.44";  
var officegen = require('officegen');
var fs = require('fs');

var blP = require('./blMakeP');

var e = {};
module.exports = e;

e.word = function(req,res){ 
    createWord(req,res);
}

function createWord(req, res) {  
    var bd =req.body; 
    const docx = officegen('docx')
    docx.on('finalize', function (written) {
        console.log(' finished to create word file.')
    })
    docx.on('error', function (err) {
        console.log(err)
    })
    
  blP.makeP(docx,bd);

  pObj = docx.createP()


  pObj = docx.createP()
  // 添加一个链接
  pObj.addText('这是一个链接 ')
  pObj.addText('点我', { underline: true, color: '000088', link: 'https://github.com' })
  pObj.addText('!')

  pObj = docx.createP()
  pObj.addText('加粗—+下划线', { bold: true, underline: true })

  pObj = docx.createP({ align: 'center' })

  pObj.addText('加边框', {
    border: 'dotted',
    borderSize: 12,
    borderColor: '88CCFF'
  })

  pObj = docx.createP()
  pObj.options.align = 'right'

  pObj.addText('Align this text to the right.')

  pObj = docx.createP()

  pObj.addText('Those two lines are in the same paragraph,')
  pObj.addLineBreak()// 换行
  pObj.addText('but they are separated by a line break.')

  docx.putPageBreak()//换页

  pObj = docx.createP()

  pObj.addText('Fonts face only.', { font_face: 'Arial' })
  pObj.addText(' 换字体并加大.', { font_face: 'Arial', font_size: 40 })

  pObj = docx.createP({align: 'center'})
  // pObj.options.align = 'center'
  pObj.addText('学生信息', { bold: true, font_face: 'Arial', font_size: 18 })
  let tableStyle = {
    tableColWidth: 2400,
    tableSize: 24,
    tableColor: "ada",
    tableAlign: "center",
    tableVAlign: "center",
    tableFontFamily: "Comic Sans MS",
    borders: true
  }
  let table  = [
    [{
      val: '姓名',
      opts: {
        align: "center",
        vAlign: "center",
        sz: '36',
        // cellColWidth: 42,
        // b: true,
        // shd: {
        //   fill: "7F7F7F",
        //   themeFill: "text1",
        //   "themeFillTint": "80"
        // },
        // fontFamily: "Avenir Book"
      }
    }, {
      val: '性别',
      opts: {
        align: "center",
        vAlign: "center",
        sz: '36',
      }
    }, {
      val: '年龄',
      opts: {
        align: "center",
        vAlign: "center",
        sz: '36',
      }
    }]
  ]

  let student1 = ['李四', '男', 12]
  let student2 = ['李四2', '男', 28]
  table.push(student1, student2)
  // 表格
  docx.createTable(table, tableStyle)

 

  //* 服务器生成文件
  let out = fs.createWriteStream('public/example.docx')

  out.on('error', function (err) {
    console.log(err)
  })

  // Async call to generate the output file:
  docx.generate(out) 
  //*/

    /* 返回给前端，前端直接下载
    res.writeHead(200, {
        // 注意这里的type设置，导出不同文件type值不同application/vnd.openxmlformats-officedocument.wordprocessingml.document
        "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        'Content-disposition': 'attachment; filename=out-' + new Date().getTime() + '.docx'
    });
    docx.generate(res)
    //*/

    //*
    res.status(200); 
    var r = {};
    r.api = "word"; 
    r.date = Date();
    r.tag = tagWord;
    //r.out = out;
    r.body = bd;
    r.url =  req.url; 
    res.json(r); 
    //*/
 
}