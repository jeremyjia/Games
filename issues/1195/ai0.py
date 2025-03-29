import requests

for i in range(10):
    prompt = f"A robot dancing in a neon city, frame {i}, dynamic pose, cyberpunk style"
    url = f"https://image.pollinations.ai/prompt/{prompt}?seed=12345&model=flux-pro"
    response = requests.get(url)
    with open(f"frame_{i}.png", "wb") as f:
        f.write(response.content)