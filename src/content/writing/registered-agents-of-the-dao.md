---
title: "Registered Agents of the DAO: A Proposal for Federal Accountability in Decentralized Governance"
date: 2026-10-12
description: "A proposal for federal accountability in decentralized governance: DAOs with a U.S. nexus would designate a registered agent and maintain a liquid reserve fund, and exchanges that list noncompliant governance tokens would face independent liability."
tags: [Law, Crypto]
---

*This is an early draft, dated March 1, 2026. A version of this note is forthcoming in the Fordham Journal of Corporate and Financial Law in 2027 and may differ.*

## Abstract

Federal courts have held that DAOs are general partnerships and token holders are partners, jointly and severally liable for everything the DAO does. The logic is clean. The problem is enforcement. Partnership liability works only if you can find the partners. In *Sarcuni* and *Samuels*, the courts found defendants because those defendants had made themselves visible through press releases, portfolio announcements, and governance forum posts. DAO governance is moving in the opposite direction, with pseudonymous wallets, privacy-preserving voting, and offshore infrastructure designed to sever the link between on-chain activity and real-world identity. When participants stop raising their hands, the framework has no one to reach. The gap runs deeper than partnership doctrine. Securities registration, beneficial ownership disclosure, commodities regulation, anti-money-laundering compliance, insider trading enforcement, and federal tax reporting all share the same assumption: someone identifiable is responsible. In a pseudonymous governance environment, that assumption fails across every framework simultaneously. State DAO statutes and private legal wrappers help only protocols that voluntarily adopt identifiable structures. They have nothing to say about those who do not. This Note proposes a federal compliance regime: a mandatory requirement to use a registered agent for any DAO with a U.S. nexus, a proportional on-chain liability reserve fund, and exchange delisting obligations for tokens issued by noncompliant DAOs. Compliant DAOs receive a federal liability shield, displacing state partnership default for passive holders. Noncompliant DAOs lose U.S. market access. The proposal does not change the substantive law. It rebuilds the enforcement infrastructure that the substantive law has always assumed.

## I. Introduction

One of the central focuses of civil procedure is the ability to find, serve, and bring defendants into court.[^1] This applies regardless of where the defendants are located, who they are, or the type of suit.[^2]

In November 2024, the Northern District of California confronted a claim by Samuels, an investor in Lido DAO, that Lido DAO had failed to register its tokens with the SEC as required by Section 5 of the Securities Act of 1933 and was therefore in violation of Section 12(a)(1) of the Act.[^3] A DAO (decentralized autonomous organization) is a firm that operates on the blockchain and executes transactions via a smart contract, following the votes of its anonymous token holders.[^4] A core principle of such a firm is that governance is dispersed among all token holders, and voting power is proportional to the tokens held; the court found that this structure was most akin to a general partnership, which, under RUPA, allows all partners to be liable.[^5]

Seems simple enough – a 12(a)(1) violation is strict liability; if the tokens were securities under *Howey*, Lido would be in violation.[^6] The court, relying on precedent set in *Sarcuni v. bZx DAO*, held that investors in a DAO could be considered general partners and held personally liable for the DAO’s activities.[^7] There we have it. DAOs are partnerships, token holders are partners, and partners are liable for violations of the DAOs.

So, the court found some partners (investors), brought them into court, and charged them with violating Section 5 of the ‘33 Act.[^8] These “partners” Paradigm Operations, Andreessen Horowitz, Dragonfly Digital Management, and Robot Ventures, just happen to be some of the largest VCs globally.[^9] But what of Lido’s founders? Its designers? Its coders? Or just about any other partner also liable? The court notes that Lido “was founded by three investors whose whereabouts are either remote or unknown, and who apparently cannot be hauled into court in the United States.”[^10]

While *Samuels* masquerades as doctrine, it isn’t. Samuels worked because the “partners” were visible enough to be caught by the court. They made their investment known, and the court made them pay. And the only VC that did not actively promote its involvement was dismissed.

Start with what the court relied on. Paradigm Operations had not merely invested in Lido; it had publicly announced its role in influencing and guiding Lido’s development, and Lido’s own website touted Paradigm’s unique position to contribute to Lido DAO governance.[^11] At the time of investment, Andreessen Horowitz announced that it would actively contribute to the network as both a staker and a governance participant, and subsequently weighed in on Lido’s strategic direction.[^12] Dragonfly Digital Management used its LDO tokens to vote on a governance proposal that sold additional tokens to itself, while publicly signaling its intention to deepen its governance involvement and its unique capacity to contribute expertise to Lido DAO.[^13] The court did not examine the blockchain to determine the responsible parties.[^14] It took portfolio announcements, press releases, and governance forum posts from registered legal entities with California addresses and discoverable counsel, and brought in every party it could find.[^15]

Now look at Robot Ventures. Lido publicly identified it as a strategic partner.[^16] One of Robot’s founders praised Lido’s approach to pre-launch token issuance.[^17] Robot participated in a sale of 30 million LDO alongside other entities.[^18] That was it. No public statements about governance participation.[^19] No announced intention to contribute expertise.[^20] No forum posts, no blog entries, no governance votes on record.[^21] The court dismissed Robot entirely.[^22]

Read those two outcomes side by side, and the thesis becomes unavoidable. The line between liability and dismissal was not drawn by the doctrine. California Corporations Code Section 16202(a) does not ask whether a partner issued a press release.[^23] The “meaningful participation” standard does not turn on whether a defendant maintained an active Twitter account.[^24] What separated Paradigm from Robot was not the legal test; it was that Paradigm gave plaintiffs something to plead. The court found partners where plaintiffs could point to public evidence of partnership.[^25] Where that evidence was absent, the claim failed. The doctrine tracked the visibility, not the other way around.

This is hidden dependency. American civil procedure is adversarial, not inquisitorial: courts adjudicate disputes between parties, plaintiffs have identified and served, but they have no independent mechanism to locate defendants whom the plaintiff cannot find.[^26] Doctrine can expand the universe of potential defendants – which is precisely what both *Sarcuni* and *Samuels* did, but it cannot supply the identification that expansion presupposes.[^27] In *Samuels*, those means were public investment announcements and governance participation statements made in the ordinary course of running a venture capital firm.[^28] In *Sarcuni v. bZx DAO*, the identifiable defendants were co-founders Tom Bean and Kyle Kistner, who had publicly transferred control of the bZeroX LLC to the bZx DAO and made documented statements about using the DAO structure to reduce regulatory exposure.[^29] The framework worked in both cases because someone had, in effect, already done the identification work. The legal theory was applied to people who had raised their hands.

Now consider what happens when no one raises their hand. The founders of Lido, the people who designed the protocol, wrote the governance structure, and issued the tokens at the center of the litigation, were unreachable.[^30] The court noted this plainly and moved on, turning instead to the institutional investors who had made themselves visible.[^31] But that pivot was not a solution to the enforcement problem. It was a workaround made possible by a specific historical condition: the VC-backed phase of DAO governance, in which institutional investors publicly claimed governance roles for marketing purposes while pseudonymous founders retreated into anonymity. That condition will not persist. The next generation of DAOs need not repeat Paradigm’s press releases. They need only observe that Robot Ventures’ silence was a complete defense.[^32]

And they are already drawing that lesson. DAOs are deploying privacy-preserving voting mechanisms, pseudonymous delegates, and zero-knowledge proof systems specifically designed to sever the link between on-chain governance activity and real-world identity.[^33] The identifiable defendant is becoming the exception. When that defendant disappears, the partnership liability framework has nowhere to go. You cannot serve process on a wallet address.[^34] You cannot establish personal jurisdiction over an unknown person in an unknown jurisdiction.[^35] You cannot collect a judgment from a smart contract.[^36]

The enforcement gap does not stop at tort. The same hidden dependency (law’s assumption that it can identify the humans behind the positions) runs through virtually every enforcement regime that touches decentralized governance. Beneficial ownership disclosure breaks when coordinated pseudonymous wallets accumulate equity positions below reporting thresholds. Insider trading doctrine breaks when the person front-running a governance proposal cannot be named. Market manipulation enforcement breaks when the actors coordinating a price-moving vote are addresses, not people.[^37] This Note does not purport to solve all of them. It proposes a structural fix to the foundational problem, from which solutions to the downstream failures can follow.[^38]

State legislative solutions and voluntary industry restructuring do not close it. Wyoming’s Decentralized Unincorporated Nonprofit Association Act provides limited liability for DAOs that affirmatively elect the framework, but adoption is voluntary, the nonprofit limitation excludes the most economically significant protocols, and nothing in the existing state frameworks requires a registered agent capable of accepting service of process.[^39] The Cayman Foundation model and the Uniswap and MakerDAO restructurings solve the problem for well-resourced protocols with sophisticated counsel.[^40] They do nothing for the pseudonymous protocol that simply opts out of visibility entirely.

This Note proposes a federal unified compliance framework: any DAO with a U.S. nexus must designate a registered agent and maintain a liquid reserve fund accessible to judgment creditors, and any centralized exchange that lists a DAO’s governance token without verifying compliance is independently liable for resulting registration and disclosure violations.[^41]

Part II sets out the California partnership liability framework — the statutory test, *Sarcuni*, *Samuels*, and the doctrinal tension between them. Part III develops this Note’s central argument: that the framework has a hidden dependence on publicly identifiable defendants; that the VC-backed governance phase satisfied that dependence by historical accident; and that a pseudonymous future will expose the underlying enforcement collapse. Part IV surveys the cascade, showing how the same identifiability failure that defeats partnership liability enforcement simultaneously threatens beneficial ownership disclosure, insider trading doctrine, and market manipulation enforcement. Part V examines why existing state and voluntary solutions leave the structural problem intact. Part VI presents the unified federal compliance framework proposal, shows how it closes the specific gaps identified in Parts III and IV, and addresses the principal objections.

## II. The California Partnership “Experiment”

California did not set out to regulate DAOs. No legislature convened to consider how blockchain governance should interface with partnership law. No regulatory body issued guidance. What happened was messier and more consequential: plaintiffs’ counsel, confronting novel entities with no established legal status, reached for the closest doctrine they could find. California’s Uniform Partnership Act, enacted in 1994 to codify centuries of partnership doctrine, written for small businesses where partners know each other by name, became the primary liability framework for organizations where they never will. That misfit is not incidental to this Note’s argument. It is the argument. Two California federal courts applied a doctrine designed for identifiable co-owners to pseudonymous global networks, and the results expose everything the doctrine cannot do.[^42]

### A. The Statutory Framework

Under California Corporations Code § 16202(a), the association of two or more persons to carry on as co-owners a business for profit forms a partnership, whether the persons intend to form a partnership.[^43] Partnership status arises from conduct, not contract. Parties need only possess the general intent to engage in acts constituting a partnership, not the specific intent to label their relationship as such.[^44] Consequently, unless persons associated to do business together establish a formal entity like a corporation, the association is deemed a partnership regardless of subjective intent.[^45]

The determination of partnership existence is a question of fact that requires courts to examine the totality of the circumstances surrounding the parties’ relationship.[^46] California courts have identified three primary factors evidencing partnership formation: the right of purported partners to participate in management, the sharing of profits and losses, and contributions of money, property, or services to the enterprise.[^47] Of these factors, management participation carries significant weight.[^48]

Critically, profit-sharing operates as evidence rather than a required element of partnership formation. In *Holmes v. Lerner*, the Court of Appeal expressly rejected the argument that an agreement to divide profits is a prerequisite to the existence of a partnership.[^49] The distinguishing feature of a partnership is the association to carry on business together, not the agreement to share profits.[^50] The court traced this principle to California’s adoption of the Uniform Partnership Act, which deliberately omitted profit-sharing from the statutory definition, signaling legislative intent that profit-sharing constitutes evidence of partnership rather than a definitional requirement.[^51] Under § 16202(c)(3), a person receiving a share of business profits is subject to a rebuttable presumption of partnership status, not a conclusive determination.[^52]

The consequences of partnership classification are severe. California Corporations Code § 16306(a) provides that all partners are liable jointly and severally for all partnership obligations unless otherwise agreed by the claimant or provided by law.[^53] Any single partner may therefore be held personally responsible for the entire partnership’s debts, judgments, or obligations, regardless of that partner’s individual culpability or level of participation.[^54] Joint and several liability permits plaintiffs to pursue full recovery against any partner, leaving contribution disputes to be resolved among partners themselves.[^55]

A token holder who purchased governance tokens on a secondary exchange, potentially without knowledge of the DAO’s operations or any intention to participate in governance, may face unlimited personal liability for the organization’s entire obligations.[^56] The *Samuels* court acknowledged this prospect, noting that Lido DAO’s general partnership could prove narrower, encompassing only founders, or broader, encompassing everyone who has voted on a governance proposal or holds any LDO tokens.[^57] Yet the court declined to resolve this question at the motion to dismiss stage, leaving the boundaries of partnership membership, and thus the scope of potential liability, undefined.[^58]

