<section class="privacy-page">
  <div class="shell">
    <header class="privacy-header">
      <a class="back-link" href="/">Home</a>
      <p class="section-label">Privacy</p>
      <h1>Privacy Policy — gws CLI</h1>
      <p class="effective">Effective 2026-10-25</p>
    </header>

    <main id="main-content" class="policy" tabindex="-1">
      <p>
        This page covers the Google OAuth client named “gws CLI” (Google Cloud
        project <code>gws-ttuna0790-260607</code>). It is a personal tool. Only
        its owner, Dongwon Lee, uses it, to work with his own Google account
        from his own computers through the Google Workspace CLI. It is not
        offered to anyone else.
      </p>

      <h2>What it accesses</h2>
      <p>
        Data in the owner’s own Google account, such as Gmail, Google Calendar,
        Drive, Docs, Sheets, Slides and Tasks, only as needed for the owner’s
        own work.
      </p>

      <h2>How the data is used</h2>
      <p>
        The data is read or changed only for the owner’s own tasks. AI
        assistants that the owner uses may process it on his behalf. It is not
        sold, not used for advertising and not shared with anyone else.
      </p>

      <h2>Storage</h2>
      <p>
        OAuth tokens are stored encrypted on the owner’s computers. Copies of
        data are kept only in the owner’s own files.
      </p>

      <h2>Revoking access</h2>
      <p>
        Access can be removed at any time from
        <a href="https://myaccount.google.com/connections"
          >Google Account → Third-party connections</a
        >.
      </p>

      <h2>Contact</h2>
      <p>
        <a href="https://github.com/DongwonTTuna">github.com/DongwonTTuna</a>
      </p>

      <section class="summary" lang="ko">
        <h2>개인정보처리방침 (한국어 요약)</h2>
        <p>
          이 페이지는 Google OAuth 클라이언트 「gws CLI」(Google Cloud 프로젝트
          <code>gws-ttuna0790-260607</code>)에 관한 것입니다. 소유자 이동원
          본인만 자신의 Google 계정을 자신의 컴퓨터에서 Google Workspace CLI로
          다루기 위해 쓰는 개인 도구이며, 다른 사람에게 제공하지 않습니다.
          데이터는 본인 업무에만 쓰고, 본인이 쓰는 AI 도우미가 본인을 대신해
          처리할 수 있습니다. 판매·광고·제3자 공유는 하지 않습니다. 인증
          토큰은 본인 컴퓨터에 암호화해 저장합니다. 접근 권한은 Google 계정의
          「서드 파티 연결」에서 언제든 해제할 수 있습니다.
        </p>
      </section>
    </main>
  </div>
</section>

<style>
  .privacy-page {
    min-height: 100dvh;
    padding: 3rem clamp(1.25rem, 4vw, 3rem) 5rem;
  }

  .shell {
    width: min(920px, 100%);
    margin: 0 auto;
    background: var(--page-background);
  }

  .privacy-header {
    display: grid;
    gap: 1rem;
    padding: 1.25rem 0 2.5rem;
    border-bottom: 1px solid var(--surface-border);
  }

  .back-link,
  .policy a {
    width: fit-content;
    color: var(--link-color);
    border-bottom: 1px solid var(--link-border);
    padding-bottom: 0.1rem;
    text-decoration: none;
    transition:
      color 120ms ease,
      border-color 120ms ease;
  }

  .back-link:hover,
  .back-link:focus-visible,
  .policy a:hover,
  .policy a:focus-visible {
    color: var(--text-strong);
    border-color: var(--link-border-active);
  }

  .section-label {
    font-family: var(--font-mono);
    color: var(--text-muted);
    font-size: 0.76rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  h1 {
    color: var(--text-strong);
    font-size: clamp(2rem, 5vw, 3rem);
    font-weight: 700;
    letter-spacing: -0.04em;
    line-height: 1.15;
  }

  .effective {
    color: var(--text-muted);
    font-size: 0.85rem;
  }

  .policy {
    display: grid;
    gap: 1rem;
    max-width: 44rem;
    padding: 2rem 0;
    color: var(--text-body);
    line-height: 1.7;
  }

  h2 {
    margin-top: 1rem;
    color: var(--text-strong);
    font-weight: 650;
    letter-spacing: -0.02em;
    font-size: 1.15rem;
  }

  code {
    font-family: var(--font-mono);
    font-size: 0.9em;
  }

  .summary {
    display: grid;
    gap: 1rem;
    margin-top: 1.5rem;
    padding-top: 1.5rem;
    border-top: 1px solid var(--surface-border);
  }

  @media (max-width: 720px) {
    .privacy-page {
      padding: 1.5rem 1.25rem 3rem;
    }

    .privacy-header {
      padding: 1.5rem 0;
    }
  }
</style>
