import os
import sys

# Ensure pypdf is installed
os.system("pip install pypdf -q")

try:
    import pypdf
    reader = pypdf.PdfReader('a:/portfolio/yash (5) - KUCHAMPUDI YASHWANTH SRI SAI -IIITK.pdf')
    text = '\n'.join([page.extract_text() for page in reader.pages])
    with open('a:/portfolio/resume_text.txt', 'w', encoding='utf-8') as f:
        f.write(text)
except Exception as e:
    print(f"Error reading PDF: {e}")
