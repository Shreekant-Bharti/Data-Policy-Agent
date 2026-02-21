"use client";

import React, { useState, useCallback } from "react";
import { DashboardLayout } from "@/components/layout";
import { StatusBadge } from "@/components/ui";
import {
  Upload,
  FileText,
  CheckCircle,
  AlertCircle,
  Clock,
  ChevronRight,
  Eye,
  Trash2,
  RotateCcw,
  Settings,
} from "lucide-react";

interface ExtractedRule {
  id: string;
  ruleId: string;
  condition: string;
  obligation: string;
  status: "success" | "review" | "failed";
  confidence: number;
}

const mockRules: ExtractedRule[] = [
  {
    id: "1",
    ruleId: "R-101",
    condition: "Transaction Amount > 10,00,000 INR",
    obligation: "Must be reported to FIU within 24 hours",
    status: "success",
    confidence: 98,
  },
  {
    id: "2",
    ruleId: "R-102",
    condition: "Customer is PEP (Politically Exposed Person)",
    obligation: "Enhanced due diligence required before account opening",
    status: "success",
    confidence: 95,
  },
  {
    id: "3",
    ruleId: "R-103",
    condition: "Cross-border transaction > 5,00,000 INR",
    obligation: "Beneficiary details must be verified and documented",
    status: "review",
    confidence: 72,
  },
  {
    id: "4",
    ruleId: "R-104",
    condition: "Multiple cash deposits within 24 hours totaling > 50,000",
    obligation: "Flag for suspicious activity review",
    status: "success",
    confidence: 91,
  },
  {
    id: "5",
    ruleId: "R-105",
    condition: "Account dormant > 12 months with sudden activity",
    obligation: "Require re-verification of KYC documents",
    status: "review",
    confidence: 68,
  },
];

