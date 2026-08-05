'use client';

import React from 'react';
import { useApp } from '@/lib/store';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ToastContainer() {
  const { toasts, removeToast } = useApp();

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => {
          const isSuccess = toast.variant === 'success';
          const isDestructive = toast.variant === 'destructive';
          const isWarning = toast.variant === 'warning';

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border shadow-xl backdrop-blur-md transition-all ${
                isSuccess
                  ? 'bg-emerald-950/90 border-emerald-500/40 text-emerald-100 dark:bg-emerald-900/90'
                  : isDestructive
                  ? 'bg-red-950/90 border-red-500/40 text-red-100 dark:bg-red-900/90'
                  : isWarning
                  ? 'bg-amber-950/90 border-amber-500/40 text-amber-100 dark:bg-amber-900/90'
                  : 'bg-slate-900/95 border-slate-700 text-slate-100 dark:bg-slate-800/95'
              }`}
            >
              <div className="mt-0.5 shrink-0">
                {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
                {isDestructive && <AlertCircle className="w-5 h-5 text-red-400" />}
                {isWarning && <AlertCircle className="w-5 h-5 text-amber-400" />}
                {!isSuccess && !isDestructive && !isWarning && <Info className="w-5 h-5 text-blue-400" />}
              </div>

              <div className="flex-1">
                <p className="font-semibold text-sm">{toast.title}</p>
                {toast.description && <p className="text-xs opacity-85 mt-0.5">{toast.description}</p>}
              </div>

              <button
                onClick={() => removeToast(toast.id)}
                className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
