#!/bin/bash

# Spooky Halloween Website - Local Run Script

echo "🎃 Starting Spooky Halloween Website... 🎃"
echo ""

# Check if uv is installed
if ! command -v uv &> /dev/null; then
    echo "❌ uv is not installed. Please install it first:"
    echo "   curl -LsSf https://astral.sh/uv/install.sh | sh"
    exit 1
fi

# Create virtual environment if it doesn't exist
if [ ! -d ".venv" ]; then
    echo "📦 Creating virtual environment..."
    uv venv
fi

# Activate virtual environment and install dependencies
echo "📦 Installing dependencies..."
source .venv/bin/activate
uv pip install -r requirements.txt

echo ""
echo "✅ Setup complete!"
echo ""
echo "🌐 Starting Flask server..."
echo "   Visit: http://localhost:5000"
echo "   Press Ctrl+C to stop"
echo ""

# Run the Flask app
python app.py
