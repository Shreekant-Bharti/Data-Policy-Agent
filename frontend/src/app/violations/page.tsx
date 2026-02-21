"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout";
import { StatusBadge, Modal } from "@/components/ui";
import {
  Search,
  Filter,
  Download,
  Eye,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  ChevronDown,
  Brain,
  FileText,
  ArrowRight,
} from "lucide-react";

interface Violation {
  id: string;
  recordId: string;
  policyId: string;
  policyName: string;
  description: string;
  severity: "low" | "medium" | "high";
  confidence: number;
  timestamp: string;
  remediation: string;
  explanation: {
    ruleTriggered: string;
    dataAnalyzed: string[];
    reasoning: string;
    evidence: string[];
    recommendation: string;
  };
}

const mockViolations: Violation[] = [
  {
    id: "1",
    recordId: "TXN-2024-89742",
    policyId: "AML-001",
    policyName: "Anti Money Laundering",
    description: "Transaction exceeds reporting threshold without FIU filing",
    severity: "high",
    confidence: 98,
    timestamp: "2026-02-21 10:24:32",
    remediation: "File STR with FIU-IND within 24 hours",
    explanation: {
      ruleTriggered:
        "R-101: Transaction Amount > 10,00,000 INR requires FIU reporting",
      dataAnalyzed: [
        "Transaction Amount: ₹15,45,000",
        "Account Type: Savings",
        "Customer Risk Profile: Medium",
        "FIU Filing Status: Not Filed",
      ],
      reasoning:
        "The transaction amount of ₹15,45,000 exceeds the mandatory reporting threshold of ₹10,00,000. According to PMLA guidelines, such transactions must be reported to FIU-IND. Our analysis shows no STR has been filed for this transaction within the required timeframe.",
      evidence: [
        "Transaction timestamp: 2026-02-21 08:15:22",
        "Amount: ₹15,45,000",
        "No matching STR found in FIU submission logs",
        "Deadline: 2026-02-22 08:15:22",
      ],
      recommendation:
        "Immediately initiate STR filing process. Escalate to compliance officer for approval. Document reason for delayed filing if deadline has passed.",
    },
  },
  {
    id: "2",
    recordId: "TXN-2024-89756",
    policyId: "KYC-003",
    policyName: "Know Your Customer",
    description: "Customer due diligence not updated for high-risk customer",
    severity: "medium",
    confidence: 94,
    timestamp: "2026-02-21 09:45:18",
    remediation: "Initiate enhanced due diligence process",
    explanation: {
      ruleTriggered: "R-205: High-risk customers require annual KYC refresh",
      dataAnalyzed: [
        "Last KYC Update: 2024-08-15",
        "Risk Category: High",
        "Customer Type: Corporate",
        "Days Since Update: 555",
      ],
      reasoning:
        "This corporate customer is classified as high-risk due to their business nature (import/export) and geographical exposure. RBI guidelines mandate annual KYC refresh for such customers, but records show the last update was over 18 months ago.",
      evidence: [
        "Customer ID: CORP-78923",
        "Risk Score: 78/100",
        "Last verification: 2024-08-15",
        "Required frequency: Annual",
      ],
      recommendation:
        "Schedule immediate KYC refresh meeting. Request updated documents including GSTIN, audited financials, and director KYC.",
    },
  },
  {
    id: "3",
    recordId: "TXN-2024-89761",
    policyId: "PCI-DSS",
    policyName: "Payment Card Security",
    description: "Card data stored in unencrypted format",
    severity: "high",
    confidence: 99,
    timestamp: "2026-02-21 09:12:45",
    remediation: "Encrypt data immediately and review access logs",
    explanation: {
      ruleTriggered: "R-312: All cardholder data must be encrypted at rest",
      dataAnalyzed: [
        "Storage Location: DB-payments-03",
        "Encryption Status: None",
        "Data Type: Full PAN",
        "Record Count: 1,247",
      ],
      reasoning:
        "Our automated scan detected unencrypted cardholder data in the payments database. PCI-DSS Requirement 3.4 mandates that PAN must be rendered unreadable anywhere it is stored using strong cryptography.",
      evidence: [
        "Table: payment_transactions",
        "Column: card_number",
        "Encryption: NULL",
        "Affected records: 1,247",
      ],
      recommendation:
        "Immediately implement AES-256 encryption. Conduct security audit. Review access logs for potential unauthorized access. Consider PCI-DSS compliance assessment.",
    },
  },
  {
    id: "4",
    recordId: "TXN-2024-89789",
    policyId: "GDPR-012",
    policyName: "Data Privacy",
    description: "Personal data retained beyond consent period",
    severity: "medium",
    confidence: 87,
    timestamp: "2026-02-21 08:34:22",
    remediation: "Delete or anonymize data per retention policy",
    explanation: {
      ruleTriggered:
        "R-412: Personal data must be deleted after consent expiry",
      dataAnalyzed: [
        "Consent Expiry: 2025-12-31",
        "Data Type: PII",
        "Customer Region: EU",
        "Days Past Expiry: 52",
      ],
      reasoning:
        "Customer consent for data processing expired on December 31, 2025. Under GDPR Article 17, data subjects have the right to erasure when consent is withdrawn or expired. This data should have been deleted or anonymized by January 30, 2026.",
      evidence: [
        "Customer ID: EU-89234",
        "Consent ID: CONS-78234",
        "Expiry: 2025-12-31",
        "Current Status: Active",
      ],
      recommendation:
        "Initiate data deletion workflow. Send confirmation to customer. Update consent management system to prevent future occurrences.",
    },
  },
  {
    id: "5",
    recordId: "TXN-2024-89802",
    policyId: "AML-001",
    policyName: "Anti Money Laundering",
    description: "Suspicious pattern of cash deposits detected",
    severity: "low",
    confidence: 76,
    timestamp: "2026-02-21 08:12:09",
    remediation: "Review transaction history and escalate if required",
    explanation: {
      ruleTriggered: "R-104: Multiple cash deposits pattern analysis",
      dataAnalyzed: [
        "Deposits in 24h: 4",
        "Total Amount: ₹48,500",
        "Individual Amounts: ₹12,000, ₹15,000, ₹11,500, ₹10,000",
        "Threshold: ₹50,000",
      ],
      reasoning:
        "Pattern analysis detected multiple cash deposits that individually fall below reporting thresholds but cumulatively approach the ₹50,000 limit. This could indicate structuring behavior, though the confidence is lower as the total is still below threshold.",
      evidence: [
        "Deposit 1: ₹12,000 at 06:15",
        "Deposit 2: ₹15,000 at 08:45",
        "Deposit 3: ₹11,500 at 10:30",
        "Deposit 4: ₹10,000 at 12:15",
      ],
      recommendation:
        "Monitor account for additional activity. Review customer profile and transaction history. Consider enhanced monitoring if pattern continues.",
    },
  },
];

