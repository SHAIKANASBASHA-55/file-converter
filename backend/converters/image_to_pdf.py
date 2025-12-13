import img2pdf

def image_to_pdf(input_path):
    out = input_path + ".pdf"
    with open(out, "wb") as f:
        f.write(img2pdf.convert(input_path))
    return out
