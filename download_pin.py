import requests
import re
import urllib.request
import os

url = "https://pin.it/4ATYpPTsH"
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
}

response = requests.get(url, headers=headers)
html = response.text

# Try to find the image URL
match = re.search(r'<meta property="og:image" name="og:image" content="(.*?)"', html)
if not match:
    match = re.search(r'<meta property="og:image" content="(.*?)"', html)
if not match:
    match = re.search(r'"image":\s*"([^"]+)"', html)

if match:
    img_url = match.group(1)
    # The URL might be a small version, let's try to get a larger one by replacing '736x' or similar with 'originals'
    large_img_url = re.sub(r'/\d+x/', '/originals/', img_url)
    print(f"Downloading from {large_img_url} ...")
    
    try:
        urllib.request.urlretrieve(large_img_url, "a:/portfolio/public/bg.jpg")
        print("Success! Image saved as a:/portfolio/public/bg.jpg")
    except Exception as e:
        print(f"Failed to download large image: {e}")
        print(f"Falling back to original URL: {img_url}")
        urllib.request.urlretrieve(img_url, "a:/portfolio/public/bg.jpg")
        print("Success! Image saved as a:/portfolio/public/bg.jpg")
else:
    print("Could not find image URL in the page.")
