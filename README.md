This project aims to offer the ability to any Tron Deployed project to create and manage a treasury account and use it to fund any applicants that ask for funding to run any procedures, taks and processes with the aim of promoting the project ecosystem

Example:
Assume we have Project ABC and that Alice is an enthusiast and follower of the project.
Alice believes she can run a twitter marketing campaign to promote the project
Example of other tasks to promote the ecosystem and might be eligible for funding are
a) Run a Reddit campaign
b) Organise a hackathon
c) Organise a physical conference with live broadcasting
d) Create Promotional or Educational Videos
e) Write and Publish Medium articles
f) Write documentation on “How to do” task on thhe project
g) Write code for the project (dahsboards and analytics, mobile app, react websites, nfts)
h) Create logos and promitional material

Which task aims to promote the Project ecosystem but there is a catch 22
Firstly each task comes with diffenret cost that can be magnitudes apart e.g. medium article, mobile app, nfts
The natural questions that pop up are

1. What tasks Alice is good at and can contibute the most. Can we see any of her past workings.
2. Can we trust Alice will deliver the quality and quantity agreed at the start
3. Our community will have to weigh the singificance of each contibution and value for money.

On the other hand Alice need to be sure that her work wil

1. be compensated as agreed and
2. she gets recognition for her work building her profile in regards to project ABC so she can keep up good work

The critical parts of our project are:
a) Treasury Account.
The ability for any project to create a treasury account with a minimum funding. The project always has the ability to deposit or withdraw funds but to be an eligible treasury account it must always maintain a certain minum balance
b) Beneficiary and Referendum
Anyone can create a Referendum applying for certain amount of TRX tokens from tbe Treasury account for a certain task described in detail in an IPFS stored file
c) Voting
Any account can vote once only for any referendum expressing whether it is in favor of against of the referendum
A voter can express his preference indicating Aye or Nay and by transfering any amount of TRX currency together with a conviction number. The conviction number start from 0 indicating no multiplier and no lock up period and can be as high as 3 incation a multipler of 4 and lock up period of 30 blocks since the conclusion of the referendum
Note: The multiplier is used to enhance the vote weight. For example if a voter has transfered 100 TRX coins with convition 0 and of direction Nay this carries a wieght of 100 whereas if another voter has transferred 100 TRX coins with conviction 3 and direction Aye then this voting weight is 4\*100 = 400 and since 400 > 100 this results in the referndum paasing
d) Beneficiary Scoring
A business relation should be rewarded or punishhed depending on the quality of the work carried out versus the expectations. This also creates traction, loyalty and coninues growth.
For this reason when a referendum is created by a beneficiary, a variable of number of block for scoring date is passed. This number og blocks is added to the exiration block of a referendum and although dictated by the beneficiary asking for funding to perform a certain task, it should reflect the time in future (future block number) that the beneficiary expects that his work will be completed.
At that future block number the Treasury account that has send the funding to the Passed referendum beneficiary, can invoke a certain function to score the beneficiary for his work from 0 to 100 with 0 being poor and 100 very satisfactory. This scoring can be further enanced as an extension of our project to governance where the treasury account is controlled by a DAO

The average scoring of a benficiary indicates how his work is rated across any past passed referndums and is store in the smsrt contract. Once a benficiary’s score crosses certain band thresholds then higher amount of TRX coin fundig is unlocked allowign a beneficiary to progress from a medium aritcle for example to the coding of NFTs, or project conference organisation.

Note: When a beneficiary creates a new refendum he passes certain inforamtion such as the treasuryAddress he requests the funding from, the amount, the IPFS CID file, in how many blcoks this refrendum should start, the duration of the refeendum and in how many block in the future from the refendum passed, his work can be scored.

Ideally the benficiary should include in the IPFS CID file the title and decription of what task he/she will be performing incuding a full breakdown of expenses inccurred thar require funding
Failing to provide analytical inforamtion, allowing too short duration for the refrendum to be thoroughly studied by the community and then votted for, too distant period for scorring block number arrangement will affect the mood the community has in favor or against the referendum and therefore the concluding passing / not passing result

