import { useState } from "react";

import AudioBar from "./components/audio-bar/audio-bar";
import PlayList from "./components/playlist/playlist";

import Video from "./videos/Particles.mp4";

import "./App.css";

import beat_1 from "./audio/beat-1.mp3";
import beat_2 from "./audio/beat-2.mp3";
import beat_3 from "./audio/beat-3.mp3";

const tracks = [
  {
    id: 0,
    title: "iON - bazz",
    src: beat_1,
  },
  {
    id: 1,
    title: "iON - sad but cool",
    src: beat_2,
  },
  {
    id: 2,
    title: "iON - savage stuff",
    src: beat_3,
  },
];

function App() {
  const [selectedTrack, setSelectedTrack] = useState(tracks[0]);
  const [playing, setPlaying] = useState(false);

  return (
    <div className="main">
      <video id="video" autoPlay muted loop>
        <source src={Video} type="video/mp4" />
        Your browser does not support HTML5 video.
      </video>
      <div className="texts">
        <h1>
          &#127767;
          <a
            className="ion"
            href="https://github.com/ionutpopa/"
            rel="noreferrer"
            target="_blank"
          >
            iON{" "}
          </a>
          Music Player &#127763;
        </h1>
        <p>&#127775;Simple but beautiful&#127775;</p>
      </div>
      <AudioBar
        src={selectedTrack.src}
        setPlaying={setPlaying}
        playing={playing}
      />
      <PlayList
        setPlaying={setPlaying}
        tracks={tracks}
        selectedTrack={selectedTrack}
        setSelectedTrack={setSelectedTrack}
      />
    </div>
  );
}

export default App;
