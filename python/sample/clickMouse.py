import time
import pyautogui
from datetime import datetime

def click_timer(interval):
    while True:
        # 获取当前鼠标位置
        current_position = pyautogui.position()
        current_time = datetime.now()
        print(current_time, "The mouse pos:", current_position)
        
        # 模拟鼠标点击
        pyautogui.click(current_position)
        
        # 休眠指定的时间间隔
        time.sleep(interval)

if __name__ == "__main__":
    click_timer(3 * 60)  # 3分钟=3*60秒