This doctrinal framework, developed for small businesses where partners know each other and intentionally combine efforts, maps poorly onto decentralized organizations with thousands of pseudonymous participants spread across the globe. The statutory language eliminating intent as a prerequisite for partnership formation, codified to prevent bad actors from escaping liability through careful drafting, now catches passive token holders who never contemplated becoming partners.[^59] The better standard would require affirmative, knowing participation in governance with actual authority over protocol outcomes. The rationale for partnership liability is that partners bargain for commercial advantages and accept the corresponding exposure, a logic that does not apply to a retail purchaser who had no meaningful influence over DAO decisions and no knowledge of the partnership’s status.[^60] What the statute cannot do, and what neither court paused to examine, is locate those token holders. That omission is the subject of Part III.

### B. *Sarcuni v. bZx DAO*: The Broadest Interpretation

The bZx Protocol offered decentralized margin trading and lending on the Ethereum blockchain.[^61] In August 2021, founders Tom Bean and Kyle Kistner transferred control from bZeroX LLC to bZx DAO, explicitly seeking to insulate the protocol from regulatory enforcement.[^62] In November 2021, hackers carried out a phishing attack that resulted in the theft of approximately \$55 million in cryptocurrency.[^63] The DAO voted to approve a compensation plan structured around protocol fee distributions, which plaintiffs alleged would take an effectively indefinite period to satisfy the judgment.[^64]

Plaintiffs sued the DAO, its founders, and various token holders, alleging negligence and seeking to hold defendants jointly and severally liable as general partners.[^65] The defendants moved to dismiss, arguing that the complaint failed to plausibly allege the existence of a general partnership among the DAO’s token holders.[^66] The court disagreed and held that plaintiffs adequately alleged that bZx DAO was a general partnership, finding that all three evidentiary factors were satisfied: token holders possessed management rights through governance voting, could share in profits through treasury distributions, and contributed assets by providing liquidity.[^67]

Because anyone holding a BZRX token is a partner in the partnership, plaintiffs could establish partnership membership simply by alleging a defendant held tokens.[^68] This formulation suggests that mere ownership, regardless of voting activity or participation in governance, could trigger unlimited personal liability.[^69] Defendants argued this interpretation would fundamentally alter partnership law.[^70] The court was unmoved, citing longstanding California authority holding that courts do not countenance partnerships designed to afford commercial advantages without corresponding liabilities.[^71] The founders’ explicit statements about using a DAO structure to evade regulation only reinforced the court’s conclusion that partnership classification was appropriate.[^72]

What the *Sarcuni* court did not confront is the practical consequence of its own holding. If every BZRX token holder is a general partner, the partnership has thousands of members, the majority of whom are pseudonymous, many of whom are international, and none of whom are served with process. The court identified Bean and Kistner as defendants because they had made themselves visible, through public statements, entity filings, and documented transfers of control.[^73] The remaining universe of token holders, the ones holding theoretically swept in, remained entirely unreachable.[^74] The doctrine expanded on paper. Enforcement did not.

### C. *Samuels v. Lido DAO*: The Meaningful Participation Standard

Lido DAO operates the largest liquid staking protocol on Ethereum, managing over \$30 billion in staked assets and generating approximately \$50 million in annual fees.[^75] Unlike bZx, Lido involves sophisticated institutional investors who publicly committed to governance participation.[^76] Plaintiff Andrew Samuels purchased LDO tokens on a secondary exchange, sold them at a loss, and then sued the DAO and its major investors for securities violations and partnership liability.[^77]

The court rejected arguments that the DAO was merely autonomous software, finding instead that Lido’s operations are those of an entity run by people, approximately seventy employees.[^78] The court held that plaintiffs adequately alleged a general partnership: the founders formed Lido to operate a staking service that retains a percentage of rewards and plans to distribute revenue to token holders, satisfying the statutory test of carrying on a business for profit as co-owners.[^79]

The court’s treatment of institutional investors created the decision’s most significant doctrinal contribution. Paradigm Operations invested \$70 million and publicly announced its role in influencing and guiding Lido’s development.[^80] Andreessen Horowitz, which invested an equivalent amount, publicly announced that it would contribute to governance.[^81] Dragonfly Digital Management initially purchased \$25 million in tokens, then voted to approve selling additional tokens to itself while publicly signaling its intention to deepen its involvement in governance.[^82] The court found these allegations sufficient to establish meaningful participation warranting denial of dismissal.[^83]

Robot Ventures obtained dismissal on precisely the opposite facts. The complaint alleged only that one of its partners praised Lido and that Robot participated in a token sale but contained no allegations of governance participation or statements of intent to govern.[^84] The court granted the motion. That outcome, alongside the denials for Paradigm, Andreessen Horowitz, and Dragonfly, tells you everything about how the meaningful participation standard operates. It is not a test of conduct in governance. It is a test of public visibility. Robot said nothing on the record. Robot walked free. Part III takes that observation seriously.

### D. The Doctrinal Tension

The two decisions create an unresolved spectrum. *Sarcuni* suggests that token ownership alone suffices; *Samuels* emphasizes participation in governance and public commitment.[^85] The gap between them is not merely academic. It is the difference between a doctrine that sweeps in every token holder globally and one that reaches only those who made themselves findable. Neither court drew a stable line, and the questions left open are not minor. Does a single governance vote create partnership status? Does delegating tokens to another voter create liability for the delegator, the delegate, or both? Does voting against a harmful proposal provide protection, or does the act of voting itself, regardless of direction, satisfy the participation threshold?[^86]

The CFTC’s parallel enforcement posture compounds the uncertainty. In *Ooki DAO*, the agency argued that once a token holder votes to affect governance outcomes, personal liability attaches.[^87] Commissioner Summer Mersinger dissented, arguing that this approach arbitrarily picks winners and losers, where token holder A becomes liable to vote on one inconsequential issue while identical token holder B escapes liability entirely.[^88] The dissent identifies something real: a liability standard that turns on whether a particular vote happened to attract a plaintiff’s attention is not a standard at all. It is a lottery.

The deeper problem is that neither the *Sarcuni* standard nor the *Samuels* standard can be administered at scale. *Sarcuni*’s token-holding rule theoretically exposes millions of participants globally but provides no mechanism to identify or serve them. *Samuels*’ meaningful participation standard requires individualized inquiry into each defendant’s governance history, public statements, and forum activity, an inquiry that only works when the defendant has left a discoverable public record. Both standards, applied honestly, collapse into the same question: who can actually be found?

Notably, the SEC reached the opposite conclusion about DAO governance structures nearly a decade earlier. Investigating a \$150 million token sale in 2017, the SEC observed that token holders were dispersed, pseudonymous, and had limited ability to exercise meaningful control, a structure the agency found fundamentally incompatible with general partnership formation.[^89] California federal courts have since found precisely such arrangements to constitute partnerships, directly contradicting the SEC’s 2017 conclusion that the pseudonymity and dispersion of token holders meant DAOs bore little resemblance to genuine general partnerships. [^90] That contradiction has never been resolved by any court, any legislature, or any regulatory body.

It is, however, the fault line on which this Note’s argument rests. The California experiment did not fail because the courts misread the statute. It failed because the statute’s liability framework presupposes what decentralized governance is specifically designed to eliminate: an identifiable human being who can be handed a summons.

## III. The Hidden Dependency

The California experiment produced two holdings and one question that neither court asked. Both courts found partnerships. Both courts found the defendants. Neither court asked why those defendants were findable while thousands of other token holders were not. The answer is not in the doctrine. It is in the timing. *Sarcuni* and *Samuels* were litigated during a specific window in DAO development when the most powerful governance participants were institutional investors who publicized their involvement as a matter of professional strategy.[^91] That window is closing. What replaces it will not accommodate the liability framework in either case.

### A. The Pseudonymous Future

The VC-backed governance phase was never the natural state of DAO development. It was a transitional condition produced by a specific market dynamic: protocols needed institutional capital to establish liquidity and credibility, and institutional investors needed to advertise their involvement to attract co-investors and demonstrate portfolio activity.[^92] Paradigm’s governance forum posts were not civic participation. They were marketing. The same calculus that drove Andreessen Horowitz to announce its staker role drove it to maintain a public governance presence. Visibility was the product, not a side effect.

That calculus has inverted. The *Samuels* decision converted institutional visibility from an asset into a liability. Every portfolio announcement, every governance forum post, every public statement about strategic intent is now evidence of partnership.[^93] The lesson institutional investors drew from the case is already reshaping how they participate in DAO governance. Major venture firms have begun implementing strict governance participation policies in the wake of *Samuels*, shifting toward passive token holding and away from any activity that could be characterized as meaningful participation.[^94] The Paradigm playbook is being retired precisely because the court read it as a partnership admission.

The protocols themselves are accelerating in the same direction. DAOs are actively deploying governance infrastructure designed to sever the link between on-chain activity and real-world identity. Zero-knowledge proof systems allow token holders to cast verifiable governance votes without revealing their wallet address or voting history to outside observers.[^95] Pseudonymous delegate structures, now standard in major protocols, allow large token positions to be exercised through unidentified intermediaries who hold voting authority without holding tokens.[^96] Off-chain voting platforms like Snapshot allow governance signaling entirely outside the blockchain’s public ledger, with no on-chain record linking a wallet to a vote.[^97] Each of these mechanisms was developed for legitimate governance reasons, resistance to coercion, privacy protection, and voter independence. Each of them also eliminates exactly the kind of public record that made *Samuels* possible.[^98]

The Paradigm that files portfolio pages and attends governance calls on the record is becoming the exception. The delegate who casts a decisive vote through an encrypted wallet in an unknown jurisdiction, with no public statement and no presence in the governance forum, is becoming the norm. When that transition completes, the *Samuels* framework has no defendants to reach. Robot Ventures’ silence was a complete defense in 2024.[^99] In 2026, silence is the default governance posture.

### B. The Enforcement Collapse

Assume a fully pseudonymous DAO: governance tokens distributed through airdrops and liquidity mining, no public institutional investors, pseudonymous delegates exercising voting power through zero-knowledge proofs, founders in unknown jurisdictions, no registered legal entity anywhere. A plaintiff who suffers harm wants to bring a *Sarcuni* or *Samuels* claim. Walk through what happens.

The first problem is identification. You need a defendant. The blockchain gives you wallet addresses. Wallet addresses are not people. Chain analysis can sometimes link addresses to real-world identities through KYC data from exchanges, IP address correlations, or on-chain transaction patterns, but this methodology is probabilistic, expensive, contested in court, and increasingly defeated by privacy tools.[^100] A pseudonymous governance delegate who uses a hardware wallet, routes transactions through a privacy protocol, and has never interacted with a KYC-gated exchange is effectively invisible.[^101] The U.S. government implicitly acknowledged the effectiveness of this combination when it sanctioned Tornado Cash in 2022, specifically because the protocol had “effectively obscured” over \$7 billion in transactions.[^102] You have a vote on the blockchain. You have no defendant.[^103]

The second problem is service of process. Federal Rule of Civil Procedure 4 requires service on an individual through personal delivery, delivery at the usual place of abode, or service on an authorized agent.[^104] None of those options exist for an unknown person in an unknown jurisdiction. The *Ooki DAO* workaround, service via a governance forum chatbox, resulted in a default judgment against an entity with no assets and no appearance.[^105] That is not enforcement. That is a piece of paper. Service on a DAO entity does nothing for a plaintiff who needs to collect from individual partners with personal assets.

The third problem is personal jurisdiction. Even if a plaintiff identifies and serves a pseudonymous token holder, a U.S. court must have personal jurisdiction over that defendant. The minimum contacts test requires that the defendant purposefully avail itself of the forum state’s laws.[^106] Holding a governance token, voting on a protocol proposal, and collecting staking rewards does not constitute purposeful availment of California law, any more than holding shares in a foreign company creates California jurisdiction over a foreign shareholder.[^107] Courts applying personal jurisdiction doctrine to crypto defendants have consistently required something more: physical presence, targeted U.S. marketing, and direct solicitation of U.S. users.[^108] The pseudonymous token holder who bought tokens on a DEX from an unidentified seller has no such contacts.[^109]

The fourth problem is collection. Suppose a plaintiff clears all three hurdles and obtains a judgment. Partnership liability is personal liability. You need to collect from an individual’s assets. A pseudonymous defendant with assets held in a non-custodial wallet in a jurisdiction without a U.S. enforcement treaty is effectively judgment-proof.[^110] The smart contract holds the DAO’s treasury. No court order reaches it.[^111] The partners’ personal assets are wherever the partners are, which is unknown.

Each of these problems exists independently. Together they are total. The partnership liability framework, applied to a pseudonymous DAO, produces a cause of action with no defendant, no service mechanism, no jurisdiction, and no collection path. The California experiment did not create an enforcement tool. It created an enforcement aspiration that depends entirely on defendants who volunteer their own visibility. The next generation of DAOs will not make that mistake.

## IV. The Cascade

Partnership liability is not the only framework that assumes identifiable participants. The same pseudonymity problem that defeats service of process in tort litigation ripples outward across every major body of federal law that touches DAO governance. Securities regulation, beneficial ownership disclosure, commodities law, anti-money laundering compliance, insider trading enforcement, and federal tax reporting each has its own enforcement mechanisms and, at bottom, depends on the ability to find a person.

