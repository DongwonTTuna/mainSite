import type { ProfileContent } from "#domain/profile/types";

export const jaProfileContent: ProfileContent = {
  name: "李東原",
  role: "フルスタックエンジニア / Nextbeat",
  heroSummary:
    "Webサービスのフロントエンド、API、デプロイをまとめて扱っています。最近はTypescript、SvelteKit、Nest.js、AWSを主に使っています。",
  introNote: "最近の作業とリンクを下にまとめています。",
  contactNote:
    "仕事の話であればLinkedInが一番見やすいです。GitHubには最近のコードと作業履歴があります。",
  facts: [
    { label: "現在", value: "フルスタックエンジニア / Nextbeat" },
    { label: "拠点", value: "東京・恵比寿" },
    { label: "言語", value: "韓国語、日本語、英語" },
    { label: "技術", value: "Typescript, SvelteKit, Nest.js, AWS" },
  ],
  experiences: [
    {
      company: "Nextbeat Inc.",
      role: "フルスタックエンジニア",
      period: "2024.04 - 現在",
      summary:
        "2024年4月からNextbeatで働いています。Hoikushibankを担当した後、現在はOmotenashi HRの開発に参加しています。",
      bullets: [
        "LambdaのデプロイをServerless FrameworkからAWS SAMへ移し、デプロイ時間を約30%短縮しました。",
        "SSRと静的アセット配信を調整し、Lighthouse SEOとCore Web Vitalsを改善しました。",
        "社内管理ツールの認証構成をAzure ADからAmazon Cognitoベースへ移行しました。",
      ],
    },
    {
      company: "Bioden Corp.",
      role: "業務委託フルスタックエンジニア",
      period: "2024.07",
      summary: "BiodenKRサイトを短期の業務委託で開発しました。",
      bullets: [
        "SvelteKitでサイトを構築し、静的SSR構成を整えました。",
        "レイアウトを分けずに5言語対応を実装しました。",
        "Cloudflare Pagesへデプロイし、公開作業を自動化しました。",
      ],
    },
  ],
  projects: [
    {
      name: "AWS SAM移行",
      context: "Nextbeat / Omotenashi HR",
      summary:
        "LambdaのデプロイフローをAWS SAMと共通テンプレート前提で整理し直しました。",
      outcome: "デプロイ時間が約30%短くなりました。",
    },
    {
      name: "Core Web Vitals改善",
      context: "Nextbeat / Omotenashi HR",
      summary: "SvelteKitのSSR、画像配信、ルート読み込みを調整しました。",
      outcome: "Lighthouse SEOとパフォーマンスのスコアが10点以上上がりました。",
    },
    {
      name: "BiodenKR公開",
      context: "Bioden Corp.",
      summary: "企業サイトを作り、5言語にローカライズしました。",
      outcome: "Cloudflare Pagesに公開し、グローバル向けに配信しました。",
    },
    {
      name: "社内管理ツール認証基盤の移行",
      context: "Nextbeat / 社内管理ツール",
      summary: "Azure ADベースの認証構成をAmazon Cognitoベースへ移しました。",
      outcome: "複雑だった認証フローと運用構成をAWS側に整理しました。",
    },
  ],
  skillGroups: [
    {
      label: "アプリケーション",
      items: ["Typescript", "SvelteKit", "Nest.js", "Node.js", "Svelte"],
    },
    {
      label: "インフラ",
      items: ["AWS Lambda", "AWS SAM", "Infrastructure as Code", "CI/CD"],
    },
    {
      label: "進め方",
      items: ["SSR調整", "パフォーマンス最適化", "多言語対応"],
    },
    {
      label: "仕事の進め方",
      items: ["要件整理", "クライアントとのやり取り", "リリース運用"],
    },
  ],
  contactLinks: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/dongwonttuna" },
    { label: "GitHub", href: "https://github.com/dongwonttuna" },
  ],
};
