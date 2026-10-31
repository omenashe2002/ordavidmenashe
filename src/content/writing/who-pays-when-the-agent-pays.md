---
title: "Who Pays When the Agent Pays?"
date: 2026-10-31
description: "The Agentic Liability Channeling Framework (ALCF) for hijacked AI agents: who bears the loss when an AI agent is tricked into paying the wrong party, and how a bond, an attestation and an insurance pool fix it."
tags: [Law, Crypto, AI]
kicker: "Paul Hastings Fintech Crypto Legal Hackathon · Team Agent of Register · November 2026"
citation: "Or David Menashe, Zach Zager & Jake Weintraub, *Who Pays When the Agent Pays? The Agentic Liability Channeling Framework for Hijacked AI Agents* (Nov. 2026) (unpublished manuscript), https://ordavidmenashe.com/papers/who-pays-when-the-agent-pays/."
---

*The Agentic Liability Channeling Framework for Hijacked AI Agents*

Written by Or David Menashe ([Fordham Law](https://www.fordham.edu/school-of-law/)), Zach Zager ([Brooklyn Law](https://www.brooklaw.edu/)), and Jake Weintraub ([Brooklyn Law](https://www.brooklaw.edu/)).

**[Read the full paper, with its figures and an interactive simulator →](/papers/who-pays-when-the-agent-pays/)**

## Executive Summary

Commercial law assumes a human at the end of the liability chain. Payments law presumes a human behind every transfer and sorts each transaction as either authorized or unauthorized. In 2026, that assumption is degrading. In our hypothetical example below, Meridian Capital’s AI agent was told to pay $5 million on a confirmed trade. It read a forged confirmation and sent $40 million to an attacker. The transfer was authorized in form but unauthorized in substance, and no existing regime, whether Regulation E, UCC Article 4A, agency law, Uniform Electronic Transactions Act (UETA), or the GENIUS Act, addresses who bears that loss.

This paper proposes the Agentic Liability Channeling Framework (“ALCF”). Under the ALCF, liability begins with the product developer and flows to the User, and each can shield itself through reasonable ex ante conduct: clear disclosure and real controls for developers, and transaction limits and human verification for Users. Before an agent can transact, its User posts a bond with an Agentic Collateral Trustee sized to what the agent can reach, and the Trustee issues a Bond Attestation that the agent carries into every transaction, which is the ALCF’s answer to “know your agent.” Separately, the Trustee places the posted collateral in a vault or other investment vehicle tied to low- or no-risk, yield-paying instruments, with a portion of yield being used to fund the insurance pool. The Trustee screens the User, and the intermediary screens the payee. Intermediaries and counterparties are only liable where they fail to take reasonable action, knew or should have known they were dealing with a rogue agent, ignored the attestation, or took part in wrongdoing. Harmed parties are always paid. They collect first from the User’s bond, then from any party that failed a shield, jointly and severally. Where every party acted reasonably, a market-wide insurance pool pays the loss and restores the User’s bond. We propose that the Department of the Treasury administer the regime under an amendment to the GENIUS Act.

In the absence of regulation, we recommend the following.

<ol class="lettered">
<li>Developers should prioritize transparency: disclose risks of AI and bad actors, treat external data as untrusted by design, give Users a kill switch, and keep decision logs.</li>
<li>Users, particularly large financial institutions, should never give an agent authority beyond what the transaction requires, and always build in human verification layers. Users should fund agent wallets per transaction, allowlist counterparties, and require human approval above a set amount.</li>
<li>Intermediaries should offer the guardrail tools the ALCF requires now: allowlists, per-transaction limits, verification thresholds, and immediate halts.</li>
<li>Wallet providers should also define by contract what happens when an agent is compromised, rather than relying on a transfer being authorized in form.</li>
<li>Counterparties should ask for evidence that an agent is backed by posted collateral before transacting at size and, where possible, settle delivery versus payment.</li>
<li>Issuers should treat the GENIUS Act freeze capability as an operational process that responds within minutes, not as a compliance checkbox.</li>
<li>Treasury should solicit comment on agent attestation standards now, on its own authority, and Congress should amend the GENIUS Act to give Treasury the authority to designate Agentic Collateral Trustees, set bond standards, and administer the insurance pool, its assessments and premiums, and its backstop, and to require issuers to act on certified freeze requests and protect those that freeze in good faith.</li>
</ol>

This page is the summary. The full paper continues with the introduction, the existing law and the proposed framework, a scenario under the framework, and the conclusion, and it includes the figures, an interactive simulator of the order of payment, and the notes: [read the full paper →](/papers/who-pays-when-the-agent-pays/).
