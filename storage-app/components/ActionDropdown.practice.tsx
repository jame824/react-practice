import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import Image from "next/image";
import { Models } from "node-appwrite";
import { actionsDropdownItems } from "@/constants";
import Link from "next/link";
import { constructDownloadUrl } from "@/lib/utils";
import { Input } from "./ui/input";
import { usePathname } from "next/navigation";
import {
  deleteFile,
  renameFile,
  updateFileUsers,
} from "@/lib/actions/file.actions";
import { FileDetails, ShareInput } from "./ActionsModalContent";

const ActionDropdown = ({ file }: { file: Models.Document }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropddownOpen, setIsDropddownOpen] = useState(true);
  const [action, setAction] = useState<ActionType | null>(null);
  const [name, setName] = useState("");
  const [emails, setEmails] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // handlers!

  const closeAllModals = () => {
    setAction(null);
    setIsModalOpen(false);
    setIsDropddownOpen(false);
    setName(file.name);
  };

  const handleActions = async () => {
    if (!action) return
    
    let success = false;
    setIsLoading(true);

    const action = {
      rename: () => renameFile(),
      delete: () => deleteFile(),
      share: () => updateFileUsers(),
    }

    success = await (some action)

    if (success) closeAllModals();

    setIsLoading(false);
  };

  const handleRemoveUser = async () => {
    const updatedEmails = emails.filter

    const success = await updateFileUsers()

    if (success) setEmails(updatedEmails);
    closeAllModals();
  }

  const handleActions = async () => {
    if (!action) return

    setIsLoading(true);
    let success = false;

    const action = {
      rename: () => renameFile(),
      delete: () => deleteFile()
    }

    const success = await some action

    if (success) closeAllModals();
    
    
    setIsLoading(false);
  }

  const handleRemoveUser = async () => {
    const updatedEmails = emails.filter;

    const success = await updateFileUsers()

    if (success) setEmails(updatedEmails)

    closeAllModals();

  }

  const renderDialogContent = () => {
    if (!action) return null;

    const { label, value } = action;

    return (
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{label}</DialogTitle>
          {value === "rename" && (
            <Input onChange={(e) => setName(e.target.value)} />
          )}
          {value === "share" && (
            <ShareInput
              file={file}
              onInputChange={setEmails}
              onRemove={handleRemoveUsers}
            />
          )}
          {value === "delete" && (
            <p>
              Are you sure you want to delete{` `}
              <span>{file.name}</span>
            </p>
          )}
          {value === "details" && <FileDetails file={file} />}
        </DialogHeader>
        {["rename", "share", "delete"].includes(value) && (
          <DialogFooter>
            <div>
              <Button onClick={closeAllModals}>Cancel</Button>
              <Button onClick={handleActions}>
                <p>{label}</p>
                {isLoading && <Image />}
              </Button>
            </div>
          </DialogFooter>
        )}
      </DialogContent>
    );
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DropdownMenu open={isDropddownOpen} onOpenChange={setIsDropddownOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Open</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>{files.name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {actionsDropdownItems.map((actionItem) => (
            <DropdownMenuItem
              key={actionItem.value}
              onClick={() => {
                setAction(actionItem);

                if (["share"].includes(actionItem.value)) {
                  setIsDropddownOpen(false);
                  setIsModalOpen(true);
                }
              }}
            >
              {actionItem.value === "download" ? (
                <Link>
                  <Image />
                  {actionItem.value}
                </Link>
              ) : (
                <div>
                  <Image />
                  {actionItem.value}
                </div>
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      {renderDialogContent()}
    </Dialog>
  );
};

export default ActionDropdown;
