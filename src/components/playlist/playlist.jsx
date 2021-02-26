import { useState } from "react";

import "./playlist.css";

const PlayList = ({ setPlaying, tracks, selectedTrack, setSelectedTrack }) => {
  const [playlist, setPlaylist] = useState(false)
  const [arrows, setArrows] = useState(true)
  const openPlaylist = () => {
    setArrows(false)
    setPlaylist(true)
  };
  const closePlaylist = () => {
    setPlaylist(false)
    setArrows(true)
  }
  return (
    <div className="playlist-container">
      <div onClick={closePlaylist} id={playlist ? "playlist" : "disable-playlist"}>
        {tracks.map((track) => (
          <div
            key={track.id}
            className={
              track.id === selectedTrack.id
                ? "playlist-item selected"
                : "playlist-item"
            }
            onClick={() => setSelectedTrack(track) & setPlaying(false)}
          >
            <p>{track.title}</p>
          </div>
        ))}
      </div>
      <div id={arrows ? "arrows" : "disable-arrows"}>
        <i
          onClick={openPlaylist}
          className="fa fa-angle-double-up"
          aria-hidden="true"
        ></i>
      </div>
    </div>
  );
};

export default PlayList;
