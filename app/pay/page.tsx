"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

type SolveMode = "practical" | "ambitious";

type SolveOutput = {
  whatsGoingOn: string;
  quickSolve: string;
  whatBuildFast: string;
  testFirst: string;
  whyFail: string;
};

const SYSTEM_PROMPT =
  "You are a pragmatic AI product builder. You think in fast experiments, not theory. You avoid buzzwords and focus on practical, testable ideas. You challenge assumptions when needed. Keep responses structured, concise, and grounded in reality.";
const VIBE_TRACK_SRC = "/assets/sound/Vanilla Ice - Ice Ice Baby.mp3";

function buildMockSolution(problem: string, mode: SolveMode): SolveOutput {
  const trimmed = problem.trim();
  const shortProblem = trimmed.length > 180 ? `${trimmed.slice(0, 177)}...` : trimmed;

  return {
    whatsGoingOn:
      `You likely have a fuzzy process with hidden bottlenecks, not just a tooling gap. The real issue is inconsistent decisions around: "${shortProblem}".`,
    quickSolve:
      mode === "practical"
        ? "Start with one repetitive decision point and add an AI assistant that drafts a recommendation from your existing data. Keep a human approval step for week one."
        : "Map the full workflow, then use AI to triage, prioritize, and draft next actions across the whole chain. Keep checkpoints where people can overrule the model.",
    whatBuildFast:
      mode === "practical"
        ? "A lightweight web form that captures the problem context, runs an LLM prompt template, and returns a suggested action plus confidence note. Tech: Next.js page + OpenAI API + simple prompt versioning in code."
        : "A mini command center: intake panel, AI diagnosis panel, and action queue. Tech: Next.js single page + OpenAI API + structured JSON output with a tiny rules layer.",
    testFirst:
      "Run 10-15 real cases side-by-side: current process vs AI-assisted draft. Measure decision time, correction rate, and whether output quality is acceptable to the person owning the result.",
    whyFail:
      "Failure risk is usually bad inputs, unclear ownership, or trying to automate too much too early. If no one owns correction feedback, the system plateaus fast."
  };
}

function normalizeOutput(candidate: Partial<SolveOutput>): SolveOutput | null {
  const values = {
    whatsGoingOn: candidate.whatsGoingOn?.trim(),
    quickSolve: candidate.quickSolve?.trim(),
    whatBuildFast: candidate.whatBuildFast?.trim(),
    testFirst: candidate.testFirst?.trim(),
    whyFail: candidate.whyFail?.trim()
  };

  if (!values.whatsGoingOn || !values.quickSolve || !values.whatBuildFast || !values.testFirst || !values.whyFail) {
    return null;
  }

  return values as SolveOutput;
}

