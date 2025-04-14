from flask import Flask, request, jsonify
import pickle
import numpy as np
from flask_cors import CORS  # Allows frontend to connect

app = Flask(__name__)
CORS(app)

# Load the trained model
with open("RandomForest.pkl", "rb") as f:
    model = pickle.load(f)

@app.route("/recommend", methods=["POST"])
def recommend_crop():
    data = request.json
    features = np.array([[data["N"], data["P"], data["K"], data["temperature"],
                          data["humidity"], data["ph"], data["rainfall"]]])
    prediction = model.predict(features)
    return jsonify({"recommended_crop": prediction[0]})

if __name__ == "__main__":
    app.run(debug=True)
