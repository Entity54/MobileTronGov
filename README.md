![license](https://img.shields.io/badge/License-Apache%202.0-blue?logo=apache&style=flat-square)

## This is a submission for Tron Hackathon Season 3. It is not production/battle-tested and audited software.

# **Tron Treasuries Governance**

### Demo Video

---

<p> A demo video of the mobile Dapp can be found <a href="https://youtu.be/yQklPZdsCng" target="_blank">here.</a>
</p>
<br>

<p> APK of the mobile Dapp for side loading on Android devices can be found <a href="https://youtu.be/yQklPZdsCng" target="_blank">here.</a>
</p>
<br>

## Project description

---

We believe that for the Tron ecosystem to grow even further a valuble service is needed to organise the promotion and advance of any Dapp.

This project aims to offer the ability to any Tron Deployed project to create and manage a treasury account and use it to fund any applicants (beneficiaries) that ask for funding to run any procedures, task and processes with the aim of promoting the project ecosystem

Example:
<br>
Assume we have Project ABC and that Alice is an enthusiast and follower of the project.
Alice believes she promote the Project ABC
Here are some examples:
<br>
a) Organise a physical conference with live broadcasting <br>
a) Run a Twitter / Reddit campaign <br>
b) Organise a hackathon <br>
d) Create Promotional or Educational Videos <br>
e) Write and Publish Medium articles <br>
f) Write documentation on “How to do” task on thhe project <br>
g) Write code for the project (dahsboards and analytics, mobile app, react websites, nfts) <br>
h) Create logos and promitional material <br>

<br>
Each task comes with different costs that can be quite different e.g. medium article, mobile app, nfts and different preparation and time allowance e.g. arrange conference hall, food for attendees

<br>
The natural questions that pop up are

1. What tasks Alice is good at and can contibute the most. Can we see any of her past workings.
2. Can we trust Alice will deliver the quality and quantity agreed at the start
3. Our community will have to weigh the singificance of each contibution and value for money.

On the other hand Alice needs to be sure that her work wil

1. be compensated as agreed and
2. she gets recognition for her work building her ratings profile so she can keep up good work

<br>
The critical parts of our project are:
<br>
a) Treasury Account.
The ability for any project, (e.g. Project ABC) to create a treasury account with a minimum funding. 
<br>
The project always has the ability to deposit or withdraw funds but to be an eligible treasury account it must always maintain a certain minimum balance
<br>
<br>
b) Beneficiary and Referendum
<br>
Anyone can create a Referendum applying for certain amount of TRX tokens from tbe Treasury account of a Project for a certain task which is described in detail in an IPFS stored file
<br>
The smart contract preserves a score rating (0 to 100 with 100 being best) for each applicant / beneficiary. Eveyone starts at 25 and this score permits the applicant to ask TRX tokens up to a certain band.
<br>
Every referendum comes with a predetermined score block where the relevant treasury account can score how well the applicant / beneficiary has used the funds to perform the task he asked the funds for.
For example if Alice writes of medium article with 1000 followers shows engagement and the treasury of Project ABC may score her with 75 increasing Alice's score in our Porject, consequencly expanding the amount of TRX Alice may request in her next Referendum
<br>
<br>

c) Voting
<br>
Any account can vote once only for any referendum expressing whether it is in favor of against of the referendum
<br>
A voter can express his preference indicating Aye or Nay and by transfering any amount of TRX currency together with a conviction number.
<br>
The conviction number starting from 0 indicating no multiplier and no lock up period and can be as high as 3 indicating a multipler of 4 and lock up period of 30 blocks since the conclusion of the referendum
<br>

> Note: The multiplier is used to enhance the vote weight.
> <br>
> For example if a voter has transfered 100 TRX coins with convition 0 and of direction Nay this carries a weight of 100 whereas if another voter has transferred 100 TRX coins with conviction 3 and direction Aye then this voting weight is 4\*100 = 400 and since 400 > 100 this results in the referndum passing
> <br> > <br>

d) Beneficiary Scoring
A business relation should be rewarded or punishhed depending on the quality of the work carried out versus the expectations. This also creates traction, loyalty and coninues growth.
<br>
For this reason when a referendum is created by a beneficiary, a variable of number of blocks for scoring date is passed. This number of blocks is added to the expiration block of a referendum and although dictated by the beneficiary asking for funding to perform a certain task, it should reflect the time in future (future block number) that the beneficiary expects that his work will be completed and ready for judging.
<br>

At that future block number the Treasury account that has sent the funding to the assed referendum beneficiary, can invoke a certain function to score the beneficiary for his work from 0 to 100 with 0 being poor and 100 very satisfactory. This scoring can be further enanced as an extension of our project to governance where the treasury account is controlled by a DAO
<br>

The average scoring of a beneficiary indicates how his work is rated across any past passed referndums and is stored in the smsrt contract.
<br>
Once a beneficiary’s score crosses certain band thresholds then higher amount of TRX coin fundig is unlocked allowing a beneficiary to progress from a medium aritcle for example to the coding of NFTs, or project conference organisation.
<br>

> Note: When a beneficiary creates a new refendum he passes certain information such as the treasuryAddress he requests the funding from, the amount of TRX, the IPFS CID file, in how many blcoks this refrendum should start, the duration of the refeendum and in how many blocks in the future from the refendum passed, his work can be scored.
> <br>

Ideally the benficiary should include in the IPFS CID file the title and decription of what task he/she will be performing incuding a full breakdown of expenses inccurred thar require funding
<br>
Failing to provide analytical information, allowing too short duration for the refrendum to be thoroughly studied by the community and then votted for, too distant period for scorring block number arrangement, will affect the mood the community in favor or against the referendum and therefore the concluding passing / not passing result
<br>

