from flask import Flask, render_template
from flask import request, jsonify
from chatbot import get_gemini_response 
app = Flask(__name__)
@app.route("/")
def home():
    return render_template("dashboard.html")

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    user_message = data.get("message")
    response = get_gemini_response(user_message)
    return jsonify({"response": response})

if __name__ == '__main__':
    app.run(debug=True)