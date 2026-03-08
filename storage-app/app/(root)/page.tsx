import Card from "@/components/Card";
import { getFiles } from "@/lib/actions/file.actions";
import { convertFileSize, getUsageSummary } from "@/lib/utils";
import { Models } from "node-appwrite";
import Link from "next/link";
import Image from "next/image";
import FormattedDateTime from "@/components/FormattedDateTime";
import Chart from "@/components/Chart";

const Dashboard = async () => {
  const files = await getFiles({ types: [], limit: 10 });

  const mockTotalSpace = {
    document: {
      size: 10,
      latestDate: "2026-10-20",
    },
    image: {
      size: 10,
      latestDate: "2026-10-20",
    },
    video: {
      size: 10,
      latestDate: "2026-10-20",
    },
    audio: {
      size: 10,
      latestDate: "2026-10-20",
    },
    other: {
      size: 10,
      latestDate: "2026-10-20",
    },
  };

  const fileUsage = getUsageSummary(mockTotalSpace);

  return (
    <div className="dashboard-container">
      <div>
        <Chart></Chart>
        <ul className="dashboard-summary-list">
          {fileUsage.map((object) => (
            <li key={object.title}>
              <Link href={object.url} className="dashboard-summary-card">
                <Image
                  src={object.icon}
                  alt="object icon"
                  width={24}
                  height={24}
                />
                <p>{object.title}</p>
                <p>{convertFileSize(object.size)}</p>
                <FormattedDateTime date={object.latestDate} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="dashboard-recent-files">
        {files.documents.map((file: Models.Document) => (
          <Card key={file.$id} file={file}></Card>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
