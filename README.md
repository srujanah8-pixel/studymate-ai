# StudyMate AI 📚

### Personalized Tutoring & Adaptive Learning

StudyMate AI is an AI-powered study assistant designed to help students learn more effectively from their own study materials. Students can upload PDF documents, ask questions about the content, and receive AI-generated explanations with source-page references.

## ✨ Features

- **PDF Upload:** Upload study materials in PDF format.
- **AI-Powered Q&A:** Ask questions based on the uploaded document.
- **Source References:** View relevant source pages alongside answers.
- **Simple Interface:** A clean, interactive web interface built for students.
- **Document-Based Learning:** Helps students understand their learning materials without manually searching through every page.

## 🛠️ Technology Stack

**Frontend**
- React
- Vite
- JavaScript
- CSS

**Backend**
- Python
- Flask
- PyMuPDF for PDF text extraction
- Google Gemini API for AI-generated responses

## 📁 Project Structure

```text
studymate-ai/
├── backend/
│   ├── app.py
│   └── requirements.txt
├── frontend/
│   ├── src/
│   ├── package.json
│   └── index.html
├── docs/
├── .gitignore
└── README.md
```

## ⚙️ Prerequisites

Install the following before running the project:

- Python 3.10 or later
- Node.js and npm
- A Google Gemini API key

## 🚀 Setup and Installation

### 1. Clone the repository

```bash
git clone https://github.com/srujanah8-pixel/studymate-ai.git
cd studymate-ai
```

### 2. Configure the backend

Open a terminal in the project root and run:

```bash
cd backend
python -m venv .venv
```

Activate the virtual environment on Windows:

```powershell
.\.venv\Scripts\Activate.ps1
```

Install the Python dependencies:

```bash
pip install -r requirements.txt
```

Create a `.env` file inside the `backend` folder:

```env
GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=gemini-3.5-flash-lite
```

Replace the placeholder with your own API key. Never commit your `.env` file to GitHub.

Start the backend:

```bash
python app.py
```

The backend runs at `http://127.0.0.1:5000`.

### 3. Start the frontend

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL displayed by Vite in your terminal.

## 📖 How to Use

1. Open StudyMate AI in your browser.
2. Upload a PDF containing your study material.
3. Enter a question related to the uploaded content.
4. Submit the question.
5. Read the generated response and review the referenced source pages.

## 🔐 Security and Limitations

- Keep API keys in environment variables and never publish them.
- The application currently processes text extracted from PDFs; scanned PDFs may require OCR support.
- Uploaded document data is held in application memory and may be lost when the backend restarts.
- AI responses depend on the availability and limits of the configured Gemini API model.

## 🎯 Hackathon Track

**Track D — Personalized Tutoring & Adaptive Learning**

StudyMate AI aims to make learning more interactive by allowing students to ask questions directly about their own study materials.

## 👩‍💻 Author

**GitHub:** [srujanah8-pixel](https://github.com/srujanah8-pixel)
