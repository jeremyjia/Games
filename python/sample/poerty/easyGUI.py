import urllib.request
import urllib.parse
import json
import easygui as g
import sys
import time
import random 
import os


text ="""
 静夜思
  李白
窗前明月光，
疑是地上霜。
举头望明月，
低头思故乡。
"""
def getProperties(file_name):
    try:
        pro_file = open(file_name, 'r', encoding='utf-8')
        properties = {}
        for line in pro_file:
            if line.find('=') > 0:
                strs = line.replace('\n', '').split('=')
                properties[strs[0]] = strs[1]
    except Exception as e:
        raise e
    else:
        pro_file.close()
    return properties


while True:
    chose = []
    curDir = os.getcwd()
    for filename in os.listdir(curDir):
        print(filename)
        if(filename.endswith('.txt')):
            pro = getProperties(filename)
            auther = pro['诗名']
            chose.append(auther)
    while 1:  
        ret = g.choicebox("请选择要检测的古诗：",'诗词背诵测试',chose)
        if ret == None :
            print(ret)   # 点Cancle按钮,返回None
            break
        else :
            print(ret)  # 选择目标，点 OK 按钮返回选择目标
            break

    pro = getProperties(ret+'.txt')
    content = pro['内容']
    
    fullPoetry = []
    fieldNames = []
    fullPoetry = content.strip().split('，') #注意逗号要用中文的，因为文件里用的是中文的

    poetry = []
    for i in range(len(fullPoetry)):
        fieldNames.append('第'+str(i+1)+'句')
        if(random.randint(0,1) == 1):
            poetry.append('')
        else:
            poetry.append(fullPoetry[i])
    
    fieldValues = []
    fieldValues = g.multenterbox(msg='请填写缺少的诗句', title='', fields=fieldNames,values=poetry)
    print(fieldValues)

    # make sure that none of the fields was left blank
    while 1:
        if fieldValues is None: break
        errmsg = ""
        for i in range(len(fieldNames)):
            if fieldValues[i].strip() == "":
                errmsg += ('"%s" 没有填写.\n\n' % fieldNames[i])
        if errmsg == "":
            break # no problems found
        fieldValues = g.multenterbox(errmsg, '', fieldNames, fieldValues)

    print("Reply was: %s" % str(fieldValues))

    errmsg = ""
    for k in range(len(fieldNames)):
            if fieldValues[k].strip() != fullPoetry[k]:
                errmsg += ('"%s" 不正确. "%s"\n\n' % (fieldNames[k], fieldValues[k]))

    if errmsg == "":
        info=""
        for item in fullPoetry:
            info+=item+"\n"
        ret = g.textbox("太棒了，你全部回答正确！",'',info)
    else:
        ret = g.textbox("还要继续加油！",'',errmsg)

    if g.ccbox('要重新开始吗','确认'):
        pass
    else:
        sys.exit()

    