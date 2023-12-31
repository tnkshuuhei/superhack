## Eternal Commons
We really like what Optimism Collective's RetroPGF is doing for OSS/digital public goods, making them sustainable and giving Exit to the public goods.

We wish we could create a system where not only Optimism, but more Blockchains and Rollups could easily give back to the ecosystem, and where Blockchains and digital public goods could continue to provide value with positive sums, so we We named it EternalCommons!

## Description
How can we effectively support and maintain open-source public goods that cannot or shouldn't be monetized, but are essential for everyone?

We've identified three key challenges:

1. The impact of funding open source public goods has not been measured.

2. Non-profit projects might be disadvantaged when evaluated alongside for-profit ones during the grant allocation process.

3. Non-profit projects, even if better suited, might consider transitioning to a for-profit model for long-term sustainability.

To tackle these concerns, we've crafted Eternal Commons, a funding tool for open-source public goods.

Eternal Commons is designed to be integrated into various ecosystems' grant programs. Although each ecosystem might tailor it for their convenience, the core functionality we've implemented effectively tackles the aforementioned issues.

It uses EAS for all processes, ensuring transparency. this data reveals project progress and grant distribution at different stages. The attestation that stacks up here can be repurposed, allowing the measured impact based on on-chain data as well.

Exclusively relying on RetroPGF might cause financial lag for open-source public goods. Thus, we've introduced a Milestone Grant as a fundamental feature, accessible between project rounds.

Projects submit milestone and deadline for evaluation. The Milestone Grant amount is determined accordingly. Meeting the criteria guarantees the grant, enhancing project sustainability for the interim period, even if the grant size is modest. This assures smoother project management until the next round.

Providing incentives for continued development by the community for OSS, digital public goods, etc. will ultimately lead to the growth of the ecosystem. As a result, each blockchain ecosystem will thrive and protocol revenues will increase. 

This cycle, in turn, fosters a positive-sum ecosystem with ongoing funding opportunities for OSS developers.

Combined with Impact certification such as Hypercert, something like a carbon credit market could also be created on top of this.

This wonderful future has motivated us to build EternalCommons!

## How we have made
On-chain information, mainly EAS, is being fetched, along with the very nice endpoints they provide.

In creating this product, utility functions such as schema and [Quadratic Funding](https://www.wtfisqf.com/) have been created.

Here is a use flow and descriptions what technologies are used in each part :

1. Project owners apply for Grant Round when it is open.
- Each application is attested with EAS.
- Project owners can apply for this in front-end built with Next.js.


2. they will be listed on front-end.
- Dashboard is available.


3. Community members can post reputation of each project after they are verified as an unique person. Sybil resistance in community reputation is very important as Gitcoin is working on the GItcoin passport.
- World ID contract helps to verify each community member as an unique person.
- Verified community members are attested with EAS.
- Verified community members can post reputation with attestation.
- Posting format is on UI.


4. Voters can allocate any number of points from their 100 points to any of the projects.(In this use flow, 100 points is assumed, but it can be changed.)
- Each evaluation and allocation are attested with EAS.
- Allocation is calculated with voting based Quadratic Funding formula
- Voters can do the whole process on UI.


5.  The grant amount for each project will be determined according to the points awarded, and the grant amount will be sent to the wallet address entered in the application.
- Payment info including tx hash is attested with EAS.
- Project owners can check their status on UI.


6. After the Grant Round ends, project owners can submit their 1 milestone, its deadline and requested amount to apply for Milestone Grant.
- Milestone applications are attested with EAS.


7. Applications are reviewed by a grant provider(e.g. Ecosystem foundation) and there may be adjustment of amount or submitted application could be rejected for some reasons, but if approved, projects unconditionally receive the approved amount as long as you meet the submitted milestone before the deadline. 
- Approved amount and other info are attested with EAS.


8. Project owners submit proof of milestone by deadline.
- Submitted contents are attested with EAS.
- Project owners can check their status on UI.


9. A grant provider checks whether it is accomplished and pay approved amount if so.
- Submitted contents are reviewed by Grant Provider and attested with EAS.
- Project owners can check their status on UI.
- Payment info including tx hash is attested with EAS.


## Deployed contracts and links
The resolver contract receives the merkle_root etc. created when the user authenticates with WorldId and checks whether the user is eligible to add Reputation.

[resolver contract](https://goerli-optimism.etherscan.io/address/0x34935aa4901AC9ff27bF536CB84D90e409d47a2b#code)

[Schema](https://github.com/tnkshuuhei/superhack/blob/92bcd96ce404ecb01c386a0ef004e6fa32ef7193/utils/schema.ts#L1)

## Tech stack
- Next.js / Vercel
- JS/TS/Solidity
- Hardhat/Wagmi/Rainbow-kit/Ethers
- GraphQL
- EAS contract/SDK
- WorldID
- Optimism

## Huge thanks to
- EthGlobal team
  - appreciate for this amazing oppotunity!!
- Optimism team
  - We are incorporating the activities and workflow of the Optimism Collective as a tool to easily launch RetroPGF, as Impact is difficult to assess/measure, User Reputation by the community will help to assess Impact. The Milestone base grant system, based on Attestation, is a new initiative to fund projects as long as they continue to deliver Impact, with a shorter cash flow than RetroPGF.
Also, our EAS custom resolver contract is live on Optimism.
Through the Eternal Commons, we will spread the belief of the Optimism Collective across the network.
- EAS team
  - EternalCommons is an architecture based on EAS, a tool that allows RetroPGF to be easily launched, with all data inscribed on-chain via EASschema/Attestation. In addition, custom resolver and worldId authentication are combined to achieve sybil resistance in community Reputation.
- Worldcoin team
  - Civil tolerance is a major issue in our Eternal Commons. It is quite difficult to prevent collusion and sybil attacks in the blockchain space, as gitcoin is working on gitcoin passport. However, worldID's strong proof of humanity and our EAS custom resolver contract provide strong sybil resistance.

and some other refference:
- https://mirror.xyz/cerv1.eth/tCjpRODfiYpnKIgPLRplW0lAopVP3no_JmI34dNsAWk
- https://gov.optimism.io/t/measuring-impact-data-driven-content-performance/6092
- https://gov.optimism.io/t/retropgf-round-2-voting-rationale/5570
- https://gov.gitcoin.co/t/impact-certificates-proposals-wanted/10499
- https://www.gitcoin.co/
- https://hypercerts.org/
- https://www.wtfisqf.com/
- https://github.com/anish-agnihotri/quadratic-funding

## Team
- [Mohak](https://github.com/Mnm458)
- [Steve](https://github.com/tnkshuuhei)
- [Hiro](https://github.com/ppoy05)

## Getting Started

setup frontend

```bash
npm install
# or
yarn install
# or
pnpm install
```
run frontend server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

setup .env file foth frontend/smartcontracts by following .envexample file

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