Start with securities registration. Under the *Howey* test, an investment of money in a common enterprise with an expectation of profits from the efforts of others is a security subject to federal registration requirements under the Securities Act of 1933.[^112] The SEC applied that framework to DAO tokens in 2017, concluding in its investigative report on The DAO that tokens conferring voting rights and profit expectations constitute investment contracts regardless of the technology used to issue them.[^113] That enforcement theory is live: in 2024, Mango DAO settled charges for raising over \$70 million through unregistered offers and sales of MNGO governance tokens.[^114] A DAO that issues governance tokens pseudonymously through a smart contract, with no identifiable founding team and no legal wrapper, has no registrant. The obligation exists; the obligor cannot be found.[^115]

Beneficial ownership disclosure presents the same structural failure, assuming governance tokens qualify as equity securities, a characterization the SEC has pursued in enforcement but not resolved through final adjudication.[^116] Sections 13(d) and (g) of the Securities Exchange Act of 1934 require any person who acquires beneficial ownership of more than five percent of a covered class of equity securities to file a Schedule 13D or 13G within five business days of crossing that threshold.[^117] The SEC updated these rules in October 2023, tightening filing deadlines precisely because concentrated ownership creates information asymmetries harmful to public investors.[^118] A pseudonymous governance whale holding 8% of a token supply, enough to dictate protocol outcomes, triggers none of these obligations in practice. The wallet address on the blockchain is visible to anyone; the person controlling it is not. EDGAR does not accept filings from wallet addresses.[^119]

The Commodity Futures Trading Commission fares no better. The CFTC obtained a default judgment against Ooki DAO in 2023 for operating an illegal leveraged trading platform and acting as an unregistered futures commission merchant in violation of the Commodity Exchange Act.[^120] The court held that a DAO is a “person” subject to CEA liability, a holding that is real but came with a significant asterisk.[^121] Ooki DAO’s founders had already settled separate CFTC charges against their predecessor LLC, bZeroX, which meant their identities were known before the DAO action was filed.[^122] The judgment worked because the human beings behind the pseudonymous structure had already surfaced through a prior proceeding. A DAO whose founders never created a traceable corporate predecessor presents a problem entirely different.

Bank Secrecy Act obligations compound the picture. Entities qualifying as financial institutions must implement customer identification programs and anti-money laundering procedures.[^123] The CFTC charged Ooki DAO with BSA violations, in addition to its CEA claims, specifically because the protocol accepted customer orders without conducting KYC verification.[^124] Here, the identification problem runs in both directions: the protocol cannot verify its users, and regulators cannot verify who is operating the protocol.

Insider trading enforcement follows the same pattern to the same dead end. Governance participants routinely possess material non-public information; they know how a treasury deployment will vote before it is announced, whether a fee switch proposal has the votes to pass, and whether a protocol acquisition is in negotiation.[^125] If the governance token is a security, trading on that information violates Section 10(b) of the Exchange Act and Rule 10b-5, but only if a duty-bearing relationship can be established.[^126] The classical theory requires a fiduciary relationship between the trader and the issuer’s shareholders. The misappropriation theory requires a duty of trust and confidence owed to an identifiable source of the information. A pseudonymous delegate who front-runs a governance vote satisfies neither: there is no named issuer establishing a fiduciary relationship with shareholders, and there is no identifiable source to whom a duty of confidence runs under *O’Hagan*.[^127] The conduct is economically identical to insider trading. The enforcement framework has no one to charge.

Federal tax law completes the picture. Under Revenue Ruling 2023-14, the IRS has taken the position that staking rewards and governance token distributions constitute gross income at fair market value upon the recipient’s gain of dominion and control over the tokens.[^128] Treasury disbursements to DAO contributors, compensation in governance tokens, and protocol rewards are all taxable events under Section 61 of the Internal Revenue Code.[^129] Payers are required under Section 6041 to collect taxpayer identification numbers and issue information returns to identifiable payees.[^130] A DAO treasury disbursing tokens to a pseudonymous contributor wallet has no W-9, no TIN, and no mechanism to file. The IRS established the obligation; it has no administrative path to enforce it.

The pattern across all six frameworks is the same. The law applies. The obligation is real. Enforcement requires identifying and serving a defendant, naming a registrant, compelling records from a custodian, or filing against a person with a Social Security number. A DAO whose core participants have adopted the privacy architecture described in Part III has failed to satisfy any of the preconditions for these mechanisms to work. This is not a gap in the substantive law. It is a gap in the enforcement infrastructure that the substantive law was built to assume.

## V. Why Existing Solutions Fail

The liability crisis documented in Parts II and III has not gone unnoticed. Five states have enacted DAO-specific legislation. Major protocols have adopted Cayman Islands foundations, Wyoming DUNAs, and offshore legal wrappers at high cost. Institutional investors have hired specialized counsel and purchased novel insurance products. None of it solves the problem this Note identifies.

### A. State Legislative Frameworks

Four states have enacted DAO-specific statutes that, on paper, eliminate partnership liability. Wyoming’s DAO LLC supplement authorizes smart contract governance and, by default, eliminates fiduciary duties.[^131] Wyoming’s Decentralized Unincorporated Nonprofit Association Act, effective July 1, 2024, creates a legal person with no shareholders, no equity interests, and an explicit liability shield for members and administrators.[^132] Utah’s Limited Liability Decentralized Autonomous Organization statute created an entirely new entity type and provides that no fiduciary duties arise from the roles of developer, member, participant, or legal representative.[^133] Tennessee’s Decentralized Organization Act tracks Wyoming’s LLC-wrapper model.[^134] New Hampshire’s framework, effective July 1, 2025, goes furthest on liability: DAO debts attach solely to the DAO, participants face no personal liability for each other’s wrongful acts, and the statute expressly disclaims any implicit fiduciary status arising from governance participation.[^135]

These are real protections for DAOs that use them. The problem is that all five statutes share the same structural feature: they are opt-in.[^136] A DAO must affirmatively register, file articles of organization, maintain a registered agent with a physical in-state address, and comply with ongoing reporting requirements. Wyoming’s DUNA requires a minimum of 100 members, a statement of purpose, and governance documentation sufficient to satisfy state filing requirements.[^137] Utah’s framework requires evidence that the underlying smart contracts have undergone quality assurance review and mandates at least one identifiable natural-person organizer.[^138] New Hampshire requires a registered agent and public enrollment in a state DAO registry.[^139]

The DAOs most likely to generate the liability this Note analyzes are the ones least likely to register. Ooki DAO did not fail to comply with the Commodity Exchange Act out of ignorance. Its founders publicly announced they were transferring operations to a DAO structure specifically to make the enterprise “enforcement-proof.”[^140] A voluntary registration regime has nothing to say to an organization that is deliberately avoiding it. The state frameworks protect compliant DAOs. The litigation is about everyone else.

Even a registered DAO retains federal exposure. A Wyoming DUNA can still issue an unregistered security. A New Hampshire DAO can still operate an unregistered commodities exchange. The SEC Crypto Task Force, active throughout 2025, has held multiple roundtables on token classification and registration, but has not treated state DAO registration as a safe harbor from securities law.[^141] The CFTC’s Ooki DAO enforcement produced a \$643,542 default judgment and a permanent trading ban despite the DAO operating under a structure the founders believed was regulation-proof; state-law entity status was irrelevant to the federal analysis.[^142] The cascade of federal obligations documented in Part IV runs entirely independently of whether a DAO holds a Wyoming filing number.

There is a deeper structural problem. Every state framework requires something the pseudonymous governance architecture makes unavailable: someone who can be found. A registered agent is a named person with a physical address.[^143] A DUNA governance document requires someone to have signed it.[^144] Utah’s quality assurance certification requires an identifiable engineer.[^145] These requirements are not incidental. They are the mechanism through which state law extends legal personality and liability protection. The tradeoff is explicit: to get the shield, you must show up. DAOs that have built their governance around privacy-preserving mechanisms and pseudonymous participation cannot make that trade. The statutes provide protection only to participants willing to be identified and say nothing about governance conducted in the dark.

California, where both *Sarcuni* and *Samuels* were litigated, has enacted none of this. California Assembly Bill 1229, which would create a Decentralized Nonprofit Association framework that expressly shields members and administrators from liability for association debts, was introduced in February 2023 and passed from the Assembly Banking and Finance Committee to the Judiciary Committee, where it has remained.[^146] The state whose default partnership rules created the crisis has not fixed them. The Revised Uniform Partnership Act continues to treat profit-sharing arrangements as presumptive partnerships, with joint and several liability for all partners.[^147] As long as California partnership law governs, the doctrinal source of the problem is intact.

### B. Industry Restructuring

The private sector response has been faster. Following *Samuels*, a recognizable playbook emerged across major protocols. Uniswap, the largest decentralized exchange by volume, established the DUNI entity under Wyoming’s DUNA framework in September 2025 and allocated \$16.5 million in UNI tokens to cover legal defense reserves, past tax liability settlements, and ongoing administrative compliance costs.[^148] MakerDAO rebranded as “Sky” in August 2024 and restructured into a modular architecture of separate entities called “Stars,” each with its own independent treasury and potentially separate legal wrappers, on the theory that liability in one compartment would not automatically extend to others.[^149] Cayman Islands foundation companies became the preferred structure for protocols seeking an ownerless entity with legal personality, contractual capacity, and no income or capital gains tax.[^150] Fenwick & West developed the REBA insurance structure, a Bermuda-domiciled Class 3 registered insurer providing D&O-type coverage to token holders who participate in governance, addressing the total unavailability of commercial insurance for DAO participants.[^151] Major venture capital firms implemented strict new investment policies requiring legal wrappers as a condition of investment and restricting governance participation in fund vehicles.[^152]

These measures protect the participants in DAOs that adopt them, and the costs are real: multi-jurisdictional restructuring for a major protocol runs into the millions of dollars.[^153] But every private industry solution requires an identified intermediary standing between the DAO and the outside world, and that intermediary is now the person that enforcement can find. A Cayman foundation requires named directors with fiduciary obligations who can be deposed, sanctioned, and served.[^154] An insurance policy requires a named insured with an identifiable address.[^155] Litigation defense funds require someone with signing authority over disbursements.[^156]

The governance structure itself, pseudonymous token voting, anonymous treasury proposals, and Discord deliberation under wallet addresses remain unchanged.[^157] The foundation directors take on the legal exposure that used to fall on anonymous token holders and charge for the service. What has changed is who gets sued, not whether the underlying governance conduct is legally legible. For the enforcement problem documented in Part IV, that is not progress. The SEC cannot serve process on a Cayman director and thereby obtain jurisdiction over anonymous governance participants who voted to approve the conduct at issue. The CFTC cannot use a DAO’s decision to hire general counsel as a substitute for missing KYC data. The identifiability deficit that renders federal enforcement structurally incomplete persists under every private restructuring strategy that preserves pseudonymous on-chain governance at its core.

The *Samuels* defendants illustrate this most clearly. Paradigm, Andreessen Horowitz, and Dragonfly are among the most sophisticated investors in the digital asset ecosystem, with access to premier legal counsel and every incentive to structure their Lido investments to minimize liability exposure.[^158] They failed to obtain dismissal. The court found their alleged participation in governance sufficient to state a partnership claim, regardless of any formal structuring they had undertaken.[^159] If institutional investors at that level cannot reliably avoid partnership liability through private ordering, the path for smaller participants and retail token holders is no clearer.

### C. The Patchwork Problem

Set aside the structural limitations of any individual solution and consider the coordination problem. Four states have enacted DAO frameworks.[^160] Forty-six have not. The jurisdictions that have acted have offered favorable treatment to DAOs that organize within their borders. Jurisdictions that have not adopted their own versions of the Uniform Partnership Act default to it.[^161] For a globally distributed protocol with participants in every state, the law of the most plaintiff-friendly jurisdiction governs.

California remains the most consequential gap. Both *Sarcuni* and *Samuels* arose in California federal courts applying California partnership law.[^162] California’s profit-sharing presumption under Corporations Code section 16202(c) applies to token holders who receive staking rewards, transaction-fee shares, or treasury distributions, treating them as presumptive partners.[^163] The rule in California federal courts is that the law of the forum state governs the capacity of unincorporated associations to be sued, which is why California partnership law applied to Lido DAO despite its founders being located in Cyprus, the Cocos Islands, and an unknown location.[^164] Plaintiffs know this. They filed in California.

The states that have acted cannot protect protocols from California litigation. A Wyoming DUNA provides no liability protection if a California court determines that California partnership law governs a dispute involving California residents or California-based investors, which is the predictable outcome for protocols with significant California contacts, as most major protocols have. Wyoming governs a DUNA’s internal affairs.[^165] It does not displace California’s power to apply its own default rules to transactions occurring within its jurisdiction.

The federal regulatory picture compounds the problem. FIT21, the Financial Innovation and Technology for the 21st Century Act, passed the House with bipartisan support in May 2024.[^166] It addresses token classification, not organizational liability. The bill distinguishes between restricted digital assets and digital commodities, creates registration categories for intermediaries, and includes a DeFi safe harbor for protocol participants. It says nothing about DAO entity status, member liability, partnership formation, or the service of process procedures that enforcement of any liability regime requires.[^167] The SEC Crypto Task Force proposed a four-category taxonomy for crypto assets and solicited public comment on registration, disclosure, and custody; SEC Chairman Paul Atkins has since adopted that taxonomy as the foundation of the Commission’s formal regulatory framework.[^168] It has not addressed DAO governance structures. No federal agency has issued guidance distinguishing passive token holders from active governance participants for liability purposes. The enforcement apparatus documented in Part IV continues to operate without any acknowledgment that its core assumption, that someone identifiable is responsible, fails in the pseudonymous governance context.

