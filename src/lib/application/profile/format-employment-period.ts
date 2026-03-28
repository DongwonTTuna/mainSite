import type { EmploymentPeriod } from "#domain/profile/index";
import type { AppLocale } from "#infrastructure/i18n/locale";

const englishMonthLabels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

function formatYearMonth(
  value: { year: number; month: number },
  locale: AppLocale,
) {
  if (locale === "en") {
    return `${englishMonthLabels[value.month - 1]} ${value.year}`;
  }

  return `${value.year}.${String(value.month).padStart(2, "0")}`;
}

function isSameYearMonth(
  left: { year: number; month: number },
  right: { year: number; month: number },
) {
  return left.year === right.year && left.month === right.month;
}

export function formatEmploymentPeriod(
  period: EmploymentPeriod,
  locale: AppLocale,
): string {
  const startLabel = formatYearMonth(period.start, locale);

  if (period.isCurrent) {
    const currentLabel =
      locale === "ja" ? "現在" : locale === "ko" ? "현재" : "Present";
    return `${startLabel} - ${currentLabel}`;
  }

  if (!period.end || isSameYearMonth(period.start, period.end)) {
    return startLabel;
  }

  return `${startLabel} - ${formatYearMonth(period.end, locale)}`;
}
