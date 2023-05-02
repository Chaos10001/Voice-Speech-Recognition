import React, { useState } from "react";
import "./index.scss";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { ArrowClockwise } from "react-bootstrap-icons";
import { PlayCircle } from "react-bootstrap-icons";
import { StopCircle } from "react-bootstrap-icons";
import { Mic } from "react-bootstrap-icons";
import { MicMute } from "react-bootstrap-icons";
import { FaRobot } from "react-icons/fa";
import { Col, Container, Row } from "react-bootstrap";

const VoiceRecognition = () => {
  const [message, setMessage] = useState("");

  window.addEventListener("offline", (e) => {
    console.log("Offline");
  });
  window.addEventListener("online", (e) => {
    console.log("Online");
  });

  const commands = [
    {
      command: "reset",
      callback: ({ resetTranscript }) => resetTranscript(),
    },
    {
      command: "open *",
      callback: (site) => {
        setMessage('Sure, But i would like to redirect you to a better resource')
        window.open("https://" + site);
      },
    },
    {
      command: "change background colour to *",
      callback: (color) => {
        document.body.style.background = color;
      },
    },
    {
      command: "Hello Linda *",
      callback: (command) => setMessage("Hello How May I Help You"),
      isFuzzyMatch: true,
      matchInterim: true,
    },
  ];
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
  } = useSpeechRecognition({ commands });

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }
  if (!isMicrophoneAvailable) {
    return <span>Microphone is not available</span>;
  }

  return (
    <Container className="pt-5">
      <Row className="ms-auto justify-content-center align-items-center bg-light shadow-lg h-auto text-center pt-3">
        <Col>
          <h1 className="fw-bolder text-danger pb-4">Speech Recognition</h1>
          <p>
            <span className="lead ">Microphone:</span>{" "}
            {listening ? (
              <Mic className="startRecord" />
            ) : (
              <MicMute className="stopRecord" />
            )}
          </p>
          <PlayCircle
            className="play ms-4"
            onClick={SpeechRecognition.startListening({
              continuous: true,
              language: "en-EN",
            })}
          />
          <ArrowClockwise className="reset ms-4" onClick={resetTranscript} />
          <StopCircle
            className="stop ms-4"
            onClick={SpeechRecognition.stopListening}
          />
          <p className="text-start mt-3 mb-5">
            {" "}
            <FaRobot className="robot " /> {message}
          </p>
          <div className="message">
            <p className="lead text-start p-4">
              Give an instruction to the bot: {transcript}
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
export default VoiceRecognition;