The Model Decentralized Unincorporated Nonprofit Association Act, proposed by the DUNA’s architects at a16z crypto and closely tracking Wyoming’s statute, has been introduced in Texas and California, among other states.[^169] Texas House Bill 3768 passed the House in 2023 but did not receive a Senate vote.[^170] California AB 1229 remains in committee.[^171] Even if both passed, the coordination problem persists: voluntary opt-in frameworks protect compliant DAOs and leave non-compliant ones exposed, in the exact jurisdictions where the litigation is concentrated.

The result is a legal environment that imposes high compliance costs on law-abiding protocols, delivers no protection against the enforcement problems documented in Part IV, and leaves the most dangerous DAOs, those that have been deliberately structured for invisibility, entirely unaffected. State legislation addresses the wrong problem. Industry restructuring addresses the right problem with tools that depend on the one thing pseudonymous governance is designed to eliminate.[^172] And the federal government has not addressed the problem at all. The next Part proposes a different approach.

## VI. The Proposal

The preceding Parts establish a precise diagnosis. Partnership liability threatens anyone identifiable. Federal enforcement requires someone to serve. Every existing response either produces an identifiable intermediary who absorbs the exposure or protects only the DAOs willing to abandon pseudonymity. The problem is not that the law is indifferent to DAOs. The problem is that enforcement infrastructure built on identifiable defendants breaks down when governance is pseudonymous by design.

The solution does not require dismantling pseudonymous governance. It requires attaching two conditions to DAOs that operate with a U.S. nexus: a mandatory registered agent and a mandatory liability reserve fund. A DAO with U.S. users, U.S.-listed tokens, or U.S. treasury assets must designate an identified person or entity to receive service of process and maintain an on-chain reserve against potential liability. Compliance triggers a federal liability shield, displacing state partnership default rules. Non-compliance triggers exchange-level delisting obligations. The mechanism works through intermediaries already subject to federal jurisdiction. It does not need to find anonymous token holders.

### A. Registered Agent Requirement

The first component requires any DAO with a U.S. nexus to designate a registered agent authorized to accept service of process and receive regulatory correspondence on the DAO’s behalf. U.S. nexus should be defined functionally: a DAO has U.S. nexus if its governance token is listed on any exchange that serves U.S. users, if more than ten percent of its on-chain governance activity originates from U.S. IP addresses, or if its treasury holds more than five million dollars in assets at any point during a twelve-month period.[^173]

The registered agent need not be a DAO participant and need not have authority over governance decisions. The agent’s only legal function is to receive service of process, regulatory notices, and judicial orders, and to transmit them to the DAO’s publicly documented governance channel within a specified time. Existing registered agent service providers already perform this function for thousands of LLCs and corporations; extending the service to DAOs requires no novel infrastructure.[^174] The agent’s identity and address would be filed with a federal registry administered by the SEC or a designated successor agency, creating a single national database of registered DAOs rather than the fragmented state-by-state picture that currently exists.[^175]

Critically, the registered agent does not accept personal liability for the DAO’s obligations. The agent is a conduit for legal process, not a guarantor of performance. This distinguishes the proposal from existing legal wrapper strategies, in which a Cayman foundation director or DUNA administrator absorbs fiduciary obligations that can themselves become the basis for suit.[^176] An agent under this proposal is no more liable for the DAO’s conduct than a registered agent for a Delaware LLC is liable for that corporation’s torts.

The agent requirement addresses the service-of-process problem that currently forces courts into the awkward posture of *CFTC v. Ooki DAO*, where the agency obtained service by posting to a protocol’s chat box and online discussion forum.[^177] With a registered agent on file, regulators and plaintiffs have a legally sufficient address for service. Enforcement becomes administratively straightforward. The DAO remains pseudonymous in governance. The only change is that it becomes reachable.

### B. Liability Reserve Fund

The second component requires any DAO with U.S. nexus to maintain an on-chain liability reserve fund proportional to the scale of its operations. A DAO with a treasury below fifty million dollars would be required to maintain a reserve equal to two percent of treasury assets. A DAO with a treasury between \$50 million and \$500 million would maintain a 1% reserve. A DAO with a treasury above \$500 million, the category that includes Uniswap, Lido, Arbitrum, and most major protocols, would maintain a reserve equal to 0.5% of treasury assets. These tiers are calibrated to two principles. First, the reserve must exceed plausible regulatory judgment exposure at every tier: as the following paragraph demonstrates, the largest DAO enforcement judgment on record would be fully covered by the reserve floor even at the smallest tier. Second, the percentage scales inversely with treasury size because absolute reserve capacity at larger tiers substantially exceeds empirical liability exposure even at lower percentages — a \$500 million protocol maintaining a 0.5% reserve holds \$2.5 million against potential liability, nearly four times the largest recorded judgment, without imposing disproportionate capital costs on the most liquid governance systems. The specific percentages are illustrative rather than definitive; Congress or the SEC could calibrate them through notice-and-comment rulemaking against a fuller empirical record of DAO enforcement outcomes.[^178] The reserve would be held in a smart contract that can only be drawn on by court order or a valid regulatory judgment.[^179]

The reserve fund addresses the enforcement gap that a registered agent cannot resolve on its own. Identifying where to serve process is necessary but not sufficient. Enforcement also requires collecting on a judgment. The *Ooki DAO* default judgment produced a \$643,542 penalty and a website shutdown order.[^180] The penalty was uncollectable against anonymous token holders, and the website shutdown was the practical end of the protocol’s U.S. operations. A reserve fund denominated in proportion to treasury size creates a collectible judgment fund without requiring the identification of individual participants. The enforcement action runs against the fund, not the governance community.

Reserve fund assets would be held in low-volatility instruments or stablecoin equivalents, not in the protocol’s own governance token. This design requirement addresses the problem identified in existing DAO defense funds, which are typically held in governance tokens whose value is highly correlated with the risks they are meant to cover.[^181] A reserve held in USDC or tokenized Treasuries retains its value during precisely the circumstances in which a DAO is most likely to face judgment.

### C. How This Solves the Problem

Together, the two components address the identifiability deficit at the center of this Note’s diagnosis without requiring pseudonymous governance participants to disclose their identities.

For state partnership liability, the proposal works through a federal preemption mechanism. A DAO that satisfies both the registered agent and reserve fund requirements is entitled to a federal liability shield that displaces state default partnership rules for participants who hold governance tokens without serving as the registered agent, controlling treasury keys, or exercising delegated administrative authority. The shield does not provide complete immunity. It is a statutory presumption that token holding alone does not create partnership status, rebuttable by evidence of the active governance conduct that *Samuels* treated as meaningful participation.[^182] Active governance participants, those who publicly commit to governance roles, manage multisig keys, or exercise delegated voting authority above a statutory threshold, remain subject to the existing partnership analysis. The shield protects passive holders and incidental voters. It does not protect the institutional investors whose conduct drove the *Samuels* result.

For federal regulatory enforcement, the proposal works by creating an identifiable enforcement target. The registered agent provides a legally sufficient address for service of regulatory process. The reserve fund provides a collectible judgment fund. Neither requires identifying anonymous token holders. The SEC can serve notice on the registered agent and enforce against the reserve. The CFTC can do the same. The BSA reporting obligation attaches to the registered agent as the DAO’s designated legal representative, not to pseudonymous governance participants who have no KYC infrastructure. The information reporting problem documented in Part IV does not disappear, but it becomes manageable through a channel that exists and can be served.

The exchange-level enforcement mechanism activates for non-compliant DAOs. Any exchange registered with the SEC or CFTC must verify, as a condition of initial listing and annual continued listing, that any governance token with a U.S. nexus originates from a DAO with a registered agent and reserve fund on file with the federal registry. An exchange that lists or continues to list a token without that verification has made an affirmative choice that is independently actionable under its existing exchange registration obligations.[^183] This structure eliminates the enforcement circularity: the regulator never needs to locate the DAO. It needs only to examine the exchange’s listing records, and the exchange, unlike the DAO, is already identified, registered, and subject to federal jurisdiction. Exchanges already perform due diligence on listed tokens.[^184] Adding a compliance verification step to the listing and continued listing standards is consistent with existing exchange obligations under the Securities Exchange Act and Commodity Exchange Act.[^185] For DAOs that decline to register, the exchange enforcement mechanism creates a direct economic cost: non-compliance means U.S. market access is cut off. For regulators, it means enforcement actions can target exchanges with identifiable legal presence rather than pseudonymous governance participants.

This approach follows the logic the Exchange Act already applies to foreign private issuers. A company organized abroad, with foreign management and foreign operations, accepts U.S. disclosure obligations and structural requirements as a condition of listing on a U.S. regulated exchange. The governance architecture can remain offshore. The price of U.S. market access is accountability infrastructure. The proposal applies identical logic to DAO governance tokens: a protocol that wants its token to trade on U.S.-regulated markets accepts the registered agent and reserve fund requirements as conditions of that access.[^186]

### D. Objections and Responses

The proposal’s unified federal compliance framework structure invites objections from four distinct directions: that a registered agent requirement simply relocates liability rather than solving it; that non-compliant DAOs will route around exchange enforcement through offshore migration and decentralized trading; that the proposal leaves the most important doctrinal questions unanswered; and that compliance costs will chill early-stage governance innovation while compromising the decentralization principles that motivated DAO development in the first place. Each deserves serious treatment.

*The registered agent as a new liability target, and exchanges as unwilling compliance police.*

The most technically precise objection is that a registered agent requirement merely shifts the identifiability problem rather than resolving it. If an agent accepts service on behalf of a DAO and that service initiates a proceeding that produces a judgment, the agent becomes the person that enforcement can find. Liability follows reachability. The proposal, on this reading, creates a new class of identified intermediaries who will either refuse to serve, price the risk into prohibitive fees, or spend their professional life as a litigation conduit for pseudonymous actors who bear none of the consequences. The related concern about exchanges is structurally identical: converting listing platforms into compliance police forces private market actors to perform regulatory verification functions for which they have no particular competence and against which they bear asymmetric risk.

Both objections rest on a genuine concern and a mistaken analogy. A registered agent for a Delaware corporation accepts no personal liability for that corporation’s torts, securities violations, or regulatory failures. The agent’s legal function is to receive, process, and transmit it; courts have never held that receipt of a summons constitutes assumption of the underlying obligation.[^187] An agent under this proposal occupies precisely that position. Nothing in the proposal creates a duty on the agent to ensure the DAO’s compliance, supervise its governance, or indemnify its creditors. The agent receives mail and forwards it to a documented governance channel. There is no mechanism through which that function generates personal exposure.

The exchange objection is stronger in its framing but equally mistaken in its premise. Exchanges already perform substantive legal due diligence on every token they list, including review of the issuing entity’s regulatory status, compliance history, and legal structure.[^188] The Securities Exchange Act already requires registered exchanges to enforce compliance with applicable law as a condition of their own registration.[^189] The proposal does not create a new theory of exchange liability. It attaches one additional criterion, a verified registered agent and reserve fund status, to the compliance review exchanges already conducted. An exchange that knowingly continues listing a non-compliant DAO token after the compliance gap is established has made an affirmative choice to maintain that listing. That choice is relevant to the exchange’s own obligations under existing law. This is not regulatory overreach. It is an extension of the listing standard framework that already governs how exchanges manage issuer compliance risk.

*The objection to offshore evasion and DEX routing.*

The most consequential challenge to the exchange enforcement mechanism is that it is circumventable. A DAO unwilling to designate a registered agent can migrate offshore, list its token exclusively on DEXs beyond SEC and CFTC jurisdiction, and route U.S. user access through interfaces that disclaim U.S. operation. The proposal, on this view, pushes non-compliant DAOs into darker channels without subjecting them to accountability. This is not a weak objection. It is an accurate description of what the most sophisticated non-compliant DAOs will attempt, and it is worth taking seriously on its own terms.

The response is not that the proposal will capture every non-compliant DAO. It is that non-compliance carries costs severe enough to matter for the protocols that pose the most significant risk. DEX liquidity for governance tokens is structurally thinner than centralized exchange liquidity for all but the very largest protocols. A governance token that cannot be listed on Coinbase, Binance.US, or Kraken faces a genuine price discovery disadvantage and reduced capital formation capacity.[^190] Institutional investors, who are the most consequential participants in major DAO governance, as the *Samuels* record makes plain, cannot hold assets that trade exclusively on unregulated DEXs without violating their own fund agreements and custody requirements.[^191] The offshore evasion path means accepting the loss of institutional capital, mainstream exchange liquidity, and U.S.-based development talent. Some protocols will make that trade. The ones that do are, by definition, smaller and less financially significant than the ones that comply. The proposal does not eliminate the non-compliant tail. It imposes a real cost on operating within it.

