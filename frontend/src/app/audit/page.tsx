"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout";
import { StatusBadge } from "@/components/ui";
import {
  FileText,
  Download,
  Calendar,
  Filter,
  ChevronDown,
  FileCheck,
  Clock,
  Shield,
  RefreshCw,
  Eye,
  Printer,
  Share2,
  CheckCircle,
  AlertTriangle,
  User,
  Settings,
} from "lucide-react";

interface AuditLog {
  id: string;
  timestamp: string;
  action: string;
  user: string;
  policy: string;
  details: string;
  status: "success" | "warning" | "info";
}

interface Report {
  id: string;
  name: string;
  type: string;
  generatedAt: string;
  period: string;
  status: "ready" | "generating" | "scheduled";
  size: string;
}

const auditLogs: AuditLog[] = [
  {
    id: "1",
    timestamp: "2026-02-21 10:34:22",
    action: "Violation Detected",
    user: "System",
    policy: "AML-001",
    details: "High-value transaction flagged for review",
    status: "warning",
  },
  {
    id: "2",
    timestamp: "2026-02-21 10:30:15",
    action: "Scan Completed",
    user: "System",
    policy: "All Policies",
    details: "Scheduled scan completed - 9,100 records processed",
    status: "success",
  },
  {
    id: "3",
    timestamp: "2026-02-21 10:15:45",
    action: "Policy Updated",
    user: "admin@company.com",
    policy: "KYC-003",
    details: "Threshold updated from 5L to 10L",
    status: "info",
  },
  {
    id: "4",
    timestamp: "2026-02-21 09:45:33",
    action: "Report Generated",
    user: "compliance@company.com",
    policy: "Monthly Audit",
    details: "Q1 2026 compliance report generated",
    status: "success",
  },
  {
    id: "5",
    timestamp: "2026-02-21 09:30:00",
    action: "Database Connected",
    user: "System",
    policy: "System",
    details: "New data source DB-analytics-02 connected",
    status: "info",
  },
  {
    id: "6",
    timestamp: "2026-02-21 09:12:18",
    action: "Violation Resolved",
    user: "analyst@company.com",
    policy: "GDPR-012",
    details: "Data retention violation marked as resolved",
    status: "success",
  },
  {
    id: "7",
    timestamp: "2026-02-21 08:45:22",
    action: "Alert Triggered",
    user: "System",
    policy: "PCI-DSS",
    details: "Critical security violation detected",
    status: "warning",
  },
  {
    id: "8",
    timestamp: "2026-02-21 08:30:00",
    action: "Scan Started",
    user: "System",
    policy: "All Policies",
    details: "Daily automated compliance scan initiated",
    status: "info",
  },
];

const reports: Report[] = [
  {
    id: "1",
    name: "Q1 2026 Compliance Summary",
    type: "Quarterly Report",
    generatedAt: "2026-02-21 09:45",
    period: "Jan - Feb 2026",
    status: "ready",
    size: "2.4 MB",
  },
  {
    id: "2",
    name: "AML Activity Report",
    type: "Policy Report",
    generatedAt: "2026-02-20 14:30",
    period: "Feb 2026",
    status: "ready",
    size: "1.8 MB",
  },
  {
    id: "3",
    name: "Weekly Violation Summary",
    type: "Weekly Report",
    generatedAt: "2026-02-19 00:00",
    period: "Week 8, 2026",
    status: "ready",
    size: "856 KB",
  },
  {
    id: "4",
    name: "KYC Compliance Audit",
    type: "Audit Report",
    generatedAt: "Generating...",
    period: "Q1 2026",
    status: "generating",
    size: "-",
  },
  {
    id: "5",
    name: "Monthly Executive Summary",
    type: "Executive Report",
    generatedAt: "Mar 01, 2026",
    period: "Feb 2026",
    status: "scheduled",
    size: "-",
  },
];

