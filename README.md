## Project Name
Eternal Commons

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


## How we have made
Here is a use flow and descriptions what technologies are used in each part :

1. Project owners apply for Grant Round when it is open.
- Each application is attested with EAS.
- Project owners can apply for this in front-end built with Next.js.


2. they will be listed on front-end.
- Dashboard is available.


3. Community members can post reputation of each project after they are verified as an unique person.
- World ID contract helps to verify each community member as an unique person.
- Verified community members are attested with EAS.
- Verified community members can post reputation with attestation.
- Posting format is on UI.


4. Voters can allocate any number of points from their 100 points to any of the projects.(In this use flow, 100 points is assumed, but it can be changed.)
- Each evaluation and allocation are attested with EAS.
- Calculation method is based on Quadratic Funding.
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

## Tech stack
- Next.js / Vercel
- JS/TS/Solidity
- Alchemy
- Hardhat/Thirdweb/Wagmi/Rainbow-kit
- GraphQL
- EAS contract/SDK
- WorldID
- Optimism/Base/ZORA

## Huge thanks to
- EthGlobal team
- Optimism team
- EAS team
- The Graph team
- Worldcoin team

## Team
Mohak github@Mnm458
Steve github@tnkshuuhei
Hiro @ppoy05

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
