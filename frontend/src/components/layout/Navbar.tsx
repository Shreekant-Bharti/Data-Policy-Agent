"use client";

import React from "react";
import { Bell, Settings, User, Search } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-dark-700">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Left - Team Branding */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
            <span className="text-white font-bold text-lg">∞</span>
          </div>
          <div>
            <span className="text-dark-100 font-semibold text-sm">
              BeyondInfinity
            </span>
            <span className="text-dark-500 text-xs block">
              Enterprise Compliance
            </span>
          </div>
        </div>

        {/* Center - Product Name */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <h1 className="text-xl font-semibold">
            <span className="gradient-text">Data Policy Agent</span>
          </h1>
          <p className="text-dark-500 text-xs text-center">
            Automated Compliance Monitoring
          </p>
        </div>

        {/* Right - Actions */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-dark-500" />
            <input
              type="text"
              placeholder="Search policies..."
              className="input-field pl-10 w-64 text-sm"
            />
          </div>

          {/* Notifications */}
          <button className="relative p-2 rounded-lg hover:bg-dark-700 transition-colors">
            <Bell className="w-5 h-5 text-dark-400" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-accent-danger rounded-full"></span>
          </button>

          {/* Settings */}
          <button className="p-2 rounded-lg hover:bg-dark-700 transition-colors">
            <Settings className="w-5 h-5 text-dark-400" />
          </button>

          {/* User */}
          <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-dark-700 transition-colors">
            <div className="w-8 h-8 rounded-full bg-dark-600 flex items-center justify-center">
              <User className="w-4 h-4 text-dark-300" />
            </div>
          </button>
        </div>
      </div>
    </nav>
  );
}
