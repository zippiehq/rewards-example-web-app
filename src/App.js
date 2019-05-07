import React, { useEffect, useState } from 'react'
import './App.css'
import { reward } from '@zippie/zippie-utils'
import LogoSVG from './assets/zippie_logo_vertical_rgb.svg'
import { parseQuery } from './utils'

const getCustomerUrl = (userId, tokenAddress) => {
  return "https://customer-test.zippierewards.com/#/" + userId + "/" + tokenAddress
}

const App = () => {
  const tokenAddress = "0x374FaBa19192a123Fbb0c3990e3EeDcFeeaad42A";
  const userId = "F07E51B3E0FF2492364B35382E697D73"
  const apiKey = "user";
  
  const [balance, setBalance] = useState(0)
  const [pending, setPending] = useState(0)
  const [wallets, setWallets] = useState(0)
  const [cheques, setCheques] = useState(0)
  
  useEffect(() => {
    // Retrieve REFERRAL_CODE from https://YOUR_URL?referrer=REFERRAL_CODE
    let queryParams = parseQuery(window.location.search)
    console.log('referrer: ' + queryParams.referrer)
  }, [])

  useEffect(() => {
    // Retrieve the user balance
    async function fetchData() {
      reward.init('', '', apiKey, undefined)
      const userBalance = await reward.getUserBalance(userId, tokenAddress)
      setBalance(userBalance.balance)
      setPending(userBalance.pending)
      setWallets(userBalance.wallets)
      setCheques(userBalance.cheques)
      console.log('balance: ' + userBalance.balance)
    }
    fetchData()
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={LogoSVG} alt="logo" />
        <h2>Balance</h2>
        <a
          className="App-link"
          href={getCustomerUrl(userId, tokenAddress)}
          target="_blank"
          rel="noopener noreferrer"
          >
          <h1>{balance}</h1>
        </a>
      </header>
    </div>
  )
}

export default App
