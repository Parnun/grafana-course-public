from flask import Flask, jsonify
from prometheus_client import Counter, generate_latest
from prometheus_client import CONTENT_TYPE_LATEST

app = Flask(__name__)
request_counter = Counter(
    "demo_requests_total",
    "Total requests received by the demo service",
)


@app.get("/")
def home():
    return jsonify({"message": "demo service is running"})


@app.get("/work")
def work():
    request_counter.inc()
    return jsonify({"status": "counted"})


@app.get("/metrics")
def metrics():
    return generate_latest(), 200, {"Content-Type": CONTENT_TYPE_LATEST}


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)