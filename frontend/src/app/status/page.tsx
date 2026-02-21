"use client";

import React, { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout";
import { StatusBadge } from "@/components/ui";
import {
  Database,
  Server,
  Clock,
  Activity,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Wifi,
  HardDrive,
  Cpu,
  RefreshCw,
  Settings,
  Play,
  Pause,
  Zap,
  Shield,
  Globe,
  Lock,
} from "lucide-react";

interface DatabaseConnection {
  id: string;
  name: string;
  type: string;
  host: string;
  status: "connected" | "disconnected" | "error";
  latency: string;
  lastSync: string;
  records: number;
}

interface ServiceStatus {
  id: string;
  name: string;
  status: "operational" | "degraded" | "down";
  uptime: string;
  lastCheck: string;
}

const databases: DatabaseConnection[] = [
  {
    id: "1",
    name: "Production DB",
    type: "PostgreSQL",
    host: "db-prod-01.internal",
    status: "connected",
    latency: "12ms",
    lastSync: "2 min ago",
    records: 2450000,
  },
  {
    id: "2",
    name: "Analytics DB",
    type: "MongoDB",
    host: "db-analytics-02.internal",
    status: "connected",
    latency: "8ms",
    lastSync: "5 min ago",
    records: 890000,
  },
  {
    id: "3",
    name: "Transactions DB",
    type: "MySQL",
    host: "db-txn-01.internal",
    status: "connected",
    latency: "15ms",
    lastSync: "1 min ago",
    records: 5670000,
  },
  {
    id: "4",
    name: "Archive DB",
    type: "PostgreSQL",
    host: "db-archive-01.internal",
    status: "disconnected",
    latency: "-",
    lastSync: "2 hours ago",
    records: 12300000,
  },
];

const services: ServiceStatus[] = [
  {
    id: "1",
    name: "Policy Engine",
    status: "operational",
    uptime: "99.99%",
    lastCheck: "30s ago",
  },
  {
    id: "2",
    name: "Rule Extractor (AI)",
    status: "operational",
    uptime: "99.95%",
    lastCheck: "45s ago",
  },
  {
    id: "3",
    name: "Violation Scanner",
    status: "operational",
    uptime: "99.97%",
    lastCheck: "15s ago",
  },
  {
    id: "4",
    name: "Report Generator",
    status: "operational",
    uptime: "99.92%",
    lastCheck: "1m ago",
  },
  {
    id: "5",
    name: "Notification Service",
    status: "degraded",
    uptime: "98.50%",
    lastCheck: "20s ago",
  },
  {
    id: "6",
    name: "Audit Logger",
    status: "operational",
    uptime: "99.99%",
    lastCheck: "10s ago",
  },
];

export default function StatusPage() {
  const [isScanning, setIsScanning] = useState(true);
  const [scanProgress, setScanProgress] = useState(67);
  const [nextScan, setNextScan] = useState({
    hours: 4,
    minutes: 32,
    seconds: 15,
  });

  // Simulate scan progress
  useEffect(() => {
    if (isScanning) {
      const interval = setInterval(() => {
        setScanProgress((prev) => {
          if (prev >= 100) return 0;
          return prev + 1;
        });
      }, 500);
      return () => clearInterval(interval);
    }
  }, [isScanning]);

  // Countdown timer
  useEffect(() => {
    const interval = setInterval(() => {
      setNextScan((prev) => {
        let { hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) {
          seconds = 59;
          minutes--;
        }
        if (minutes < 0) {
          minutes = 59;
          hours--;
        }
        if (hours < 0) {
          hours = 23;
          minutes = 59;
          seconds = 59;
        }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "connected":
      case "operational":
        return <CheckCircle className="w-5 h-5 text-accent-success" />;
      case "degraded":
        return <AlertTriangle className="w-5 h-5 text-accent-warning" />;
      default:
        return <XCircle className="w-5 h-5 text-accent-danger" />;
    }
  };

  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-dark-100">System Status</h1>
          <p className="text-dark-500 mt-1">
            Infrastructure health and monitoring dashboard
          </p>
        </div>
        <button className="btn-secondary inline-flex items-center space-x-2">
          <RefreshCw className="w-4 h-4" />
          <span>Refresh Status</span>
        </button>
      </div>

      {/* Overall Status Banner */}
      <div className="card mb-8 bg-gradient-to-r from-accent-success/10 to-accent-success/5 border-accent-success/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-accent-success/20 flex items-center justify-center">
                <Shield className="w-8 h-8 text-accent-success" />
              </div>
              <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-accent-success rounded-full flex items-center justify-center">
                <CheckCircle className="w-3 h-3 text-white" />
              </span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-dark-100">
                All Systems Operational
              </h2>
              <p className="text-dark-400">
                Last checked: Feb 21, 2026 10:34:22 AM
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-accent-success">99.97%</p>
            <p className="text-sm text-dark-500">Overall Uptime (30 days)</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Monitoring Engine Status */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-dark-100">
                  Monitoring Engine
                </h3>
                <p className="text-sm text-dark-500">
                  Real-time compliance scanning status
                </p>
              </div>
              <button
                onClick={() => setIsScanning(!isScanning)}
                className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  isScanning
                    ? "bg-accent-success/20 text-accent-success hover:bg-accent-success/30"
                    : "bg-dark-700 text-dark-300 hover:bg-dark-600"
                }`}
              >
                {isScanning ? (
                  <>
                    <Pause className="w-4 h-4" />
                    <span>Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    <span>Resume</span>
                  </>
                )}
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-dark-800 rounded-lg p-4">
                <p className="text-xs text-dark-500 uppercase tracking-wider mb-1">
                  Status
                </p>
                <div className="flex items-center space-x-2">
                  <span
                    className={`w-2 h-2 rounded-full ${isScanning ? "bg-accent-success pulse-indicator" : "bg-dark-500"}`}
                  ></span>
                  <span
                    className={`font-medium ${isScanning ? "text-accent-success" : "text-dark-400"}`}
                  >
                    {isScanning ? "Active" : "Paused"}
                  </span>
                </div>
              </div>
              <div className="bg-dark-800 rounded-lg p-4">
                <p className="text-xs text-dark-500 uppercase tracking-wider mb-1">
                  Current Scan
                </p>
                <p className="font-medium text-dark-200">{scanProgress}%</p>
              </div>
              <div className="bg-dark-800 rounded-lg p-4">
                <p className="text-xs text-dark-500 uppercase tracking-wider mb-1">
                  Scan Type
                </p>
                <p className="font-medium text-dark-200">Incremental</p>
              </div>
              <div className="bg-dark-800 rounded-lg p-4">
                <p className="text-xs text-dark-500 uppercase tracking-wider mb-1">
                  Records/min
                </p>
                <p className="font-medium text-dark-200">2,450</p>
              </div>
            </div>

            {/* Scan Progress Bar */}
            {isScanning && (
              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-dark-400">
                    Scanning compliance records...
                  </span>
                  <span className="text-dark-200">{scanProgress}%</span>
                </div>
                <div className="h-2 bg-dark-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-accent-primary to-accent-info rounded-full transition-all duration-300"
                    style={{ width: `${scanProgress}%` }}
                  />
                </div>
                <div className="flex items-center justify-center mt-4 space-x-2">
                  <Activity className="w-4 h-4 text-accent-primary animate-pulse" />
                  <span className="text-sm text-dark-400">
                    Real-time monitoring active
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Database Connections */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-dark-100">
                Database Connections
              </h3>
              <button className="btn-secondary text-sm py-1.5 px-3">
                Add Connection
              </button>
            </div>

            <div className="space-y-3">
              {databases.map((db) => (
                <div
                  key={db.id}
                  className={`flex items-center justify-between p-4 rounded-lg border transition-colors ${
                    db.status === "connected"
                      ? "bg-dark-800/50 border-dark-700 hover:border-dark-600"
                      : "bg-accent-danger/5 border-accent-danger/30"
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    {getStatusIcon(db.status)}
                    <div>
                      <div className="flex items-center space-x-2">
                        <p className="font-medium text-dark-200">{db.name}</p>
                        <StatusBadge
                          variant={
                            db.status === "connected" ? "success" : "danger"
                          }
                        >
                          {db.status}
                        </StatusBadge>
                      </div>
                      <div className="flex items-center space-x-3 mt-1">
                        <span className="text-xs text-dark-500">{db.type}</span>
                        <span className="text-xs text-dark-600">•</span>
                        <span className="text-xs text-dark-500">{db.host}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6 text-sm">
                    <div className="text-center">
                      <p className="text-dark-500 text-xs">Latency</p>
                      <p
                        className={`font-medium ${db.latency !== "-" ? "text-dark-200" : "text-dark-500"}`}
                      >
                        {db.latency}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-dark-500 text-xs">Records</p>
                      <p className="font-medium text-dark-200">
                        {(db.records / 1000000).toFixed(1)}M
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-dark-500 text-xs">Last Sync</p>
                      <p className="font-medium text-dark-200">{db.lastSync}</p>
                    </div>
                    <button className="p-2 rounded-lg hover:bg-dark-700 transition-colors">
                      <Settings className="w-4 h-4 text-dark-400" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Backend Services */}
          <div className="card">
            <h3 className="text-lg font-semibold text-dark-100 mb-4">
              Backend API Services
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {services.map((service) => (
                <div
                  key={service.id}
                  className={`flex items-center justify-between p-3 rounded-lg border ${
                    service.status === "operational"
                      ? "bg-dark-800/50 border-dark-700"
                      : service.status === "degraded"
                        ? "bg-accent-warning/5 border-accent-warning/30"
                        : "bg-accent-danger/5 border-accent-danger/30"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(service.status)}
                    <div>
                      <p className="text-sm font-medium text-dark-200">
                        {service.name}
                      </p>
                      <p className="text-xs text-dark-500">
                        Checked {service.lastCheck}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-dark-200">
                      {service.uptime}
                    </p>
                    <p className="text-xs text-dark-500">uptime</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Next Scheduled Scan */}
          <div className="card bg-gradient-to-br from-accent-primary/10 to-accent-info/5 border-accent-primary/30">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 rounded-lg bg-accent-primary/20">
                <Clock className="w-5 h-5 text-accent-primary" />
              </div>
              <h3 className="font-semibold text-dark-100">Next Full Scan</h3>
            </div>
            <div className="flex items-center justify-center space-x-4 py-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-dark-100">
                  {String(nextScan.hours).padStart(2, "0")}
                </p>
                <p className="text-xs text-dark-500">Hours</p>
              </div>
              <span className="text-2xl font-bold text-dark-500">:</span>
              <div className="text-center">
                <p className="text-3xl font-bold text-dark-100">
                  {String(nextScan.minutes).padStart(2, "0")}
                </p>
                <p className="text-xs text-dark-500">Minutes</p>
              </div>
              <span className="text-2xl font-bold text-dark-500">:</span>
              <div className="text-center">
                <p className="text-3xl font-bold text-dark-100">
                  {String(nextScan.seconds).padStart(2, "0")}
                </p>
                <p className="text-xs text-dark-500">Seconds</p>
              </div>
            </div>
            <p className="text-center text-sm text-dark-500">
              Daily scan at 3:00 AM IST
            </p>
          </div>

          {/* System Metrics */}
          <div className="card">
            <h3 className="font-semibold text-dark-100 mb-4">System Metrics</h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Cpu className="w-4 h-4 text-dark-500" />
                    <span className="text-sm text-dark-400">CPU Usage</span>
                  </div>
                  <span className="text-sm font-medium text-dark-200">34%</span>
                </div>
                <div className="h-2 bg-dark-700 rounded-full overflow-hidden">
                  <div className="h-full w-[34%] bg-accent-success rounded-full"></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <HardDrive className="w-4 h-4 text-dark-500" />
                    <span className="text-sm text-dark-400">Memory</span>
                  </div>
                  <span className="text-sm font-medium text-dark-200">67%</span>
                </div>
                <div className="h-2 bg-dark-700 rounded-full overflow-hidden">
                  <div className="h-full w-[67%] bg-accent-warning rounded-full"></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <HardDrive className="w-4 h-4 text-dark-500" />
                    <span className="text-sm text-dark-400">Storage</span>
                  </div>
                  <span className="text-sm font-medium text-dark-200">42%</span>
                </div>
                <div className="h-2 bg-dark-700 rounded-full overflow-hidden">
                  <div className="h-full w-[42%] bg-accent-info rounded-full"></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Wifi className="w-4 h-4 text-dark-500" />
                    <span className="text-sm text-dark-400">Network I/O</span>
                  </div>
                  <span className="text-sm font-medium text-dark-200">
                    128 MB/s
                  </span>
                </div>
                <div className="h-2 bg-dark-700 rounded-full overflow-hidden">
                  <div className="h-full w-[25%] bg-accent-primary rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card">
            <h3 className="font-semibold text-dark-100 mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full btn-secondary text-sm text-left inline-flex items-center space-x-2">
                <Zap className="w-4 h-4" />
                <span>Force Full Scan</span>
              </button>
              <button className="w-full btn-secondary text-sm text-left inline-flex items-center space-x-2">
                <RefreshCw className="w-4 h-4" />
                <span>Restart Services</span>
              </button>
              <button className="w-full btn-secondary text-sm text-left inline-flex items-center space-x-2">
                <Lock className="w-4 h-4" />
                <span>Rotate API Keys</span>
              </button>
              <button className="w-full btn-secondary text-sm text-left inline-flex items-center space-x-2">
                <Globe className="w-4 h-4" />
                <span>Test Connectivity</span>
              </button>
            </div>
          </div>

          {/* Recent Incidents */}
          <div className="card">
            <h3 className="font-semibold text-dark-100 mb-4">
              Recent Incidents
            </h3>
            <div className="space-y-3">
              {[
                {
                  type: "resolved",
                  title: "DB Connection Timeout",
                  time: "2 days ago",
                  duration: "5 min",
                },
                {
                  type: "resolved",
                  title: "High Latency Alert",
                  time: "5 days ago",
                  duration: "12 min",
                },
                {
                  type: "resolved",
                  title: "Service Restart",
                  time: "1 week ago",
                  duration: "2 min",
                },
              ].map((incident, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 py-2 border-b border-dark-700 last:border-b-0"
                >
                  <CheckCircle className="w-4 h-4 text-accent-success mt-0.5" />
                  <div>
                    <p className="text-sm text-dark-200">{incident.title}</p>
                    <p className="text-xs text-dark-500">
                      {incident.time} • Resolved in {incident.duration}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-center text-xs text-dark-500 mt-4">
              No active incidents
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
