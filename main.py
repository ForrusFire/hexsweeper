from flask import Flask, render_template
from flask_cors import CORS

from argparse import ArgumentParser


# Create app
app = Flask(__name__)
app.config["DEBUG"] = True
CORS(app)


# Set routes
@app.route('/', methods=['GET'])
def home():
    return render_template("index.html")

@app.route('/settings', methods=['GET'])
def settings():
    return render_template('settings.html')



if __name__ == '__main__':
    parser = ArgumentParser()
    parser.add_argument('-p', '--port', default=5001, type=int, help='port to listen on')
    args = parser.parse_args()
    port = args.port

    app.run(host='127.0.0.1', port=port)