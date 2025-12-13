from flask import Flask, request, send_file, jsonify
from flask_cors import CORS
from utils.file_handler import new_file
from converters.image_to_pdf import image_to_pdf
from converters.pdf_to_image import pdf_to_images
from converters.pdf_to_excel import pdf_to_excel
from converters.merge_pdf import merge_pdfs
from converters.split_pdf import split_pdf
import os

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return "File Converter API is running"

@app.route("/image-to-pdf", methods=["POST"])
def img2pdf_api():
    f = request.files["file"]
    path = new_file(".img")
    f.save(path)
    return send_file(image_to_pdf(path), as_attachment=True)

@app.route("/pdf-to-image", methods=["POST"])
def pdf2img_api():
    f = request.files["file"]
    path = new_file(".pdf")
    f.save(path)
    images = pdf_to_images(path)
    return send_file(images[0], as_attachment=True)

@app.route("/pdf-to-excel", methods=["POST"])
def pdf2excel_api():
    f = request.files["file"]
    path = new_file(".pdf")
    f.save(path)
    return send_file(pdf_to_excel(path), as_attachment=True)

@app.route("/merge-pdf", methods=["POST"])
def merge_api():
    files = request.files.getlist("files")
    paths = []
    for f in files:
        p = new_file(".pdf")
        f.save(p)
        paths.append(p)

    out = new_file(".pdf")
    merge_pdfs(paths, out)
    return send_file(out, as_attachment=True)

@app.route("/split-pdf", methods=["POST"])
def split_api():
    f = request.files["file"]
    path = new_file(".pdf")
    f.save(path)
    parts = split_pdf(path)
    return jsonify(parts)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=10000)
