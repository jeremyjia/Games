# -*- coding: utf-8 -*-

#爬取58同城房源信息并保存到excel

import xlrd
import xlwt
import html
import requests
import base64
from lxml import etree
from bs4 import BeautifulSoup
from fontTools.ttLib import TTFont


url = 'https://bj.58.com/pinpaigongyu/?PGTID=0d200001-0000-14d3-47f3-1eb6fb28d2f0&ClickID=3'
headers = {'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36'}


#获取字体文件并转换为xml文件
def get_font(page_url):
    response = requests.get(url=page_url, headers=headers)
    # 匹配 base64 编码的加密字体字符串
    base64_string = response.text.split("base64,")[1].split("'")[0].strip()
    # print(base64_string)
    # 将 base64 编码的字体字符串解码成二进制编码
    bin_data = base64.decodebytes(base64_string.encode())
    # 保存为字体文件
    with open('58font.woff', 'wb') as f:
        f.write(bin_data)
    #print('第' + str(page_num) + '次访问网页，字体文件保存成功！')
    # 获取字体文件，将其转换为xml文件
    font = TTFont('58font.woff')
    font.saveXML('58font.xml')
    #print('已成功将字体文件转换为xml文件！')
    return response.text

#将加密字体编码与真实字体进行匹配
def find_font():
    # 以glyph开头的编码对应的数字
    glyph_list = {
        'glyph00001': '0',
        'glyph00002': '1',
        'glyph00003': '2',
        'glyph00004': '3',
        'glyph00005': '4',
        'glyph00006': '5',
        'glyph00007': '6',
        'glyph00008': '7',
        'glyph00009': '8',
        'glyph00010': '9'
    }
    # 十个加密字体编码
    unicode_list = ['0x9476', '0x958f', '0x993c', '0x9a4b', '0x9e3a', '0x9ea3', '0x9f64', '0x9f92', '0x9fa4', '0x9fa5']
    num_list = []
    # 利用xpath语法匹配xml文件内容
    font_data = etree.parse('./58font.xml')
    for unicode in unicode_list:
        # 依次循环查找xml文件里code对应的name
        result = font_data.xpath("//cmap//map[@code='{}']/@name".format(unicode))[0]
        # print(result)
        # 循环字典的key，若是code对应的name与字典的key相同，则获得key对应的value
        for key in glyph_list.keys():
            if key == result:
                num_list.append(glyph_list[key])
    #print('已成功找到编码所对应的数字！')
    #print(num_list)
    # 返回value列表
    return num_list

# 替换掉网页中所有的加密字体编码
def replace_font(num, page_response):
    # 9476 958F 993C 9A4B 9E3A 9EA3 9F64 9F92 9FA4 9FA5
    result = page_response.replace('&#x9476;', num[0]).replace('&#x958f;', num[1]).replace('&#x993c;', num[2]).replace('&#x9a4b;', num[3]).replace('&#x9e3a;', num[4]).replace('&#x9ea3;', num[5]).replace('&#x9f64;', num[6]).replace('&#x9f92;', num[7]).replace('&#x9fa4;', num[8]).replace('&#x9fa5;', num[9])
    #print('已成功将所有加密字体替换！')
    return result

def parse_pages(contents):
    excel_wt = xlwt.Workbook()
    sheet_wt = excel_wt.add_sheet(r'房源信息')
    row = 0
    table_title = ['标题','房型','大小','楼层/朝向','价格（元/月）','特点']
    #for colum in range(0,6):
    colum = 0
    for title in table_title:
        sheet_wt.write(row,colum,title)
        colum += 1
    row = 1
    bs = BeautifulSoup(contents, "html.parser")
    for tag in bs.find_all('li', class_='house'):
        m_title = tag.find('h2').get_text()
        m_title = m_title.strip()

        m_room = tag.find('p',class_='room').get_text()
        m_room = m_room.replace('\r', '|')
        m_room = m_room.replace('\n', '|')
        m_room = m_room.replace(' ', '')
        m_room = m_room.strip()
        if m_room.startswith('|'):
            m_room = m_room.replace('|', '')
        if m_room.endswith('|'):
            m_room = m_room.replace('|', '')
        room_list = m_room.split()

        m_money = tag.find('div', class_='money')
        m_money = m_money.find('b').get_text()
        m_money = m_money.strip()

        m_spec = tag.find('p',class_='spec').get_text()
        spec_list = m_spec.split()
        
        ### Write to Excel
        colum = 0
        # Title
        sheet_wt.write(row,colum,m_title)
        colum += 1
        # Type Size Floor
        index = 0
        while index<len(room_list):
            sheet_wt.write(row,colum,room_list[index])
            colum += 1
            index += 1
        #Price
        sheet_wt.write(row,colum,m_money)
        colum += 1
        #SpecialList
        index = 0
        m_spec = ''
        while index<len(spec_list):
            m_spec += spec_list[index] + '|'
            index += 1
        m_spec = m_spec[0:-1]
        sheet_wt.write(row,colum,m_spec)

        row += 1

    excel_wt.save(r'58HouseInfo.xls')

if __name__ == '__main__':
    contents = get_font(url)
    num_list = find_font()
    contents = replace_font(num_list, contents)
    #print(contents)
    parse_pages(contents)
    print('Finish!!!')
