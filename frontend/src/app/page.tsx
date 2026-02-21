"use client";

import React from "react";
import { DashboardLayout } from "@/components/layout";
import { StatCard, ComplianceScore } from "@/components/ui";
import {
  ComplianceTrendChart,
  ViolationDistributionChart,
  PolicyViolationsChart,
} from "@/components/charts";
import {
  FileText,
  AlertTriangle,
  Database,
  Activity,
  Clock,
  Shield,
  Scan,
} from "lucide-react";

export default function Dashboard() {
  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-dark-100">
          Compliance Dashboard
        </h1>
        <p className="text-dark-500 mt-1">
          Real-time compliance monitoring and analytics
        </p>
      </div>

      {/* Top Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="lg:col-span-2 lg:row-span-2">
          <ComplianceScore score={94.2} lastUpdated="Feb 21, 2026 10:34 AM" />
        </div>

        <StatCard
          title="Records Scanned"
          value="9,100"
          subtitle="Total records analyzed"
          icon={Database}
          trend={{ value: 12.5, isPositive: true }}
          variant="primary"
        />

        <StatCard
          title="Total Violations"
          value="523"
          subtitle="Across all policies"
          icon={AlertTriangle}
          trend={{ value: 8.2, isPositive: false }}
          variant="danger"
        />

        <StatCard
          title="Active Policies"
          value="12"
          subtitle="Monitoring enabled"
          icon={FileText}
          variant="success"
        />

        <StatCard
          title="Last Scan"
          value="4m ago"
          subtitle="Feb 21, 2026 10:30 AM"
          icon={Clock}
          variant="default"
        />
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-accent-success/20">
                <Activity className="w-5 h-5 text-accent-success" />
              </div>
              <div>
                <p className="text-sm font-medium text-dark-200">
                  Monitoring Status
                </p>
                <p className="text-xs text-dark-500">Real-time scanning</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-accent-success rounded-full pulse-indicator"></span>
              <span className="text-sm font-medium text-accent-success">
                Active
              </span>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-accent-primary/20">
                <Scan className="w-5 h-5 text-accent-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-dark-200">
                  Next Scheduled Scan
                </p>
                <p className="text-xs text-dark-500">Automatic daily scan</p>
              </div>
            </div>
            <span className="text-sm font-medium text-dark-200">In 4h 32m</span>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-accent-info/20">
                <Shield className="w-5 h-5 text-accent-info" />
              </div>
              <div>
                <p className="text-sm font-medium text-dark-200">
                  Policies Updated
                </p>
                <p className="text-xs text-dark-500">Last policy change</p>
              </div>
            </div>
            <span className="text-sm font-medium text-dark-200">
              2 days ago
            </span>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ComplianceTrendChart />
        <ViolationDistributionChart />
      </div>

      <div className="grid grid-cols-1 gap-6">
        <PolicyViolationsChart />
      </div>

      {/* Recent Activity */}
      <div className="mt-8">
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-dark-100">
              Recent Activity
            </h3>
            <button className="text-sm text-accent-primary hover:underline">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {[
              {
                action: "New violation detected",
                policy: "AML-001",
                time: "2 minutes ago",
                type: "warning",
              },
              {
                action: "Policy updated",
                policy: "KYC-003",
                time: "15 minutes ago",
                type: "info",
              },
              {
                action: "Scan completed",
                policy: "All Policies",
                time: "34 minutes ago",
                type: "success",
              },
              {
                action: "Critical violation found",
                policy: "PCI-DSS",
                time: "1 hour ago",
                type: "danger",
              },
              {
                action: "New database connected",
                policy: "System",
                time: "2 hours ago",
                type: "info",
              },
            ].map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-2 border-b border-dark-700 last:border-b-0"
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      activity.type === "warning"
                        ? "bg-accent-warning"
                        : activity.type === "danger"
                          ? "bg-accent-danger"
                          : activity.type === "success"
                            ? "bg-accent-success"
                            : "bg-accent-info"
                    }`}
                  ></div>
                  <div>
                    <p className="text-sm text-dark-200">{activity.action}</p>
                    <p className="text-xs text-dark-500">{activity.policy}</p>
                  </div>
                </div>
                <span className="text-xs text-dark-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