For DAOs that migrate offshore and route around the exchange mechanism entirely, residual enforcement tools remain available. OFAC has sanctioned smart contract addresses directly, as it did with Tornado Cash in August 2022, specifically because the protocol had effectively obscured over \$7 billion in transactions.[^192] Blocking orders, criminal referrals for identified founders who surface elsewhere, and coordination with foreign regulators under existing mutual legal assistance treaties provide enforcement options that do not depend on domestic exchange listing. These tools are imperfect. They are also what the proposal does not foreclose.

*What the proposal does not fix.*

The deepest objection is doctrinal. Even a fully compliant DAO, with a registered agent on file and a reserve fund in place, still operates in a jurisdiction where the *Samuels* framework applies to active governance participants. Paradigm, Andreessen Horowitz, and Dragonfly would not have obtained dismissal in *Samuels* due to the registered agent requirement. The court’s holding rested on their documented governance commitments, public statements, and investment forum activity, none of which is affected by a compliance certification. The proposal, on this reading, creates a shield for passive holders while leaving the liability exposure that drives behavior, institutional investor exposure, exactly where it was.

This is correct and not a defect. The doctrinal instability documented in Parts II and III is primarily dangerous to the participants who are least capable of managing it: retail token holders who purchased governance tokens on secondary exchanges without appreciating that token ownership might create unlimited personal liability for a protocol they did not design, do not govern, and may not fully understand. Active governance participants, particularly institutional investors deploying hundreds of millions of dollars into governance roles they publicly advertise, are capable of structuring around identified risks. The *Samuels* defendants had access to premier legal counsel. The retail holder who bought LDO on Gemini did not. The federal liability shield this proposal attaches to compliance is designed for the latter. The former will continue to bear the risk they have voluntarily assumed by making themselves visible, which is exactly what the *Samuels* court found them to have done.

The objection that federal legislation is unlikely in the near term is also accurate, and also inadequate as a response to the proposal’s merits. Law review scholarship works on a different timeline than the legislative calendar. More concretely, the exchange-level enforcement component of the proposal may be achievable through regulatory action rather than legislation. The SEC has existing authority to condition exchange registration on listing standards.[^193] The CFTC has existing authority over designated contract markets.[^194] A formal guidance document specifying that continued listing of governance tokens from non-compliant DAOs with U.S. nexus is inconsistent with exchange listing obligations could achieve a substantial portion of the proposal’s practical objectives without a congressional vote. The reserve fund and registered agent standards could be incorporated into exchange listing agreements as contractual conditions during the legislative gap. This is not the preferred path. But it is a viable implementation mechanism.

*Cost, decentralization, and the innovation objection.*

The most philosophically serious objection holds that, regardless of its engineering, the proposal reintroduces the centralization that DAO architecture was designed to eliminate. Requiring an identifiable person to stand behind a DAO’s governance, even as a conduit for process rather than a governor, undermines the proposition that collectively administered protocols can operate without a bottleneck. A registered agent is a human single point of failure. A reserve fund is a treasury allocation controlled by a rule that requires human administration. The proposal trades decentralization for accountability in a domain where decentralization is the point.

This objection raises a genuine tension but misstates what the proposal requires. A registered agent receives mail. The agent has no authority over governance decisions, no signing power over treasury assets, and no role in any protocol function. Every aspect of the DAO’s governance architecture, its voting mechanisms, its proposal processes, and its treasury controls remains unchanged by the designation of an address for legal service. Wyoming’s DUNA framework, widely regarded as the most DAO-compatible legislation enacted in the United States, already requires a registered agent as a condition of formation.[^195] New Hampshire’s framework imposes the same requirement.[^196] The decentralization community has accepted registered agent requirements in state legislative frameworks without treating them as centralization because the requirement does not alter governance. It creates accountability without hierarchy.

The innovation concern is more tractable. The compliance requirements scale with economic significance, and de minimis thresholds insulate early-stage protocols from obligations they cannot meet. A DAO with a treasury below fifty million dollars and no listings on U.S.-regulated exchanges has no U.S. nexus under the proposal’s definition and faces no compliance burden. The venture capital investments documented in *Samuels*, totaling over \$165 million across three institutional funds, did not go to a protocol that could not afford a registered agent.[^197] The compliance cost argument compares the proposal’s requirements to an imaginary baseline in which DAO governance is costless. The actual baseline is the *Samuels* litigation, in which institutional investors face unlimited personal liability and retail participants face the same exposure without the resources to defend it. A proportional reserve fund and a three-hundred-dollar registered agent is not a burden on that system. It is a dramatic improvement.

The deepest answer to the decentralization objection is the one this entire Note has been building toward. The choice before DAO governance is not between a registered agent and pure decentralization. It is between a registered agent and *Samuels*. Pseudonymous governance without an enforcement address does not preserve decentralization. It exposes retail participants to unlimited personal liability for governance decisions they did not make and governance commitments they never announced. The proposal exchanges a nominal procedural requirement for a substantive liability shield protecting ordinary token holders. That trade makes decentralized governance safer for the people who were supposed to benefit from it, not more dangerous. The philosophy of decentralization was never about making its participants unreachable to the legal system. It was about making governance open, transparent, and collectively administered. A registered agent requirement is compatible with all three. Unlimited partnership liability for passive token holders is not compatible with any of them.

## VII. Conclusion

Decentralized governance promised a new form of collective organization: open, pseudonymous, borderless, and governed by code rather than hierarchy. The legal system has responded by asking an old question. When multiple persons associate to carry on a business for profit, partnership law applies. The code does not change that question. The pseudonymity makes it worse.

*Sarcuni* and *Samuels* are the results. In twenty months, California federal courts went from treating DAOs as novel technology beyond the reach of traditional entity law to holding that governance token ownership alone might be sufficient to create joint and several liability for a protocol’s entire obligations.[^198] The line between *Sarcuni* and *Samuels*, between token-as-partnership and meaningful-participation-as-partnership, remains undefined at the appellate level, leaving every governance participant in every major protocol uncertain whether their last forum post or governance vote has exposed them to unlimited personal liability for conduct they neither directed nor knew about.

The federal regulatory cascade documented in Part IV makes the problem worse. Securities registration, beneficial ownership disclosure, commodity exchange regulation, anti-money laundering compliance, insider trading doctrine, and federal tax reporting all assume identifiable parties at every step. When governance is pseudonymous, each framework creates a real legal obligation but provides no mechanism for enforcement. The law applies in full. Nobody can be found to comply with it. The result is not a regulatory gap. It is a structural mismatch between the enforcement infrastructure built for the last century and the organizational forms built for this one.

Existing responses have not solved this mismatch. State legislative frameworks protect compliant DAOs and have nothing to say about those that are deliberately non-compliant, which is precisely the category generating the litigation and enforcement actions. Industry restructuring through Cayman foundations, insurance products, and DUNA registrations places identified intermediaries between pseudonymous governance and the outside world, protecting institutional investors while leaving the underlying architecture unchanged. No private restructuring strategy solves the federal enforcement problem because no restructuring strategy restores the identifiable defendant that federal enforcement requires.

The two-component proposal in Part VI addresses the structural problem rather than its symptoms. A mandatory registered agent creates an enforcement address without requiring governance centralization. A mandatory reserve fund creates a collectible judgment target without exposing anonymous token holders to unlimited personal liability. Exchange-level enforcement creates the economic incentive for compliance without requiring regulators to find pseudonymous governance participants. Together, the components condition U.S. market access on a minimum accountability infrastructure, a condition that exchanges already impose for other listing purposes and that the law already uses in analogous contexts.

The proposal does not resolve every open question. It does not define the outer boundary of meaningful governance participation, a question the Ninth Circuit has not answered and that will require appellate resolution.[^199] It does not preempt state partnership law entirely, which would require a degree of federal action unlikely to occur by executive guidance alone. It does not solve the international enforcement problem for DAOs that operate entirely outside the U.S. market. It does not protect the institutional investors in *Samuels*, Paradigm, and Robot Ventures, whose public governance commitments, documented in Part II, placed them well beyond the passive holding that the proposal shields.[^200]

What it does is draw a line that courts have refused to draw, and Congress has not yet drawn: token holding is not a partnership. A protocol with a registered agent and a reserve fund provides the minimum accountability infrastructure that justifies displacing state partnership defaults for ordinary participants. A protocol without that infrastructure, and without U.S. market access as a result, operates in a legal environment where the existing doctrinal rules apply in full. That is not a harsh outcome. It is the outcome the law currently produces for every participant, including retail holders who bought a token on a secondary exchange and may not know they are facing it.

The real cost of inaction is not the litigation that has already happened. It is the governance that will not happen. If token holding creates partnership liability and the boundary of meaningful participation is undefined, rational participants will stop participating. The institutional investors who can afford to manage that exposure will restructure around it. Retail participants will not vote, delegate, or engage with governance proposals because the downside is unlimited, and the upside is marginal. Decentralized governance will become concentrated governance with a pseudonymous facade, dominated by the few participants wealthy enough to absorb the legal risk and sophisticated enough to structure around it.

That outcome is worse for the technology, worse for its participants, and worse for the regulatory goals that partnership liability is being pressed to serve. Courts and regulators are using eighteenth-century partnership doctrine as a substitute for a governance framework that does not yet exist. The substitute is not working. The framework is overdue.

[^1]: *See Pennoyer v. Neff*, 95 U.S. 714, 733 (1877) (establishing that a court cannot exercise jurisdiction over a defendant without lawful service of process); *see also* 4 Charles Alan Wright & Arthur R. Miller, *Federal Practice and Procedure* § 1063 (3d ed. 2002).

[^2]: *Id.*

[^3]: See *Samuels v. Lido Dao*, 757 F. Supp. 3d 951, 958 (N.D. Cal. 2024); *see also* Securities Act of <span class="smallcaps">1933</span> §§ 5, 12(a)(1).

[^4]: A blockchain is a decentralized, immutable digital ledger that records transactions across a distributed network of computers without reliance on a central authority. *See* Satoshi Nakamoto, *Bitcoin: A Peer-to-Peer Electronic Cash System* (2008), <https://bitcoin.org/bitcoin.pdf>. A smart contract is self-executing code deployed on a blockchain that automatically implements predetermined outcomes when specified conditions are met, without human intermediation. *See* Nick Szabo, *Smart Contracts* (1994), <http://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/smart.contracts.html>.

[^5]: California adopted the Revised Uniform Partnership Act (RUPA) in 1994, replacing the original Uniform Partnership Act. RUPA introduced significant conceptual changes, most notably treating partnerships as entities separate from their partners rather than as mere aggregates of individuals. This “entity theory” affects property ownership, continuity after partner departure, and the ability to sue and be sued in the partnership name. *See* <span class="smallcaps">Cal. Corp. Code § 16201.</span>

[^6]: See *SEC v. W.J. Howey Co.*, 328 U.S. 293 (1946) (holding that an “investment contract” for purposes of the Securities Act (‘33) means a contract, transaction, or scheme whereby a person (1) invests his money (2) in a common enterprise and (3) is led to expect profits (4) solely from the efforts of another). The form of the instrument is immaterial, and courts will look to economic reality to determine if an instrument is a security. *Id*

[^7]: *See Sarcuni v. bZx DAO*, 664 F. Supp. 3d 1100, 1118 (S.D. Cal. 2023).

[^8]: *Samuels*, 757 F. Supp. 3d at 958–60.

[^9]: *Id.* at 956.

[^10]: *Id.*

[^11]: *Id*. at 958-59.

[^12]: *Id.* at 959.

[^13]: *Id*.

[^14]: *See* *Samuels*, 757 F. Supp. 3d at 958–60. The opinion contains no reference to blockchain analysis, chain tracing, or on-chain transaction data as a basis for any finding. The court’s entire partnership analysis rests on off-chain public records: portfolio announcements, governance forum posts, and public statements of investment intent. The inference that the court did not examine the blockchain is compelled by the absence of any evidence of such examination in the record.

[^15]: *Id.*

[^16]: *Id.*

[^17]: *Id.* at 959 (quoting Am. Compl. ¶¶ 9, 34)

[^18]: *Id.* at 960.

[^19]: *Id.* at 965–66.

[^20]: *Id.*

[^21]: *Id.* The opinion contains no reference to governance forum activity, public blog posts, or on-chain voting records attributable to Robot. The inference that none existed in the record is compelled by the court’s explicit reliance on their absence as the grounds for dismissal.

[^22]: *Id.* at 960-61.

[^23]: A partnership forms upon “the association of two or more persons to carry on as coowners a business for profit,” whether the persons intend to form a partnership. <span class="smallcaps">Cal. Corp. Code</span> § 16202(a).

[^24]: Under *Samuels*, partnership liability attaches only to defendants who meaningfully participated in the DAO’s governance, a narrower standard than *Sarcuni v. bZx DAO*, which held that any token holder could constitute a general partner regardless of participation level. *Compare* *Samuels*, 757 F. Supp. 3d at 959–60, *with* *Sarcuni*, 664 F. Supp. 3d at 1119. The doctrinal tension between these two standards remains unresolved. *See infra* Part II.D.

[^25]: *See generally* *Samuels*, 757 F. Supp. 3d at 959–66.

[^26]: *See* Geoffrey C. Hazard Jr. & Michele Taruffo, *American Civil Procedure: An Introduction* 60–65 (1993) (describing the adversarial system’s allocation of investigative responsibility to the parties rather than the court, in contrast to inquisitorial systems where judicial officers independently investigate); *see also* <span class="smallcaps">Fed. R. Civ. P.</span> 4 (placing the burden of service of process on the plaintiff with no independent judicial mechanism to locate or serve defendants).

