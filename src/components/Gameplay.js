import React, { useEffect, useState } from "react";
import Footer from "../components/layout/gameplayLayout/GameFooter";
import Backdrop from "./Backdrop";
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";

function Gameplay({ player, enemy, generateEnemyChar }) {
  const [enemyHealth, setEnemyHealth] = useState(null);
  const [playerHealth, setPlayerHealth] = useState(null);
  const [fightEnd, setFightEnd] = useState(false);
  const [Winstreak, setWinstreak] = useState(0);
  const [playerWin, setPlayerWin] = useState(false);
  const [playerLose, setPlayerLose] = useState(false);
  const navigate = useNavigate();

  let maxHealth = player.character.hp;

  useEffect(() => {
    setEnemyHealth(enemy.hp);
    setPlayerHealth(player.character.hp);
  }, []);

  function attack1() {
    if ((enemyHealth || enemy.hp) - player.character.power < 0) {
      setEnemyHealth(0);
      setFightEnd(true); // make bjutifal visualisation for match end :)
      addCoins();

      if (player.level >= 1 && player.level < 20) {
        localStorage.setItem('level', player.level += 1);
      } else if (player.level >= 20 && player.level < 50) {
        localStorage.setItem('level', player.level += 0.5);
      } else if (player.level >= 50 && player.level < 90) {
        localStorage.setItem('level', player.level += 0.2);
      } else if (player.level >= 90 && player.level < 100) {
        localStorage.setItem('level', player.level += 0.1);
      } else if (player.level >= 100 && player.level < 150) {
        localStorage.setItem('level', player.level += 0.05);
      } else if (player.level >= 150 && player.level < 300) {
        localStorage.setItem('level', player.level += 0.02);
      } else if (player.level >= 300) {
        localStorage.setItem('level', player.level += 0.01);
      }

      setPlayerWin(true);
    } else {
      if (playerHealth <= 0) {
        setFightEnd(true);
        setPlayerLose(true);
      }
      setEnemyHealth((enemyHealth || enemy.hp) - player.character.power);

      let timer = setInterval(() => {
        enemyAttack();
        clearInterval(timer);
      }, 1000);
    }
  }

  function attack2() {
    if ((enemyHealth || enemy.hp) - player.character.power < 0) {
      setEnemyHealth(0);
      setFightEnd(true); // make bjutifal visualisation for match end :)
      addCoins();
      setPlayerWin(true);
    } else {
      setEnemyHealth((enemyHealth || enemy.hp) - player.character.power - 10);
      let timer = setInterval(() => {
        enemyAttack();
        if (playerHealth <= 0) {
          setPlayerLose(true);
        }
        clearInterval(timer);
      }, 1000);
    }
  }

  function heal() {
    if ((enemyHealth || enemy.hp) - player.character.power < 0) {
      setEnemyHealth(0);
      setFightEnd(true); // make bjutifal visualisation for match end :)
      addCoins();
      setPlayerWin(true);
    } else {
      setPlayerHealth(playerHealth + 20);

      if (playerHealth >= maxHealth) {
        setPlayerHealth(maxHealth);
      }

      let timer = setInterval(() => {
        enemyAttack();
        if (playerHealth <= 0) {
          setPlayerLose(true);
        }
        clearInterval(timer);
      }, 1000);
    }
  }

  function enemyAttack() {
    let newPlayerHealth = playerHealth - enemy.power;
    setPlayerHealth(newPlayerHealth);

    if (newPlayerHealth <= 0) {
      setFightEnd(true);
      setPlayerLose(true);
    }
  }

  function addCoins() {
    let coins = localStorage.getItem("coins");
    coins = parseInt(coins) || 0;
    localStorage.setItem("coins", coins + 60); // later change to dynamic coins
  }

  function playAgain() {
    setFightEnd(false);
    let enemyChar = generateEnemyChar()
    setEnemyHealth(enemyChar.hp)
    setPlayerHealth(player.character.hp);
  }

  function backToLobby() {
    navigate("/customization");
  }

  function test() {
    <Backdrop />;
  }

  return (
    <>
      {fightEnd ? (
        <>
          {playerWin ? (
            <>
              <Modal
                playAgain={playAgain}
                backToLobby={backToLobby}
                text={"You Win!"}
              />
              <Backdrop />
            </>
          ) : null}

          {playerLose ? (
            <>
              <Modal
                playAgain={playAgain}
                backToLobby={backToLobby}
                text={"You Lose!"}
              />
              <Backdrop />
            </>
          ) : null}
        </>
      ) : (
        <div className="characterHolder">
          <div className="characters">
            <img
              src={player.character.img}
              className="character"
              id="character"
            />
            ;
            <img src={enemy.img} className="character" id="enemy" />;
          </div>
          <div className="info">
            <div className="hp" id="characterHP">
              <h1 style={{ color: "white" }}>{player.character.name}</h1>
              <div className="heartImgHolder">
                {(playerHealth === undefined
                  ? player.character.hp
                  : playerHealth) +
                  "/" +
                  player.character.hp}
              </div>
            </div>
            <div className="hp" id="enemyHP">
              <h1 style={{ color: "white" }}>{enemy.name}</h1>
              <div className="heartImgHolder">
                {(enemyHealth === undefined ? enemy.hp : enemyHealth) +
                  "/" +
                  enemy.hp}
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer attack1={attack1} attack2={attack2} heal={heal} />
    </>
  );
}

export default Gameplay;
