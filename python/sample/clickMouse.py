import time
import pyautogui

def click_timer(interval):
    while True:
        # 获取当前鼠标位置
        current_position = pyautogui.position()
        print("The mouse position:", current_position)
        
        # 模拟鼠标点击
        pyautogui.click(current_position)
        
        # 休眠指定的时间间隔
        time.sleep(interval)

if __name__ == "__main__":
    click_timer(3 * 60)  # 5分钟=5*60秒