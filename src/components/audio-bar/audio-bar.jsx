import { useState, useRef, useEffect } from "react";

import WaveSurfer from "wavesurfer.js";

import "./audio-bar.css";

const formWaveSurferOptions = (ref) => ({
  container: ref,
  waveColor: "#eee",
  progressColor: "#0073e6",
  cursorColor: "#0073e6",
  barWidth: 3,
  barRadius: 3,
  responsive: true,
  height: 150,
  normalize: true,
  backend: "MediaElement",
});

const AudioBar = ({ src, setPlaying, playing }) => {

  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);

  const [volume, setVolume] = useState(0.5);
  const [loading, setLoading] = useState(0);

  useEffect(() => {
    const options = formWaveSurferOptions(waveformRef.current);
    wavesurfer.current = WaveSurfer.create(options);

    wavesurfer.current.load(src);

    wavesurfer.current.on('loading', function(x, evt) {
      setTimeout(() => {
        setLoading(x)
      }, 1000);
    });

    wavesurfer.current.on("ready", function () {
      if (wavesurfer.current) {
        wavesurfer.current.setVolume(volume);
        setVolume(volume);
      }
    });

    wavesurfer.current.on("finish", function () {
      setPlaying(false);
    });

    wavesurfer.current.on()

    return () => wavesurfer.current.destroy();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);

  const handlePlayPause = () => {
    setPlaying(!playing);
    wavesurfer.current.playPause();
  };

  const onVolumeChange = (e) => {
    const { target } = e;
    const newVolume = target.value;

    if (newVolume) {
      setVolume(newVolume);
      wavesurfer.current.setVolume(newVolume || 1);
    }
  };

  return (
    <div className="audio-bar-container">
      {loading >= 100 ? null : <p className="loading">loading: {loading}</p>}
      <div className="waveform" ref={waveformRef} />
      <div className="controls">
        <div className="play-button" onClick={handlePlayPause}>
          {!playing ? (
            <i className="fa fa-play" aria-hidden="true"></i>
          ) : (
            <i className="fa fa-pause" aria-hidden="true"></i>
          )}
        </div>
        <input
          type="range"
          id="volume"
          name="volume"
          min="0"
          max="1"
          step=".025"
          onChange={onVolumeChange}
          defaultValue={volume}
        />
      </div>
    </div>
  );
};

export default AudioBar;
