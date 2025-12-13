from pdf2image import convert_from_path

def pdf_to_images(pdf_path):
    images = convert_from_path(pdf_path)
    out_paths = []
    for i, img in enumerate(images):
        path = f"{pdf_path}_{i}.png"
        img.save(path, "PNG")
        out_paths.append(path)
    return out_paths
