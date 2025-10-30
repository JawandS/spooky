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
        prompt = f"""Create a hybrid monster by combining exactly TWO of these monsters:

{monster_list}

JSON structure:
{{
    "name": "portmanteau name (e.g., Vampire+Zombie=Vompire)",
    "emojis": "the two parent emojis (e.g., 🧛🧟)",
    "parents": ["Monster1", "Monster2"],
    "traits": {{
        "head": "head description",
        "torso": "torso description",
        "arms": "arms description",
        "legs": "legs description",
        "special": "special ability"
    }},
    "colors": ["color1", "color2", "color3"],
    "abilities": ["ability1", "ability2", "ability3"],
    "personality": ["trait1", "trait2", "trait3"],
    "description": "2-3 sentence spooky description"
}}

Rules: Use exactly 2 parent monsters, include their emojis, be creative."""

        # Call GPT-4o-mini
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You are a creative Halloween monster generator. Always respond with valid JSON only, no additional text."},
                {"role": "user", "content": prompt}
            ],
            response_format={"type": "json_object"},
            temperature=1.2,  # Higher temperature for more creativity
            max_tokens=800
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