export default function AuditPage() {
  const [dateRange, setDateRange] = useState({
    start: "2026-02-01",
    end: "2026-02-21",
  });
  const [selectedPolicy, setSelectedPolicy] = useState("all");

  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-dark-100">Audit & Reports</h1>
          <p className="text-dark-500 mt-1">
            Compliance reports, audit logs, and justification records
          </p>
        </div>
        <button className="btn-primary inline-flex items-center space-x-2">
          <FileText className="w-4 h-4" />
          <span>Generate Report</span>
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="card py-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-accent-primary/20">
              <FileCheck className="w-5 h-5 text-accent-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-dark-100">156</p>
              <p className="text-sm text-dark-500">Reports Generated</p>
            </div>
          </div>
        </div>
        <div className="card py-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-accent-success/20">
              <CheckCircle className="w-5 h-5 text-accent-success" />
            </div>
            <div>
              <p className="text-2xl font-bold text-dark-100">2,847</p>
              <p className="text-sm text-dark-500">Audit Events</p>
            </div>
          </div>
        </div>
        <div className="card py-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-accent-warning/20">
              <Clock className="w-5 h-5 text-accent-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold text-dark-100">12</p>
              <p className="text-sm text-dark-500">Pending Approvals</p>
            </div>
          </div>
        </div>
        <div className="card py-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-accent-info/20">
              <Shield className="w-5 h-5 text-accent-info" />
            </div>
            <div>
              <p className="text-2xl font-bold text-dark-100">100%</p>
              <p className="text-sm text-dark-500">Audit Coverage</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Reports Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Filters */}
          <div className="card">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-dark-500" />
                <input
                  type="date"
                  value={dateRange.start}
                  onChange={(e) =>
                    setDateRange({ ...dateRange, start: e.target.value })
                  }
                  className="input-field text-sm"
                />
                <span className="text-dark-500">to</span>
                <input
                  type="date"
                  value={dateRange.end}
                  onChange={(e) =>
                    setDateRange({ ...dateRange, end: e.target.value })
                  }
                  className="input-field text-sm"
                />
              </div>
              <div className="relative">
                <select
                  value={selectedPolicy}
                  onChange={(e) => setSelectedPolicy(e.target.value)}
                  className="input-field appearance-none pr-10 text-sm"
                >
                  <option value="all">All Policies</option>
                  <option value="aml">AML Policies</option>
                  <option value="kyc">KYC Policies</option>
                  <option value="pci">PCI-DSS</option>
                  <option value="gdpr">GDPR</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-dark-500 pointer-events-none" />
              </div>
              <button className="btn-secondary inline-flex items-center space-x-2">
                <Filter className="w-4 h-4" />
                <span>Apply Filters</span>
              </button>
            </div>
          </div>

          {/* Available Reports */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-dark-100">
                Available Reports
              </h3>
              <button className="text-sm text-accent-primary hover:underline inline-flex items-center space-x-1">
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Refresh</span>
              </button>
            </div>

            <div className="space-y-3">
              {reports.map((report) => (
                <div
                  key={report.id}
                  className="flex items-center justify-between p-4 bg-dark-800/50 rounded-lg border border-dark-700 hover:border-dark-600 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`p-2 rounded-lg ${
                        report.status === "ready"
                          ? "bg-accent-success/20"
                          : report.status === "generating"
                            ? "bg-accent-warning/20"
                            : "bg-dark-600"
                      }`}
                    >
                      <FileText
                        className={`w-5 h-5 ${
                          report.status === "ready"
                            ? "text-accent-success"
                            : report.status === "generating"
                              ? "text-accent-warning"
                              : "text-dark-400"
                        }`}
                      />
                    </div>
                    <div>
                      <p className="font-medium text-dark-200">{report.name}</p>
                      <div className="flex items-center space-x-3 mt-1">
                        <span className="text-xs text-dark-500">
                          {report.type}
                        </span>
                        <span className="text-xs text-dark-600">•</span>
                        <span className="text-xs text-dark-500">
                          {report.period}
                        </span>
                        {report.size !== "-" && (
                          <>
                            <span className="text-xs text-dark-600">•</span>
                            <span className="text-xs text-dark-500">
                              {report.size}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <StatusBadge
                      variant={
                        report.status === "ready"
                          ? "success"
                          : report.status === "generating"
                            ? "warning"
                            : "info"
                      }
                    >
                      {report.status === "ready"
                        ? "Ready"
                        : report.status === "generating"
                          ? "Generating..."
                          : "Scheduled"}
                    </StatusBadge>
                    {report.status === "ready" && (
                      <div className="flex items-center space-x-1">
                        <button
                          className="p-2 rounded-lg hover:bg-dark-700 transition-colors"
                          title="Preview"
                        >
                          <Eye className="w-4 h-4 text-dark-400" />
                        </button>
                        <button
                          className="p-2 rounded-lg hover:bg-dark-700 transition-colors"
                          title="Download"
                        >
                          <Download className="w-4 h-4 text-dark-400" />
                        </button>
                        <button
                          className="p-2 rounded-lg hover:bg-dark-700 transition-colors"
                          title="Share"
                        >
                          <Share2 className="w-4 h-4 text-dark-400" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Audit Log */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-dark-100">
                Audit Log History
              </h3>
              <button className="btn-secondary text-sm py-1.5 px-3">
                Export Logs
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-dark-800">
                  <tr>
                    <th className="table-header">Timestamp</th>
                    <th className="table-header">Action</th>
                    <th className="table-header">User</th>
                    <th className="table-header">Policy</th>
                    <th className="table-header">Details</th>
                  </tr>
                </thead>
                <tbody>
                  {auditLogs.map((log) => (
                    <tr
                      key={log.id}
                      className="hover:bg-dark-800/50 transition-colors"
                    >
                      <td className="table-cell text-dark-400 text-sm whitespace-nowrap">
                        {log.timestamp}
                      </td>
                      <td className="table-cell">
                        <div className="flex items-center space-x-2">
                          <div
                            className={`w-2 h-2 rounded-full ${
                              log.status === "success"
                                ? "bg-accent-success"
                                : log.status === "warning"
                                  ? "bg-accent-warning"
                                  : "bg-accent-info"
                            }`}
                          ></div>
                          <span className="text-dark-200">{log.action}</span>
                        </div>
                      </td>
                      <td className="table-cell text-dark-400 text-sm">
                        {log.user}
                      </td>
                      <td className="table-cell">
                        <span className="text-accent-primary text-sm">
                          {log.policy}
                        </span>
                      </td>
                      <td className="table-cell text-dark-400 text-sm max-w-xs truncate">
                        {log.details}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Generate Report Card */}
          <div className="card bg-gradient-to-br from-accent-primary/10 to-accent-info/10 border-accent-primary/30">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 rounded-lg bg-accent-primary/20">
                <FileText className="w-5 h-5 text-accent-primary" />
              </div>
              <h3 className="font-semibold text-dark-100">
                Generate New Report
              </h3>
            </div>
            <p className="text-sm text-dark-400 mb-4">
              Create custom compliance reports with AI-powered insights and
              recommendations.
            </p>
            <div className="space-y-3">
              <button className="w-full btn-primary text-sm">
                Compliance Summary
              </button>
              <button className="w-full btn-secondary text-sm">
                Violation Report
              </button>
              <button className="w-full btn-secondary text-sm">
                Executive Dashboard PDF
              </button>
            </div>
          </div>

          {/* Justification Logs */}
          <div className="card">
            <h3 className="font-semibold text-dark-100 mb-4">
              Recent Justifications
            </h3>
            <div className="space-y-3">
              {[
                {
                  action: "False Positive Marked",
                  policy: "AML-001",
                  reason: "Verified as legitimate business transaction",
                  user: "J. Smith",
                  time: "2h ago",
                },
                {
                  action: "Exception Approved",
                  policy: "KYC-003",
                  reason: "Customer provided additional documentation",
                  user: "M. Johnson",
                  time: "5h ago",
                },
                {
                  action: "Remediation Completed",
                  policy: "PCI-DSS",
                  reason: "Encryption implemented on affected tables",
                  user: "R. Kumar",
                  time: "1d ago",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="p-3 bg-dark-800/50 rounded-lg border border-dark-700"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-dark-200">
                      {item.action}
                    </span>
                    <span className="text-xs text-dark-500">{item.time}</span>
                  </div>
                  <p className="text-xs text-accent-primary mb-1">
                    {item.policy}
                  </p>
                  <p className="text-xs text-dark-400">{item.reason}</p>
                  <p className="text-xs text-dark-500 mt-2">By {item.user}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Scheduled Reports */}
          <div className="card">
            <h3 className="font-semibold text-dark-100 mb-4">
              Scheduled Reports
            </h3>
            <div className="space-y-3">
              {[
                {
                  name: "Daily Scan Summary",
                  schedule: "Daily at 6:00 AM",
                  next: "Tomorrow",
                },
                {
                  name: "Weekly Compliance",
                  schedule: "Mondays at 9:00 AM",
                  next: "Feb 24",
                },
                {
                  name: "Monthly Executive",
                  schedule: "1st of Month",
                  next: "Mar 1",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-2 border-b border-dark-700 last:border-b-0"
                >
                  <div>
                    <p className="text-sm text-dark-200">{item.name}</p>
                    <p className="text-xs text-dark-500">{item.schedule}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-dark-400">Next run</p>
                    <p className="text-sm text-accent-primary">{item.next}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
