from flask import Flask, render_template, make_response, request, jsonify
import json
from back.draw_reaction import DrawReactionHTML


app = Flask(__name__,
            template_folder='front',
            static_folder='front')

app.secret_key = "super secret key"


@app.route('/')
def index():
    return render_template("index.html")


@app.route('/reaction', methods=['POST'])
def reaction():
    response = request.get_json()
    reaction_data = response["dataCsv"]
    reaction_data_handled = DrawReactionHTML.handle_csv(reaction_data)

    reaction_draw = DrawReactionHTML(reaction_data_handled)
    reaction_string = reaction_draw.run()

    return json.dumps({"statusCode": "203", "body":{"reactionString": reaction_string}})

if __name__ == '__main__':
    app.run(debug=True)