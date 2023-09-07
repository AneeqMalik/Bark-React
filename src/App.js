import "./App.css";
import { useState} from "react";
import axios from "axios";
import { DotLoader } from "react-spinners";
import speakers from "./Speakers.js";

function App() {
  const [isOpen, setOpen] = useState(false);
  // eslint-disable-next-line
  const [selectedItem, setSelectedItem] = useState("");
  const [text, setText] = useState("");
  const [url, setUrl] = useState("");
  const [audioSrc, setAudioSrc] = useState(null);
  const [prompt, setPrompt] = useState(false);
  const [converting, setConverting] = useState(false);

  const toggleDropdown = () => setOpen(!isOpen);

  const handleItemClick = (code) => {
    // eslint-disable-next-line
    selectedItem == code ? setSelectedItem(null) && setPrompt(false) : setSelectedItem(code) && setPrompt(true);
    console.log(selectedItem);
  };

  const handleSubmit = async () => {
    setConverting(true);
    setAudioSrc("");
    if (url && !prompt) {
      axios
        .post(`${url}/process_text`, {
          text: text,
        })
        .then(function (response) {
          console.log(response.data);
          let data = response.data;
          setAudioSrc(data["audio_url"]);
          setConverting(false);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    if (url && prompt) {
      axios
        .post(`${url}/process_text_custom_voice`, {
          text: text,
          history_prompt: selectedItem
        })
        .then(function (response) {
          console.log(response.data);
          let data = response.data;
          setAudioSrc(data["audio_url"]);
          setConverting(false);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    else {
      console.log("Url is not Correct or Entered");
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="url-box">
          <input
            name="model-url"
            placeholder="Enter the URL of Bark Model"
            onChange={(e) => {
              setUrl(e.target.value);
            }}
          />
        </div>
        <div className="row">
          <div className="input-box">
            <h3>Input Text</h3>
            <textarea
              type="text"
              name="input-text"
              onChange={(e) => {
                setText(e.target.value);
              }}
            />
          </div>
          <div className="audio-box">
            <h3>Generated Audio</h3>
            <div className="audio">
              {audioSrc ? (
                <audio src={audioSrc} controls />
              ) : converting ? (
                <DotLoader color="#36d7b7" />
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </div>

        <div className="prompt-autostic">
          <h3>Acoustic Prompt</h3>
          <div className="dropdown">
            <div className="dropdown-header" onClick={toggleDropdown}>
              {selectedItem
                ? speakers.find((speaker) => speaker.code === selectedItem).name // Find the speaker name based on code
                : "Unconditional"}
              <i className={`fa fa-chevron-right icon ${isOpen && "open"}`}></i>
            </div>
            <div className={`dropdown-body ${isOpen && "open"}`}>
              {speakers.map((speaker) => (
                <div
                  key={speaker.code} // Use the speaker code as the key
                  className="dropdown-item"
                  onClick={() => handleItemClick(speaker.code)} // Use the speaker code as the id
                  id={speaker.code}
                >
                  <span
                    className={`dropdown-item-dot ${
                      selectedItem === speaker.code && "selected"
                    }`}
                  >
                    ✅
                  </span>
                  {speaker.name}
                </div>
              ))}
            </div>
          </div>
        </div>

        <button
          className="run-button"
          onClick={handleSubmit}
          disabled={!converting ? false : true}
        >
          Run
        </button>
      </header>
    </div>
  );
}

export default App;
