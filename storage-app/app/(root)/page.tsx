import Card from "@/components/Card";
import { getFiles } from "@/lib/actions/file.actions";
import { getUsageSummary } from "@/lib/utils";
import { Models } from "node-appwrite";

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
      <div className="dashboard-summary-list">
        Chart
        <ul>
          {fileUsage.map((object) => (
            <li key={object.title}>{object.icon}</li>
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
