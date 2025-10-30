import os
import json
from flask import Flask, render_template, jsonify, request
from openai import OpenAI
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)

# Initialize OpenAI client
client = OpenAI(api_key=os.environ.get('OPENAI_API_KEY'))

# Base monster list with corresponding icons
BASE_MONSTERS = {
    "Vampire": "🧛",
    "Werewolf": "🐺",
    "Zombie": "🧟",
    "Ghost": "👻",
    "Mummy": "🧟‍♂️"
}

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/generate-monster', methods=['POST'])
def generate_monster():
    try:
        # Build monster list with icons for the prompt
        monster_list = ", ".join([f"{name} {icon}" for name, icon in BASE_MONSTERS.items()])

        # Create the prompt for GPT-4o-mini
        prompt = f"""Create a hybrid monster by blending exactly TWO of these: {monster_list}

Return JSON only:
{{
    "name": "portmanteau (e.g., Vampire+Zombie=Vompire)",
    "emojis": "both parent emojis",
    "parents": ["Monster1", "Monster2"],
    "colors": ["color1", "color2"],
    "abilities": ["hybrid ability 1", "hybrid ability 2"],
    "personality": ["trait1", "trait2"],
    "description": "One vivid sentence blending both monsters"
}}

Key: Each trait must genuinely BLEND both parents (not just describe one). Be concise."""

        # Call GPT-4o-mini
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You create hybrid Halloween monsters. Each trait must genuinely blend BOTH parent monsters. Be concise. Return only valid JSON."},
                {"role": "user", "content": prompt}
            ],
            response_format={"type": "json_object"},
            temperature=1.2,
            max_tokens=400  # Reduced from 800 for faster/cheaper generation
        )

        # Parse the response
        monster_data = json.loads(response.choices[0].message.content)

        return jsonify(monster_data)

    except Exception as e:
        print(f"Error generating monster: {str(e)}")
        return jsonify({
            "error": "Failed to generate monster",
            "message": str(e)
        }), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=True, host='0.0.0.0', port=port)