function parseModelJSON(raw: string): SolveOutput | null {
  const withoutFence = raw.replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/```\s*$/i, "").trim();
  const firstBrace = withoutFence.indexOf("{");
  const lastBrace = withoutFence.lastIndexOf("}");

  if (firstBrace === -1 || lastBrace === -1 || lastBrace <= firstBrace) {
    return null;
  }

  const jsonSlice = withoutFence.slice(firstBrace, lastBrace + 1);

  try {
    const parsed = JSON.parse(jsonSlice) as Partial<SolveOutput>;
    return normalizeOutput(parsed);
  } catch {
    return null;
  }
}

async function generateSolution(problem: string, mode: SolveMode): Promise<{ output: SolveOutput; mocked: boolean }> {
  const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

  if (!apiKey) {
    return { output: buildMockSolution(problem, mode), mocked: true };
  }

  const model = process.env.NEXT_PUBLIC_OPENAI_MODEL || "gpt-4o-mini";

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model,
      temperature: mode === "practical" ? 0.45 : 0.75,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT
        },
        {
          role: "user",
          content:
            `Mode: ${mode}\n` +
            `Business/work problem: ${problem}\n\n` +
            "Return valid JSON only, with exactly these keys:\n" +
            "- whatsGoingOn\n" +
            "- quickSolve\n" +
            "- whatBuildFast\n" +
            "- testFirst\n" +
            "- whyFail\n\n" +
            "Constraints:\n" +
            "- No corporate jargon\n" +
            "- Grounded and testable\n" +
            "- Keep each section concise (2-4 sentences)"
        }
      ]
    })
  });

  if (!response.ok) {
    throw new Error(`OpenAI request failed (${response.status})`);
  }

  const data = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };

  const raw = data.choices?.[0]?.message?.content?.trim();
  if (!raw) {
    throw new Error("OpenAI returned an empty response.");
  }

  const parsed = parseModelJSON(raw);
  if (!parsed) {
    throw new Error("Could not parse model JSON response.");
  }

  return { output: parsed, mocked: false };
}

export default function PayPage() {
  const [problem, setProblem] = useState("");
  const [mode, setMode] = useState<SolveMode>("practical");
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState<SolveOutput | null>(null);
  const [notice, setNotice] = useState<string>("");
  const [vibeOn, setVibeOn] = useState(false);
  const [vibeNotice, setVibeNotice] = useState("");
  const [waveformReady, setWaveformReady] = useState(false);
  const [showVanillaIce, setShowVanillaIce] = useState(false);
  const [vanillaRunId, setVanillaRunId] = useState(0);
  const vibeAudioRef = useRef<HTMLAudioElement | null>(null);
  const waveContainerRef = useRef<HTMLDivElement | null>(null);
  const waveSurferRef = useRef<any>(null);
  const vanillaTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let mounted = true;

    async function initWaveform() {
      if (!waveContainerRef.current) {
        return;
      }

      try {
        const { default: WaveSurfer } = await import("wavesurfer.js");
        if (!mounted || !waveContainerRef.current) {
          return;
        }

        const wave = WaveSurfer.create({
          container: waveContainerRef.current,
          url: VIBE_TRACK_SRC,
          height: 58,
          waveColor: "#52f5d9",
          progressColor: "#f53bff",
          cursorColor: "#fdf26a",
          barWidth: 2,
          barGap: 1.8,
          barRadius: 2
        });

        wave.on("ready", () => {
          if (!mounted) {
            return;
          }
          setWaveformReady(true);
          setVibeNotice("");
        });
        wave.on("play", () => setVibeOn(true));
        wave.on("pause", () => setVibeOn(false));
        wave.on("finish", () => {
          wave.play();
        });

        waveSurferRef.current = wave;
      } catch {
        if (!mounted) {
          return;
        }
        setVibeNotice("Waveform failed to load. You can still use the play button.");
      }
    }

    initWaveform();

    return () => {
      mounted = false;
      if (vibeAudioRef.current) {
        vibeAudioRef.current.pause();
        vibeAudioRef.current = null;
      }
      if (waveSurferRef.current) {
        waveSurferRef.current.destroy();
        waveSurferRef.current = null;
      }
      if (vanillaTimerRef.current) {
        clearTimeout(vanillaTimerRef.current);
      }
    };
  }, []);

  async function onToggleVibe() {
    if (waveSurferRef.current) {
      if (waveSurferRef.current.isPlaying()) {
        waveSurferRef.current.pause();
      } else {
        await waveSurferRef.current.play();
      }
      return;
    }

    if (!vibeAudioRef.current) {
      vibeAudioRef.current = new Audio(VIBE_TRACK_SRC);
      vibeAudioRef.current.loop = true;
      vibeAudioRef.current.volume = 0.7;
    }

    const audio = vibeAudioRef.current;

    if (vibeOn) {
      audio.pause();
      setVibeOn(false);
      return;
    }

    try {
      await audio.play();
      setVibeOn(true);
      setVibeNotice("");
    } catch {
      setVibeOn(false);
      setVibeNotice("Could not play this audio file in your browser.");
    }
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!problem.trim() || loading) {
      return;
    }

    setVanillaRunId((current) => current + 1);
    setShowVanillaIce(true);
    if (vanillaTimerRef.current) {
      clearTimeout(vanillaTimerRef.current);
    }
    vanillaTimerRef.current = setTimeout(() => setShowVanillaIce(false), 2500);

    setLoading(true);
    setNotice("");

    try {
      const result = await generateSolution(problem, mode);
      setOutput(result.output);
      if (result.mocked) {
        setNotice("Mock mode: add NEXT_PUBLIC_OPENAI_API_KEY to enable live OpenAI output.");
      }
    } catch {
      setOutput(buildMockSolution(problem, mode));
      setNotice("Live call failed, so this response is generated in local mock mode.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className={`pay-page ${vibeOn ? "vibe-on" : ""}`}>
      <div className="backdrop-grid" aria-hidden="true" />

      <section className="container">
        <header className="header card">
          <p className="kicker">Hidden Folio Experiment</p>
          <h1>AIce AIce Baby</h1>
          <p className="tagline">If there&apos;s a problem... yo, I&apos;ll solve it.</p>
          <p className="subline">
            A quick experiment in turning messy problems into practical AI-driven solutions.
          </p>

          <button
            type="button"
            className="vibe-btn"
            onClick={onToggleVibe}
            aria-label={vibeOn ? "Pause vibe" : "Play vibe"}
            title={vibeOn ? "Pause vibe" : "Play vibe"}
          >
            ▶
          </button>
          <div className="wave-wrap">
            <div ref={waveContainerRef} className="waveform" aria-label="Song waveform scrubber" />
            <p className="wave-help">{waveformReady ? "Click waveform to jump in the track." : "Loading waveform..."}</p>
          </div>
          {vibeNotice ? <p className="vibe-notice">{vibeNotice}</p> : null}
        </header>

        <form onSubmit={onSubmit} className="card form-card">
          <label htmlFor="problem-input">Describe the problem</label>
          <textarea
            id="problem-input"
            value={problem}
            onChange={(event) => setProblem(event.target.value)}
            placeholder="Describe a problem in your business or workflow..."
            rows={7}
          />

          <div className="controls">
            <div className="toggle-wrap" role="group" aria-label="Mode">
              <button
                type="button"
                onClick={() => setMode("practical")}
                className={mode === "practical" ? "active" : ""}
              >
                Practical
              </button>
              <button
                type="button"
                onClick={() => setMode("ambitious")}
                className={mode === "ambitious" ? "active" : ""}
              >
                Ambitious
              </button>
            </div>

            <button className="solve-btn" type="submit" disabled={loading || !problem.trim()}>
              {loading ? "Solving..." : "Solve it"}
            </button>
          </div>

          {notice ? <p className="notice">{notice}</p> : null}
        </form>

        {output ? (
          <section className="output card" aria-live="polite">
            <h2>Solution Breakdown</h2>

            <article>
              <h3>1. What&apos;s actually going on</h3>
              <p>{output.whatsGoingOn}</p>
            </article>

            <article>
              <h3>2. Quick solve</h3>
              <p>{output.quickSolve}</p>
            </article>

            <article>
              <h3>3. What I&apos;d build (fast)</h3>
              <p>{output.whatBuildFast}</p>
            </article>

            <article>
              <h3>4. What I&apos;d test first</h3>
              <p>{output.testFirst}</p>
            </article>

            <article>
              <h3>5. Why this might fail</h3>
              <p>{output.whyFail}</p>
            </article>

            <p className="hook">Alright... that&apos;s the hook.</p>
          </section>
        ) : null}
      </section>

      {showVanillaIce ? (
        <img
          key={vanillaRunId}
          src="/assets/img/vanila-ice.png"
          alt=""
          aria-hidden="true"
          className="vanilla-pop"
        />
      ) : null}

      <style jsx>{`
        .pay-page {
          min-height: 100vh;
          background:
            radial-gradient(circle at 10% 10%, rgba(43, 255, 220, 0.18), transparent 45%),
            radial-gradient(circle at 90% 15%, rgba(182, 35, 255, 0.24), transparent 42%),
            linear-gradient(165deg, #120022 0%, #1d0450 45%, #060218 100%);
          color: #fbfaff;
          padding: 2.25rem 1rem 4rem;
          position: relative;
          overflow-x: hidden;
        }

        .backdrop-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(109, 255, 229, 0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(109, 255, 229, 0.07) 1px, transparent 1px);
          background-size: 28px 28px;
          pointer-events: none;
          mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.85), transparent);
        }

        .container {
          max-width: 860px;
          margin: 0 auto;
          display: grid;
          gap: 1rem;
          position: relative;
          z-index: 1;
        }

        .card {
          border: 2px solid #39f7d6;
          background: linear-gradient(180deg, rgba(19, 4, 41, 0.9), rgba(11, 2, 24, 0.93));
          border-radius: 6px;
          box-shadow: 0 0 0 1px rgba(147, 83, 255, 0.45), 0 12px 32px rgba(0, 0, 0, 0.35);
          padding: 1rem;
        }

        .header h1 {
          font-family: "Russo One", "Impact", sans-serif;
          font-size: clamp(2rem, 4.8vw, 3.4rem);
          margin: 0;
          color: #66ffe2;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          text-shadow: 0 0 12px rgba(102, 255, 226, 0.35);
        }

        .kicker {
          margin: 0 0 0.45rem;
          font-weight: 700;
          color: #fdf26a;
          font-size: 0.76rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .tagline {
          margin: 0.4rem 0;
          color: #ffe9ff;
          font-size: 1.05rem;
          font-weight: 600;
        }

        .subline {
          margin: 0.25rem 0 1rem;
          color: #cfdbff;
          max-width: 70ch;
        }

        .vibe-btn {
          border: 2px solid #f53bff;
          background: linear-gradient(180deg, #4f1f73, #32104a);
          color: #ffe2ff;
          padding: 0.5rem 0.8rem;
          font: inherit;
          font-weight: 600;
          cursor: pointer;
        }

        .vibe-notice {
          margin: 0.65rem 0 0;
          color: #fdf26a;
          font-size: 0.88rem;
        }

        .wave-wrap {
          margin-top: 0.7rem;
          border: 2px solid #39f7d6;
          border-radius: 4px;
          background: rgba(8, 2, 28, 0.8);
          padding: 0.45rem 0.45rem 0.35rem;
          max-width: min(560px, 100%);
        }

        .waveform {
          width: 100%;
        }

        .wave-help {
          margin: 0.3rem 0 0;
          font-size: 0.78rem;
          color: #cfdbff;
        }

        .vanilla-pop {
          position: fixed;
          right: 0.9rem;
          bottom: 0.85rem;
          width: auto;
          height: auto;
          max-height: calc(100vh - 1.25rem);
          max-width: none;
          z-index: 30;
          pointer-events: none;
          transform-origin: bottom center;
          filter: drop-shadow(0 12px 20px rgba(0, 0, 0, 0.45));
          animation: vanillaSlideNod 2.4s cubic-bezier(0.22, 0.82, 0.2, 1);
        }

        .form-card label {
          display: block;
          margin-bottom: 0.45rem;
          font-weight: 600;
        }

        textarea {
          width: 100%;
          border: 2px solid #39f7d6;
          border-radius: 4px;
          padding: 0.8rem;
          background: rgba(5, 2, 20, 0.88);
          color: #f6fbff;
          resize: vertical;
          min-height: 130px;
          font: inherit;
          line-height: 1.5;
        }

        textarea:focus {
          outline: none;
          box-shadow: 0 0 0 2px rgba(245, 59, 255, 0.45);
        }

        .controls {
          margin-top: 0.85rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 0.8rem;
          flex-wrap: wrap;
        }

        .toggle-wrap {
          display: inline-flex;
          border: 2px solid #39f7d6;
          border-radius: 4px;
          overflow: hidden;
        }

        .toggle-wrap button {
          border: 0;
          background: rgba(5, 2, 20, 0.9);
          color: #d8e1ff;
          padding: 0.45rem 0.8rem;
          font: inherit;
          cursor: pointer;
        }

        .toggle-wrap button.active {
          background: linear-gradient(180deg, #2eedd0, #10a7bf);
          color: #07111b;
          font-weight: 700;
        }

        .solve-btn {
          border: 2px solid #fdf26a;
          background: linear-gradient(180deg, #fdf26a, #f1bc38);
          color: #28114d;
          padding: 0.6rem 1.05rem;
          font: inherit;
          font-weight: 700;
          cursor: pointer;
        }

        .solve-btn[disabled] {
          opacity: 0.55;
          cursor: not-allowed;
        }

        .notice {
          margin: 0.8rem 0 0;
          color: #fdf26a;
          font-size: 0.92rem;
        }

        .output h2 {
          margin: 0 0 1rem;
          font-size: 1.32rem;
          color: #f2ecff;
        }

        .output article {
          border: 1px solid rgba(112, 253, 221, 0.45);
          background: rgba(7, 9, 27, 0.65);
          padding: 0.8rem;
          margin-bottom: 0.75rem;
        }

        .output h3 {
          margin: 0 0 0.45rem;
          font-size: 1.02rem;
          color: #66ffe2;
        }

        .output p {
          margin: 0;
          line-height: 1.56;
          color: #eff4ff;
        }

        .hook {
          margin-top: 0.35rem;
          color: #f4d7ff;
          font-style: italic;
        }

        .vibe-on {
          animation: vibePulse 3.4s ease-in-out infinite;
        }

        @keyframes vibePulse {
          0%,
          100% {
            filter: saturate(1);
          }
          45% {
            filter: saturate(1.16);
          }
        }

        @keyframes vanillaSlideNod {
          0% {
            transform: translate(125%, 125%) rotate(0deg);
            opacity: 0;
          }
          20% {
            transform: translate(0%, 0%) rotate(0deg);
            opacity: 1;
          }
          36% {
            transform: translate(0%, 0%) rotate(7deg);
            opacity: 1;
          }
          46% {
            transform: translate(0%, 0%) rotate(-8deg);
            opacity: 1;
          }
          56% {
            transform: translate(0%, 0%) rotate(6deg);
            opacity: 1;
          }
          66% {
            transform: translate(0%, 0%) rotate(-6deg);
            opacity: 1;
          }
          76% {
            transform: translate(0%, 0%) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translate(125%, 125%) rotate(0deg);
            opacity: 0;
          }
        }

        @media (max-width: 640px) {
          .pay-page {
            padding-top: 1rem;
          }

          .card {
            padding: 0.85rem;
          }

          .header h1 {
            letter-spacing: 0.02em;
          }

          .vanilla-pop {
            right: 0.45rem;
            bottom: 0.5rem;
          }
        }
      `}</style>
    </main>
  );
}
