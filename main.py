from flask import Flask
import csv
import json

# If `entrypoint` is not defined in app.yaml, App Engine will look for an app
# called `app` in `main.py`.
app = Flask(__name__)


@app.route('/')
def homepage():
    return app.send_static_file("map.html")

@app.route('/discussion')
def discussion():
    return app.send_static_file("discussion.html")

@app.route('/map')
def map():
    return app.send_static_file("map.html")

@app.route('/game')
def game():
    return app.send_static_file("game.html")

@app.route('/donate')
def donate():
    return app.send_static_file("donate.html")

@app.route('/image')
def image():
    return app.send_static_file("IMG_1930.JPG")


@app.route('/data')
def data():
    jsonArray = []
    csvFilePath = "static/data_v0.csv"
    #read csv file
    with open(csvFilePath, encoding='utf-8') as csvf:
        csvReader = csv.DictReader(csvf)

        for row in csvReader:
            jsonArray.append(row)

    jsonString = json.dumps(jsonArray, indent=4)
    return jsonString


if __name__ == '__main__':
    # This is used when running locally only. When deploying to Google App
    # Engine, a webserver process such as Gunicorn will serve the app. You
    # can configure startup instructions by adding `entrypoint` to app.yaml.
    app.run(host='127.0.0.1', port=8080, debug=True)
# [END gae_python3_app]
# [END gae_python38_app]
