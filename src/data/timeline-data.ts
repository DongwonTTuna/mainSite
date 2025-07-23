import type { TimelineEvent } from "~/types/timeline"

export const getTimelineData = (t: (key: string) => string): TimelineEvent[] => [
  // 2022
  {
    id: "tit-2022-04",
    year: 2022,
    month: 4,
    title: t("app.timeline_events.tit_2022_04.title"),
    category: "education",
    description: t("app.timeline_events.tit_2022_04.description"),
    position: "top",
    highlight: true
  },
  {
    id: "seat-system-2022-05",
    year: 2022,
    month: 5,
    title: t("app.timeline_events.seat_system_2022_05.title"),
    category: "project",
    description: t("app.timeline_events.seat_system_2022_05.description"),
    techStack: ["JavaScript", "HTML", "CSS"],
    position: "bottom"
  },
  {
    id: "crypto-chart-2022-09",
    year: 2022,
    month: 9,
    title: t("app.timeline_events.crypto_chart_2022_09.title"),
    category: "project",
    description: t("app.timeline_events.crypto_chart_2022_09.description"),
    techStack: ["React", "WebSocket", "Chart.js", "API Integration"],
    position: "bottom"
  },
  {
    id: "jlpt-3-2022-09",
    year: 2022,
    month: 9,
    title: t("app.timeline_events.jlpt_3_2022_09.title"),
    category: "certification",
    description: t("app.timeline_events.jlpt_3_2022_09.description"),
    position: "top"
  },
  {
    id: "fe-2022-11",
    year: 2022,
    month: 11,
    title: t("app.timeline_events.fe_2022_11.title"),
    category: "certification",
    description: t("app.timeline_events.fe_2022_11.description"),
    position: "top"
  },
  // 2023
  {
    id: "nextbeat-2023-05",
    year: 2023,
    month: 5,
    title: t("app.timeline_events.nextbeat_2023_05.title"),
    category: "work",
    description: t("app.timeline_events.nextbeat_2023_05.description"),
    techStack: ["TypeScript", "React", "Node.js", "PostgreSQL"],
    position: "top",
    highlight: true
  },
  {
    id: "analytics-dashboard-2023-08",
    year: 2023,
    month: 8,
    title: t("app.timeline_events.analytics_dashboard_2023_08.title"),
    category: "work",
    description: t("app.timeline_events.analytics_dashboard_2023_08.description"),
    techStack: ["React", "D3.js", "WebSocket", "Redis"],
    position: "bottom"
  },
  // 2024
  {
    id: "tit-graduate-2024-03",
    year: 2024,
    month: 3,
    title: t("app.timeline_events.tit_graduate_2024_03.title"),
    category: "education",
    description: t("app.timeline_events.tit_graduate_2024_03.description"),
    position: "top",
    highlight: true
  },
  {
    id: "tcu-2024-04",
    year: 2024,
    month: 4,
    title: t("app.timeline_events.tcu_2024_04.title"),
    category: "education",
    description: t("app.timeline_events.tcu_2024_04.description"),
    position: "top"
  },
  {
    id: "ecommerce-2024",
    year: 2024,
    month: 6,
    title: t("app.timeline_events.ecommerce_2024.title"),
    category: "work",
    description: t("app.timeline_events.ecommerce_2024.description"),
    techStack: ["Next.js", "TypeScript", "Prisma", "GraphQL"],
    position: "bottom"
  },
  {
    id: "bioden-2024-07",
    year: 2024,
    month: 7,
    title: t("app.timeline_events.bioden_2024_07.title"),
    category: "project",
    description: t("app.timeline_events.bioden_2024_07.description"),
    techStack: ["React", "Tailwind CSS", "Node.js", "MongoDB"],
    links: {
      github: "https://github.com/DongwonTTuna/BiodenKR"
    },
    position: "bottom"
  },
  // 2025
  {
    id: "current-position-2025",
    year: 2025,
    month: 1,
    title: t("app.timeline_events.current_position_2025.title"),
    category: "work",
    description: t("app.timeline_events.current_position_2025.description"),
    techStack: ["TypeScript", "React", "Node.js", "AWS", "Docker"],
    position: "top",
    highlight: true
  },
  {
    id: "restaurant-map-2025-05",
    year: 2025,
    month: 5,
    title: t("app.timeline_events.restaurant_map_2025_05.title"),
    category: "project",
    description: t("app.timeline_events.restaurant_map_2025_05.description"),
    techStack: ["React Native", "TypeScript", "Google Maps API", "Firebase"],
    position: "bottom"
  },
  {
    id: "restaurant-scraper-2025-08",
    year: 2025,
    month: 8,
    title: t("app.timeline_events.restaurant_scraper_2025_08.title"),
    category: "project",
    description: t("app.timeline_events.restaurant_scraper_2025_08.description"),
    techStack: ["Python", "Selenium", "PostgreSQL", "FastAPI"],
    position: "bottom"
  }
]
