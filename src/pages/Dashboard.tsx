import React from "react";
import {
  Activity,
  Users,
  CalendarDays,
  ShieldCheck,
  DollarSign,
  Clock,
  CheckCircle,
} from "lucide-react";
import { useAuthStore } from "../features/auth/store";
import Layout from "../components/Layout";
import PageHeader from "../components/common/PageHeader";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import StatBadge from "../components/common/StatBadge";
import { requestNotificationPermission } from "../lib/firebase";

const Dashboard = React.memo(() => {
  const user = useAuthStore((state) => state.user);

  const showNotification = async () => {
    try {
      const token = await requestNotificationPermission();
      if (token) {
        // In a real app, you'd send this token to your server
        // For demo purposes, we'll show a local notification
        if ("Notification" in window) {
          console.log("Notification.permission", Notification.permission);
          const permission = await Notification.requestPermission();
          console.log("Notification.requestPermission result:", permission);
          if (permission === "granted") {
            const registration =
              await navigator.serviceWorker.getRegistration();
            console.log("notification registration:", registration);
            if (registration) {
              try {
                await registration.showNotification("Healthcare Alert", {
                  body:
                    "New patient appointment scheduled. FCM Token: " +
                    token.substring(0, 20) +
                    "...",
                  icon: "/vite.svg",
                });
                console.log("notification shown via service worker");
              } catch (showError) {
                console.error("showNotification failed:", showError);
                new Notification("Healthcare Alert", {
                  body:
                    "New patient appointment scheduled. FCM Token: " +
                    token.substring(0, 20) +
                    "...",
                  icon: "/vite.svg",
                });
              }
            } else {
              const notification = new Notification("Healthcare Alert", {
                body:
                  "New patient appointment scheduled. FCM Token: " +
                  token.substring(0, 20) +
                  "...",
                icon: "/vite.svg",
              });
              console.log(
                "notification shown via Notification API",
                notification,
              );
            }
          }
        }
      } else {
        // Fallback to basic notification
        if ("Notification" in window) {
          const permission = await Notification.requestPermission();
          if (permission === "granted") {
            const registration =
              await navigator.serviceWorker.getRegistration();
            if (registration) {
              registration.showNotification("Healthcare Alert", {
                body: "New patient appointment scheduled.",
                icon: "/vite.svg",
              });
            } else {
              new Notification("Healthcare Alert", {
                body: "New patient appointment scheduled.",
                icon: "/vite.svg",
              });
            }
          }
        }
      }
    } catch (error) {
      console.error("Notification error:", error);
    }
  };

  return (
    <Layout title="">
      <PageHeader
        title="Dashboard"
        description="Monitor platform health, bookings, and upcoming patient care in one view."
        breadcrumbs={[{ label: "Home", to: "/dashboard" }]}
      />
      <div className="grid gap-6 xl:grid-cols-[2fr_1fr]">
        <section className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <StatBadge
              label="Total Patients"
              value="150"
              description="Active cases today"
              icon={<Users className="h-5 w-5" />}
              trend="up"
            />
            <StatBadge
              label="Appointments"
              value="12"
              description="Scheduled for today"
              icon={<CalendarDays className="h-5 w-5" />}
              trend="neutral"
            />
            <StatBadge
              label="Revenue"
              value="$5,000"
              description="Monthly target progress"
              icon={<DollarSign className="h-5 w-5" />}
              trend="up"
            />
          </div>

          <Card className="space-y-5 p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-semibold">Appointment Overview</h2>
                <p className="text-sm text-slate-500">
                  Patient appointments across departments.
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 p-4 border border-blue-100">
                <p className="text-sm text-slate-600">
                  Morning availability is at 80%. Clinic occupancy remains
                  stable.
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl bg-white p-4 shadow-sm border border-slate-200 hover:shadow-md transition-all duration-200">
                  <p className="text-sm text-slate-500 mb-1">New bookings</p>
                  <p className="text-2xl font-bold text-green-600">22</p>
                  <div className="flex items-center mt-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-xs text-green-600">
                      +12% from last week
                    </span>
                  </div>
                </div>
                <div className="rounded-2xl bg-white p-4 shadow-sm border border-slate-200 hover:shadow-md transition-all duration-200">
                  <p className="text-sm text-slate-500 mb-1">
                    Completed visits
                  </p>
                  <p className="text-2xl font-bold text-blue-600">38</p>
                  <div className="flex items-center mt-2">
                    <Activity className="h-4 w-4 text-blue-500 mr-1" />
                    <span className="text-xs text-blue-600">On track</span>
                  </div>
                </div>
                <div className="rounded-2xl bg-white p-4 shadow-sm border border-slate-200 hover:shadow-md transition-all duration-200">
                  <p className="text-sm text-slate-500 mb-1">Canceled</p>
                  <p className="text-2xl font-bold text-red-600">4</p>
                  <div className="flex items-center mt-2">
                    <Clock className="h-4 w-4 text-red-500 mr-1" />
                    <span className="text-xs text-red-600">
                      -2% from last week
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="space-y-5">
            <div className="flex items-center gap-3">
              <Activity className="h-5 w-5 text-emerald-600" />
              <div>
                <h2 className="text-lg font-semibold">Platform activity</h2>
                <p className="text-sm text-slate-500">
                  Recent actions and alerts for the care team.
                </p>
              </div>
            </div>
            <ul className="space-y-4 text-sm text-slate-600">
              <li>Dr. Patel updated patient record for John Doe.</li>
              <li>New lab results added for patient Jane Smith.</li>
              <li>Follow-up appointment scheduled for Alice Brown.</li>
            </ul>
          </Card>
        </section>

        <aside className="space-y-6">
          <Card className="space-y-5 p-6">
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-indigo-600" />
              <h3 className="text-lg font-semibold">Welcome</h3>
            </div>
            <p className="text-slate-600">
              Good to see you back, {user?.email}. Your care teams are active
              and patient flow is steady.
            </p>
            <Button variant="primary" size="sm" onClick={showNotification}>
              Show notification
            </Button>
          </Card>
          <Card className="space-y-4 p-5">
            <div className="flex items-center gap-3">
              <CalendarDays className="h-5 w-5 text-sky-600" />
              <h3 className="text-lg font-semibold">Upcoming slots</h3>
            </div>
            <ul className="space-y-3 text-sm text-slate-600">
              <li>10:00 AM — Patient intake room 3</li>
              <li>11:30 AM — Review lab reports</li>
              <li>2:00 PM — Team coordination meeting</li>
            </ul>
          </Card>
          <Card className="space-y-4 p-5">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-5 w-5 text-emerald-600" />
              <h3 className="text-lg font-semibold">Care reminders</h3>
            </div>
            <p className="text-sm text-slate-600">
              Keep patient communication and records up-to-date for compliance.
            </p>
          </Card>
        </aside>
      </div>
    </Layout>
  );
});

Dashboard.displayName = "Dashboard";

export default Dashboard;
