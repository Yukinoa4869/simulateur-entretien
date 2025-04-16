from flask import Flask, request, jsonify
import openai
import os

app = Flask(__name__)

openai.api_key = os.getenv("OPENAI_API_KEY")

@app.route("/api/ask", methods=["POST"])
def ask():
    try:
        data = request.get_json()
        messages = data.get("messages")

        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=messages
        )

        reply = response.choices[0].message["content"]
        return jsonify({ "reply": reply })

    except Exception as e:
        print("❌ Erreur backend IA :", e)
        return jsonify({ "reply": "Erreur serveur Vercel." }), 500
