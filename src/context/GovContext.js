import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import TronWeb from 'tronweb/dist/TronWeb.js';


import TronGovernance_raw from '../Abis/tronGovernance.json';     
const tronGovernance_ABI = TronGovernance_raw.abi;

// ****************************************************************************
const tronGovernanceContractAddress = "TBHLsbmX2mhSyWjXdh1fciCmHNbXHca8Yy";
// ****************************************************************************


//IPFS Key
const jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIyZTMzMzA0My0xZmZjLTQxNGQtYjFmMC0yZGQ2MThjZjlhY2QiLCJlbWFpbCI6ImFuZ2RpYW1kMkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiZTI3ZmMyMDI0NjVmNDM3MTJiM2EiLCJzY29wZWRLZXlTZWNyZXQiOiI4NmVhMWFkMWNhZWMwYTI4NWRhMzY2ZmY4YzI0ODgwODU2NGY4ZTcwNmM0YWNkMmVlNGFmMmFmOWZmYWU1NDM2IiwiaWF0IjoxNjY2MjcwNTU1fQ.RN7MVo1NdUxcVEgwl5g0ZUChERr2iyzmA0-Eb4V7oLQ";
//TRONGov
// const jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIyZTMzMzA0My0xZmZjLTQxNGQtYjFmMC0yZGQ2MThjZjlhY2QiLCJlbWFpbCI6ImFuZ2RpYW1kMkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiYmYzZGJlN2I0YTkwYzRkZTgwNTgiLCJzY29wZWRLZXlTZWNyZXQiOiJhN2FmZTc4YjI4OTI2NzM2YzAzNzA1MDY4MWUyYmZiMjRlNzVmYTEwMTlhNTA3N2Y3MTc3MTRmYjA1ZjAwNmZhIiwiaWF0IjoxNjY4MTExMzI4fQ.CQchH2ytw1_3pHTFgWcb-rFkL4mfP4DuFsS_-pt6grs";


const GovContext = React.createContext();

