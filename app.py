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
        prompt = f"""You are a creative Halloween monster generator. Create a unique hybrid monster by combining 2-3 of these base monsters:

{monster_list}

Generate a JSON response with this exact structure:
{{
    "name": "creative portmanteau name (e.g., Vampire+Zombie=Vompire)",
    "emojis": "Include the emojis from the parent monsters you selected (e.g., if combining Vampire 🧛 and Zombie 🧟, use '🧛🧟')",
    "parents": ["Monster1", "Monster2"],
    "traits": {{
        "head": "description of head features",
        "torso": "description of torso/body",
        "arms": "description of arms/hands",
        "legs": "description of legs/movement",
        "special": "unique special ability or feature"
    }},
    "colors": ["color1", "color2", "color3"],
    "abilities": ["ability1", "ability2", "ability3", "ability4"],
    "personality": ["trait1", "trait2", "trait3", "trait4"],
    "description": "A dramatic 2-3 sentence description of this terrifying creature"
}}

IMPORTANT:
- The "emojis" field must contain ONLY the emojis from the parent monsters you selected (e.g., 🧛🧟 for Vampire+Zombie)
- The "parents" array must contain the exact names from the available monsters list
- Make it creative, spooky, and unique! Each generation should be different."""

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
