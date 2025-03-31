import argparse
import requests
from urllib.parse import quote

# python3 ai1.py -i "string-Astronaut riding a horse" -n 3 -o space.txt

def generate_images(num_images, text_prompt):
    """生成图片并返回成功保存的文件名列表"""
    filenames = []
    for i in range(num_images):
        full_prompt = f"{text_prompt}, frame {i}, dynamic pose, cyberpunk style"
        encoded_prompt = quote(full_prompt)
        url = f"https://image.pollinations.ai/prompt/{encoded_prompt}?seed=12345&model=flux-pro"
        
        try:
            response = requests.get(url, timeout=10)
            if response.status_code == 200:
                filename = f"frame_{i}.png"
                with open(filename, "wb") as f:
                    f.write(response.content)
                filenames.append(filename)
            else:
                print(f"图片 {i} 下载失败，状态码：{response.status_code}")
        except Exception as e:
            print(f"图片 {i} 请求异常：{str(e)}")
    
    return filenames

if __name__ == "__main__":
    # 命令行参数配置
    parser = argparse.ArgumentParser(description="AI图片生成器")
    parser.add_argument("-i", "--input", required=True, help="图片描述提示词")
    parser.add_argument("-n", "--num", type=int, required=True, help="生成图片数量")
    parser.add_argument("-o", "--output", required=True, help="输出文件名")
    args = parser.parse_args()

    in_text = args.input
    out_file_name = args.output
    prefix, text = in_text.split("-", 1) #string-a cat
    # 生成图片并获取文件名列表
    generated_files = generate_images(args.num, text)

    # 写入输出文件
    try:
        with open(out_file_name, "w") as f:
            #f.write(",".join(generated_files))
            index = 0
            while index < len(generated_files):
                if(index==0 or index==len(generated_files)):
                    f.write(generated_files[index])
                else:
                    f.write("\",\""+generated_files[index])
                index+=1

        print(f"Generated {len(generated_files)} pictures, The filenames have saved to {args.output}")
    except Exception as e:
        print(f"写入输出文件失败：{str(e)}")