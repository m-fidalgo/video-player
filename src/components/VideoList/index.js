import React from "react";
import { Channel } from "../../services/EventService";

export default function VideoList(props) {
  const videos = props.videos || [];

  function handleClick(video) {
    Channel.emit("video:select", video);
  }

  return (
    <ul className="video-list">
      {videos.map((video) => (
        <li className="video" key={video.id} onClick={() => handleClick(video)}>
          <img alt={video.name} src={video.coverImg} />
        </li>
      ))}
    </ul>
  );
}