Note: There can be further addition to our project such as instigating a cool of period for an applicant or reducing hhis scoring for referendums he/she submitted and were not passed to motivate adn promote good actors while simultaneously punish participants with malpractising

Lets now have an example run through for our main smart contract tronGovernance

1. Project ABC calls launchNewTreasury function while trasnferring at least treasurerBalanceThreshold TRX coins (1100 sun)
   A new smart contract of treasury.sol is created, and its address is stored in the main smart contract in the treasurers array with list of eligible treasury account that beneficiaries can ask for funding
   Furthermore the TRX balance minus the 100 sun fee for the main smart contract is passed to the newly created treasurysmart contract.
   Note: The treasury smart contract has 2 admiistrators
   The admin is the account that call the launchNewTreasury function and funded the treasury smart contract and it belongs to Project ABC. This admin can deposit and also withdraw all funding from the treasusy smart contract project ABC now owns.
   In addition the tronGovernace smart contract is the govAdmin of all treasury smart contracts beign generated usign the launchNewTreasury function. This permits the tronGovernace sc to call sendTransfer function of the treasury address of a passed referendum in order to treansfer the requested TRX coins to the referendum beneficiary

2. Alice creates a new referendum passing
   a) the treasuryAddress of the Project ABC treasury smart contract that she wants to request fundign for perfomring certain tesks beneficiary to the project
   b) amoun of TRX tokens she believes is require to perform the task
   c) IPFS CID that shows in greater details what the task is for e.g. for a Medium article with topic of Project ABC Staking 2.0 functionality
   d) 10 for startInNumBlocks dictating that the refendum should start in 10 blocks from submission allowing her enough time to inform the community that the referendum is about to start imminently
   e) duration as 100 blocks (can be up to 201600 blocks) specifying the duration of tghe refendum
   f) scoreInNumBlocks as 200 blocks, to be added to the expiration block number of the refendum and matching the point in time when her work is concluded and the respective treasury address of Project ABC can score her work increasing or decreasing her average score, affecting her future ability to raise funding from any of the eligible treasury smart contracts

3. The functions of updateQueuePreparRefBlocks, updateQueueActiveRefBlocks are used by the server to monitor whether the chain block number has approached the block number of any of the referenda that eithher are in prepartion phase to be activated or are about to expire.
   As soon as it is determined that the chain current block number satisfies any of the above conditions the enegy costning functions updatePreparedReferenda and updateActiveReferenda are called resulting in pushing prepared referendum to an active one and an active but now expired refrendum to expire referenda availble for historical retrieval.
   Part of the functionality of updateActiveReferenda fucntion is to judge whether a now expired refendum has passed or not by comparing the Ayes vs Nays amounts and in case it is passed trigger the relevant treasury smart contract to transfer the requested amount of TRX coins to the respective referendum beneficiary.

4. Referendum participants can vote by calling the voteReferendum function transferring TRX coins and indicating the RefrendumID they want to vote for, together with the direction of thheir vote e.g. Aye or Nay and their conviction (which as explained further up entails a vote weight multipler but also possibly a lock period for the voter’s transferred TRX coins).
   Any account can only vote once per ReferednumID

5. The server is responsible in calling unlockVoteTokens to unlock amount of TRX coins for each Voter for any relevant refrendum.

6. A voter can call at any time the withdrawVoteTokens to withdraw all unlocked TRX coins from hisotrical Refrendum he has participated in

7. When the time for scroing is due, the admin of a treasury smart contract can call scoreBeneficiary function stating the treasruyAddress (of which hhe must be admin of) the refrendum Index he is scoring for and the actual score.
   Knowing the referendum index the smart contract can locate the refeendum beneficiary address retrieve its historical score and update the new beneficiary address average score.

_. END ._
