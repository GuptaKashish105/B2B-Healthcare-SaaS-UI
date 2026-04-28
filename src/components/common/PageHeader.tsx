import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  to: string;
}

interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  breadcrumbs = [],
}) => (
  <div className="mb-8">
    {breadcrumbs.length > 0 && (
      <nav className="text-sm text-slate-500 mb-4" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-2">
          {breadcrumbs.map((crumb, index) => (
            <li key={crumb.to} className="inline-flex items-center">
              <Link
                to={crumb.to}
                className="hover:text-slate-700 transition-colors duration-200"
              >
                {crumb.label}
              </Link>
              {index < breadcrumbs.length - 1 && (
                <ChevronRight className="h-4 w-4 mx-2 text-slate-400" />
              )}
            </li>
          ))}
        </ol>
      </nav>
    )}
    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
      <div>
        <h1 className="text-4xl font-bold text-slate-900 mb-2">{title}</h1>
        {description && (
          <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </div>
  </div>
);

export default React.memo(PageHeader);
