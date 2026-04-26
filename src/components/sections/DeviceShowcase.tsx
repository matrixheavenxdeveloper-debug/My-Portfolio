import { MonitorSmartphone, ShoppingBag, Sparkles } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { usePerformanceMode } from "@/hooks/use-performance-mode";

const metrics = [
  { label: "Core Web Vitals", value: "Fast-first build" },
  { label: "Responsive UI", value: "Phone to desktop" },
  { label: "Launch Support", value: "Deploy-ready flow" },
];

const DeviceShowcase = () => {
  const isMobile = useIsMobile();
  const { perfMode } = usePerformanceMode();
  const compact = isMobile || perfMode;

  return (
    <div className="device-stage mx-auto w-full max-w-[540px]">
      <div className="device-grid">
        <article className="device-shell device-shell-desktop">
          <div className="device-topbar">
            <span />
            <span />
            <span />
          </div>
          <div className="device-screen">
            <div className="device-chip">
              <MonitorSmartphone className="h-3.5 w-3.5" />
              Revenue-focused build
            </div>
            <div className="device-heading">Professional website systems for modern businesses.</div>
            <div className="device-chart">
              <div className="device-chart-bar h-[48%]" />
              <div className="device-chart-bar h-[72%]" />
              <div className="device-chart-bar h-[58%]" />
              <div className="device-chart-bar h-[88%]" />
            </div>
            <div className="device-stat-row">
              {metrics.map((metric) => (
                <div key={metric.label} className="device-stat-card">
                  <span>{metric.label}</span>
                  <strong>{metric.value}</strong>
                </div>
              ))}
            </div>
          </div>
        </article>

        <article className={`device-shell device-shell-mobile ${compact ? "device-shell-mobile-compact" : ""}`}>
          <div className="device-phone-notch" />
          <div className="device-screen device-screen-mobile">
            <div className="device-mini-card">
              <span className="device-chip">
                <ShoppingBag className="h-3.5 w-3.5" />
                Conversion UX
              </span>
              <strong>Mobile-first storefront and lead capture flow</strong>
            </div>
            <div className="device-mini-grid">
              <div className="device-tile">
                <span>Fast</span>
                <strong>Lightweight visuals</strong>
              </div>
              <div className="device-tile">
                <span>Stable</span>
                <strong>Touch-friendly actions</strong>
              </div>
            </div>
            <div className="device-cta">
              <Sparkles className="h-4 w-4" />
              Built for low-end phones too
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default DeviceShowcase;
