import React, { Component } from "react";
import PropTypes from "prop-types";
import HorizontalImageFail from "./Video Fail Horizontal.svg";
import VerticalImageFail from "./Video Fail Vertical.svg";

class FileThumbnail extends Component {
  async componentDidMount() {
    // console.log("File Testing");
    // console.log(this.props.file);
    const file = this.props.file;
    let canvasSize = this.props.canvasSize ? this.props.canvasSize : 200;
    // let startTime = this.props.startTime ? this.props.startTime : 0;
    let seekTo = this.props.startTime ? this.props.startTime : 0;
    let seekToFallback = this.props.startTimeFail
      ? this.props.startTimeFail
      : 0;
    // let maxFileSize = this.props.maxFileSize
    //   ? this.props.maxFileSize
    //   : 1000000000; //Not Used, removed using try/catch
    console.log(seekTo);
    console.log(canvasSize);

    console.log(file);

    var reader = new FileReader();
    reader.readAsText(file);
    let fileRawData = null;

    reader.onload = async () => {
      fileRawData = reader.result;
      return fileRawData;
    };

    return new Promise((resolve, reject) => {
      // load the file to a video player
      const videoPlayer = document.createElement("video");
      videoPlayer.setAttribute("src", URL.createObjectURL(file));
      videoPlayer.load();
      videoPlayer.addEventListener("error", (ex) => {
        reject("error when loading video file", ex);
        console.log("ErrOR");
      });

      console.log("Good to go");

      // load metadata of the video to get video duration and dimensions
      videoPlayer.addEventListener("loadedmetadata", () => {
        // seek to user defined timestamp (in seconds) if possible
        if (videoPlayer.duration < seekTo) {
          if (videoPlayer.duration < seekToFallback) {
            let finalFail = this.props.finalFail;
            // console.log(finalFail);
            finalFail = finalFail.toLowerCase().replace(/\s/g, "");

            if (finalFail === "end" || finalFail === "e") {
              seekTo = videoPlayer.duration;
              console.log(
                "finalFail activated, location set to video.duration"
              );
            } else {
              seekTo = 0;
              console.log("finalFail activated, location set to 0");
            }
          } else {
            seekTo = seekToFallback;
          }
        }
        // delay seeking or else 'seeked' event won't fire on Safari
        setTimeout(() => {
          videoPlayer.currentTime = seekTo;
        }, 200);
        // extract video thumbnail once seeking is complete
        videoPlayer.addEventListener("seeked", () => {
          console.log("video is now paused at %ss.", seekTo);
          // define a canvas to have the same dimension as the video
          const canvas = document.getElementById(
            `canvas+${this.props.file.name}`
          );

          canvas.height = videoPlayer.videoHeight;
          // scale_width = videoPlayer.videoWidth;
          let scaler = canvasSize;
          // let scale_width = videoPlayer.videoWidth / scaler;
          let scale_width = canvasSize / videoPlayer.videoWidth;
          console.log(scaler);
          canvas.width = scaler;
          // console.log(canvas);
          canvas.height = videoPlayer.videoHeight * scale_width;
          canvas.width = canvasSize;
          // draw the video frame to canvas
          const video_draw = canvas.getContext("2d");
          // console.log(videoPlayer)
          // canvas.height = canvasSize
          console.log("width " + canvas.width);

          try {
            canvas.style.display = "inline";
            canvas.innerHTML = video_draw.drawImage(
              videoPlayer,
              0,
              0,
              canvas.width,
              canvas.height
            );
          } catch (error) {
            canvas.style.display = "none";

            this.createImageOnError(
              videoPlayer,
              canvas,
              canvasSize,
              video_draw
            );
          }
          if (canvas.width === 0 || canvas.height === 0) {
            canvas.style.display = "none";

            this.createImageOnError(
              videoPlayer,
              canvas,
              canvasSize,
              video_draw
            );
          }
        });
      });
    });
    // }
  }

  async createImageOnError(videoPlayer, canvas, canvasSize) {
    const img = document.getElementById(
      `canvas+${this.props.file.name}+failed`
    );
    img.style.display = "inline";
    console.log(img);

    let image = "";

    let imageType = "";
    if (videoPlayer.videoHeight === 0 || videoPlayer.videoWidth === 0) {
      imageType = this.props.DefaultFailedOrientation
        ? "Horizontal"
        : "Vertical";
      console.log(imageType);
    }

    if (imageType === "Vertical") {
      image = VerticalImageFail;
    } else {
      image = HorizontalImageFail;
    }

    let custom_Image = this.props.CustomFailedFileImageHorizontal
      ? this.props.CustomFailedFileImageHorizontal
      : this.props.CustomFailedFileImageVertical;

    image = custom_Image ? custom_Image : image;

    // canvas.style.width = canvasSize;

    img.src = image;
  }

  render() {
    return (
      <div>
        <canvas
          id={`canvas+${this.props.file.name}`}
          style={{
            // border: "1px solid",
            display: "none",
            // margin: "auto",
            // display:"inline"
          }}
          alt={this.props.altText}
        ></canvas>
        <img
          id={`canvas+${this.props.file.name}+failed`}
          style={{
            // border: "1px solid",
            width: this.props.canvasSize,
            display: "none",
            // display:"inline"
            // margin: "auto",
          }}
          alt={this.props.altText}
        ></img>
        <p>
          this is is the altText that a screen reader would read:{" "}
          {this.props.altText}
        </p>
      </div>
    );
  }
}

FileThumbnail.propTypes = {
  file: PropTypes.object,
  startTime: PropTypes.number,
  canvasSize: PropTypes.number,
  startTimeFail: PropTypes.number,
  finalFail: PropTypes.string,
  maxFileSize: PropTypes.number,
  DefaultFailedOrientation: PropTypes.string,
  CustomFailedFileImageHorizontal: PropTypes.object,
  CustomFailedFileImageVertical: PropTypes.object,
};

// file={file}
// startTime={3000}
// canvasSize={900}
// startTimeFail={90}
// finalFail={"end"} //beginning
// maxFileSize={1500000000} //Not Used, removed using try/catch
// DefaultFailedOrientation={"Horizontal"}
// CustomFailedFileImageHorizontal={CustomFailedHorizontal}
// CustomFailedFileImageVertical={CustomFailedVertical}

export default FileThumbnail;
