curl -X POST http://localhost:${PORT}/api/generate \\
  -H "Content-Type: application/json" \\
  -d '{
    "frames": [
      {"background": "操场", "objects": []},
      {"background": "操场", "objects": []},
      {"background": "马路边", "objects": []},
      {"background": "马路边", "objects": []},
      {"background": "树林", "objects": []},
      {"background": "海边", "objects": []},
      {"background": "马路边", "objects": []},
      {"background": "马路边", "objects": []},
      {"background": "树林", "objects": []}
    ],
    "fileName": "demo.mp4",
    "fps": 24
  }'