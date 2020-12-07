import { useState, useRef, useEffect } from "react";

import WaveSurfer from "wavesurfer.js";

import "./audio-bar.scss";

const formWaveSurferOptions = (ref) => ({
  container: ref,
  waveColor: "#eee",
  progressColor: "#0073e6",
  cursorColor: "#0073e6",
  barWidth: 3,
  barRadius: 3,
  responsive: true,
  height: 150,
  // If true, normalize by the maximum peak instead of 1.0.
  normalize: true,
  backend: "MediaElement",
});

const AudioBar = ({ src, setPlaying, playing }) => {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  
  const [volume, setVolume] = useState(0.5);

  useEffect(() => {
    const options = formWaveSurferOptions(waveformRef.current);
    wavesurfer.current = WaveSurfer.create(options);

    wavesurfer.current.load(src);

    wavesurfer.current.on("ready", function () {
      // https://wavesurfer-js.org/docs/methods.html
      // wavesurfer.current.play();
      // setPlaying(true);

      // make sure object still available when file loaded
      // fara asta cand schimbi volumul trebuie sa isi dea reload componenta
      if (wavesurfer.current) {
        wavesurfer.current.setVolume(volume);
        setVolume(volume);
      }
    });

    wavesurfer.current.on("finish", function () {
      console.log("piesa s-a terminat");
      setPlaying(false)
    });

    // Dupa ce se termina, distrugem instanta de wavesurfer ca sa nu porneasca doua audiobaruri
    return () => wavesurfer.current.destroy();
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
          // waveSurfer recognize value of `0` same as `1`
          //  so we need to set some zero-ish value for silence
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
