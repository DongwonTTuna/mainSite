<script lang="ts">
  let { id }: { id: string } = $props();
</script>

<div class="project-art" class:auth={id === "admin-auth-migration"} class:deployment={id === "aws-sam-migration"} class:performance={id === "core-web-vitals"} class:localization={id === "biodenkr-launch"} aria-hidden="true">
  {#if id === "admin-auth-migration"}
    <svg viewBox="0 0 520 200" fill="none">
      <path d="M0 40H520M0 80H520M0 120H520M0 160H520M60 0V200M140 0V200M220 0V200M300 0V200M380 0V200M460 0V200" stroke="#adc3c4" stroke-opacity="0.08" />
      <circle cx="260" cy="103" r="76" stroke="#adc3c4" stroke-opacity="0.18" />
      <circle cx="260" cy="103" r="58" stroke="#adc3c4" stroke-opacity="0.3" stroke-dasharray="3 6" />
      <path d="M260 55L296 69V100C296 124 277 141 260 149C243 141 224 124 224 100V69Z" fill="#274b59" stroke="#a4c6cc" stroke-width="1.5" />
      <rect x="248" y="91" width="24" height="23" rx="4" fill="#f6bf61" />
      <path d="M252 91V85A8 8 0 0 1 268 85V91" stroke="#f6bf61" stroke-width="3" />
      <path d="M135 103H205M315 103H385" stroke="#acc7cb" stroke-dasharray="4 5" />
      <circle cx="133" cy="103" r="4" fill="#acc7cb" /><circle cx="387" cy="103" r="4" fill="#f6bf61" />
      <text x="72" y="135" fill="#b3c6ca">AZURE AD</text><text x="354" y="135" fill="#f6bf61">COGNITO</text>
      <text x="25" y="30" fill="#9eb7bf" class="small">IDENTITY / REIMAGINED</text><text x="475" y="178" fill="#9eb7bf" class="small">01</text>
    </svg>
  {:else if id === "aws-sam-migration"}
    <svg viewBox="0 0 520 200" fill="none">
      <path d="M65 155C200 5 300 220 453 47" stroke="#cba666" stroke-width="1.3" stroke-dasharray="3 6" />
      <path d="M140 105H223M300 105H380" stroke="#a58651" stroke-width="1.5" /><path d="M214 99L224 105L214 111M371 99L381 105L371 111" stroke="#a58651" stroke-width="1.5" />
      <rect x="71" y="73" width="70" height="64" rx="7" fill="#fcf7e5" stroke="#d9c398" />
      <rect x="223" y="63" width="78" height="83" rx="7" fill="#193440" />
      <rect x="381" y="73" width="70" height="64" rx="7" fill="#fcf7e5" stroke="#d9c398" />
      <path d="M97 95L88 105L97 115M115 95L124 105L115 115M109 92L103 118" stroke="#6e633f" stroke-width="1.5" />
      <path d="M249 98L262 89L275 98V114L262 122L249 114ZM249 98L262 106L275 98M262 106V122" stroke="#f6c86b" stroke-width="1.8" stroke-linejoin="round" />
      <path d="M409 91H416L428 120H420L413 103L405 120H397L409 97" fill="#c9872e" />
      <text x="84" y="164" fill="#786443">CODE</text><text x="245" y="169" fill="#786443">SAM</text><text x="387" y="164" fill="#786443">LAMBDA</text>
      <text x="25" y="30" fill="#786443" class="small">LESS FRICTION. MORE FLOW.</text><text x="475" y="178" fill="#786443" class="small">02</text>
    </svg>
  {:else if id === "core-web-vitals"}
    <svg viewBox="0 0 520 200" fill="none">
      <path d="M63 156H464M63 117H464M63 78H464" stroke="#afc8c8" stroke-opacity="0.65" />
      <path d="M64 145C133 163 150 85 216 103C280 123 306 42 379 64C415 74 435 53 460 40V157H64Z" fill="#c1d9d8" />
      <path d="M64 145C133 163 150 85 216 103C280 123 306 42 379 64C415 74 435 53 460 40" stroke="#397988" stroke-width="3" />
      <circle cx="379" cy="64" r="6" fill="#f8f7f3" stroke="#397988" stroke-width="2" />
      <rect x="89" y="51" width="97" height="64" rx="5" fill="#f7fcf8" stroke="#afc8c8" />
      <text x="104" y="92" fill="#286070" class="metric">+10</text><text x="165" y="92" fill="#397988">↗</text>
      <text x="25" y="30" fill="#44666a" class="small">EVERY MILLISECOND MATTERS</text><text x="475" y="178" fill="#44666a" class="small">03</text>
    </svg>
  {:else}
    <svg viewBox="0 0 520 200" fill="none">
      <circle cx="404" cy="95" r="70" stroke="#d7b7a9" /><ellipse cx="404" cy="95" rx="33" ry="70" stroke="#d7b7a9" /><path d="M334 95H474M344 60H464M344 130H464" stroke="#d7b7a9" />
      <text x="61" y="95" fill="#a54c38" class="hello">Hello.</text><text x="190" y="144" fill="#bb6a53" class="greeting">안녕하세요.</text><text x="75" y="167" fill="#947466" class="japanese">こんにちは。</text>
      <text x="25" y="30" fill="#936452" class="small">BUILT TO CROSS BORDERS</text><text x="475" y="178" fill="#936452" class="small">04</text>
    </svg>
  {/if}
</div>

<style>
  .project-art { overflow: hidden; border-radius: 5px; }
  .auth { background: #193440; }
  .deployment { background: #f0dfb8; }
  .performance { background: #dfebea; }
  .localization { background: #f1e0d6; }
  svg { display: block; width: 100%; height: auto; }
  text { font: 500 9px var(--font-mono); letter-spacing: 0.08em; }
  .small { font-size: 8px; letter-spacing: 0.12em; }
  .metric { font: 600 36px var(--font-ui); letter-spacing: -0.05em; }
  .hello { font: 650 61px var(--font-ui); letter-spacing: -0.055em; }
  .greeting { font: 500 28px var(--font-ui); letter-spacing: -0.04em; }
  .japanese { font: 400 14px var(--font-ui); }
</style>