export default function ViolationsPage() {
  const [selectedViolation, setSelectedViolation] = useState<Violation | null>(
    null,
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [severityFilter, setSeverityFilter] = useState<string>("all");

  const filteredViolations = mockViolations.filter((v) => {
    const matchesSearch =
      v.recordId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.policyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSeverity =
      severityFilter === "all" || v.severity === severityFilter;
    return matchesSearch && matchesSeverity;
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "danger";
      case "medium":
        return "warning";
      case "low":
        return "info";
      default:
        return "default";
    }
  };

  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-dark-100">
            Violation Monitor
          </h1>
          <p className="text-dark-500 mt-1">
            Review and manage compliance violations
          </p>
        </div>
        <button className="btn-primary inline-flex items-center space-x-2">
          <Download className="w-4 h-4" />
          <span>Export Report</span>
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="card py-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-accent-danger/20">
              <AlertTriangle className="w-5 h-5 text-accent-danger" />
            </div>
            <div>
              <p className="text-2xl font-bold text-dark-100">523</p>
              <p className="text-sm text-dark-500">Total Violations</p>
            </div>
          </div>
        </div>
        <div className="card py-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-red-500/20">
              <XCircle className="w-5 h-5 text-red-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-dark-100">45</p>
              <p className="text-sm text-dark-500">High Severity</p>
            </div>
          </div>
        </div>
        <div className="card py-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-accent-warning/20">
              <Clock className="w-5 h-5 text-accent-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold text-dark-100">127</p>
              <p className="text-sm text-dark-500">Pending Review</p>
            </div>
          </div>
        </div>
        <div className="card py-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-accent-success/20">
              <CheckCircle className="w-5 h-5 text-accent-success" />
            </div>
            <div>
              <p className="text-2xl font-bold text-dark-100">351</p>
              <p className="text-sm text-dark-500">Resolved</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-dark-500" />
            <input
              type="text"
              placeholder="Search by Record ID, Policy, or Description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field pl-10 w-full"
            />
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <select
                value={severityFilter}
                onChange={(e) => setSeverityFilter(e.target.value)}
                className="input-field appearance-none pr-10"
              >
                <option value="all">All Severities</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-dark-500 pointer-events-none" />
            </div>
            <button className="btn-secondary inline-flex items-center space-x-2">
              <Filter className="w-4 h-4" />
              <span>More Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Violations Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-dark-800">
              <tr>
                <th className="table-header">Record ID</th>
                <th className="table-header">Policy Violated</th>
                <th className="table-header">Description</th>
                <th className="table-header">Severity</th>
                <th className="table-header">AI Confidence</th>
                <th className="table-header">Timestamp</th>
                <th className="table-header">Remediation</th>
                <th className="table-header">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredViolations.map((violation) => (
                <tr
                  key={violation.id}
                  className="hover:bg-dark-800/50 transition-colors"
                >
                  <td className="table-cell font-mono text-accent-primary">
                    {violation.recordId}
                  </td>
                  <td className="table-cell">
                    <div>
                      <p className="font-medium text-dark-200">
                        {violation.policyId}
                      </p>
                      <p className="text-xs text-dark-500">
                        {violation.policyName}
                      </p>
                    </div>
                  </td>
                  <td className="table-cell max-w-xs">
                    <p className="truncate">{violation.description}</p>
                  </td>
                  <td className="table-cell">
                    <StatusBadge
                      variant={getSeverityColor(violation.severity) as any}
                    >
                      {violation.severity.toUpperCase()}
                    </StatusBadge>
                  </td>
                  <td className="table-cell">
                    <div className="flex items-center space-x-2">
                      <div className="w-16 h-2 bg-dark-700 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            violation.confidence >= 90
                              ? "bg-accent-success"
                              : violation.confidence >= 70
                                ? "bg-accent-warning"
                                : "bg-accent-danger"
                          }`}
                          style={{ width: `${violation.confidence}%` }}
                        />
                      </div>
                      <span className="text-sm text-dark-300">
                        {violation.confidence}%
                      </span>
                    </div>
                  </td>
                  <td className="table-cell text-dark-400 text-sm">
                    {violation.timestamp}
                  </td>
                  <td className="table-cell max-w-xs">
                    <p className="text-sm text-dark-400 truncate">
                      {violation.remediation}
                    </p>
                  </td>
                  <td className="table-cell">
                    <button
                      onClick={() => setSelectedViolation(violation)}
                      className="btn-secondary py-1.5 px-3 text-sm inline-flex items-center space-x-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Explain</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-dark-700">
          <p className="text-sm text-dark-500">
            Showing {filteredViolations.length} of {mockViolations.length}{" "}
            violations
          </p>
          <div className="flex items-center space-x-2">
            <button className="btn-secondary py-1.5 px-3 text-sm">
              Previous
            </button>
            <button className="btn-secondary py-1.5 px-3 text-sm">Next</button>
          </div>
        </div>
      </div>

      {/* Explanation Modal */}
      <Modal
        isOpen={!!selectedViolation}
        onClose={() => setSelectedViolation(null)}
        title="AI Violation Explanation"
        size="lg"
      >
        {selectedViolation && (
          <div className="space-y-6">
            {/* Header Info */}
            <div className="flex items-start justify-between pb-4 border-b border-dark-700">
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <span className="font-mono text-lg text-accent-primary">
                    {selectedViolation.recordId}
                  </span>
                  <StatusBadge
                    variant={
                      getSeverityColor(selectedViolation.severity) as any
                    }
                  >
                    {selectedViolation.severity.toUpperCase()} SEVERITY
                  </StatusBadge>
                </div>
                <p className="text-dark-400">
                  {selectedViolation.policyName} ({selectedViolation.policyId})
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-dark-500">AI Confidence</p>
                <p className="text-2xl font-bold text-dark-100">
                  {selectedViolation.confidence}%
                </p>
              </div>
            </div>

            {/* Rule Triggered */}
            <div className="bg-dark-800 rounded-lg p-4 border-l-4 border-accent-primary">
              <div className="flex items-center space-x-2 mb-2">
                <FileText className="w-4 h-4 text-accent-primary" />
                <h4 className="font-medium text-dark-200">Rule Triggered</h4>
              </div>
              <p className="text-dark-300">
                {selectedViolation.explanation.ruleTriggered}
              </p>
            </div>

            {/* Data Analyzed */}
            <div>
              <h4 className="font-medium text-dark-200 mb-3">
                Data Points Analyzed
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {selectedViolation.explanation.dataAnalyzed.map(
                  (data, index) => (
                    <div
                      key={index}
                      className="bg-dark-800 rounded-lg px-3 py-2 text-sm text-dark-300"
                    >
                      {data}
                    </div>
                  ),
                )}
              </div>
            </div>

            {/* AI Reasoning */}
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <Brain className="w-4 h-4 text-accent-info" />
                <h4 className="font-medium text-dark-200">AI Reasoning</h4>
              </div>
              <p className="text-dark-400 leading-relaxed">
                {selectedViolation.explanation.reasoning}
              </p>
            </div>

            {/* Evidence */}
            <div>
              <h4 className="font-medium text-dark-200 mb-3">
                Supporting Evidence
              </h4>
              <ul className="space-y-2">
                {selectedViolation.explanation.evidence.map(
                  (evidence, index) => (
                    <li
                      key={index}
                      className="flex items-start space-x-2 text-sm text-dark-400"
                    >
                      <ArrowRight className="w-4 h-4 text-dark-500 mt-0.5 flex-shrink-0" />
                      <span>{evidence}</span>
                    </li>
                  ),
                )}
              </ul>
            </div>

            {/* Recommendation */}
            <div className="bg-accent-success/10 border border-accent-success/30 rounded-lg p-4">
              <h4 className="font-medium text-accent-success mb-2">
                Recommended Action
              </h4>
              <p className="text-dark-300">
                {selectedViolation.explanation.recommendation}
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end space-x-3 pt-4 border-t border-dark-700">
              <button className="btn-secondary">Mark as False Positive</button>
              <button className="btn-secondary">Escalate</button>
              <button className="btn-primary">Initiate Remediation</button>
            </div>
          </div>
        )}
      </Modal>
    </DashboardLayout>
  );
}
