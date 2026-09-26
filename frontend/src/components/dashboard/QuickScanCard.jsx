import { Link } from "react-router-dom";
import { ScanLine, ArrowRight } from "lucide-react";

export default function QuickScanCard() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-brand-bg p-6 sm:p-7">
      <div className="relative flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
        <div className="flex items-center gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-mint/15">
            <ScanLine size={22} className="text-brand-mint" strokeWidth={1.8} />
          </span>
          <div>
            <h3 className="text-[1.05rem] font-semibold text-white">Scan a fitting</h3>
            <p className="mt-0.5 text-[0.85rem] text-white/50">
              Scan a QR code to pull up its record and start a new inspection.
            </p>
          </div>
        </div>

        <Link
          to="/dashboard/inspector/inspections/new"
          className="flex shrink-0 items-center gap-2 rounded-lg bg-brand-mint px-5 py-2.5 text-[0.88rem] font-medium text-brand-bg transition-colors hover:bg-brand-mint/90"
        >
          Start scan
          <ArrowRight size={15} />
        </Link>
      </div>
    </div>
  );
}
