import { useState, useEffect } from "react";
import "./App.css";
import First from "/lvl-1.svg";
import Second from "/lvl-2.svg";
import Third from "/lvl-3.svg";
import Fourth from "/lvl-4.svg";
import Fifth from "/lvl-5.svg";
import Sixth from "/lvl-6.svg";
import Seventh from "/lvl-7.svg";
import Cart from "/cart.svg";
import { TonConnectButton, useTonConnectUI } from "@tonconnect/ui-react";
import Button from "./components/Button/Button";
import Shop from "./components/Shop/Shop";

function App() {
  const [count, setCount] = useState(99900);
  const [level, setLevel] = useState(1);
  const [cooldownTimer, setCooldownTimer] = useState(10);
  const [boostTimer, setBoostTimer] = useState(0);
  const [isGrowing, setIsGrowing] = useState(false);
  const [increment, setIncrement] = useState(0);
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });
  const [showIncrement, setShowIncrement] = useState(false);
  const [isBoostActive, setIsBoostActive] = useState(false);
  const [isBoostAvailable, setIsBoostAvailable] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);

  const [isConnected, setIsConnected] = useState(false); // Track connection state

  const tonConnectUI = useTonConnectUI(); // Access the TonConnect UI state

  // Watch for connection state changes
  useEffect(() => {
    if (tonConnectUI.walletInfo) {
      setIsConnected(true); // Wallet is connected
    } else {
      setIsConnected(false); // Wallet is not connected
    }
  }, [tonConnectUI.walletInfo]);

  const levelImages = [First, Second, Third, Fourth, Fifth, Sixth, Seventh];

  const levelThresholds = [1000, 5000, 15000, 30000, 50000, 75000, 100000];

  const levelIncrements = [
    { min: 1, max: 2 },
    { min: 2, max: 4 },
    { min: 4, max: 6 },
    { min: 6, max: 8 },
    { min: 8, max: 10 },
    { min: 10, max: 12 },
    { min: 12, max: 15 },
  ];

  useEffect(() => {
    if (!isBoostAvailable && cooldownTimer > 0) {
      const countdown = setInterval(() => {
        setCooldownTimer((prevTimer) => {
          if (prevTimer <= 1) {
            clearInterval(countdown);
            setIsBoostAvailable(true);
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);

      return () => clearInterval(countdown);
    }
  }, [cooldownTimer, isBoostAvailable]);

  useEffect(() => {
    if (isBoostActive && boostTimer > 0) {
      const countdown = setInterval(() => {
        setBoostTimer((prevTimer) => {
          if (prevTimer <= 1) {
            clearInterval(countdown);
            setIsBoostActive(false);
            setCooldownTimer(4500); // Reset cooldown timer to 75 minutes
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);

      return () => clearInterval(countdown);
    }
  }, [boostTimer, isBoostActive]);

  const handleBoostClick = () => {
    if (isBoostAvailable) {
      setIsBoostActive(true);
      setIsBoostAvailable(false);
      setBoostTimer(60);
    }
  };

  const handleClick = (e) => {
    const { min, max } = levelIncrements[level - 1];
    let incrementValue = Math.floor(Math.random() * (max - min + 1)) + min;
    if (isBoostActive) {
      incrementValue *= 2;
    }
    setCount((prevCount) => prevCount + incrementValue);
    setIncrement(incrementValue);

    const rect = e.target.getBoundingClientRect();
    setClickPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });

    setShowIncrement(true);
    setTimeout(() => setShowIncrement(false), 500);

    setIsGrowing(true);
    setTimeout(() => setIsGrowing(false), 100);

    if (count + incrementValue >= levelThresholds[level - 1] && level < 7) {
      setLevel((prevLevel) => prevLevel + 1);
    }
  };

  const formatTimer = (time) => {
    const hours = String(Math.floor(time / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((time % 3600) / 60)).padStart(2, "0");
    const seconds = String(time % 60).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  const toggleShop = () => {
    setIsShopOpen(!isShopOpen);
  };

  return (
    <div className="app-container">
      <div className="svg-button-container">
        <img
          src={Cart}
          alt="Cart"
          className="svg-button"
          onClick={toggleShop}
          style={{ width: "30px" }}
        />
        <TonConnectButton />
      </div>

      <Button
        text={
          isBoostActive
            ? `Boost ends in ${formatTimer(boostTimer)}`
            : isBoostAvailable
            ? "Boost your clicks!"
            : `Click boost available in ${formatTimer(cooldownTimer)}`
        }
        active={isBoostAvailable || isBoostActive}
        onClick={handleBoostClick}
        style={{
          borderColor: isBoostActive
            ? "transparent"
            : isBoostAvailable
            ? "transparent"
            : "black",
        }}
        color={
          isBoostActive
            ? "transparent"
            : isBoostAvailable
            ? "#0098EA"
            : "transparent"
        }
        textColor={
          isBoostActive ? "#0098EA" : isBoostAvailable ? "white" : "black"
        }
      />

      <h2 className="level-text">Lvl {level}</h2>
      <div className="svg-container" onClick={handleClick}>
        <img
          src={levelImages[level - 1]}
          alt="Clickable SVG"
          className={`clickable-svg ${isGrowing ? "grow" : ""}`}
        />
        {showIncrement && (
          <span
            className="increment-display"
            style={{ top: clickPosition.y, left: clickPosition.x }}
          >
            +{increment}
          </span>
        )}
      </div>
      <p className="score-text">Score: {count}</p>

      {isShopOpen && <Shop onClose={toggleShop} isConnected={isConnected} />}
    </div>
  );
}

export default App;