export default function PolicyIngestion() {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedRules, setExtractedRules] = useState<ExtractedRule[]>([]);
  const [humanReview, setHumanReview] = useState(true);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0].type === "application/pdf") {
      simulateUpload(files[0].name);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      simulateUpload(files[0].name);
    }
  };

  const simulateUpload = (fileName: string) => {
    setUploadedFile(fileName);
    setUploadProgress(0);
    setIsProcessing(true);
    setExtractedRules([]);

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          // After upload, show extracted rules
          setTimeout(() => {
            setExtractedRules(mockRules);
            setIsProcessing(false);
          }, 500);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const resetUpload = () => {
    setUploadedFile(null);
    setUploadProgress(0);
    setExtractedRules([]);
    setIsProcessing(false);
  };

  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-dark-100">Policy Ingestion</h1>
        <p className="text-dark-500 mt-1">
          Upload compliance documents and extract structured rules
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upload Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Upload Box */}
          <div className="card">
            <h3 className="text-lg font-semibold text-dark-100 mb-4">
              Upload Policy Document
            </h3>

            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
                isDragging
                  ? "border-accent-primary bg-accent-primary/10"
                  : "border-dark-600 hover:border-dark-500 hover:bg-dark-800/50"
              }`}
            >
              {!uploadedFile ? (
                <>
                  <Upload
                    className={`w-12 h-12 mx-auto mb-4 ${isDragging ? "text-accent-primary" : "text-dark-500"}`}
                  />
                  <p className="text-dark-200 font-medium mb-2">
                    Drag & drop your PDF document here
                  </p>
                  <p className="text-dark-500 text-sm mb-4">or</p>
                  <label className="btn-primary cursor-pointer inline-block">
                    Browse Files
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                  </label>
                  <p className="text-dark-500 text-xs mt-4">
                    Supported format: PDF (Max 50MB)
                  </p>
                </>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-center space-x-3">
                    <FileText className="w-10 h-10 text-accent-primary" />
                    <div className="text-left">
                      <p className="text-dark-200 font-medium">
                        {uploadedFile}
                      </p>
                      <p className="text-dark-500 text-sm">PDF Document</p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="max-w-md mx-auto">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-dark-400">
                        {isProcessing ? "Processing..." : "Upload Complete"}
                      </span>
                      <span className="text-dark-200">{uploadProgress}%</span>
                    </div>
                    <div className="h-2 bg-dark-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-accent-primary rounded-full transition-all duration-200"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  </div>

                  {!isProcessing && (
                    <button
                      onClick={resetUpload}
                      className="btn-secondary inline-flex items-center space-x-2"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Upload Another</span>
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Extracted Rules Panel */}
          {extractedRules.length > 0 && (
            <div className="card animate-fade-in">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-dark-100">
                    Extracted Rules
                  </h3>
                  <p className="text-dark-500 text-sm mt-1">
                    {extractedRules.length} rules extracted from document
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <StatusBadge variant="success" dot>
                    {
                      extractedRules.filter((r) => r.status === "success")
                        .length
                    }{" "}
                    Parsed
                  </StatusBadge>
                  <StatusBadge variant="warning" dot>
                    {extractedRules.filter((r) => r.status === "review").length}{" "}
                    Need Review
                  </StatusBadge>
                </div>
              </div>

              <div className="space-y-3">
                {extractedRules.map((rule) => (
                  <div
                    key={rule.id}
                    className={`p-4 rounded-lg border transition-all duration-200 hover:border-dark-500 ${
                      rule.status === "success"
                        ? "bg-dark-800/50 border-dark-700"
                        : "bg-accent-warning/5 border-accent-warning/30"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="text-sm font-mono font-semibold text-accent-primary">
                            {rule.ruleId}
                          </span>
                          <StatusBadge
                            variant={
                              rule.status === "success" ? "success" : "warning"
                            }
                          >
                            {rule.status === "success"
                              ? "Parsed Successfully"
                              : "Needs Human Review"}
                          </StatusBadge>
                          <span className="text-xs text-dark-500">
                            AI Confidence: {rule.confidence}%
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                          <div>
                            <p className="text-xs text-dark-500 uppercase tracking-wider mb-1">
                              Condition
                            </p>
                            <p className="text-sm text-dark-200">
                              {rule.condition}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-dark-500 uppercase tracking-wider mb-1">
                              Obligation
                            </p>
                            <p className="text-sm text-dark-200">
                              {rule.obligation}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 ml-4">
                        <button className="p-2 rounded-lg hover:bg-dark-700 transition-colors">
                          <Eye className="w-4 h-4 text-dark-400" />
                        </button>
                        <button className="p-2 rounded-lg hover:bg-dark-700 transition-colors">
                          <Trash2 className="w-4 h-4 text-dark-400" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-dark-700">
                <button className="btn-secondary">Export Rules</button>
                <button className="btn-primary">Activate Policy</button>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Human Review Toggle */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-dark-100">
                Human-in-the-Loop
              </h3>
              <button
                onClick={() => setHumanReview(!humanReview)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  humanReview ? "bg-accent-primary" : "bg-dark-600"
                }`}
              >
                <span
                  className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                    humanReview ? "left-7" : "left-1"
                  }`}
                />
              </button>
            </div>
            <p className="text-sm text-dark-500">
              {humanReview
                ? "Rules with low confidence will be flagged for manual review before activation."
                : "All extracted rules will be auto-approved and activated."}
            </p>
          </div>

          {/* Processing Stats */}
          <div className="card">
            <h3 className="text-sm font-semibold text-dark-100 mb-4">
              Processing Statistics
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-dark-400">
                  Documents Processed
                </span>
                <span className="text-sm font-medium text-dark-200">47</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-dark-400">Rules Extracted</span>
                <span className="text-sm font-medium text-dark-200">312</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-dark-400">Avg. Confidence</span>
                <span className="text-sm font-medium text-dark-200">89.4%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-dark-400">Pending Review</span>
                <span className="text-sm font-medium text-accent-warning">
                  12
                </span>
              </div>
            </div>
          </div>

          {/* Recent Uploads */}
          <div className="card">
            <h3 className="text-sm font-semibold text-dark-100 mb-4">
              Recent Uploads
            </h3>
            <div className="space-y-3">
              {[
                { name: "AML_Policy_v2.pdf", rules: 23, date: "2 hours ago" },
                { name: "KYC_Guidelines.pdf", rules: 18, date: "Yesterday" },
                { name: "GDPR_Compliance.pdf", rules: 31, date: "3 days ago" },
              ].map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-2 border-b border-dark-700 last:border-b-0"
                >
                  <div className="flex items-center space-x-3">
                    <FileText className="w-4 h-4 text-dark-500" />
                    <div>
                      <p className="text-sm text-dark-200">{file.name}</p>
                      <p className="text-xs text-dark-500">
                        {file.rules} rules
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-dark-500">{file.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
