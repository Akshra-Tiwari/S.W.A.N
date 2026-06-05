"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { getReports, deleteReport } from "@/services/reportService";
import { socket } from "@/lib/socket";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function ReportsPage() {
  const router = useRouter();

  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [severity, setSeverity] = useState("");

  const fetchReports = async () => {
    try {
      setLoading(true);
      const data = await getReports(page, search, status, severity);
      setReports(data.reports || []);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchReports();
  }, [page, search, status, severity]);

  useEffect(() => {
    const refresh = () => fetchReports();

    socket.on("reportCreated", refresh);
    socket.on("reportStatusUpdated", refresh);
    socket.on("reportDeleted", refresh);

    return () => {
      socket.off("reportCreated", refresh);
      socket.off("reportStatusUpdated", refresh);
      socket.off("reportDeleted", refresh);
    };
  }, []);

  const handleDelete = async (id: string) => {
    await deleteReport(id);
    fetchReports();
  };

  return (
    <div className="p-6 space-y-6">

      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Reports</h1>
        <Button onClick={() => router.push("/dashboard")}>
          Back to Dashboard
        </Button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <Input
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Input
          placeholder="Status (Pending/Resolved)"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />

        <Input
          placeholder="Severity (High/Medium/Low)"
          value={severity}
          onChange={(e) => setSeverity(e.target.value)}
        />

        <Button onClick={() => setPage(1)}>
          Reset Filters
        </Button>
      </div>

      {/* List */}
      <div className="space-y-4">
        {loading ? (
          <p>Loading...</p>
        ) : reports.length === 0 ? (
          <p>No reports found</p>
        ) : (
          reports.map((r) => (
            <Card key={r._id}>
              <CardHeader>
                <CardTitle className="flex justify-between">
                  <span>{r.title}</span>

                  <Badge>{r.status}</Badge>
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-2">
                <p>{r.description}</p>

                <div className="flex justify-between text-sm">
                  <span>Severity: {r.severity}</span>
                  <span>Location: {r?.location?.address}</span>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="destructive"
                    onClick={() => handleDelete(r._id)}
                  >
                    Delete
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() =>
                      router.push(`/reports/${r._id}`)
                    }
                  >
                    View
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="flex gap-2 justify-center">
        <Button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </Button>

        <span className="px-4 py-2">Page {page}</span>

        <Button onClick={() => setPage(page + 1)}>
          Next
        </Button>
      </div>
    </div>
  );
}