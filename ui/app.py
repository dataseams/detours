from flask import Flask
import requests
import os

app = Flask(__name__)

core_svc_ip = os.environ["CORE_SVC_IP"]
core_svc_port = os.environ["CORE_SVC_PORT"]


@app.route("/")
def main_endpoint():
    resp = requests.get(f"http://{core_svc_ip}:{core_svc_port}/test")
    if resp.text == "ok":
        display = "Welcome to Robocation."
    else:
        display = "Error contacting core service."
    return display


@app.route("/test")
def test_endpoint():
    return "ok"
