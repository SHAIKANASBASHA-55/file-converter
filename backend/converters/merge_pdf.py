from PyPDF2 import PdfMerger

def merge_pdfs(paths, out_path):
    merger = PdfMerger()
    for p in paths:
        merger.append(p)
    merger.write(out_path)
    merger.close()
    return out_path
