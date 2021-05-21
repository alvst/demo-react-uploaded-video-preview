import React, { useState } from "react";
import FileThumbnail from "./FileThumbnail";
// import CustomFailedHorizontal from "./CustomVideoErrorFile.svg";
// import CustomFailedVertical from "./Custom Video Fail Vertical.svg";

function FileProcessor() {
  const [myFiles, setMyFiles] = useState([]);

  const files = myFiles.map((file, key) => {
    return (
      <div key={file.path} style={{ padding: "0px" }}>
        <FileThumbnail
          file={file}
          startTime={20}
          canvasSize={900}
          startTimeFail={5}
          finalFail={"end"} //beginning end or e
          maxFileSize={1500000000} //Not Used, removed using try/catch
          DefaultFailedOrientation={"Horizontal"}
          // CustomFailedFileImageHorizontal={CustomFailedHorizontal}
          // CustomFailedFileImageVertical={CustomFailedVertical}
        />
        <p>{file.name}</p>
      </div>
    );
  });

  function handleChange(event) {
    console.log(`Selected file - ${event.target.files[0].name}`);
    setMyFiles([...myFiles, event.target.files[0]]);
  }

  return (
    <form>
      <input type="file" onChange={handleChange} />
      <h4 style={{ fontWeight: "bold" }}>Files</h4>
      {files}
    </form>
  );
}

export default FileProcessor;
