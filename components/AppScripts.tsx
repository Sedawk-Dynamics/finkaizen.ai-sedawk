'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/* ============================================================
   AVIANT · Finkaizen — Interactions (ported from app.js)
   Runs the full original app.js behaviour on every page, with
   teardown so client-side navigation behaves like a fresh load.
   The mobile-nav toggle and active-link logic live in <Nav/>.
   ============================================================ */

export default function AppScripts() {
  const pathname = usePathname();

  useEffect(() => {
    // ---- teardown registries ----
    const removers: Array<() => void> = [];
    const intervals: number[] = [];
    const timeouts: number[] = [];
    const observers: Array<{ disconnect: () => void }> = [];

    const on = (
      target: EventTarget,
      type: string,
      fn: EventListenerOrEventListenerObject,
      opts?: boolean | AddEventListenerOptions
    ) => {
      target.addEventListener(type, fn, opts);
      removers.push(() => target.removeEventListener(type, fn, opts));
    };

    // ============================================================
    //  IIFE #1 — interactions
    // ============================================================
    (function () {
      'use strict';

      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      const buildVizBars = (line: Element) => {
        const n = 32;
        let html = '';
        for (let i = 0; i < n; i++) {
          const h = 20 + Math.round(Math.random() * 80);
          const d = Math.round(Math.random() * 600);
          html += `<div class="viz-bar" style="height:${h}%;animation-delay:${d}ms"></div>`;
        }
        line.innerHTML = html;
      };

      // Continuously re-randomise bar heights so the chart reads as "live" data.
      // The CSS height transition smooths each change into a visible animation.
      const startLiveViz = (line: HTMLElement) => {
        if (prefersReduced || line.dataset.live === '1') return;
        line.dataset.live = '1';
        const bars = line.querySelectorAll<HTMLElement>('.viz-bar');
        const pulse = () => {
          bars.forEach((bar) => {
            bar.style.height = 20 + Math.round(Math.random() * 80) + '%';
          });
        };
        intervals.push(window.setInterval(pulse, 1500));
      };

      const animateCardViz = (card: Element) => {
        card.querySelectorAll<HTMLElement>('.viz-line').forEach((line) => {
          buildVizBars(line);
          startLiveViz(line);
        });
      };

      // ---- Cursor glow (desktop only) ----
      const glow = document.getElementById('cursorGlow');
      if (glow && window.matchMedia('(pointer: fine)').matches) {
        let raf: number | null = null;
        on(document, 'mousemove', (e: Event) => {
          const me = e as MouseEvent;
          if (raf) return;
          raf = requestAnimationFrame(() => {
            glow.style.left = me.clientX + 'px';
            glow.style.top = me.clientY + 'px';
            raf = null;
          });
        });
      }

      // ---- Bento card spotlight ----
      document.querySelectorAll<HTMLElement>('.bcard').forEach((card) => {
        on(card, 'mousemove', (e: Event) => {
          const me = e as MouseEvent;
          const r = card.getBoundingClientRect();
          card.style.setProperty('--mx', ((me.clientX - r.left) / r.width) * 100 + '%');
          card.style.setProperty('--my', ((me.clientY - r.top) / r.height) * 100 + '%');
        });
      });

      // ---- Scroll reveal ----
      const reveals = document.querySelectorAll<HTMLElement>('.reveal');
      document.querySelectorAll<HTMLElement>('.bento .reveal').forEach((el, idx) => {
        el.style.setProperty('--reveal-delay', `${Math.min(idx * 70, 420)}ms`);
      });

      const revealEl = (el: Element) => {
        if (el.classList.contains('in')) return;
        el.classList.add('in');
        if (el.classList.contains('bcard')) animateCardViz(el);
      };

      if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver(
          (entries) => {
            entries.forEach((en) => {
              if (en.isIntersecting) {
                revealEl(en.target);
                io.unobserve(en.target);
              }
            });
          },
          { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
        );
        observers.push(io);

        // Start observing only after the initial opacity:0 state has painted.
        // Without this, elements already in the viewport jump straight to their
        // final state and the entrance transition is never visible.
        requestAnimationFrame(() =>
          requestAnimationFrame(() => {
            reveals.forEach((el) => io.observe(el));
          })
        );

        // Safety net: never leave content hidden (e.g. tab restored in background).
        timeouts.push(window.setTimeout(() => reveals.forEach(revealEl), 3000));
      } else {
        reveals.forEach(revealEl);
      }

      // ---- Counter animation ----
      const counters = document.querySelectorAll<HTMLElement>('.count');
      const animateCount = (el: HTMLElement) => {
        const target = parseFloat(el.dataset.to || '0');
        const suffix = el.dataset.suffix || '';
        const prefix = el.dataset.prefix || '';
        const decimals = parseInt(el.dataset.decimals || '0', 10);
        const dur = 1600;
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / dur);
          const eased = 1 - Math.pow(1 - p, 3);
          const val = target * eased;
          el.textContent =
            prefix + val.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + suffix;
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      };
      if ('IntersectionObserver' in window) {
        const cio = new IntersectionObserver(
          (entries) => {
            entries.forEach((en) => {
              if (!en.isIntersecting) return;
              animateCount(en.target as HTMLElement);
              cio.unobserve(en.target);
            });
          },
          { threshold: 0.4 }
        );
        observers.push(cio);
        counters.forEach((c) => cio.observe(c));
      } else {
        counters.forEach((c) => animateCount(c));
      }

      // ---- Fallback: only build bars that aren't part of a reveal card ----
      // Reveal cards build their bars on scroll-in so the bargrow animation is
      // visible; building them here too would make the animation finish off-screen.
      document.querySelectorAll<HTMLElement>('.viz-line').forEach((line) => {
        if (!line.closest('.reveal') && !line.children.length) {
          buildVizBars(line);
          startLiveViz(line);
        }
      });

      // ---- Contact form ----
      const form = document.getElementById('contactForm') as HTMLFormElement | null;
      const toast = document.getElementById('toast');
      if (form) {
        on(form, 'submit', (e: Event) => {
          e.preventDefault();
          let valid = true;
          form.querySelectorAll('.field').forEach((f) => f.classList.remove('invalid'));
          const required = ['name', 'email', 'message'];
          required.forEach((id) => {
            const input = form.elements.namedItem(id) as HTMLInputElement | null;
            if (!input || !input.value.trim()) {
              input?.closest('.field')?.classList.add('invalid');
              valid = false;
            }
          });
          const email = form.elements.namedItem('email') as HTMLInputElement | null;
          if (email && email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
            email.closest('.field')?.classList.add('invalid');
            valid = false;
          }
          if (!valid) return;

          // Compose mailto fallback — guaranteed to work without a backend
          const name = encodeURIComponent((form.elements.namedItem('name') as HTMLInputElement).value);
          const org = encodeURIComponent(
            (form.elements.namedItem('institution') as HTMLInputElement | null)?.value || ''
          );
          const phone = encodeURIComponent(
            (form.elements.namedItem('phone') as HTMLInputElement | null)?.value || ''
          );
          const interest = encodeURIComponent(
            (form.elements.namedItem('interest') as HTMLSelectElement | null)?.value || ''
          );
          const msg = encodeURIComponent(
            (form.elements.namedItem('message') as HTMLTextAreaElement).value
          );
          const subject = encodeURIComponent(
            `[Inquiry] ${decodeURIComponent(name)} — ${decodeURIComponent(interest) || 'General'}`
          );
          const body = `Name: ${name}%0D%0AInstitution: ${org}%0D%0APhone: ${phone}%0D%0AInterest: ${interest}%0D%0A%0D%0A${msg}`;

          // Open user's mail client
          window.location.href = `mailto:info@finkaizenai.com?subject=${subject}&body=${body}`;

          if (toast) {
            toast.classList.add('show');
            timeouts.push(window.setTimeout(() => toast.classList.remove('show'), 4000));
          }
          form.reset();
        });
      }

      // ---- Year ----
      document.querySelectorAll('[data-year]').forEach((el) => (el.textContent = String(new Date().getFullYear())));
    })();

    // ============================================================
    //  IIFE #2 — module visualisations + detail modals
    // ============================================================
    (function () {
      'use strict';

      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const SVGNS = 'http://www.w3.org/2000/svg';
      const rnd = (a: number, b: number) => a + Math.random() * (b - a);

      type Metric = { tab: string; value: string; cap: string; tag: string; series: string };
      type UseCase = { h: string; p: string };
      type ModuleCard = {
        type: string;
        tag?: string;
        pct?: number;
        legend?: string[];
        rps?: number;
        p50?: string;
        val?: number;
        k?: string;
        s?: string;
      };
      type ModuleDef = {
        mod: string;
        title: string;
        sub: string;
        overview: string;
        card: ModuleCard;
        metrics: Metric[];
        features: string[];
        useCases: UseCase[];
      };

      // ---- Module dataset -------------------------------------------------
      const MODULES: Record<string, ModuleDef> = {
        app: {
          mod: 'MOD · APP_SCORE',
          title: 'Application Scorecard',
          sub: 'Origination Risk',
          overview:
            'Real-time creditworthiness scoring at the moment of application. Combines bureau, behavioural and alternative data into a single explainable decision with full feature attribution.',
          card: { type: 'none' },
          metrics: [
            { tab: 'Regular', value: '< 50ms', cap: 'Decision Latency', tag: 'Throughput', series: 'high' },
            { tab: 'Lift', value: '2.3x', cap: 'Approval Lift vs Rules', tag: 'Impact', series: 'up' },
            { tab: 'Explainability', value: '100%', cap: 'Reason-coded Decisions', tag: 'Coverage', series: 'flat' },
          ],
          features: [
            'Bureau + behavioural + alternative data',
            'Explainable feature attribution',
            'Sub-50ms decisioning',
            'Champion / challenger framework',
            'Policy & cut-off management',
            'Audit-ready decision logs',
          ],
          useCases: [
            { h: 'Unsecured Lending', p: 'Instant decisions for personal loans and cards with explainable scores.' },
            { h: 'BNPL', p: 'High-throughput micro-decisions at checkout with thin-file support.' },
            { h: 'SME Onboarding', p: 'Blend financials and bureau data for fast SME approvals.' },
            { h: 'Co-lending', p: 'Consistent, shareable scoring across partner books.' },
          ],
        },
        beh: {
          mod: 'MOD · BEH',
          title: 'Behavioural Scorecard',
          sub: 'Portfolio Risk',
          overview:
            'Dynamic behavioural monitoring across existing portfolios — predicts delinquency patterns before they materialise and feeds limit, pricing and collections strategies.',
          card: { type: 'area', tag: 'Behaviour · 30D' },
          metrics: [
            { tab: 'Regular', value: '91.5%', cap: '30-Day Forward AUC', tag: 'Accuracy', series: 'up' },
            { tab: 'Risk Reduction', value: '27%', cap: 'Delinquency Reduction', tag: 'Impact', series: 'down' },
            { tab: 'Explainability', value: '100%', cap: 'Feature Attribution', tag: 'Coverage', series: 'flat' },
          ],
          features: [
            'Daily or on-demand portfolio refresh',
            'Roll-rate and vintage analytics',
            'Limit-management recommendations',
            'Risk-based pricing signals',
            'Account-level early warning flags',
            'Cohort drift monitoring',
          ],
          useCases: [
            { h: 'Credit Card Portfolios', p: 'Identify accounts trending toward stress for proactive limit action.' },
            { h: 'Working Capital Lines', p: 'Detect utilisation patterns indicative of business stress.' },
            { h: 'Cross-sell Eligibility', p: 'Surface low-risk customers ready for top-up or new products.' },
            { h: 'Repricing Programs', p: 'Move customers across risk tiers based on actual behaviour.' },
          ],
        },
        stmt: {
          mod: 'MOD · STMT',
          title: 'Bank Statement Analyser',
          sub: 'Cash-flow Intelligence',
          overview:
            'OCR and AI-driven parsing of multi-bank statements with cash-flow analysis, transaction categorisation and red-flag detection across 300+ Indian bank formats.',
          card: { type: 'minibars', tag: 'Inflow · 90D' },
          metrics: [
            { tab: 'Regular', value: '300+', cap: 'Bank Formats Supported', tag: 'Coverage', series: 'high' },
            { tab: 'Accuracy', value: '99.8%', cap: 'OCR Accuracy', tag: 'Quality', series: 'up' },
            { tab: 'Speed', value: '8s', cap: 'Avg Parse Time / Doc', tag: 'Throughput', series: 'down' },
          ],
          features: [
            '300+ Indian bank formats',
            'Multi-page OCR pipeline',
            'Transaction categorisation',
            'Cash-flow & surplus analysis',
            'Bounce & circular-txn flags',
            'Income verification signals',
          ],
          useCases: [
            { h: 'Income Assessment', p: 'Derive verified income and surplus from raw statements.' },
            { h: 'Fraud Detection', p: 'Spot circular transactions and tampered documents.' },
            { h: 'SME Underwriting', p: 'Model business cash-flow seasonality and stability.' },
            { h: 'Affordability', p: 'Compute obligations and disposable income for EMIs.' },
          ],
        },
        bureau: {
          mod: 'MOD · BUR',
          title: 'Bureau Report Analyser',
          sub: 'Unified Risk View',
          overview:
            'Automated synthesis across multiple bureaus into a single, actionable risk view — normalising tradelines, enquiries and scores into one consistent picture.',
          card: { type: 'donut', pct: 42, legend: ['CIBIL', 'EXP', 'EQX', 'CRIF'], tag: 'Sources' },
          metrics: [
            { tab: 'Regular', value: '4', cap: 'Bureaus Unified', tag: 'Coverage', series: 'high' },
            { tab: 'Dedup', value: '42%', cap: 'Tradeline Overlap Resolved', tag: 'Quality', series: 'up' },
            { tab: 'Speed', value: '1.2s', cap: 'Synthesis Latency', tag: 'Throughput', series: 'down' },
          ],
          features: [
            'Cross-bureau normalisation',
            'Tradeline de-duplication',
            'Enquiry velocity analysis',
            'Unified risk grade',
            'Dispute & remark detection',
            'Score reconciliation',
          ],
          useCases: [
            { h: 'Multi-bureau Policy', p: 'Apply consistent rules across every bureau source.' },
            { h: 'Thin-file Coverage', p: 'Combine partial files into a fuller credit picture.' },
            { h: 'Portfolio Review', p: 'Refresh unified grades for existing customers.' },
            { h: 'Dispute Handling', p: 'Surface remarks and disputes for manual review.' },
          ],
        },
        prof: {
          mod: 'MOD · PRO',
          title: 'Proficiency API',
          sub: 'Verification & Enrichment',
          overview:
            'Lightweight, low-latency endpoints for identity verification, KYC and data enrichment — built to slot into any origination or servicing flow.',
          card: { type: 'latency', rps: 200, p50: '12 MS', tag: 'Live Throughput' },
          metrics: [
            { tab: 'Regular', value: '200 RPS', cap: 'Sustained Throughput', tag: 'Capacity', series: 'high' },
            { tab: 'Latency', value: '12ms', cap: 'P50 Response Time', tag: 'Speed', series: 'down' },
            { tab: 'Uptime', value: '99.95%', cap: 'Rolling 90-Day SLA', tag: 'Reliability', series: 'flat' },
          ],
          features: [
            'REST + batch endpoints',
            'KYC & identity checks',
            'Signal enrichment',
            'Low-latency caching',
            'Idempotent requests',
            'Granular usage metering',
          ],
          useCases: [
            { h: 'Onboarding', p: 'Verify identity and enrich applicant data inline.' },
            { h: 'Re-KYC', p: 'Batch refresh KYC across the existing base.' },
            { h: 'Enrichment', p: 'Augment thin applications with external signals.' },
            { h: 'Monitoring', p: 'Continuous checks against watchlists and changes.' },
          ],
        },
        ews: {
          mod: 'MOD · EWS',
          title: 'Early Warning System · 90+ DPD',
          sub: 'Predictive Collections',
          overview:
            'Predictive surfacing of accounts headed for 90+ day delinquency, with prescriptive next-best actions for risk and collections teams — weeks before the first missed payment.',
          card: { type: 'area-ews', tag: 'EWS · 90+ DPD' },
          metrics: [
            { tab: 'Regular', value: '6 wks', cap: 'Avg Early Warning Lead', tag: 'Lead Time', series: 'up' },
            { tab: 'Risk Reduction', value: '31%', cap: 'Roll-rate Reduction', tag: 'Impact', series: 'down' },
            { tab: 'Precision', value: '88%', cap: 'Top-decile Precision', tag: 'Accuracy', series: 'flat' },
          ],
          features: [
            '90+ DPD probability surfacing',
            'Prescriptive next-best actions',
            'Queue prioritisation',
            'Self-cure likelihood',
            'Treatment effectiveness tracking',
            'Audit-ready action logs',
          ],
          useCases: [
            { h: 'Collections Strategy', p: 'Prioritise outreach to accounts most likely to roll forward.' },
            { h: 'Self-cure Routing', p: 'Avoid over-contacting accounts likely to self-cure.' },
            { h: 'Provisioning', p: 'Feed forward-looking signals into ECL estimates.' },
            { h: 'Capacity Planning', p: 'Forecast collections workload by risk band.' },
          ],
        },
        rec: {
          mod: 'MOD · REC',
          title: 'Recovery AI Services',
          sub: 'Propensity Modelling',
          overview:
            'Propensity-to-pay modelling to prioritise queues and optimise collection strategy — recommending the right channel, timing and treatment for each account.',
          card: { type: 'halfgauge', val: 68, k: 'Pay Probability', s: '3,204 Accounts', tag: 'High Priority Queue' },
          metrics: [
            { tab: 'Regular', value: '68', cap: 'Avg Pay-Propensity Score', tag: 'Score', series: 'up' },
            { tab: 'Recovery', value: '+19%', cap: 'Recovery Rate Uplift', tag: 'Impact', series: 'up' },
            { tab: 'Efficiency', value: '-24%', cap: 'Cost-to-collect', tag: 'Savings', series: 'down' },
          ],
          features: [
            'Propensity-to-pay scoring',
            'Channel & timing optimisation',
            'Queue prioritisation',
            'Settlement recommendation',
            'Right-party-contact modelling',
            'Treatment A/B testing',
          ],
          useCases: [
            { h: 'Queue Prioritisation', p: 'Focus agents on the highest-yield accounts first.' },
            { h: 'Channel Selection', p: 'Pick call, SMS or email by predicted responsiveness.' },
            { h: 'Settlement Offers', p: 'Recommend offers calibrated to pay propensity.' },
            { h: 'Agent Allocation', p: 'Match account difficulty to agent skill.' },
          ],
        },
        pd: {
          mod: 'MOD · PD',
          title: 'PD AI Services',
          sub: 'Probability of Default',
          overview:
            'Statistical modelling of long-term Probability of Default for IFRS-9 / ECL provisioning and capital planning — calibrated, monitored and audit-ready.',
          card: { type: 'dist', tag: 'PD Distribution' },
          metrics: [
            { tab: 'Regular', value: 'IFRS-9', cap: 'ECL-aligned Output', tag: 'Standard', series: 'flat' },
            { tab: 'Calibration', value: '0.97', cap: 'Calibration Ratio', tag: 'Quality', series: 'up' },
            { tab: 'Stability', value: '0.04', cap: 'PSI (rolling)', tag: 'Drift', series: 'down' },
          ],
          features: [
            'Through-the-cycle PD',
            'Point-in-time adjustments',
            'IFRS-9 stage allocation',
            'Macro-overlay scenarios',
            'Calibration monitoring',
            'Capital planning inputs',
          ],
          useCases: [
            { h: 'ECL Provisioning', p: 'Generate IFRS-9 aligned expected credit loss inputs.' },
            { h: 'Capital Planning', p: 'Feed PD term-structures into capital models.' },
            { h: 'Stress Testing', p: 'Apply macro overlays for scenario analysis.' },
            { h: 'Model Governance', p: 'Track calibration and stability over time.' },
          ],
        },
      };

      // ---- SVG helpers ----------------------------------------------------
      const seriesValues = (kind: string, n: number) => {
        const out: number[] = [];
        let v = 0.5;
        for (let i = 0; i < n; i++) {
          const t = i / (n - 1);
          if (kind === 'up') v = 0.25 + t * 0.55 + rnd(-0.06, 0.06);
          else if (kind === 'down') v = 0.8 - t * 0.55 + rnd(-0.06, 0.06);
          else if (kind === 'flat') v = 0.6 + rnd(-0.08, 0.08);
          else if (kind === 'high') v = 0.55 + Math.sin(t * 7) * 0.18 + rnd(-0.05, 0.05);
          else v = 0.3 + Math.sin(t * 5) * 0.25 + rnd(-0.05, 0.05);
          out.push(Math.max(0.05, Math.min(0.97, v)));
        }
        return out;
      };

      const areaPaths = (vals: number[], W: number, H: number) => {
        const step = W / (vals.length - 1);
        const pts = vals.map((v, i) => [+(i * step).toFixed(2), +((1 - v) * H).toFixed(2)]);
        const line = 'M' + pts.map((p) => p.join(',')).join(' L');
        const fill = line + ` L${W},${H} L0,${H} Z`;
        return { line, fill, last: pts[pts.length - 1] };
      };

      const ensureGradient = () => {
        if (document.getElementById('avi-defs')) return;
        const svg = document.createElementNS(SVGNS, 'svg');
        svg.setAttribute('id', 'avi-defs');
        svg.setAttribute('width', '0');
        svg.setAttribute('height', '0');
        svg.style.position = 'absolute';
        svg.innerHTML =
          '<defs><linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0%" stop-color="hsla(150,100%,50%,0.40)"/>' +
          '<stop offset="100%" stop-color="hsla(150,100%,50%,0)"/></linearGradient></defs>';
        document.body.appendChild(svg);
      };

      // ---- Card visualisation renderers ----------------------------------
      const renderArea = (host: HTMLElement, kind: string, tag?: string, h?: number) => {
        const W = 100,
          H = h || 42;
        const { line, fill, last } = areaPaths(seriesValues(kind || 'up', 28), W, H);
        host.innerHTML =
          `<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" style="height:${H + 18}px">` +
          `<path class="spark-fill" d="${fill}"/>` +
          `<path class="spark-line" vector-effect="non-scaling-stroke" d="${line}"/>` +
          `<circle class="spark-dot" cx="${last[0]}" cy="${last[1]}" r="2.5"/></svg>` +
          (tag ? `<div class="viz-tag">${tag}</div>` : '');
      };

      const renderMiniBars = (host: HTMLElement, tag?: string) => {
        let bars = '';
        for (let i = 0; i < 22; i++) bars += `<div class="mb" style="height:${Math.round(rnd(25, 100))}%"></div>`;
        host.innerHTML = `<div class="minibars">${bars}</div>` + (tag ? `<div class="viz-tag">${tag}</div>` : '');
        if (!reduced) {
          const els = host.querySelectorAll<HTMLElement>('.mb');
          intervals.push(
            window.setInterval(() => els.forEach((b) => (b.style.height = Math.round(rnd(25, 100)) + '%')), 1600)
          );
        }
      };

      const renderDonut = (host: HTMLElement, pct: number, legend: string[], tag?: string) => {
        const r = 33,
          c = 2 * Math.PI * r;
        host.innerHTML =
          `<div class="donut-wrap"><div class="donut">` +
          `<svg viewBox="0 0 84 84"><circle class="ring-bg" cx="42" cy="42" r="${r}"/>` +
          `<circle class="ring-fg" cx="42" cy="42" r="${r}" stroke-dasharray="${c}" stroke-dashoffset="${c}"/></svg>` +
          `<div class="ring-val">0%</div></div>` +
          `<div class="legend">${legend
            .map((l, i) => `<span class="ls${Math.min(i + 1, 3)}">${l}</span>`)
            .join('')}` +
          `<span class="ls3">${tag}</span></div></div>`;
        const fg = host.querySelector('.ring-fg') as SVGElement;
        const val = host.querySelector('.ring-val') as HTMLElement;
        requestAnimationFrame(() => {
          (fg as unknown as HTMLElement).style.strokeDashoffset = String(c * (1 - pct / 100));
        });
        let cur = 0;
        const tick = () => {
          cur += 2;
          if (cur >= pct) cur = pct;
          val.textContent = cur + '%';
          if (cur < pct) timeouts.push(window.setTimeout(tick, 24));
        };
        timeouts.push(window.setTimeout(tick, 200));
      };

      const renderLatency = (host: HTMLElement, rps: number, p50: string, tag?: string) => {
        const W = 120,
          H = 42,
          n = 9,
          step = W / (n - 1);
        let dots = '';
        const segs: number[][] = [];
        for (let i = 0; i < n; i++) {
          const x = i * step,
            y = rnd(8, H - 8);
          segs.push([x, y]);
        }
        const line = 'M' + segs.map((p) => p.map((v) => v.toFixed(1)).join(',')).join(' L');
        dots = segs
          .map(
            (p) =>
              `<circle class="lat-dot" cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="2.4" style="animation-delay:${Math.round(
                rnd(0, 1800)
              )}ms"/>`
          )
          .join('');
        host.innerHTML =
          `<div class="latency"><div class="lat-graph">` +
          `<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" style="height:46px">` +
          `<path class="lat-line" vector-effect="non-scaling-stroke" d="${line}"/>${dots}</svg></div>` +
          `<div class="lat-stats"><div class="lat-rps">${rps} RPS</div><div class="lat-p50">P50 · ${p50}</div></div></div>` +
          (tag ? `<div class="viz-tag">${tag}</div>` : '');
      };

      const renderHalfGauge = (host: HTMLElement, val: number, k: string, s: string, tag?: string) => {
        host.innerHTML =
          `<div class="halfgauge"><div class="hg">` +
          `<svg viewBox="0 0 110 60"><path class="hg-bg" d="M8 56 A 47 47 0 0 1 102 56"/>` +
          `<path class="hg-fg" d="M8 56 A 47 47 0 0 1 102 56"/></svg>` +
          `<div class="hg-val">0</div></div>` +
          `<div class="hg-meta"><div class="hg-k">${k}</div><div class="hg-s">${tag}</div><div class="hg-s">${s}</div></div></div>`;
        const fg = host.querySelector('.hg-fg') as SVGPathElement;
        const valEl = host.querySelector('.hg-val') as HTMLElement;
        const len = fg.getTotalLength();
        (fg as unknown as HTMLElement).style.strokeDasharray = String(len);
        (fg as unknown as HTMLElement).style.strokeDashoffset = String(len);
        requestAnimationFrame(() => {
          (fg as unknown as HTMLElement).style.strokeDashoffset = String(len * (1 - val / 100));
        });
        let cur = 0;
        const tick = () => {
          cur += 2;
          if (cur >= val) cur = val;
          valEl.textContent = String(cur);
          if (cur < val) timeouts.push(window.setTimeout(tick, 22));
        };
        timeouts.push(window.setTimeout(tick, 200));
      };

      const renderDist = (host: HTMLElement, tag?: string) => {
        let bars = '';
        const n = 26;
        for (let i = 0; i < n; i++) {
          const x = (i - n / 2) / (n / 3.2);
          const g = Math.exp((-x * x) / 2);
          const h = Math.max(6, Math.round(g * 100 + rnd(-6, 6)));
          bars += `<div class="db" style="height:${Math.min(100, h)}%;animation-delay:${i * 18}ms"></div>`;
        }
        host.innerHTML = `<div class="dist">${bars}</div>` + (tag ? `<div class="viz-tag">${tag}</div>` : '');
      };

      const renderCardViz = (card: HTMLElement, id: string) => {
        const c = (MODULES[id] || ({} as ModuleDef)).card;
        if (!c || c.type === 'none') return;
        let host = card.querySelector('.card-viz') as HTMLElement | null;
        if (!host) {
          host = document.createElement('div');
          host.className = 'card-viz';
          card.appendChild(host);
        }
        if (c.type === 'area') renderArea(host, 'up', c.tag);
        else if (c.type === 'area-ews') renderArea(host, 'high', c.tag, 54);
        else if (c.type === 'minibars') renderMiniBars(host, c.tag);
        else if (c.type === 'donut') renderDonut(host, c.pct!, c.legend!, c.tag);
        else if (c.type === 'latency') renderLatency(host, c.rps!, c.p50!, c.tag);
        else if (c.type === 'halfgauge') renderHalfGauge(host, c.val!, c.k!, c.s!, c.tag);
        else if (c.type === 'dist') renderDist(host, c.tag);
      };

      // ---- Detail modal ---------------------------------------------------
      let overlay: HTMLElement | null = null;
      let current: string | undefined;

      const closeModal = () => {
        if (!overlay) return;
        overlay.classList.remove('open');
        document.body.style.overflow = '';
      };

      const drawMetricChart = (host: HTMLElement, kind: string) => {
        const W = 240,
          H = 80;
        const { line, fill, last } = areaPaths(seriesValues(kind, 30), W, H);
        host.innerHTML =
          `<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" style="height:84px;width:100%">` +
          `<path class="spark-fill" d="${fill}"/>` +
          `<path class="spark-line" vector-effect="non-scaling-stroke" d="${line}"/>` +
          `<circle class="spark-dot" cx="${last[0]}" cy="${last[1]}" r="3"/></svg>` +
          '<span class="chart-tag"></span>';
      };

      const selectMetric = (m: string, i: number) => {
        const data = MODULES[m].metrics[i];
        (overlay!.querySelector('.metric-big') as HTMLElement).textContent = data.value;
        (overlay!.querySelector('.metric-cap') as HTMLElement).textContent = data.cap;
        drawMetricChart(overlay!.querySelector('.metric-chart') as HTMLElement, data.series);
        (overlay!.querySelector('.chart-tag') as HTMLElement).textContent = data.tag;
        overlay!.querySelectorAll('.mtab').forEach((t, ti) => t.classList.toggle('active', ti === i));
      };

      const buildModal = () => {
        overlay = document.createElement('div');
        overlay.className = 'modal-overlay';
        overlay.innerHTML =
          '<div class="modal" role="dialog" aria-modal="true">' +
          '<div class="modal-head"><div><div class="modal-mod"></div><h3 class="modal-title"></h3><div class="modal-sub"></div></div>' +
          '<button class="modal-close" aria-label="Close">✕</button></div>' +
          '<div class="modal-section-label">Overview</div><p class="modal-overview"></p>' +
          '<div class="modal-section-label">Live Metrics</div><div class="mtabs"></div><div class="metric-panel">' +
          '<div><div class="metric-big"></div><div class="metric-cap"></div></div>' +
          '<div class="metric-chart"></div></div>' +
          '<div class="modal-section-label">Key Features</div><ul class="feat-list"></ul>' +
          '<div class="modal-section-label">Use Cases</div><div class="usecases"></div>' +
          '</div>';
        document.body.appendChild(overlay);
        on(overlay, 'click', (e: Event) => {
          if (e.target === overlay) closeModal();
        });
        on(overlay.querySelector('.modal-close')!, 'click', closeModal);
        on(document, 'keydown', (e: Event) => {
          if ((e as KeyboardEvent).key === 'Escape') closeModal();
        });
      };

      const openModal = (id: string) => {
        const m = MODULES[id];
        if (!m) return;
        if (!overlay) buildModal();
        current = id;
        (overlay!.querySelector('.modal-mod') as HTMLElement).textContent = m.mod;
        (overlay!.querySelector('.modal-title') as HTMLElement).textContent = m.title;
        (overlay!.querySelector('.modal-sub') as HTMLElement).textContent = m.sub;
        (overlay!.querySelector('.modal-overview') as HTMLElement).textContent = m.overview;
        const tabs = overlay!.querySelector('.mtabs') as HTMLElement;
        tabs.innerHTML = m.metrics.map((mt, i) => `<button class="mtab" data-i="${i}">${mt.tab}</button>`).join('');
        tabs.querySelectorAll('.mtab').forEach((b) =>
          b.addEventListener('click', () => selectMetric(id, +(b as HTMLElement).dataset.i!))
        );
        (overlay!.querySelector('.feat-list') as HTMLElement).innerHTML = m.features
          .map((f) => `<li>${f}</li>`)
          .join('');
        (overlay!.querySelector('.usecases') as HTMLElement).innerHTML = m.useCases
          .map((u) => `<div class="usecase"><h5>${u.h}</h5><p>${u.p}</p></div>`)
          .join('');
        selectMetric(id, 0);
        overlay!.scrollTop = 0;
        requestAnimationFrame(() => overlay!.classList.add('open'));
        document.body.style.overflow = 'hidden';
      };

      // keep a reference so lint does not flag `current` as unused
      void current;

      // ---- Init -----------------------------------------------------------
      ensureGradient();
      document.querySelectorAll<HTMLElement>('.bcard[data-module]').forEach((card) => {
        const id = card.getAttribute('data-module')!;
        renderCardViz(card, id);
        if (!card.querySelector('.bcard-cta')) {
          const cta = document.createElement('div');
          cta.className = 'bcard-cta';
          cta.textContent = 'View Details →';
          card.appendChild(cta);
        }
        card.setAttribute('role', 'button');
        card.setAttribute('tabindex', '0');
        on(card, 'click', () => openModal(id));
        on(card, 'keydown', (e: Event) => {
          const ke = e as KeyboardEvent;
          if (ke.key === 'Enter' || ke.key === ' ') {
            ke.preventDefault();
            openModal(id);
          }
        });
      });

      // expose teardown for the appended <svg id="avi-defs"> and the modal overlay
      removers.push(() => {
        const defs = document.getElementById('avi-defs');
        if (defs && defs.parentNode) defs.parentNode.removeChild(defs);
        if (overlay && overlay.parentNode) overlay.parentNode.removeChild(overlay);
        document.body.style.overflow = '';
      });
    })();

    // ============================================================
    //  Teardown
    // ============================================================
    return () => {
      removers.forEach((r) => r());
      intervals.forEach((id) => clearInterval(id));
      timeouts.forEach((id) => clearTimeout(id));
      observers.forEach((o) => o.disconnect());
    };
  }, [pathname]);

  return null;
}
