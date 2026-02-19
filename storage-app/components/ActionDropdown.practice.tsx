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

const ActionDropdown = ({ files }: { files: Models.Document }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropddownOpen, setIsDropddownOpen] = useState(true);
  const [action, setAction] = useState<ActionType | null>(null);
  const [name, setName] = useState("");
  const [emails, setEmails] = useState<string[]>([]);

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
    </Dialog>
  );
};

export default ActionDropdown;
