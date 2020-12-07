import { useState } from "react";

import "./playlist.scss";

const PlayList = ({ setPlaying, tracks, selectedTrack, setSelectedTrack }) => {
  const [playlist, setPlaylist] = useState(false)
  const [arrows, setArrows] = useState(true)
  const openPlaylist = () => {
    setPlaylist(true)
    setArrows(false)
  };
  const closePlaylist = () => {
    setPlaylist(false)
    setArrows(true)
  }
  return (
    <div>
      <div onClick={closePlaylist} id={playlist ? "playlist" : null}>
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
      <div id={arrows ? "arrows" : null}>
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
