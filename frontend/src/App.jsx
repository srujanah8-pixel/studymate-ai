
import { useState } from "react";
import "./index.css";

const API = "http://127.0.0.1:5000";

export default function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState(null);
  const [asking, setAsking] = useState(false);
  const [askError, setAskError] = useState("");

  // Upload and extract PDF
  async function uploadPDF(event) {
    event.preventDefault();

    if (!file) {
      setError("Please select a PDF first.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);
    setAnswer(null);
    setAskError("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(`${API}/api/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "PDF upload failed.");
      }

      setResult(data);
    } catch (err) {
      console.error("Upload error:", err);

      setError(
        err.message === "Failed to fetch"
          ? "Cannot connect to the backend. Make sure Flask is running on port 5000."
          : err.message || "Could not upload the PDF."
      );
    } finally {
      setLoading(false);
    }
  }

  // Ask AI about the uploaded PDF
  async function askTutor(event) {
    event.preventDefault();

    if (!result?.filename) {
      setAskError("Please upload a PDF first.");
      return;
    }

    if (!question.trim()) {
      setAskError("Please enter a question.");
      return;
    }

    setAsking(true);
    setAskError("");
    setAnswer(null);

    try {
      const response = await fetch(`${API}/api/ask`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: question.trim(),
          filename: result.filename,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Could not answer your question.");
      }

      setAnswer(data);
    } catch (err) {
      console.error("Ask AI error:", err);

      setAskError(
        err.message === "Failed to fetch"
          ? "Cannot connect to Flask. Check that the backend is running at http://127.0.0.1:5000."
          : err.message || "Something went wrong while answering."
      );
    } finally {
      setAsking(false);
    }
  }

  return (
    <main className="app">
      <header className="header">
        <div className="logo">S</div>

        <div>
          <h1>StudyMate AI</h1>
          <p>Your personal learning companion</p>
        </div>
      </header>

      <section className="hero">
        <span className="eyebrow">YOUR SMART STUDY SPACE</span>
        <h2>Learn smarter. Understand deeper.</h2>
        <p>Upload your course material and learn with AI.</p>
      </section>

      {/* PDF Upload Section */}
      <section className="upload-card">
        <h2>Upload study material</h2>
        <p>Choose a text-based PDF up to 20 MB.</p>

        <form onSubmit={uploadPDF}>
          <label className="file-picker">
            <strong>
              {file ? file.name : "Choose a PDF file"}
            </strong>

            <span>Click to browse your files</span>

            <input
              type="file"
              accept=".pdf,application/pdf"
              onChange={(event) => {
                setFile(event.target.files?.[0] || null);
                setResult(null);
                setError("");
                setAnswer(null);
                setAskError("");
              }}
            />
          </label>

          <button type="submit" disabled={!file || loading}>
            {loading ? "Processing PDF..." : "Upload and extract"}
          </button>
        </form>

        {error && (
          <p role="alert" className="error">
            {error}
          </p>
        )}

        {result && (
          <section className="success">
            <h3>PDF processed successfully!</h3>

            <p>
              <strong>File:</strong> {result.filename}
            </p>

            <p>
              <strong>Pages extracted:</strong> {result.page_count}
            </p>

            <p>
              Your study material is ready. You can now ask questions
              about this document.
            </p>
          </section>
        )}
      </section>

      {/* AI Tutor Section */}
      <section className="upload-card">
        <h2>Ask StudyMate AI</h2>
        <p>Ask questions based on your uploaded study material.</p>

        <form onSubmit={askTutor}>
          <textarea
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            placeholder="For example: Explain the main requirements of Track D."
            rows={4}
            disabled={asking}
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "14px",
              margin: "16px 0",
              borderRadius: "10px",
              border: "1px solid #d5d4f5",
              font: "inherit",
              resize: "vertical",
            }}
          />

          <button
            type="submit"
            disabled={asking || !result?.filename || !question.trim()}
          >
            {asking ? "Thinking..." : "Ask AI"}
          </button>
        </form>

        {askError && (
          <p role="alert" className="error">
            {askError}
          </p>
        )}

        {answer && (
          <div className="success">
            <h3>Answer</h3>

            <p
              style={{
                whiteSpace: "pre-wrap",
                lineHeight: 1.7,
              }}
            >
              {answer.answer}
            </p>

            <h3>Sources</h3>

            {answer.sources?.length > 0 ? (
              <ul>
                {answer.sources.map((source, index) => (
                  <li
                    key={`${source.filename}-${source.page}-${index}`}
                  >
                    {source.filename} — Page {source.page}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No supporting pages were found for this answer.</p>
            )}
          </div>
        )}
      </section>

      <footer>StudyMate AI · Personalized learning</footer>
    </main>
  );
}
