import pdfplumber
import pandas as pd

def pdf_to_excel(pdf_path):
    rows = []
    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            table = page.extract_table()
            if table:
                rows.extend(table)

    df = pd.DataFrame(rows)
    out = pdf_path + ".xlsx"
    df.to_excel(out, index=False)
    return out