[^27]: *See generally Sarcuni*, 664 F. Supp. 3d at 1100; *see also* *Samuels*, 757 F. Supp. 3d at 951.

[^28]: *Id.* at 959–60.

[^29]: *See Sarcuni*, 664 F. Supp. at 1118.

[^30]: *See* *Samuels*, 757 F. Supp. 3d at 957. Of the three founders, one lived in Cyprus, the other in an external territory of Australia, and the whereabout of the third were unknown. *Id.*

[^31]: Id. at 959-60 (noting founders’ whereabouts as “remote or unknown” before proceeding directly to analysis of institutional investor defendants without addressing the enforcement consequences of founders’ unavailability).

[^32]: *See infra* Part III.B.

[^33]: *See infra* Part III.B (discussing zero-knowledge proofs, homomorphic encryption, and pseudonymous delegate structures in contemporary DAO governance).

[^34]: Fed. R. Civ. P. 4(e) (requiring personal delivery, delivery at the usual place of abode, or service on an authorized agent, none of which a wallet address satisfies); *see also* *LCX AG v. John Doe Nos. 1–25*, No. 154644/2022 (N.Y. Sup. Ct. Aug. 22, 2022) (authorizing NFT airdrop as substitute service precisely because standard Rule 4 methods were unavailable against pseudonymous wallet holders).

[^35]: *See infra* notes 83-84.

[^36]: *See infra* note 143.

[^37]: *See infra* Part IV.

[^38]: *See infra* Part V.

[^39]: <span class="smallcaps">Wyo. Stat. §§ 17-31-101</span> to <span class="smallcaps">-116 (2021).</span>

[^40]: *See* Uniswap Foundation, UNIfication Governance Proposal (Nov. 2025) (proposing DUNA adoption and allocating \$16.5 million in legal reserves); *see also* Rune Christensen, MakerDAO Endgame: Sky Rebranding and Governance Restructuring (Aug. 2024) (restructuring MakerDAO as Sky with modular subDAO framework); Cayman Islands Foundation Companies Act, 2017 (providing the legal framework commonly used by protocol DAOs as an offshore legal wrapper).

[^41]: *Id.*

[^42]: *See* Shabir Korotana, *Decentralized Autonomous Organizations: Adapting Legal Structures and Proposing a New Model of DAOLLP*, 20 Cap. Markets L.J. kmaf011, at 5–6 (2025) (observing that the UK Law Commission’s prevailing view treats unstructured DAOs as general partnerships or unincorporated associations under English law, with the same default consequence of personal liability for members).

[^43]: *Supra* note 23.

[^44]: *See generally t’Bear v. Forman*, 359 F. Supp. 3d 882, 898 (N.D. Cal. 2019).

[^45]: *Id.*

[^46]: *See* *Holmes v. Lerner*, 74 Cal. App. 4th 442, 454 (Cal. Ct. App. 1999).

[^47]: *Id.*

[^48]: *See* *Samuels*, 757 F. Supp. 3d at 959–65 (treating governance participation as the dispositive factor distinguishing defendants who survived dismissal from Robot Ventures, which did not, with no equivalent analysis of profit-sharing or contribution as independent grounds for partnership status).

[^49]: *Holmes*, 74 Cal. App at 445.

[^50]: *Id.* at 454.

[^51]: *Id.* at 454.

[^52]: <span class="smallcaps">Cal. Corp. Code</span> § 16202(c)(3).

[^53]: <span class="smallcaps">Cal. Corp. Code § 16306(</span>a<span class="smallcaps">).</span>

[^54]: *Id.*

[^55]: Florence Guillaume & Sven Riva, *The DAO: From the First Big Cryptocurrency Craze to a New Era of Legal Frameworks*, *in* Decentralized Autonomous Organizations in the Legal Landscape 130 (Edward Elgar 2025) (observing that in a pseudonymous governance environment, joint and several liability under the default partnership form carries “considerable practical importance” because a plaintiff who can identify only one member may recover the entire loss from that single defendant, leaving contribution to be resolved among partners who cannot themselves be found).

[^56]: *See* *Sarcuni*, 664 F. Supp. at 1115 (holding that any holder of BZRX governance tokens is a partner in the DAO general partnership, without inquiry into whether the token was purchased on a secondary market, whether the holder had knowledge of the DAO’s operations, or whether the holder ever intended to participate in governance).

[^57]: *Samuels*, 757 F. Supp. 3d at 960.

[^58]: *Id.* at 962-63 (acknowledging that the partnership’s membership “may become clear” to be “narrower (for instance, including only the founders) or broader (for instance, including everyone who has voted on a governance proposal or who holds any LDO)” only after “a full evidentiary record at summary judgment or trial”).

[^59]: <span class="smallcaps">Cal. Corp. Code</span> § 16202(a); *see also* *Holmes*, 74 Cal. App. 4th at 453–54.

[^60]: *Sarcuni*, 664 F. Supp. at 1115 (quoting the principle that courts do not countenance partnerships which attempt to afford the advantages of commercial intercourse without corresponding liabilities).

[^61]: *Id.* at 1106.

[^62]: *Id.* at 1107.

[^63]: *Id.* at 1111.

[^64]: *Id.*

[^65]: *Id.* 1108–09.

[^66]: *Id.* at 1115.

[^67]: *Id.* at 1119.

[^68]: *Id.*

[^69]: *Id.* at 1115.

[^70]: *Id.* at 1117–18 (quoting defendants’ argument that finding every BZRX token holder to be a co-owner with unlimited personal liability “would be a radical expansion and alteration of long-standing principles of partnership law”).

[^71]: *Id.* at 1119 (citing *Perper v. Sonnenschein*, 117 Cal. App. 33 (1931))

[^72]: *Id.* at 1117-18 (quoting co-founder Kistner’s statement that the DAO transition was designed so that “when regulators ask us to comply, we have nothing we can really do because we’ve given it all to the community”).

[^73]: *Id.* at 1108–09 (documenting Bean and Kistner’s roles as co-founders of bZeroX LLC, their documented decision to transition control of the bZx Protocol to the DAO, and their public statements regarding that transition).

[^74]: *Id.* at 1108–18. The opinion identifies Bean and Kistner as named defendants based on documented public conduct but contains no discussion of service of process on, or identification of, the broader universe of BZRX token holders swept in by the court’s holding that “anyone holding a BZRX token is a partner in the partnership.” *Id.* at 1115. The inference that those holders remained unreachable as a practical matter is compelled by the absence of any such analysis in the record.

[^75]: *Samuels*, 757 F. Supp. 3d at 957

[^76]: *Id.* at 958-65.

[^77]: *Id.* at 955.

[^78]: *Id.* at 958.

[^79]: *Id.* at 959.

[^80]: *Id.* (citing Complaint ¶¶ 40-41).

[^81]: *Id.* (citing Complaint ¶ 43).

[^82]: *Id.* (citing Complaint ¶¶ 46-47).

[^83]: *Id.* at 960.

[^84]: *Id.* at 960-61.

[^85]: *See* *Sarcuni*, 664 F. Supp. 3d at 1115; *Samuels*, 757 F. Supp. 3d at 965–66.

[^86]: *Compare* *Sarcuni*, 664 F. Supp. 3d at 1119, *with* *Samuels*, 757 F. Supp. 3d at 959-60.

[^87]: *See* *CFTC v. Ooki DAO*, No. 3:22-cv-05416 (N.D. Cal. 2023).

[^88]: *Id.* (Mersinger, Comm’r, dissenting).

[^89]: SEC, Report of Investigation Pursuant to Section 21(a) of the Securities Exchange Act of 1934: The DAO, Release No. 81207 (July 25, 2017).

[^90]: *Compare* *Id.* (concluding that the pseudonymity and dispersion of token holders created an arrangement bearing “little resemblance to that of a genuine general partnership”), *with* *Sarcuni*, 664 F. Supp. 3d at 1115, *and* *Samuels*, 757 F. Supp. 3d at 962–63.

[^91]: *See supra* Part II.B–C.

[^92]: *See supra* Part II.C; *see also* Robin Fritsch, Marino Müller & Roger Wattenhofer, *Analyzing Voting Power in Decentralized Governance: Who Controls DAOs?*, 5 Blockchain: Rsch. & Applications 100208 (2024) (documenting that voting power in major DAO governance systems is concentrated in a small number of institutional addresses, consistent with a governance structure built around large private token sales to institutional investors rather than broad retail distribution).

[^93]: *See Samuels*, 757 F. Supp. 3d at 959–65.

[^94]: *See* Stephen T. Gannon, James K. Goldfarb & Alexandra Day Coyle, *Samuels v. Lido DAO: A Potential New Frontier for Liability in the Cryptocurrency Space*, Davis Wright Tremaine (Jan. 2, 2025) (concluding that *Samuels* may deter venture capital firms from active DAO governance participation and that a pure DAO structure is unlikely to remain an attractive vehicle for institutional investment and support).

[^95]: A zero-knowledge proof is a cryptographic protocol that allows one party to prove a statement is true without revealing any information beyond the truth of the statement itself. In the governance context, a token holder generates a mathematical proof demonstrating that they hold a valid governance token and cast a valid vote, without the proof disclosing which wallet address they control, how large their position is, or which way they voted. The vote is verifiable by anyone auditing the governance process; the voter remains invisible to them. *See* Aragon, *Governance I: How to Set Your DAO Governance*, Aragon Resource Library (2024) (describing deployment of anonymous voting through zero-knowledge technology as an emerging standard in DAO governance infrastructure).

[^96]: In a delegation system, a token holder transfers their voting power to a designated wallet address, which then votes on their behalf. The delegate controls the votes without disclosing any real-world identity. A single pseudonymous delegate can represent millions of dollars in voting power without any publicly discoverable name, employer, or jurisdiction attached to it.

[^97]: Most blockchain transactions are recorded on a public ledger visible to anyone. Off-chain voting platforms like Snapshot bypass this entirely: a token holder signs a message with their wallet to signal a governance preference, but that message is stored on a separate database rather than submitted to the blockchain. No transaction is broadcast, no gas fee is paid, and no public record links that wallet address to a particular vote. *See* Sablier, *DAO Governance Voting Tools: The Ultimate Guide* (2024) (describing Snapshot’s off-chain voting system, which allows governance signaling with no on-chain transaction record linking wallet addresses to votes).

[^98]: *See* S*amuels*, 757 F. Supp. 3d at 958–65.

[^99]: *Id.* at 965–66.

[^100]: When a user creates an account on a centralized exchange, they submit identifying information under know-your-customer regulations. If a wallet address can be linked to an exchange account, it can be linked to a real person. Chain analysis firms like Chainalysis attempt to build those links by tracing transaction flows across the blockchain, correlating deposit and withdrawal patterns, and cross-referencing IP address data. The methodology is probabilistic rather than definitive, and privacy tools such as mixing protocols route transactions through intermediary addresses specifically to break those correlations. *See* Tanner De Witt, *DAOs and the Law: Enforcement* (May 2024) (noting that DAO enforcement is complicated by pseudonymous participation, as members do not register with real names and chain analysis linking addresses to identities remains contested and defeatable).

[^101]: A hardware wallet stores private keys on a physical device that never exposes them to an internet-connected computer. A mixing or privacy protocol routes transactions through a series of intermediary addresses, severing the traceable link between sender and recipient. A user who combines both and has never submitted identifying information to a centralized exchange leaves no thread for chain analysis to pull. *See* Chainalysis, *2025 Crypto Crime Report* 14 (2025) (noting that de-anonymization depends on wallets eventually interacting with KYC-compliant exchanges); *id.* at 22 (describing mixing services as designed to “break” traceable links between addresses).

[^102]: *See* U.S. Dep’t of the Treasury, Office of Foreign Assets Control, *Tornado Cash* (Aug. 8, 2022).

[^103]: *See* Guillaume & Riva, *supra* note 55.

[^104]: Fed. R. Civ. P. 4(e).

[^105]: *See* *CFTC v. Ooki DAO*, No. 3:22-cv-05416-WHO, Order Granting Alternative Service (N.D. Cal. Dec. 20, 2022) (permitting service via governance forum chatbox after CFTC represented it could identify no individual to accept service, resulting in default judgment with no appearance by any defendant).

[^106]: *Int’l Shoe Co. v. Washington*, 326 U.S. 310, 316 (1945).

[^107]: *Sarcuni*, 664 F. Supp. 3d at 1121–22 (holding that partnership membership alone does not establish purposeful availment and that “jurisdiction over a partnership does not necessarily permit a court to assume jurisdiction over the individual partners”).

[^108]: *See* *Meany v. Atomic Protocol Sys. OU*, 2024 WL 4135762, at \*4 (D. Colo. Sept. 10, 2024) (dismissing crypto wallet defendants for lack of personal jurisdiction, confirming that an interactive website accessible in the U.S. and communications with U.S. users are insufficient to establish purposeful availment without additional forum contacts).

[^109]: A decentralized exchange (DEX) is a trading protocol that allows users to swap tokens directly via smart contracts, without a central intermediary or identity verification. Uniswap, which runs on Ethereum and processes billions of dollars in trading volume annually, is the most widely used example.

