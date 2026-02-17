import React from "react";
import { Models } from "node-appwrite";
import Thumbnail from "./Thumbnail";
import FormattedDateTime from "./FormattedDateTime";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Image from "next/image";

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

interface Props {
  file: Models.Document;
  onInputChange: React.Dispatch<React.SetStateAction<string[]>>;
  onRemove: (email: string) => void;
}

export const ShareInput = ({ file, onInputChange, onRemove }: Props) => (
  <>
    <ImageThumbnail file={file} />
    <div>
      <p>Share with users</p>
      <Input
        onChange={(e) => onInputChange(e.target.value.trim().split(","))}
      />
      <div>
        <ul>
          {file.users.map((email: string) => (
            <li key={email}>
              <p>{email}</p>
              <Button onClick={() => onRemove(email)}>
                <Image src="/assets/icons/remove.svg" alt="remove" />
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </>
);

export const ShareInput = ({ file, onInputChange, onRemove }: Props) => (
  <>
    <ul>
      {file.users.map((email: string) => (
        <li key={email}>
          <p>{email}</p>
          {/* <Button onClick ={()=>onRemove(email)} */}
          <Button onClick={() => onRemove(email)}>
            <Image src="/assets/icons/remove.svg" alt="remove" />
          </Button>
        </li>
      ))}
    </ul>
  </>
);
