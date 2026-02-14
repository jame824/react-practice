import React from "react";
import { Models } from "node-appwrite";
import Thumbnail from "./Thumbnail";
import FormattedDateTime from "./FormattedDateTime";

const ImageThumbnail = ({ file }: { file: Models.Document }) => {
  <div>
    <Thumbnail type={file.type} extension={file.extension} url={file.url} />
    <div>
      <p>{file.name}</p>
      <FormattedDateTime date={file.$createdAt} />
    </div>
  </div>;
};