[^110]: Andrew W. Balthazor, *The Challenges of Cryptocurrency Asset Recovery*, 13 FIU L. Rev. 1207, 1219–25 (2019) (analyzing pre- and post-judgment enforcement mechanisms against cryptocurrency defendants and concluding that only the wielder of a private key controls non-custodial funds, such that judgments against defendants holding assets in self-custody wallets are unenforceable absent voluntary compliance or disclosure).

[^111]: Florence Guillaume & Sven Riva, *Blockchain Dispute Resolution for Decentralized Autonomous Organizations: The Rise of Decentralized Autonomous Justice*, *in* Bonomi & Lehmann eds., Blockchain and Private International Law 550, 588–89 (Brill Nijhoff 2022) (“No enforcement authority can force an action upon the DAO and the DAO’s crypto assets cannot be frozen, seized, or confiscated.”); *see also* *How To Resolve A Dispute Involving A DAO*, FinReg Blog (July 21, 2022), <https://finreg.law.duke.edu> (“\[A\] DAO’s crypto assets cannot be frozen, seized, or confiscated. Authorities cannot force an action upon a DAO either: only the community of members acting within the parameters of the code can trigger an action from the entity.”).

[^112]: Securities Act of 1933, 15 U.S.C. § 77a et seq.; see also *W.J. Howey Co.*, 328 U.S. at 301.

[^113]: SEC, Report of Investigation Pursuant to Section 21(a) of the Securities Exchange Act of 1934: The DAO, Release No. 81207, at 11 (July 25, 2017). The report concluded that DAO tokens constituted investment contracts “regardless of the form of the organization or technology used to effectuate the investment.” *Id.* A separate Investment Advisers Act exposure arises when a DAO manages a large, diversified treasury and makes collective investment decisions on behalf of token holders, thereby qualifying the enterprise as an investment adviser requiring registration under 15 U.S.C. § 80b-1 et seq. The 2017 DAO Report also flagged this exposure. *Id.* at 14. Registration requires a named natural person or legal entity — the same identification gap that forecloses securities registration applies here, too.

[^114]: Complaint, *SEC v. Mango DAO*, No. 24-cv-7453 (S.D.N.Y. Sept. 27, 2024).

[^115]: *Coinbase, Inc. v. SEC*, 126 F.4th 175, 183 (3d Cir. 2025) (confirming the SEC retains broad discretion to proceed by adjudication rather than rulemaking, and that the existing securities law framework “can apply to certain digital asset transactions,” the court’s holding cuts in favor of SEC jurisdiction, not against it); *see also* Guillaume & Riva, *supra* note 55, at 117 (noting that in *Risley v. Uniswap Labs*, plaintiffs were unable to pursue token issuers due to pseudonymity and redirected their claims against the decentralized exchange instead, illustrating the enforcement redirect that pseudonymous issuance produces).

[^116]: *See* SEC Crypto Task Force, *Proposed Token Classification Framework* (Feb. 4, 2025) (proposing four categories of crypto assets, including assets that are securities, assets offered as part of investment contracts but not themselves securities, tokenized securities, and all other non-security assets, without resolving which category governs governance tokens).

[^117]: Securities Exchange Act of 1934, 15 U.S.C. §§ 78m(d), 78m(g).

[^118]: Modernization of Beneficial Ownership Reporting, Release No. 33-11253, at 2 (SEC Oct. 10, 2023) (noting that existing deadlines “came about prior to the advent of the internet and electronic filing” and create “information asymmetries harmful to public investors”)

[^119]: EDGAR (Electronic Data Gathering, Analysis, and Retrieval) is the SEC’s mandatory public filing system for beneficial ownership reports, registration statements, and periodic disclosures. *See* 15 U.S.C. § 78*l*(g); 17 C.F.R. § 240.13d-1. Every Schedule 13D and 13G filing requires the reporting person’s legal name, address, and citizenship or place of organization. *See* Schedule 13D, Item 2, 17 C.F.R. § 240.13d-101.

[^120]: *CFTC v. Ooki DAO*, No. 3:22-cv-05416-WHO, slip op. at 7–8 (N.D. Cal. June 8, 2023), ECF No. 76. (imposing \$643,542 civil monetary penalty, permanent trading and registration bans, and ordering website shutdown). Commodity Exchange Act, 7 U.S.C. § 1 et seq.; *id.* § 2(c)(2)(D) (retail commodity transactions); *id.* § 6d (futures commission merchant registration).

[^121]: *Ooki DAO*, slip op. at 7–8.

[^122]: In the Matter of bZeroX, LLC, CFTC Release No. 8590-22 (Sept. 22, 2022) (simultaneous settlement with founders Tom Bean and Kyle Kistner; \$250,000 civil penalty; cease-and-desist order). The CFTC explicitly noted that bZeroX’s founders “transferred control to Ooki DAO in an attempt to render the bZx DAO, by its decentralized nature, enforcement-proof.” *CFTC v. Ooki DAO*, No. 3:22-cv-05416-WHO, Complaint ¶ 8 (N.D. Cal. Sept. 22, 2022).

[^123]: Bank Secrecy Act, 31 U.S.C. § 5311 et seq.

[^124]: *CFTC v. Ooki DAO, supra* note 81 at ¶¶ 54–61 (alleging failure to adopt customer identification program as required of registered futures commission merchants).

[^125]: Lin William Cong et al., *Centralized Governance in Decentralized Organizations* 3, 19 (Working Paper, 2025), <https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5168660>. (finding that DAO proposal managers earn average market-adjusted returns of 9.5% by trading tokens before proposal announcements, and that active governance participants obtain “privileged access to non-public information” unavailable to ordinary token holders).

[^126]: Securities Exchange Act of 1934, 15 U.S.C. § 78j(b); 17 C.F.R. § 240.10b-5. The classical theory of insider trading originates in *Chiarella v. United States*, 445 U.S. 222 (1980); the misappropriation theory was established in *United States v. O’Hagan*, 521 U.S. 642 (1997). Both theories require an identifiable duty-bearing relationship to a named counterparty, a structural requirement that DAO governance cannot satisfy.

[^127]: *See* Chiarella, 445 U.S. at 228–30 (1980) (holding that insider trading liability requires a preexisting fiduciary duty between the trader and the shareholders from whom he purchases); *see also* O’Hagan, 521 U.S. at 652 (1997) (establishing that misappropriation liability requires breach of “a duty of trust or confidence owed to the source of the information,” and that the duty must run to an identifiable person or entity, not to the market generally).

[^128]: Rev. Rul. 2023-14, 2023-33 I.R.B. 573 (IRS July 31, 2023) (holding that the fair market value of staking rewards is includible in gross income “in the taxable year in which the taxpayer gains dominion and control over the validation rewards”).

[^129]: I.R.C. § 61(a); *id.* § 6041 (requiring information returns for payments of \$600 or more to identifiable payees). The IRS finalized Form 1099-DA reporting requirements for digital asset transactions effective January 1, 2025, requiring brokers that take custody of digital assets to report gross proceeds to the IRS. *See* Final Regulations on Reporting by Brokers on Sales and Exchanges of Digital Assets, 89 Fed. Reg. 56,478 (July 9, 2024). The critical gap: these reporting obligations attach to custodial brokers with identified customers, not to smart contract treasuries disbursing tokens to pseudonymous wallet addresses.

[^130]: I.R.C. § 6041.

[^131]: <span class="smallcaps">Wyo. Stat. Ann.</span> §§ 17-31-101 to 17-31-116.

[^132]: <span class="smallcaps">Wyo. Stat. Ann.</span> §§ 17-32-101 to 17-32-129; Miles Jennings & David Kerr, *The DUNA: An Oasis for DAOs*, a16z crypto (Mar. 8, 2024).

[^133]: <span class="smallcaps">Utah Code Ann.</span> §§ 48-5-101 to 48-5-406.

[^134]: <span class="smallcaps">Tenn. Code Ann.</span> §§ 48-250-101 to 48-250-115.

[^135]: <span class="smallcaps">N.H. Rev. Stat. Ann.</span> ch. 301-B, § 301-B:11

[^136]: <span class="smallcaps">Wyo. Stat. Ann</span>. § 17-32-104 (2024) (requiring election of DUNA status under the Wyoming Decentralized Unincorporated Nonprofit Association Act); <span class="smallcaps">Tenn. Code Ann</span>. § 48-250-103 (requiring articles of organization to form a decentralized organization under the Tennessee DAO Act); <span class="smallcaps">Utah Code Ann</span>. § 48-5-201 (requiring delivery of a certificate of organization to the Division of Corporations as a condition of formation under the Utah Decentralized Autonomous Organizations Act); <span class="smallcaps">N.H. Rev. Stat. Ann</span>. §§ 301-B:14, 301-B:15 (2025) (conditioning legal entity status on enrollment in the New Hampshire DAO registry and satisfaction of enumerated listing requirements under the New Hampshire Decentralized Autonomous Organization Act). Each statute confers legal status only upon affirmative election and compliance with formation requirements; no statute automatically captures an existing DAO operating within the state.

[^137]: <span class="smallcaps">Wyo. Stat. Ann.</span> § 17-32-108 (requiring minimum 100 members).

[^138]: <span class="smallcaps">Utah Code Ann.</span> § 48-5-203.

[^139]: <span class="smallcaps">N.H. Rev. Stat. Ann</span>. § 301-B:9 (registered agent); § 301-B:14 (state registry).

[^140]: *Ooki DAO, supra* note 122 at ¶¶ 8.

[^141]: *See* SEC Crypto Task Force, Roundtable Series Summary (2025); *see also* SEC, Report of Investigation: The DAO, Release No. 81207 (July 25, 2017) (applying Howey to DAO governance tokens without regard to entity structure).

[^142]: *Supra* note 72.

[^143]: See e.g., <span class="smallcaps">Wyo. Stat. Ann.</span> § 17-28-101(a)(i) (requiring every registered Wyoming entity to maintain a registered agent at “a street address in Wyoming which shall be a physical location where . . . a natural person . . . can accept service of process” and “is physically present at that location”)

[^144]: Wyo. Stat. Ann. § 17-32-114 (requiring a DUNA’s governing principles to be authenticated by an administrator, a named, accountable individual, before the association may act)

[^145]: <span class="smallcaps">Utah Code Ann</span>. §§ 48-5-103(2)(c), 48-5-201 (requiring, as a condition of formation, evidence that the DAO has undergone a “security review for quality assurance” and that an identified organizer, “at least one” of whom “shall be an individual,” deliver the certificate of organization to the Division).

[^146]: Cal. A.B. 1229, 2023-24 Reg. Sess. (Cal. 2023); *see also* Miles Jennings et al., *Model Decentralized Unincorporated Nonprofit Association Act* 4 (a16z crypto 2024) (noting AB 1229 passed from Assembly Banking and Finance Committee to Assembly Judiciary Committee).

[^147]: <span class="smallcaps">Cal. Corp. Code</span> §§ 16202(a), 16202(c), 16306.

[^148]: *See* *Establish Uniswap Governance as “DUNI,” a Wyoming DUNA*, Uniswap Governance Forum (Aug. 11, 2025), <https://gov.uniswap.org/t/rfc-establish-uniswap-governance-as-duni-a-wyoming-duna/25770>; *see also* Megan Hernbroth & Macauley Peterson, *Uniswap Inches to Fee Switch as Foundation Proposes Wyoming Entity*, DL News (Aug. 11, 2025), <https://www.dlnews.com/articles/defi/uniswap-inches-to-fee-switch-as-foundation-pushes-duna/>.

[^149]: Krisztian Sandor, *MakerDAO Is Now ‘Sky’ as \$7B Crypto Lender Rolls Out New Stablecoin, Governance Token*, CoinDesk (Aug. 27, 2024, 8:00 AM), <https://www.coindesk.com/business/2024/08/27/makerdao-is-now-sky-as-7b-crypto-lender-rolls-out-new-stablecoin-governance-token>.

[^150]: *See* Bradley Kruger, *The Foundation Company as a Decentralised Autonomous Organisation (DAO) in the Cayman Islands*, Ogier (Mar. 31, 2020), <https://www.ogier.com/publications/the-foundation-company-as-a-decentralised-autonomous-organisation-dao-in-the-cayman-islands> (describing Cayman foundation companies as ownerless entities with legal personality, contractual capacity, and no income or capital gains tax obligations); Bernadette Carey & Chris Duncan, *Cayman Islands Foundation Companies for DAOs, DeFi, and NFTs*, Carey Olsen (Apr. 5, 2022), <https://www.careyolsen.com/briefings/cayman-islands-foundation-companies-daos-defi-and-nfts> (noting that foundation companies have become the preferred structure for DeFi protocols seeking an entity that can hold treasury assets and enter contracts without shareholders or members).

[^151]: Fenwick & West LLP, *REBA Solution*, Fenwick & West, <https://www.fenwick.com/industries/insurtech/reba-solution> (last visited Mar. 1, 2026).

[^152]: Gannon, Goldfarb & Coyle, *supra* note 94 (observing that *Samuels* “may weigh in favor of venture capital firms investing only in entities that possess a familiar corporate governance structure” or “restricting investments in DAOs to those which have been formed as LLCs” and that “most DAOs are not LLCs, \[so\] institutional investors in DAOs are at risk”).

