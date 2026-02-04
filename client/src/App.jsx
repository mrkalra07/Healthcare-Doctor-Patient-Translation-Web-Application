import { useState, useEffect, useRef } from "react";
import axios from "axios";

const API = "https://healthcare-backend-3wfv.onrender.com";


const LANGS = [
  { name: "English", code: "en" },
  { name: "Hindi", code: "hi" },
  { name: "Spanish", code: "es" },
  { name: "French", code: "fr" },
  { name: "German", code: "de" },
  { name: "Arabic", code: "ar" },
  { name: "Chinese", code: "zh" }
];

function App() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [role, setRole] = useState("doctor");
  const [src, setSrc] = useState("en");
  const [tgt, setTgt] = useState("hi");
  const [search, setSearch] = useState("");
  const [summary, setSummary] = useState("");

  const mediaRecorder = useRef(null);
  const chunks = useRef([]);

  useEffect(() => {
    axios.get(`${API}/api/messages`).then(r => setMessages(r.data));
  }, []);

  const send = async () => {
    const r = await axios.post(`${API}/api/translate`, {
      senderRole: role,
      text,
      sourceLanguage: src,
      targetLanguage: tgt
    });
    setMessages([...messages, r.data]);
    setText("");
  };

  const doSearch = async () => {
    const r = await axios.get(`${API}/api/messages/search?q=${search}`);
    setMessages(r.data);
  };

  const getSummary = async () => {
    const r = await axios.get(`${API}/api/summary`);
    setSummary(r.data.summary);
  };

  const startRec = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder.current = new MediaRecorder(stream);
    chunks.current = [];
    mediaRecorder.current.ondataavailable = e => chunks.current.push(e.data);
    mediaRecorder.current.onstop = uploadAudio;
    mediaRecorder.current.start();
  };

  const stopRec = () => mediaRecorder.current.stop();

  const uploadAudio = async () => {
    const blob = new Blob(chunks.current);
    const fd = new FormData();
    fd.append("audio", blob);
    const r = await axios.post(`${API}/api/audio`, fd);
    setMessages([...messages, r.data]);
  };

  return (
    <div>
      <h2>Doctor–Patient Translator</h2>

      <select onChange={e => setRole(e.target.value)}>
        <option>doctor</option>
        <option>patient</option>
      </select>

      <select onChange={e => setSrc(e.target.value)}>
        {LANGS.map(l => <option value={l.code}>{l.name}</option>)}
      </select>

      <select onChange={e => setTgt(e.target.value)}>
        {LANGS.map(l => <option value={l.code}>{l.name}</option>)}
      </select>

      <input value={search} onChange={e=>setSearch(e.target.value)} />
      <button onClick={doSearch}>Search</button>
      <button onClick={getSummary}>Summary</button>

      <div style={{height:300,overflow:"scroll"}}>
        {messages.map((m,i)=>(
          <div key={i}>
            {m.translatedText && <p>{m.senderRole}: {m.translatedText}</p>}
            {m.audioUrl && <audio controls src={m.audioUrl}></audio>}
          </div>
        ))}
      </div>

      <input value={text} onChange={e=>setText(e.target.value)} />
      <button onClick={send}>Send</button>

      <br/>

      <button onClick={startRec}>🎙 Start</button>
      <button onClick={stopRec}>⏹ Stop</button>

      {summary && <pre>{summary}</pre>}
    </div>
  );
}

export default App;
