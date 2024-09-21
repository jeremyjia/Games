import PyPDF2

# Path to the PDF file
pdf_file_path = 'sample.pdf'

# Open the PDF file in binary mode
with open(pdf_file_path, 'rb') as file:
    # Create a PDF reader object
    pdf_reader = PyPDF2.PdfReader(file)

    # Initialize an empty string to store the extracted text
    text = ""

    # Loop through all the pages
    for page_num in range(len(pdf_reader.pages)):
        # Get a specific page
        page = pdf_reader.pages[page_num]
        
        # Extract text from the page
        text += page.extract_text()

    # Print the extracted text
    print(text)

