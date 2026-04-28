import React, { useEffect, useState } from "react";
import { UserCheck, ClipboardList, HeartPulse, Clock } from "lucide-react";
import { usePatientStore } from "../features/patients/store";
import Layout from "../components/Layout";
import PageHeader from "../components/common/PageHeader";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import StatBadge from "../components/common/StatBadge";
import Skeleton from "../components/common/Skeleton";

const PatientDetails = React.memo(() => {
  const { patients, view, setView } = usePatientStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 600);
    return () => window.clearTimeout(timer);
  }, []);

  const totalPatients = patients.length;
  const urgentPatients = patients.filter(
    (patient) => patient.status === "Urgent",
  ).length;

  return (
    <Layout title="Patient Details">
      <PageHeader
        title="Patient Details"
        description="Review patient records, manage care actions and track patient statuses across the system."
        breadcrumbs={[
          { label: "Dashboard", to: "/dashboard" },
          { label: "Patients", to: "/patients" },
        ]}
      />

      <div className="grid gap-6 xl:grid-cols-[2fr_1fr]">
        <section className="space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-3">
              <Button
                variant={view === "list" ? "primary" : "secondary"}
                onClick={() => setView("list")}
              >
                List View
              </Button>
              <Button
                variant={view === "grid" ? "primary" : "secondary"}
                onClick={() => setView("grid")}
              >
                Grid View
              </Button>
            </div>
          </div>

          {loading ? (
            <div className="space-y-4">
              <Skeleton className="h-16 rounded-3xl" />
              <Skeleton className="h-72 rounded-3xl" />
            </div>
          ) : view === "list" ? (
            <div className="space-y-4">
              {patients.map((patient) => (
                <Card
                  key={patient.id}
                  className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="text-lg font-semibold text-slate-900">
                      {patient.name}
                    </p>
                    <p className="mt-1 text-sm text-slate-600">
                      Age: {patient.age} • Condition: {patient.condition}
                    </p>
                    <p className="mt-2 text-sm text-slate-500">
                      Last visit: {patient.lastVisit}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {patients.map((patient) => (
                <Card key={patient.id} className="space-y-4 p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">
                        {patient.name}
                      </h3>
                      <p className="text-sm text-slate-500">
                        {patient.condition}
                      </p>
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${patient.status === "Urgent" ? "bg-red-100 text-red-700" : "bg-emerald-100 text-emerald-700"}`}
                    >
                      {patient.status}
                    </span>
                  </div>
                  <div className="space-y-1 text-sm text-slate-600">
                    <p>Age: {patient.age}</p>
                    <p>Last visit: {patient.lastVisit}</p>
                    <p>Assigned doctor: {patient.doctor}</p>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </section>

        <aside className="space-y-6">
          <Card className="space-y-5 p-6">
            <div className="flex items-center gap-3">
              <UserCheck className="h-5 w-5 text-indigo-600" />
              <h3 className="text-lg font-semibold">Patient Overview</h3>
            </div>
            <div className="grid gap-4">
              <StatBadge
                label="Total patients"
                value={`${totalPatients}`}
                icon={<UserCheck className="h-4 w-4" />}
              />
              <StatBadge
                label="Urgent cases"
                value={`${urgentPatients}`}
                description="Require follow-up today"
                icon={<HeartPulse className="h-4 w-4" />}
                trend="up"
              />
              <StatBadge
                label="Average stay"
                value="4.2 days"
                description="Across active cases"
                icon={<Clock className="h-4 w-4" />}
              />
            </div>
          </Card>
          <Card className="space-y-5 p-6">
            <div className="flex items-center gap-3">
              <ClipboardList className="h-5 w-5 text-sky-600" />
              <h3 className="text-lg font-semibold">Quick Actions</h3>
            </div>
            <div className="text-sm text-slate-600 leading-relaxed">
              Use patient actions to message care teams, update records, or
              schedule follow-ups quickly.
            </div>
          </Card>
          <Card className="space-y-5 p-6">
            <div className="flex items-center gap-3">
              <HeartPulse className="h-5 w-5 text-rose-600" />
              <h3 className="text-lg font-semibold">Care Alerts</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-red-50 border border-red-100">
                <HeartPulse className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-red-800 font-medium">
                    3 patients need a medication review.
                  </p>
                  <p className="text-xs text-red-600 mt-1">
                    Requires immediate attention
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-yellow-50 border border-yellow-100">
                <Clock className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-yellow-800 font-medium">
                    2 follow-ups are overdue this week.
                  </p>
                  <p className="text-xs text-yellow-600 mt-1">
                    Schedule follow-up calls
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-50 border border-blue-100">
                <UserCheck className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-blue-800 font-medium">
                    1 doctor request pending assignment.
                  </p>
                  <p className="text-xs text-blue-600 mt-1">
                    Assign to available staff
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </aside>
      </div>
    </Layout>
  );
});

PatientDetails.displayName = "PatientDetails";

export default PatientDetails;