export const GovProvider = ({children}) => {

    const [tronWeb, setTronWeb] = useState();
    const [tronGovernanceSC, setTronGovernanceSC] = useState();
    const [currentBlockNumber, setCurrentBlockNumber] = useState();
    const [accountUpdated, setAccountUpdated] = useState(true); //useState(false);
    
    const [account, setAccount] = useState();
    const [band1, setBand1] = useState(0);
    const [band2, setBand2] = useState(0);
    const [band3, setBand3] = useState(0);

    const [refreshCounter, setRefreshCounter] = useState(0);


    let intevalId;
    const refreshValues = () => {
        if(intevalId) {
            console.log(`Clearing last interval and launching a first one`);
            clearInterval(intevalId);
            setRefreshCounter(0);
        }

        intevalId = setInterval( () => {
            console.log(`refreshCounter: ${refreshCounter}`);
            setRefreshCounter(refreshCounter+1)
        },30000);
    }

   
    const readAccount= async () => {
        console.log(`****** Read Stored account *******`);
        let storedAccount;
        try {
          const accountJSON = await AsyncStorage.getItem('@account');
          storedAccount = JSON.parse(accountJSON);
          console.log(`RETRIEVED account : `,JSON.stringify(storedAccount,null,"\t"));
          return storedAccount;
            // address: {
            //             base58: "TPbBpRXnt6ztse8XkCLiJstZyqQZvxW2sx", 
            //             hex: "4195679F3AAF5211991781D49B30525DDDFE9A18DE"
            //           }
            //  privateKey: "08089C24EC3BAEB34254DDF5297CF8FBB8E031496FF67B4EFACA738FF9EBD455"
            //  publicKey:  "04EE63599802B5D31A29C95CC7DF04F427E8F0A124BED9333F3A80404ACFC3127659C540D0162DEDB81AC5F74B2DEB4962656EFE112B252E54AC3BA1207CD1FB10"
        } catch(e) {
          console.log(`GovContext Error in reading AsyncStorage storedAccount. Perhaps you have not set up an account yet`);
          return null;
        }
        
    }



  
    //#region
    // useEffect(() => {
    //     const initiateValues = async () => {
    //         console.log(`GovContext Initiating Values`);
    //         //   const admin  = await tronGovernanceContract.admin().call();
    //         //   console.log(`||||>>>>>> tron Governance admin: ${admin} `);  //||||>>>>>> tron Governance admin: 41da7b7457b4e71796cee8a466a1a3a635fad45451 
    //         const band_1  = await tronGovernanceSC.band1().call();
    //         const band_2  = await tronGovernanceSC.band2().call();
    //         const band_3  = await tronGovernanceSC.band3().call();
    //         console.log(`GovContext band1: ${band_1} band2: ${band_2} band3: ${band_3}`);
    //         setBand1(band_1); setBand2(band_2); setBand3(band_3);
    //     }   
    //     if (tronGovernanceSC) initiateValues();   
    // },[tronGovernanceSC]);
    //#endregion

    
    const updateCurrentBlockNumber =  (_currentBlockNumber) => {
        setCurrentBlockNumber(_currentBlockNumber);
    }
    

    useEffect(() => {
        const performTronWebActions = async () => {
          console.log(`GovContext Setting up tronGovernanceContract`); 
          // const tronGovernanceContract = await tronWeb_server.contract().at(tronGovernanceContractAddress);
          const tronGovernanceContract = await tronWeb.contract(tronGovernance_ABI, tronGovernanceContractAddress);
          
          console.log(`GovContext Initiating Values`);
          const band_1  = await tronGovernanceContract.band1().call();
          const band_2  = await tronGovernanceContract.band2().call();
          const band_3  = await tronGovernanceContract.band3().call();
          console.log(`GovContext band1: ${band_1} band2: ${band_2} band3: ${band_3}`);
          setBand1(band_1); setBand2(band_2); setBand3(band_3);
          setTronGovernanceSC(tronGovernanceContract);
          refreshValues();
        }
    
        if (tronWeb) {
          console.log(`==> GovContext tronWeb is now defined`);
          performTronWebActions();
        }
    },[tronWeb]);


    //#region updateTronWeb
    const updateTronWeb = async () => {
        console.log(`GovContext updateTronWeb updateTronWeb  Setting Up HttpProvider`);
        const HttpProvider = TronWeb.providers.HttpProvider;
        const fullNode = new HttpProvider("https://api.nileex.io");
        const solidityNode = new HttpProvider("https://api.nileex.io");
        const eventServer = new HttpProvider("https://api.nileex.io");

        console.log(`GovContext updateTronWeb Getting stored Account`);
        const {_W: accont} = await readAccount();
        console.log(`GovContext  updateTronWeb Account: ${accont}`);


        if (accont && Object.keys(accont).includes("address"))
        // if (accont)
        {
            console.log(`GovContext updateTronWeb  Account Found : `,JSON.stringify(accont,null,"\t"));
            console.log(`GovContext updateTronWeb  Setting Up fullHost for account ${accont.address.base58}`);
            setAccount(accont.address.base58);
            setTronWeb(new TronWeb(fullNode,solidityNode,eventServer,accont.privateKey));
            setAccountUpdated(true);
        }
        else {
            console.log("GovContext updateTronWeb  Account Not found");
            const defaultPublickey = "TCWNqQsbojjsey8jTEJgsC2RiPGyRzA5GA";
            const defaultPrivateKey = "bb4a09b98dfa5e263011c4023a2075c16c0a0ef961d32e7f28bd1eb1d4ad377b";
            console.log(`GovContext updateTronWeb  Please set up your onw account`);
            const tempTronWeb = new TronWeb(fullNode,solidityNode,eventServer,defaultPrivateKey);
            setAccount(defaultPublickey);
            setTronWeb(tempTronWeb);
        }

    }
    //#endregion


    //#region IPFS PINNING
    //#region ***** Uploading and Pinning JSON **********
    const pinJSONToIPFS = async (title, treasuryAddress, requestedAmount, startInNumBlocks, durationNumBlocks, scoringNumberOfBlocks, description) => {
        //IPFS Key
        const adminJWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIyZTMzMzA0My0xZmZjLTQxNGQtYjFmMC0yZGQ2MThjZjlhY2QiLCJlbWFpbCI6ImFuZ2RpYW1kMkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiZTI3ZmMyMDI0NjVmNDM3MTJiM2EiLCJzY29wZWRLZXlTZWNyZXQiOiI4NmVhMWFkMWNhZWMwYTI4NWRhMzY2ZmY4YzI0ODgwODU2NGY4ZTcwNmM0YWNkMmVlNGFmMmFmOWZmYWU1NDM2IiwiaWF0IjoxNjY2MjcwNTU1fQ.RN7MVo1NdUxcVEgwl5g0ZUChERr2iyzmA0-Eb4V7oLQ";

        const metadataJSON = JSON.stringify({name: title});
        const myData = { title, treasuryAddress, requestedAmount, startInNumBlocks, durationNumBlocks, scoringNumberOfBlocks, description, };
        const jsonToStore = JSON.stringify(myData);
        
        const data = JSON.stringify({
                "pinataOptions": {
                    "cidVersion": 1
                },
                "pinataMetadata": metadataJSON,
                "pinataContent" : jsonToStore
        });

        const config = {
            method: 'post',
            url: 'https://api.pinata.cloud/pinning/pinJSONToIPFS',
            headers: { 
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${adminJWT}`,
            },
            data : data
        };

        const result = await axios(config);
        console.log("We have successfully PINNED a JSON",result.data);
        // We have successfully PINNED a JSON Object {
        //     "IpfsHash": "bafkreiesv6qdwmo4qqbtjsjsm2k2ygxy2jgb6qrpsffoqle3gyejp7xa6q",
        //     "PinSize": 889,
        //     "Timestamp": "2022-11-09T17:11:28.552Z",
        //     "isDuplicate": true,
        // }
        return result.data;
    }

    // const descript = `We want to promote Tron Ecosystem in Europe. Physical conferences will be held in major cities like Berlin, London, Paris, Stockholm,
    // Brussels, Madrid, Rome. These conference will be broadcasted. We will bring key speakers to explain the huge advantages of the Tron Blockchain.
    // There will also be a second stage for Ecosystem Projects to Pitch their projects.
    // Furthermore we will organise a mini hackathon both physical and virtual to promote buildign on Tron.
    // Marketing material will be prepared and distributed both in social media such as twitter but also leaflets in central points of the aforementioned cities
    // `;
    // pinJSONToIPFS("Promoting Tron in Europe", "TP41sdljfhsldfssdfsdfjsdfjsldf", "12345", "20", "69000", "25000", descript);
    //#endregion ***** Uploading and Pinning JSON **********


    //#region ***** Retrieving Content from IPFS **********
    const retrieveContentfromIPFS = async (CID) => {
        const config = {
            method: 'get',
            url: `https://gateway.pinata.cloud/ipfs/${CID}`,
        };

        const result = await axios(config);
        console.log(` ************************************ `);
        console.log(`retrieveContent for CID: ${CID} : `,result.data);
        console.log(` ************************************ `);
        // retrieveContent for CID: bafkreiesv6qdwmo4qqbtjsjsm2k2ygxy2jgb6qrpsffoqle3gyejp7xa6q :  
        // {"title":"Promoting Tron in Europe","treasuryAddress":"TP41sdljfhsldfssdfsdfjsdfjsldf","requestedAmount":"12345","startInNumBlocks":"20","durationNumBlocks":"69000","scoringNumberOfBlocks":"25000","description":"We want to promote Tron Ecosystem in Europe. Physical conferences will be held in major cities like Berlin, London, Paris, Stockholm,\n    Brussels, Madrid, Rome. These conference will be broadcasted. We will bring key speakers to explain the huge advantages of the Tron Blockchain.\n    There will also be a second stage for Ecosystem Projects to Pitch their projects.\n    Furthermore we will organise a mini hackathon both physical and virtual to promote buildign on Tron.\n    Marketing material will be prepared and distributed both in social media such as twitter but also leaflets in central points of the aforementioned cities\n    "}
        return result.data;
    }

    // const CID_ = "bafkreiesv6qdwmo4qqbtjsjsm2k2ygxy2jgb6qrpsffoqle3gyejp7xa6q";
    // retrieveContentfromIPFS(CID_);
    //#endregion ***** Retrieving Content from IPFS **********
    //#endregion IPFS PINNING
    

            
    useEffect(() => {
        console.log(`GovContext Create TronWeb on load`);
        updateTronWeb()
    },[]);


    return <GovContext.Provider value={{ tronWeb, updateTronWeb, tronGovernanceSC, band1, band2, band3,  updateCurrentBlockNumber, currentBlockNumber, accountUpdated, account, readAccount, refreshCounter, retrieveContentfromIPFS, pinJSONToIPFS }} >
        {children}
    </GovContext.Provider>;
};

export default GovContext;
