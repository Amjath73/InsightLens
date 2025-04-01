from flask import Flask, jsonify, request
from flask_cors import CORS
import json
from sel import fetch_top_research_papers, get_direct_paper_link

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

@app.route('/api/papers', methods=['GET'])
def get_papers():
    query = request.args.get('query')
    if not query:
        return jsonify({"error": "Query parameter is required"}), 400

    try:
        papers = fetch_top_research_papers(query)
        return jsonify(papers)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/paper-direct-link', methods=['POST'])
def get_direct_link():
    try:
        data = request.get_json()
        title = data.get('title')
        source = data.get('source')

        if not title:
            return jsonify({"error": "Paper title is required"}), 400

        direct_url = get_direct_paper_link(title, source)
        print(f"📄 Direct URL found: {direct_url}")

        return jsonify({"directUrl": direct_url})

    except Exception as e:
        print(f"❌ Error getting direct link: {str(e)}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)