[^153]: *See supra* note 148; *see also* Chris Brummer & Rodrigo Seira, *Legal Wrappers and DAOs* 18–19 (May 30, 2022) (unpublished white paper), <https://ssrn.com/abstract=4123737>.

[^154]: *Supra* note 150.

[^155]: *Supra* note 151.

[^156]: *Supra* note 148.

[^157]: Brummer & Seira, *supra* note 153 (observing that offshore foundations “do not typically ‘wrap’ the DAO, but rather act as an affiliate of the DAO, or even an independent entity, that is directed by the DAO’s token holders for a specific purpose,” leaving DAO members who are not themselves shielded by a legal entity with unresolved liability exposure).

[^158]: See *Samuels*, 757 F. Supp. 3d at 959.

[^159]: *Id.* at 963-64.

[^160]: *Supra* notes 131-35.

[^161]: *See* *generally* Uniform Partnership Act (1997) (amended 2013); Revised Uniform Partnership Act § 202(a) (requiring only an association of two or more persons to carry on as co-owners a business for profit).

[^162]: *Sarcuni*, 664 F. Supp. 3d at 1115-16; *Samuels*, 757 F. Supp. 3d at 961-64.

[^163]: Supra note 52.

[^164]: *Samuels*, 757 F. Supp. 3d at 961 (applying Fed. R. Civ. P. 17(b)(3) and California law to determine DAO’s capacity to be sued).

[^165]: *See* <span class="smallcaps">Wyo. Stat. Ann.</span> § 17-32-103 (governing law and territorial application of the DUNA framework).

[^166]: Financial Innovation and Technology for the 21st Century Act, H.R. 4763, 118th Cong. (passed House May 22, 2024).

[^167]: *Id.* (providing exemptions for certain enumerated DeFi activities but addressing only trading protocol registration, not organizational liability or partnership formation).

[^168]: *See* Commissioner Hester M. Peirce, *There Must Be Some Way Out of Here*, U.S. Sec. & Exch. Comm’n (Feb. 21, 2025), <https://www.sec.gov/newsroom/speeches-statements/peirce-statement-rfi-022125>; *see also* Paul S. Atkins, Chairman, U.S. Sec. & Exch. Comm’n, *The SEC’s Approach to Digital Assets: Inside “Project Crypto”*, Remarks at the Federal Reserve Bank of Philadelphia (Nov. 12, 2025) https://www.sec.gov/newsroom/speeches-statements/atkins-111225-secs-approach-digital-assets-inside-project-crypto (adopting four-category taxonomy of digital commodities, digital collectibles, digital tools, and tokenized securities as framework for Commission’s crypto regulatory approach).

[^169]: *See* Jennings et al., *Model Decentralized Unincorporated Nonprofit Association Act*, *supra* note 91.

[^170]: Tex. H.B. 3768, 88th Leg., Reg. Sess. (Tex. 2023).

[^171]: Cal. A.B. 1229, *supra* note 91.

[^172]: *See* Brummer & Seira, *supra* note 153, at 31 (documenting that available legal wrappers were designed around twentieth-century assumptions about collective association that DAO architecture systematically violates, and that no single wrapper is a perfect fit for the novel characteristics of a Web3 DAO).

[^173]: The nexus criteria draw on existing frameworks for territorial jurisdiction over securities activities. *See* Securities Exchange Act § 30, 15 U.S.C. § 78dd (extraterritorial application); *see also* *Morrison v. National Australia Bank Ltd.,* 561 U.S. 247 (2010) (establishing conduct-and-effects test for securities law extraterritoriality); *see also* Securities Exchange Act § 12(g)(1), 15 U.S.C. § 78l(g)(1); 17 C.F.R. § 240.12g-1 (conditioning registration obligation on an asset threshold of \$10 million and a holder-of-record threshold of 2,000 persons, illustrating Congress’s practice of using bright-line numerical triggers to attach federal accountability obligations to entities of sufficient scale; the proposed nexus thresholds follow identical logic by calibrating compliance obligations to measurable indicators of U.S. market significance rather than subjective assessments of intent). The specific percentages and thresholds are illustrative; Congress or the SEC could calibrate them through notice-and-comment rulemaking against a fuller empirical record.

[^174]: *See* <span class="smallcaps">Wyo. Stat. Ann</span>. § 17-28-101 et seq. (Wyoming registered agent requirements for business entities generally); see also <span class="smallcaps">Del. Code Ann</span>. tit. 8, § 131 (same for Delaware corporations).

[^175]: *Cf.* 17 C.F.R. § 240.13d-1(a); 17 C.F.R. § 240.13d-101, Items 1–2 (requiring any person acquiring more than five percent beneficial ownership of a registered equity security to file a statement with the Commission disclosing the reporting person’s full legal name, address, and citizenship; a federal DAO registry would follow analogous logic by conditioning U.S. market participation on the filing of identified-person information with a central federal database).

[^176]: *See supra* Part V.B (discussing how Cayman foundation directors absorb fiduciary obligations that can themselves generate liability exposure).

[^177]: *Supra* note 105 (authorizing service via “Help Chat Box” and online forum)

[^178]: The tier structure draws on the logic underlying existing federal financial reserve frameworks, which calibrate reserve obligations to institutional scale rather than imposing uniform percentage requirements. *See* 17 C.F.R. § 240.15c3-1 (SEC net capital rule, imposing differentiated minimum capital requirements on broker-dealers based on firm type and activity level). The inverse scaling, higher percentages for smaller DAOs, lower for larger, reflects that smaller protocols face higher marginal legal risk per dollar of treasury given less professionalized governance and fewer institutional safeguards, while larger protocols generate higher absolute reserves even at lower percentages. The invitation to legislative or regulatory calibration is standard practice in proposed administrative frameworks. *See Motor Vehicle Mfrs. Ass’n v. State Farm Mut. Auto. Ins. Co.*, 463 U.S. 29, 48 (1983) (requiring agencies to provide a reasoned basis for quantitative thresholds but permitting adjustment as enforcement data accumulates).

[^179]: The reserve smart contract would be programmed with a single release condition, verification of a valid court order or regulatory judgment transmitted through the registered agent and would otherwise be immutable. This design inverts the standard architecture of DAO treasury contracts, which are typically programmed to resist external interference. *See* Carlton Fields, *Set It and Regret It?: Smart Contracts, Injunctions, and Fraudulent Transfers* (2019) (practitioner commentary noting that most smart contracts “will not comply with or act in accordance with court orders” by design, and that absent an identified intermediary holding assets, enforcement against smart contract assets is effectively impossible), https://www.carltonfields.com/insights/publications/2019/set-it-and-regret-it-smart-contracts-injunctions-a. The reserve contract addresses this problem by designating the registered agent as the intermediary whose verified transmission of a judgment to the contract address triggers release. For the technical mechanics of engineering smart contracts to execute automatically upon satisfaction of externally verified legal conditions, see Zhen Er Low, Commentary, *Execution of Judgements on the Blockchain: A Practical Legal Commentary*, Harv. J.L. & Tech. Dig. (Apr. 12, 2021), https://jolt.law.harvard.edu/digest/execution-of-judgements-on-the-blockchain-a-practical-legal-commentary (analyzing how dispute resolution smart contracts can be programmed to release escrowed assets automatically upon receipt of court judgment data from an external oracle or verified intermediary).

[^180]: *CFTC v. Ooki DAO*, *supra* note 120.

[^181]: *Supra* note 151 (noting that DAO defense funds “are often held in the DAO’s governance token or another related asset, which is highly correlated with the risks they aim to protect against”).

[^182]: *See Samuels*, 757 F. Supp. 3d at 963 (finding allegations of public governance commitment sufficient to state partnership claim at motion to dismiss stage); *see also* *Sarcuni v. bZx DAO*, 664 F. Supp. 3d at 1116 (holding token ownership alone sufficient under California test).

[^183]: Securities Exchange Act § 6(b)(5), 15 U.S.C. § 78f(b)(5) (requiring that the rules of a registered national securities exchange be “designed to prevent fraudulent and manipulative acts and practices, to promote just and equitable principles of trade . . . and, in general, to protect investors and the public interest”); *see also* Securities Exchange Act § 19(b), 15 U.S.C. § 78s(b) (requiring registered exchanges to submit proposed rule changes, including listing standards, to the SEC for approval). Exchange listing standards already incorporate issuer compliance verification as a condition of listing. *See* NYSE Listed Company Manual § 303A; Nasdaq Listing Rule 5600 (requiring listed companies to satisfy ongoing governance and compliance standards as a condition of continued listing). The proposal extends this existing framework by adding a DAO-registered agent and reserve-fund status as a verified listing criterion.

[^184]: *See* Coinbase, *Digital Asset Listing Process*, Coinbase Exchange (last visited Mar. 1, 2026), <https://www.coinbase.com/exchange/asset-listings> (evaluating assets against “legal, compliance, and technical security standards” as components of listing decisions).

[^185]: Securities Exchange Act § 6(b), 15 U.S.C. § 78f(b) (requiring registered exchanges to enforce compliance with exchange rules); Commodity Exchange Act § 5(d), 7 U.S.C. § 7(d) (imposing compliance obligations on designated contract markets as conditions of designation).

[^186]: *See* Securities Exchange Act of 1934 § 12, 15 U.S.C. § 78l (requiring registration for securities listed on national exchanges regardless of issuer domicile); 17 C.F.R. § 240.12g3-2 (exemption framework for foreign private issuers, confirming that Exchange Act reach turns on U.S. market access rather than issuer nationality); *see also* SEC, *Foreign Private Issuers*, <https://www.sec.gov/corpfin/foreign-private-issuers> (collecting disclosure and structural requirements applicable to foreign issuers as a condition of U.S. market participation).

[^187]: *See* <span class="smallcaps">Del. Code Ann</span>. tit. 8, § 131; <span class="smallcaps">Restatement (Third) of Agency</span> § 6.01 (agent who receives service of process on behalf of principal does not assume principal’s substantive obligations).

[^188]: *Supra* note 184 (evaluating every listed asset against legal, compliance and risk mitigation, and technical security standards).

[^189]: Securities Exchange Act § 6(b)(1), 15 U.S.C. § 78f(b)(1).

[^190]: Angelo Aspris, Sean Foley, Jiri Svec & Leqi Wang, *Decentralized Exchanges: The “Wild West” of Cryptocurrency Trading*, 77 Int’l Rev. Fin. Analysis 101845 (2021) (documenting 70-fold increase in trading volume following CEX listing of DEX-only tokens and finding that token holders exhibit strong preference for centralized exchange liquidity, revealing the price discovery and capital formation disadvantage borne by unlisted protocols)*.*

[^191]: *See* 17 C.F.R. § 275.206(4)-2(d)(6) (defining “qualified custodian” to mean a bank, a savings association with FDIC-insured deposits, a registered broker-dealer, a registered futures commission merchant, or a foreign financial institution that customarily holds financial assets for customers; decentralized exchange protocols satisfy none of these categories, requiring registered investment advisers to maintain client assets through centralized custodial channels as a condition of compliance); see also *Samuels*, 757 F. Supp. 3d at 959 (Paradigm: \$70 million; Andreessen Horowitz: \$70 million; Dragonfly: \$25 million, all invested through fund vehicles subject to institutional custody and investment constraints).

[^192]: OFAC, *Treasury Sanctions Notorious Virtual Currency Mixer Tornado Cash*, U.S. Dep’t of Treasury (Aug. 8, 2022), <https://home.treasury.gov/news/press-releases/jy0916> (stating that Tornado Cash had been used to launder more than \$7 billion in virtual currency since its creation in 2019). The Office of Foreign Assets Control is the Treasury Department’s sanctions enforcement arm, authorized under the International Emergency Economic Powers Act to designate individuals, entities, and, as Tornado Cash demonstrated, smart contract addresses as Specially Designated Nationals, whose U.S.-based assets are blocked and with whom U.S. persons are prohibited from transacting. *See* 50 U.S.C. § 1701 et seq.; 31 C.F.R. pt. 501.

[^193]: Securities Exchange Act § 19, 15 U.S.C. § 78s.

[^194]: Commodity Exchange Act § 5c, 7 U.S.C. § 7a-2.

[^195]: <span class="smallcaps">Wyo. Stat. Ann.</span> § 17-32-110.

[^196]: <span class="smallcaps">N.H. Rev. Stat. Ann.</span> § 301-B:9.

[^197]: *Samuels*, 757 F. Supp. 3d at 959.

[^198]: *Compare Sarcuni*, 664 F. Supp. 3d at 1116 (March 2023, token ownership alone sufficient), *with Samuels*, 757 F. Supp. 3d at 963-64 (November 2024, meaningful participation standard, but dismissing only one of four institutional defendants).

[^199]: *Samuels*, 757 F. Supp. 3d at 961 n.2 (acknowledging that whether every LDO holder or only those with “meaningful participation” are partners may become clearer through further litigation but declining to resolve the question at the pleading stage).

[^200]: *See supra* Part II (discussing Paradigm’s and Robot Ventures’ public blog posts, forum participation, and documented governance activity as the basis for the court’s meaningful participation finding).
