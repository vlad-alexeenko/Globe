**Zero-Trust Firewall & Governance Layer for Autonomous Web3 AI Agents**

[Live Demo](https://gate-app-brown.vercel.app)

---

Autonomous on-chain AI agents can execute complex cross-chain transactions across EVM, Solana, and TON. That power is also the attack surface. When a machine-to-machine agent hallucinates or gets hit with a prompt-injection attack, there's nothing to stop it from draining a wallet or approving unlimited token transfers to an unknown address.

This is a B2B SaaS security layer built to sit between an AI agent and the blockchain RPC nodes it talks to. Every outbound transaction payload is intercepted before it hits the network, detonated in a heuristic sandbox, and either cleared or blocked.

**Core capabilities:**
- Real-time traffic interception across Base, Ethereum, Solana, and TON
- Heuristic sandbox that clears routine gasless swaps and terminates high-risk actions (e.g. unlimited ERC20 approvals to unverified addresses)
- Isolated anomaly registry — rogue transactions are trapped and held without executing on-chain
- Human-in-the-Loop governance panel for administrators to review, cryptographically sign-and-override, or permanently destroy quarantined transactions
- Downloadable forensic JSON reports per incident

---

**Demo**

<!-- To embed a demo video: open this file in the GitHub editor, drag and drop your video file directly into the text area below this comment, and GitHub will upload and embed it automatically. -->

---

**Dev Log**

- Initial prototype was Python/FastAPI. Scrapped after a feasibility audit — local scripts don't demo well, and serverless deployment was a hard requirement.
- Migrated all proxy logic into a Next.js serverless API route for instant cloud deployment.
- Rewrote the traffic simulator to emit realistic cross-chain payloads: EVM gasless swaps, malicious max-approval transfers, cross-chain bridge calls.
- Built the quarantine vault with an in-memory client-side forensic JSON exporter to work around read-only filesystem constraints.

---

**Stack**
- Framework: Next.js (App Router)
- Language: TypeScript
- Styling: Tailwind CSS
- UI Components: Lucide React
- Deployment: Serverless Functions

---

**Local Setup**

```bash
git clone <repo-url>
cd <repo-directory>

npm install

npm run dev
```

Open `http://localhost:3000` in your browser and click the stream button to begin the simulation.
