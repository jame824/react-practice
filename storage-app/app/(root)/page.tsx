import Card from "@/components/Card";
import { getFiles } from "@/lib/actions/file.actions";
import { convertFileSize, getUsageSummary } from "@/lib/utils";
import { Models } from "node-appwrite";
import Link from "next/link";
import Image from "next/image";
import FormattedDateTime from "@/components/FormattedDateTime";
import Chart from "@/components/Chart";
import { Separator } from "@/components/ui/separator";

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

  const usageSummary = getUsageSummary(mockTotalSpace);

  return (
    <div className="dashboard-container">
      <div>
        <Chart />
        <ul className="dashboard-summary-list">
          {usageSummary.map((summary) => (
            <Link
              href={summary.url}
              key={summary.title}
              className="dashboard-summary-card"
            >
              <div className="space-y-4">
                <div className="flex justify-between gap-3">
                  <Image
                    src={summary.icon}
                    width={100}
                    height={100}
                    alt="uploaded image"
                    className="summary-type-icon"
                  />
                  <h4 className="summary-type-size">
                    {convertFileSize(summary.size) || 0}
                  </h4>
                </div>

                <h5 className="summary-type-title">{summary.title}</h5>
                <Separator className="bg-light-400" />
                <FormattedDateTime
                  date={summary.latestDate}
                  className="text-center"
                />
              </div>
            </Link>
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
