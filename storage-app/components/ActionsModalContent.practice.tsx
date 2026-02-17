import React from "react";
import { Models } from "node-appwrite";
import Thumbnail from "./Thumbnail";
import FormattedDateTime from "./FormattedDateTime";

const ImageThumbnail = ({ file }: { file: Models.Document }) => (
  <div>
    <Thumbnail type={file.type} extension={file.extension} url={file.url} />
    <div>
      <p>{file.name}</p>
      <FormattedDateTime date={file.$createdAt} />
    </div>
  </div>
);

const DetailRow = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p>{label}</p>
    <p>{value}</p>
  </div>
);

const ImageThumbnail = ({ file }: { file: Models.Document }) => (
  <div>
    <Thumbnail type={file.type} extension={file.extension} url={file.url} />
    <div>
      <p>{file.name}</p>
      <FormattedDateTime date={file.$createdAt} />
    </div>
  </div>
);

export const FileDetails = ({ file }: { file: Models.Document }) => {
  return (
    <>
      <ImageThumbnail file={file} />
      <div>
        <DetailRow label="name" value={file.name} />
      </div>
    </>
  );
};

const DetailRow = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p>{label}</p>
    <p>{value}</p>
  </div>
);
