from PyPDF2 import PdfReader, PdfWriter

def split_pdf(pdf_path):
    reader = PdfReader(pdf_path)
    outputs = []

    for i, page in enumerate(reader.pages):
        writer = PdfWriter()
        writer.add_page(page)
        out = f"{pdf_path}_page_{i+1}.pdf"
        with open(out, "wb") as f:
            writer.write(f)
        outputs.append(out)

    return outputs
