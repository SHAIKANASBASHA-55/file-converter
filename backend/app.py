from flask import Flask, request, send_file
from flask_cors import CORS
import img2pdf
import os
import uuid

app = Flask(__name__)
CORS(app)

UPLOAD = "uploads"
OUTPUT = "outputs"

os.makedirs(UPLOAD, exist_ok=True)
os.makedirs(OUTPUT, exist_ok=True)

@app.route("/")
def home():
    return "File Converter API is running"

@app.route("/image-to-pdf", methods=["POST"])
def image_to_pdf():
    file = request.files["file"]
    uid = str(uuid.uuid4())

    input_path = f"{UPLOAD}/{uid}_{file.filename}"
    output_path = f"{OUTPUT}/{uid}.pdf"

    file.save(input_path)

    with open(output_path, "wb") as f:
        f.write(img2pdf.convert(input_path))

    return send_file(output_path, as_attachment=True)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=10000)
