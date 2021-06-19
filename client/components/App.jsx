import React, { useEffect, useRef, useState } from 'react';

import { copyToClipboard } from 'react-copy-to-clipboard';
import Peer from 'simple-peer';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:5001');

function App() {
  const [me, setMe] = useState('');
  const [stream, setStream] = useState('');
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState('');
  const [callerSignal, setCallerSignal] = useState(null);
  const [callAccepted, setCallAccepted] = useState(false);
  const [idToCall, setIdToCall] = useState('');
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState('');

  /* allows us to reference our video */
  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  /* componentDidMount */
  useEffect(() => {
    /* allows us to use webcam */
    // eslint-disable-next-line no-undef
    navigator.mediaDevices.getUserMedia({ vide: true, audio: true }).then((stream) => {
      setStream(stream);
      myVideo.current.srcObject = stream;
    });

    socket.on('me', (id) => {
      setMe(id);
    });

    socket.on('callUser', (data) => {
      setReceivingCall(true);
      setCaller(data.from);
      setName(data.name);
      setCallerSignal(data.signal);
    });
  }, []);

  /* call the user */
  const callUser = (id) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on('signal', (data) => {
      socket.emit('callUser', {
        userToCall: id,
        signalData: data,
        from: me,
        name,
      });

      /* other user's video */
      peer.on('stream', (stream) => {
        userVideo.current.srcObject = stream;
      });

      socket.on('callAccepted', (signal) => {
        setCallAccepted(true);
        peer.signal(signal);
      });

      /* when we end the call, we can disable the connectionRef */
      connectionRef.current = peer;
    });

    /* answer the call */
    const answerCall = () => {
      setCallAccepted(true);
      const peer1 = new Peer({
        initiator: false,
        trickle: false,
        stream,
      });

      peer.on('signal', (data) => {
        socket.emit('answerCall', {
          signal: data,
          to: caller,
        });
      });

      peer.on('stream', (stream) => {
        userVideo.current.srcObject = stream;
      });

      peer.signal(callerSignal);

      connectionRef.current = peer;
    };
  };

  const leaveCall = () => {
    setCallEnded(true);
    /* this ends our connection */
    connectionRef.current.destroy();
  };

  return (
    <div className="container">
      <header className="header">
        <h1>Skypish</h1>
      </header>
      <div className="video-container">
        <div className="video">
          {stream && <video playsInline muted ref={myVideo} autoPlay />}
        </div>
        <div className="video">
          {callAccepted && !callEnded
            ? <video playsInline ref={userVideo} autoPlay /> : null}
        </div>
      </div>
      <div className="myId">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          value={name}
          id="caller-id"
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
    </div>
  );
}

export default App;
