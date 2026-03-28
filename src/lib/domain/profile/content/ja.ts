import type { ProfileLocalization } from "#domain/profile/localization";

export const jaProfileLocalization: ProfileLocalization = {
  identity: {
    displayName: "李東原",
    roleTitle: "フルスタックエンジニア",
    heroSummary:
      "Webサービスのフロントエンド、API、デプロイをまとめて扱っています。最近はTypescript、SvelteKit、Nest.js、AWSを主に使っています。",
    introNote: "最近の作業とリンクを下にまとめています。",
    contactNote:
      "仕事の話であればLinkedInが一番見やすいです。GitHubには最近のコードと作業履歴があります。",
    locationName: "東京・恵比寿",
  },
  factLabels: {
    currentRole: "現在",
    location: "拠点",
    languages: "言語",
    stack: "技術",
  },
  languageLabels: {
    en: "英語",
    ko: "韓国語",
    ja: "日本語",
  },
  experienceText: {
    nextbeat: {
      roleTitle: "フルスタックエンジニア",
      summary:
        "2024年4月からNextbeatで働いています。Hoikushibankを担当した後、現在はOmotenashi HRの開発に参加しています。",
    },
    bioden: {
      roleTitle: "業務委託フルスタックエンジニア",
      summary: "BiodenKRサイトを短期の業務委託で開発しました。",
    },
  },
  projectText: {
    "aws-sam-migration": {
      summary:
        "LambdaのデプロイフローをAWS SAMと共通テンプレート前提で整理し直しました。",
      outcome: "デプロイ時間が約30%短くなりました。",
    },
    "core-web-vitals": {
      summary: "SvelteKitのSSR、画像配信、ルート読み込みを調整しました。",
      outcome: "Lighthouse SEOとパフォーマンスのスコアが10点以上上がりました。",
    },
    "biodenkr-launch": {
      summary: "企業サイトを作り、5言語にローカライズしました。",
      outcome: "Cloudflare Pagesに公開し、グローバル向けに配信しました。",
    },
    "admin-auth-migration": {
      summary: "Azure ADベースの認証構成をAmazon Cognitoベースへ移しました。",
      outcome: "複雑だった認証フローと運用構成をAWS側に整理しました。",
    },
  },
  skillCategoryLabels: {
    application: "アプリケーション",
    infrastructure: "インフラ",
    delivery: "進め方",
    "work-style": "仕事の進め方",
  },
  skillLabels: {
    typescript: "Typescript",
    sveltekit: "SvelteKit",
    nestjs: "Nest.js",
    nodejs: "Node.js",
    svelte: "Svelte",
    "aws-lambda": "AWS Lambda",
    "aws-sam": "AWS SAM",
    iac: "Infrastructure as Code",
    cicd: "CI/CD",
    "ssr-tuning": "SSR調整",
    "performance-optimization": "パフォーマンス最適化",
    localization: "多言語対応",
    "requirement-discovery": "要件整理",
    "client-communication": "クライアントとのやり取り",
    "release-operations": "リリース運用",
  },
  contactLabels: {
    linkedin: "LinkedIn",
    github: "GitHub",
  },
};
