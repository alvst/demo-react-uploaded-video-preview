# Demo of Video Upload React Preview

A sample project demoing [Video Upload React Preview](https://github.com/alvst/react-uploaded-video-preview).

## Installation

You can clone this project to test it and try out alternatives:
```
git clone https://github.com/alvst/demo-react-uploaded-video-preview.git
```

### Usage

```es6
import FileThumbnail from "react-uploaded-video-preview";
...
<FileThumbnail
    file={file}
    startTime={3000}
    canvasSize={900}
    startTimeFail={2}
    finalFail={"end"}
    DefaultFailedOrientation={"Horizontal"}
    altText={"Custom Alt Text for screen readers"}
    // CustomFailedFileImageHorizontal={CustomFailedHorizontal}
    // CustomFailedFileImageVertical={CustomFailedVertical}
    />
```


## Properties

You can edit and modify ```Drop.js``` to understand the capabilities of FileThumbnail. 

## Known Problems:

Only Safari is able to display .mov/.MOV file previews. If a .mov file is uploaded in a non-safari browser, a failed image file will shown. Using either ```CustomFailedFileImageHorizontal```
or ```CustomFailedFileImageVertical``` you can display your own custom file.

## Examples:
To use [React Uploaded Video Preview here](https://github.com/alvst/react-uploaded-video-preview).

## Inspiration & Credits:
The React Uploaded Video Preview project was inspired by the [React Video Thumbnail Project](https://github.com/brothatru/react-video-thumbnail) as well as [this Stack Overflow answer](https://stackoverflow.com/a/63474748/10516042).