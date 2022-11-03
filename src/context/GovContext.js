import React, {useState, useEffect} from 'react';

import TronGovernance_raw from '../Abis/tronGovernance.json';     
const tronGovernance_ABI = TronGovernance_raw.abi;
// ****************************************************************************
const tronGovernanceContractAddress = "TBHLsbmX2mhSyWjXdh1fciCmHNbXHca8Yy";
// ****************************************************************************



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


    const updateTronWeb = (_tronWebd) => {
        setTronWeb(_tronWebd);
    }

    const updateCurrentBlockNumber =  (_currentBlockNumber) => {
        setCurrentBlockNumber(_currentBlockNumber);
    }

    // const updateTronGovSC = (_tronGovernanceSC) => {
    //     setTronGovernanceSC(_tronGovernanceSC);
    // }

    useEffect(() => {
  
        const performTronWebActions = async () => {
          // const tronGovernanceContract = await tronWeb_server.contract().at(tronGovernanceContractAddress);
          const tronGovernanceContract = await tronWeb.contract(tronGovernance_ABI, tronGovernanceContractAddress);
          setTronGovernanceSC(tronGovernanceContract);


        //   const admin  = await tronGovernanceContract.admin().call();
        //   console.log(`||||>>>>>> tron Governance admin: ${admin} `);  //||||>>>>>> tron Governance admin: 41da7b7457b4e71796cee8a466a1a3a635fad45451 
  
        //   const activeReferendaIDarrayUint  = await tronGovernanceContract.getActiveReferenda().call();
        //   const activeReferendaIDarray = activeReferendaIDarrayUint.map(itm => `${itm}`);
        //   console.log(`activeReferendaIDarray: `,activeReferendaIDarray);
  
        //   const referendumDetails  = await tronGovernanceContract.referendumDetails(1).call();
        //   // console.log(`referendumDetails: `,referendumDetails);
        //   console.log(`CONTEXT referendumDetails=> Referendum_Id ${referendumDetails[0]}`);
        //   console.log(`CONTEXT referendumDetails=> Referendum_Beneficiary ${referendumDetails[1]}`);
        //   console.log(`CONTEXT referendumDetails=> Referendum_Treasury ${referendumDetails[2]}`);
        //   console.log(`CONTEXT referendumDetails=> Referendum_Amount ${referendumDetails[3]}`);
        //   console.log(`CONTEXT referendumDetails=> Referendum_CID ${referendumDetails[4]}`);
  
        //   console.log(`CONTEXT referendumDetails=> Referendum_startBlock ${referendumDetails[5]}`);
        //   console.log(`CONTEXTreferendumDetails=> Referendum_endBlock ${referendumDetails[6]}`);
        //   console.log(`CONTEXT referendumDetails=> Referendum_ScoreBlock ${referendumDetails[7]}`);
        //   console.log(`CONTEXT referendumDetails=> Referendum_Ayes ${referendumDetails[8]}`);
        //   console.log(`CONTEXT referendumDetails=> Referendum_Nays ${referendumDetails[9]}`);
        //   console.log(`CONTEXT referendumDetails=> Referendum_Turnout ${referendumDetails[10]}`);
        //   console.log(`CONTEXT referendumDetails=> Referendum_Passed ${referendumDetails[11]}`); //false

        }
    
        if (tronWeb) {
          console.log(`==> tronWeb is now defined`);
          performTronWebActions();
        }
    
      },[tronWeb]);

    // const updateSignerElements = (_wallet, _scComs, _scGov, _scChannels) => {
    //     setWallet(_wallet);
    //     setScComs(_scComs);
    //     setScGov(_scGov);
    //     setScChannels(_scChannels)
    // }


    // return <GovContext.Provider value={{wallet, scComs, scGov, updateSignerElements, scChannels, tronWeb, updateTronWeb, tronGovernanceSC, updateTronGovSC  }} >
    return <GovContext.Provider value={{ tronWeb, updateTronWeb, tronGovernanceSC, updateCurrentBlockNumber, currentBlockNumber }} >
        {children}
    </GovContext.Provider>;
};

export default GovContext;



