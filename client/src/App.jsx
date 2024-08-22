import { useState } from 'react'
import './App.css'
import { Link } from 'react-router-dom'
import Home from './components/Home'
import MarketPlace from './components/MarketPlace'
import Designare from './components/Designare'
import Wadrobe from './components/Wadrobe'
import EventRegister from './components/EventRegister'
import EventQueue from './components/EventQueue'
import { Route, Routes } from 'react-router-dom';
import clothAbi from "./contract/ClothingStore.json"
import { ethers } from "ethers"
import ticketAbi from "./contract/TicketMaster.json"

function App() {
  const [state, setState] = useState({
    provider: '',
    signer: '',
    address: '',
    ticketContract: '',
    clothContract: ''
  })
  const [account, setAccount] = useState("")

  const [isConnected, setIsConnected] = useState(false)
  const connectWallet = async () => {
    window.ethereum.on("chainChanged", () => {
      window.location.reload()
    })
    window.ethereum.on("accountsChanged", () => {
      window.location.reload()
    })
    const clothAddress = "0x4723589E2e2E44Bbab0c32908D7045769EfdBBab";
    const ticketAddress = "0x4ee79Ec5Af6E31FBdA14879813F8387b03a6F356";
    const clothABI = clothAbi.abi;
    const ticketABI = ticketAbi.abi;

    try {
      const { ethereum } = window;
      if (!ethereum) {
        console.log("Metamask is not installed");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      if (accounts.length === 0) {
        console.log("No account found");
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress()
      setAccount(address)
      const ticketContract = new ethers.Contract(ticketAddress, ticketABI, signer);
      const clothContract = new ethers.Contract(clothAddress, clothABI, signer);
      console.log(signer)
      setIsConnected(true)

      setState({ provider, signer, address, ticketContract, clothContract });
    } catch (error) {
      console.error("Error connecting to Metamask:", error);
    }
  };

  const formatAddress = (address) => {
    return address ? `${address.slice(0, 6)}...${address.slice(-4)}` : '';
  };

  return (
    <>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
          </div>
          <a className="btn btn-ghost text-xl">Meta-Fashion</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/marketplace">MarketPlace</Link></li>
            <li><Link to="/create">Designare</Link></li>
            <li><Link to="/wadrobe">Wadrobe</Link></li>
            <li>
              <details>
                <summary>Events</summary>
                <ul className="p-2">
                  <li><Link to="/event/register">Register</Link></li>
                  <li><Link to="/event/queue">Queue</Link></li>
                </ul>
              </details>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <a className="btn" onClick={connectWallet}>{isConnected ? formatAddress(account) : <p>Connect Wallet</p>}</a>
        </div>
      </div>
      <Routes>
        <Route path="/" element={<Home state={state} account={account} />} />
        <Route path="/marketplace" element={<MarketPlace state={state} account={account} />} />
        <Route path="/create" element={<Designare state={state} account={account} />} />
        <Route path="/wadrobe" element={<Wadrobe state={state} account={account} />} />
        <Route path="/event/register" element={<EventRegister state={state} account={account} />} />
        <Route path="/event/queue" element={<EventQueue state={state} account={account} />} />
      </Routes>
    </>
  )
}

export default App;
