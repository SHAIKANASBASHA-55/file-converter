from flask import Flask, request, send_file, abort
from flask_cors import CORS
import img2pdf, os, uuid

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
    if "file" not in request.files:
        abort(400, "No file uploaded")

    file = request.files["file"]
    uid = str(uuid.uuid4())

    input_path = os.path.join(UPLOAD, uid + "_" + file.filename)
    output_path = os.path.join(OUTPUT, uid + ".pdf")

    file.save(input_path)

    try:
        with open(output_path, "wb") as f:
            f.write(img2pdf.convert(input_path))
    except Exception as e:
        abort(500, str(e))

    return send_file(
        output_path,
        mimetype="application/pdf",
        as_attachment=True,
        download_name="converted.pdf"
    )

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=10000)

@app.route("/test-upload", methods=["POST"])
def test_upload():
    if "file" not in request.files:
        return "NO FILE RECEIVED", 400
    return "FILE RECEIVED OK", 200
