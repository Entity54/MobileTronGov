import TronWeb from 'tronweb/dist/TronWeb.js';
import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


import TronGovernance_raw from '../Abis/tronGovernance.json';     
const tronGovernance_ABI = TronGovernance_raw.abi;
// ****************************************************************************
const tronGovernanceContractAddress = "TBHLsbmX2mhSyWjXdh1fciCmHNbXHca8Yy";
// ****************************************************************************


const TronGridApiKey = "2a285484-2e03-4082-af1a-389b53879ec3";

const GovContext = React.createContext();

export const GovProvider = ({children}) => {

    // const [name, setName] = useState();
    // const [wallet, setWallet] = useState();
    // const [scComs, setScComs] = useState();
    // const [scGov, setScGov] = useState();
    // const [scChannels, setScChannels] = useState();

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
            //WRITE TRON WEB LOGIC HERE
            //ACCOUNT BALANCE
            //ACTIVE REFERENDA
            //PREPARED REFERENDA
            //EXPIRED REFRENDA
            //TREASURY ACCOUNTS
            setRefreshCounter(refreshCounter+1)
        },30000);
    }

   
    //#region readAccount
    const readAccount= async () => {
        console.log(`****** Read Stored account *******`);
        let storedAccount;
        try {
          // const value = await AsyncStorage.getItem('@storage_Key')
          const accountJSON = await AsyncStorage.getItem('@account');
          storedAccount = JSON.parse(accountJSON);
          console.log(`RETRIEVED account : `,JSON.stringify(storedAccount,null,"\t"));
          return storedAccount;
  
                //   if(storedAccount !== null) {
                //     console.log(`Setting New Account`);
                //     // address: {
                //     //             base58: "TPbBpRXnt6ztse8XkCLiJstZyqQZvxW2sx", 
                //     //             hex: "4195679F3AAF5211991781D49B30525DDDFE9A18DE"
                //     //           }
                //     //  privateKey: "08089C24EC3BAEB34254DDF5297CF8FBB8E031496FF67B4EFACA738FF9EBD455"
                //     //  publicKey:  "04EE63599802B5D31A29C95CC7DF04F427E8F0A124BED9333F3A80404ACFC3127659C540D0162DEDB81AC5F74B2DEB4962656EFE112B252E54AC3BA1207CD1FB10"
                //     setAccount(storedAccount.address.base58);
                //     return storedAccount;
                //   }
        } catch(e) {
          console.log(`GovContext Error in reading AsyncStorage storedAccount. Perhaps you have not set up an account yet`);
          return null;
        }
        
    }
    //#endregion



  
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
    

    //#region performTronWebActions
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
          //   refreshValues();

                // console.log(`****** performTronWebActions Create New account ******* 2 n`);
                //  const newAccount = await tronWeb.createAccount();
                // console.log(`****** performTronWebActions Create New account ******* 2 newAccount: `,newAccount);

        }
    
        if (tronWeb) {
          console.log(`==> GovContext tronWeb is now defined`);
          performTronWebActions();
        }
    },[tronWeb]);
    //#endregion


    //#region updateTronWeb
    //    const updateTronWeb = async (_tronWebd) => {
    const updateTronWeb = async () => {
        // setTronWeb(_tronWebd);
        // console.log(` ||||||>>>>****** performTronWebActions Create New account ******* 2 n`);
        // const newAccount = await 
        // _tronWebd.createAccount()
        // .then(res => {
        //     console.log(`Reesult: `,res);
        // })
        // .catch(er => {
        //     console.log(`Error in creating New Account Error: `,er);
        // });
        // console.log(` ||||||>>>>****** performTronWebActions Create New account ******* 2 newAccount: `,newAccount);

        
        console.log(`GovContext updateTronWeb updateTronWeb  Setting Up HttpProvider`);
        const HttpProvider = TronWeb.providers.HttpProvider;
        const fullNode = new HttpProvider("https://api.nileex.io");
        const solidityNode = new HttpProvider("https://api.nileex.io");
        const eventServer = new HttpProvider("https://api.nileex.io");

        console.log(`GovContext updateTronWeb Getting stored Account`);
        const accont = await readAccount();
        console.log(`GovContext  updateTronWeb Account: ${accont}`);


        if (accont && Object.keys(accont).includes("address"))
        {
            console.log(`GovContext updateTronWeb  Account Found : `,JSON.stringify(accont,null,"\t"));
            // setAccountPublicAddress(account.address.base58);
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

    

            
    useEffect(() => {
        console.log(`GovContext Create TronWeb on load 1`);
        updateTronWeb()

        // console.log(" ****************** ");
        // const newAccount = TronWeb.createAccount();
        // console.log(`createNewAccount=> newAccount: `,newAccount);
        // const newAccountJSON = JSON.stringify(newAccount);
        // console.log(`createNewAccount=> newAccountJSON: `,newAccountJSON);
        // console.log(" ****************** ");

    },[]);



    // const updateTronGovSC = (_tronGovernanceSC) => {
    //     setTronGovernanceSC(_tronGovernanceSC);
    // }

    // const updateSignerElements = (_wallet, _scComs, _scGov, _scChannels) => {
    //     setWallet(_wallet);
    //     setScComs(_scComs);
    //     setScGov(_scGov);
    //     setScChannels(_scChannels)
    // }


    // return <GovContext.Provider value={{wallet, scComs, scGov, updateSignerElements, scChannels, tronWeb, updateTronWeb, tronGovernanceSC, updateTronGovSC  }} >
    return <GovContext.Provider value={{ tronWeb, updateTronWeb, tronGovernanceSC, band1, band2, band3,  updateCurrentBlockNumber, currentBlockNumber, accountUpdated, account, readAccount, refreshCounter }} >
        {children}
    </GovContext.Provider>;
};

export default GovContext;



