import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

const CandyMachine = ({ walletAddress }) => {
  // Add state property inside your component like this
  const [machineStats, setMachineStats] = useState(null);

  useEffect(() => {
    getCandyMachineState();
  }, []);	

  const getProvider = () => {
    const rpcHost = process.env.REACT_APP_SOLANA_RPC_HOST;
    // Create a new connection object
    const connection = new Connection(rpcHost);
    
    // Create a new Solana provider object
    const provider = new Provider(
      connection,
      window.solana,
      opts.preflightCommitment
    );
  
    return provider;
  };
      
  // Declare getCandyMachineState as an async method
  const getCandyMachineState = async () => { 
    const provider = getProvider();
  
  // Get metadata about your deployed candy machine program
    const idl = await Program.fetchIdl(candyMachineProgram, provider);

  // Create a program that you can call
    const program = new Program(idl, candyMachineProgram, provider);

  // Fetch the metadata from your candy machine
    const candyMachine = await program.account.candyMachine.fetch(
      process.env.REACT_APP_CANDY_MACHINE_ID
    );
  
  // Parse out all our metadata and log it out
    const itemsAvailable = candyMachine.data.itemsAvailable.toNumber();
   const itemsRedeemed = candyMachine.itemsRedeemed.toNumber();
    const itemsRemaining = itemsAvailable - itemsRedeemed;
    const goLiveData = candyMachine.data.goLiveDate.toNumber();

  // We will be using this later in our UI so let's generate this now
    const goLiveDateTimeString = `${new Date(
      goLiveData * 1000
    ).toLocaleDateString()} @ ${new Date(
      goLiveData * 1000
    ).toLocaleTimeString()}`;

    // Add this data to your state to render
    setMachineStats({
      itemsAvailable,
      itemsRedeemed,
      itemsRemaining,
      goLiveData,
      goLiveDateTimeString,
    });
  
    console.log({
      itemsAvailable,
      itemsRedeemed,
      itemsRemaining,
      goLiveData,
      goLiveDateTimeString,
    });
    
  };
}




