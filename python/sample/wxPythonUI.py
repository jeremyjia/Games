import wx

# 自定义窗口类
class MyFrame(wx.Frame):
    def __init__(self):
        super().__init__(None, title="The first UI program of python", size=(768, 576), pos=(100,100))
        #
        
    def OnInit(self):
        return true


# 创建应用程序对象    
app = wx.App()

# 创建窗口对象
frm = MyFrame()

frm.Show()
# 主循环
app.MainLoop()


