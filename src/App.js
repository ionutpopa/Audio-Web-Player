import { useState } from "react";

import AudioBar from "./components/audio-bar/audio-bar";
import PlayList from "./components/playlist/playlist";

import Video from "./videos/Particles.mp4";

import "./App.css";

import beat_2 from "./audio/beat-2.wav";
import beat_1 from "./audio/beat-1.wav";

const tracks = [
  {
    id: 0,
    title: "Beat 1",
    src: beat_1,
  },
  {
    id: 1,
    title: "Beat 2",
    src: beat_2,
  }
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
        <h1>&#127767;Web App Audio-Player&#127763;</h1>
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
