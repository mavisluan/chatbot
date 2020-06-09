import React, { Component } from 'react';
import RecorderJS from 'recorder-js';
import { Interactions } from 'aws-amplify';

import { getAudioStream, exportBuffer } from '../utils/audio.js';

class Recorder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stream: null,
      recording: false,
      recorder: null
    };
    this.startRecord = this.startRecord.bind(this);
    this.stopRecord = this.stopRecord.bind(this);
  }

  async componentDidMount() {
    let stream;

    try {
      stream = await getAudioStream();
    } catch (error) {
      // Users browser doesn't support audio.
      // Add your handler here.
      console.log(error);
    }

    this.setState({ stream });
  }

  startRecord() {
    const { stream } = this.state;

    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const recorder = new RecorderJS(audioContext);
    recorder.init(stream);

    this.setState(
      {
        recorder,
        recording: true
      },
      () => {
        recorder.start();
      }
    );
  }

  async stopRecord () {
    const { recorder } = this.state;

    const { buffer } = await recorder.stop()
    const audio = exportBuffer(buffer[0]);

    // Process the audio here.
    console.log(audio);
    const response = await Interactions.send("ServiceBot_dev", {options: {'messageType': 'voice' }, content: audio});
    console.log('response', response)
    // this.play(audio)

    this.setState({
      recording: false
    });
  }
  //  play (buffer, callback) {
  //   var myBlob = new Blob([buffer], { type: 'audio/mpeg' });
  //   var audio = document.createElement('audio');
  //   var objectUrl = window.URL.createObjectURL(myBlob);
  //   audio.src = objectUrl;
  //   audio.addEventListener('ended', function() {
  //     audio.currentTime = 0;
  //     if (typeof callback === 'function') {
  //       callback();
  //     }
  //   });
  //   audio.play();
  // };

  render() {
    const { recording, stream } = this.state;

    // Don't show record button if their browser doesn't support it.
    if (!stream) {
      return null;
    }

    return (
      <button
        onClick={() => {
          recording ? this.stopRecord() : this.startRecord();
        }}
        >
        {recording ? 'Stop Recording' : 'Start Recording'}
      </button>
    );
  }
}

export default Recorder;