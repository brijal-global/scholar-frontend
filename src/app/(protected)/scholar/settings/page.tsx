/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import fetchApi from "@/lib/axios";
import { toast } from "react-toastify";
import { Database, RefreshCw, CheckCircle2 } from "lucide-react";

function SettingCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100">
        <h2 className="text-sm font-semibold text-gray-800">{title}</h2>
        <p className="text-xs text-gray-500 mt-0.5">{description}</p>
      </div>
      <div className="px-6 py-5">{children}</div>
    </div>
  );
}

export default function ScholarSettingsPage() {
  const [loading, setLoading] = useState(false);
  const [loadedModules, setLoadedModules] = useState<any[]>([]);

  const handleLoadModules = async () => {
    setLoading(true);
    try {
      const res = await fetchApi("/load-default-modules");
      const modules: any[] = res?.data ?? [];
      setLoadedModules(modules);
      toast.success(
        `${modules.length} system module(s) loaded into Plan Modules`,
      );
    } catch {
      toast.error("Failed to load default modules");
    } finally {
      setLoading(false);
    }
  };

  const isLoaded = loadedModules.length > 0;

  return (
    <div className="max-w-3xl space-y-6">
      {/* ── Default Modules ── */}
      <SettingCard
        title="Load Default System Modules"
        description="Populate the Plan Modules table with all built-in system modules. College admins use these to define per-role permissions in the /org portal. This operation is idempotent — safe to run multiple times."
      >
        <div className="space-y-5">
          {/* Action row */}
          <div className="flex items-center justify-between gap-4 pt-1">
            {isLoaded ? (
              <p className="text-sm text-green-700 font-medium flex items-center gap-1.5">
                <CheckCircle2 size={15} />
                {loadedModules.length} module(s) successfully loaded
              </p>
            ) : (
              <p className="text-xs text-gray-400">
                Calls{" "}
                <code className="bg-gray-100 px-1 py-0.5 rounded text-gray-600">
                  GET /api/load-default-modules
                </code>
              </p>
            )}
            <button
              onClick={handleLoadModules}
              disabled={loading}
              className="flex items-center gap-2 text-sm text-white bg-indigo-600 hover:bg-indigo-700 transition px-5 py-2.5 rounded-lg disabled:opacity-60 whitespace-nowrap shrink-0 font-medium"
            >
              <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
              {loading
                ? "Loading..."
                : isLoaded
                  ? "Reload Modules"
                  : "Load Default Modules"}
            </button>
          </div>
        </div>
      </SettingCard>
    </div>
  );
}
