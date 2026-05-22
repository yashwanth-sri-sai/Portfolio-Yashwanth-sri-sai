import urllib.request
import os

pdf_url = "https://docs.google.com/uc?export=download&id=1z9KBC7yT0dVYz2OHQpa44-e9SHqPTC1K"
output_pdf = "a:/portfolio/resume_new.pdf"
output_txt = "a:/portfolio/resume_text_new.txt"

print(f"Downloading from {pdf_url}...")
try:
    # Use urllib to download the file
    urllib.request.urlretrieve(pdf_url, output_pdf)
    print("Download finished. Checking file type...")
    
    # Check if downloaded file is a valid PDF
    with open(output_pdf, 'rb') as f:
        header = f.read(4)
        if header != b'%PDF':
            print("Warning: The downloaded file does not start with %PDF. Content might be an HTML preview or error page.")
            f.seek(0)
            print("First 200 bytes:", f.read(200))
            
    # Install/Ensure pypdf is installed
    import subprocess
    subprocess.check_call(["pip", "install", "pypdf", "-q"])
    
    import pypdf
    reader = pypdf.PdfReader(output_pdf)
    text = '\n'.join([page.extract_text() for page in reader.pages])
    
    with open(output_txt, 'w', encoding='utf-8') as f:
        f.write(text)
        
    print(f"Successfully extracted {len(text)} characters of text and wrote to {output_txt}.")
    print("--- FIRST 500 CHARACTERS ---")
    print(text[:500])
    print("----------------------------")
except Exception as e:
    print(f"Error during download or extraction: {e}")