Note: There can be further additions to our project such as instigating a cool off period for an applicant or reducing his scoring for referendums he/she submitted and were not passed to motivate and promote good actors while simultaneously punish participants with malpractising.
<br>
Our own tokenomics and governance are the natural next steps to dictate relevant fees and to amend certain variables e.g. Funding Bands
<br>
<br>

> CONCLUSION
> <br>
> It is now easy for any Project ABC to create and manage a Treasury Account
> <br>
> It is now easy and fast for a skillful applicant and enthusiast of a Project to launch a new refrendum asking for funds to promote his/her favourite project
> <br>
> With Project Treasuries and their enthusiast skillfull applicants bonded in our project the Tron ecoystem can expand even faster

<br>
<br>

## Installation

---

Installations that also allow development:

```bash
$ brew install node
$ npm install -g expo-cli
```

Install Expo Go Mobile App

> GOOGLE PLAY STORE https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en&gl=US&pli=1 > <br>
> APP STORE https://apps.apple.com/us/app/expo-go/id982107779

Create a new folder and inside it:

```bash
$ git clone https://github.com/Entity54/Mobile-Governace-MoonbaseAlpha
$ npm install
$ expo start
$ QR code is produced in the terminal
```

### Mobile Dapp inside Expo Go Devleopment environment

---

<p>

STEP 1 - Open Expo Go on your mobile phone installed.
<br>
STEP 2 - Scan QR code shown in the temrminal (use Expo Go or Camera to scan QR code), so the app loads
<br>

<!-- ![plot](./MobileGovernanceAppPrintScreens/MobilePhone.png) -->

<br>
STEP 3 - Splash screen of Mobile Dapp loads. 
<br>
STEP 4 - List of active referenda loads. 
<br>

</p>

<br>
<br>

## User Journey

Lets now have an example run through for our main smart contract tronGovernance toghether with the Mobile Dapp

1. Project ABC calls smart contract launchNewTreasury function while trasnferring at least treasurerBalanceThreshold TRX coins (1100 TRX) by clicking SUBMIT button in the Treasuries screen of the bottom menu
   <br>
   A new smart contract of treasury.sol is created, and its address is stored in the main smart contract in the treasurers array with list of eligible treasury account that beneficiaries can ask for funding
   <br>
   Furthermore the TRX balance minus the 100 sun fee for the main smart contract is passed to the newly created treasurysmart contract.
   <br>

   > Note: The treasury smart contract has 2 admiistrators
   > The admin is the account that called the launchNewTreasury function and funded the treasury smart contract and it belongs to Project ABC. This admin can deposit and also withdraw all funding from the treasusy smart contract Project ABC now owns.
   > <br>
   > In addition the tronGovernace smart contract is the govAdmin of all treasury smart contracts being generated using the launchNewTreasury function. This permits the tronGovernace smart contract to call the sendTransfer function of the treasury address of a passed referendum in order to treansfer the requested TRX coins to the referendum beneficiary

2. Alice creates a new referendum passing
   a) the treasuryAddress of the Project ABC treasury smart contract that she wants to request funding for performing certain tasks promoting the project
   b) amount of TRX tokens she believes is required to perform the task
   c) IPFS CID that shows in greater details what the task is for e.g. for a Medium article with topic of Project ABC Staking 2.0 functionality
   d) 10 for startInNumBlocks dictating that the refendum should start in 10 blocks from submission allowing her enough time to inform the community that the referendum is about to start imminently
   e) duration as 100 blocks (can be up to 201600 blocks) specifying the duration of the refendum
   f) scoreInNumBlocks as 200 blocks, to be added to the expiration block number of the refendum and matching the point in time when her work is concluded and the respective treasury address of Project ABC can score her work increasing or decreasing her average score, affecting her future ability to raise funding from any of the eligible treasury smart contracts

3. The functions of updateQueuePreparRefBlocks, updateQueueActiveRefBlocks are used by the server to monitor whether the chain block number has approached the block number of any of the referenda that either are in prepartion phase to be activated or are about to expire.
   As soon as it is determined that the chain current block number satisfies any of the above conditions the enegy costing functions updatePreparedReferenda and updateActiveReferenda are called resulting in pushing prepared referendum to an active one and an active but now expired refrendum to expire referenda availble for historical retrieval.
   Part of the functionality of updateActiveReferenda function is to judge whether a now expired refendum has passed or not by comparing the Ayes vs Nays amounts and in case it is passed trigger the relevant treasury smart contract to transfer the requested amount of TRX coins to the respective referendum beneficiary.

4. Referendum participants can vote by calling the voteReferendum function transferring TRX coins and indicating the RefrendumID they want to vote for, together with the direction of their vote e.g. Aye or Nay and their conviction (which as explained further up entails a vote weight multipler but also possibly a lock period for the voter’s transferred TRX coins).
   Any account can only vote once per ReferednumID

5. The server is responsible in calling unlockVoteTokens to unlock amount of TRX coins for each Voter for any relevant referendum.

6. A voter can call at any time the withdrawVoteTokens to withdraw all unlocked TRX coins from historical refrenda he has participated in

7. When the time for scoring is due, the admin of a treasury smart contract can call scoreBeneficiary function stating the treasruyAddress (of which he must be admin of) the refrendum Index he is scoring for, and the actual score for the beneficiary.
   Knowing the referendum index the smart contract can locate the refeendum beneficiary address retrieve its historical score and update the new beneficiary address average score.

_. END ._
