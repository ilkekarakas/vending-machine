import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Timer from "./components/timer";
import "react-toggle/style.css";
import Toggle from "react-toggle";
import SlotItem from "./components/slotItem";
import InputCoin from "./components/inputCoin";
import TouchPad from "./components/touchPad";
import SupplierActions from "./components/supplierActions";
import Message from "./components/message";
import Energy from "./components/energy";

function App() {
  const [coin, setCoin] = useState(0); // Müşterinin toucpad yardımıyla makineye eklediği birim paraları tutan değişken.
  const [machineTotalPrice, setMachineTotalPrice] = useState(0); // Supplier'ın makinede birikmiş birim parası
  const [timerCount, setTimerCount] = useState(0); // Timer Başlangıç sayısı: 0 (sayaç başlamadı)
  const [total, setTotal] = useState(coin); // Müşterinin eklediği paraların toplamını tutan değişken
  const [timerIsActive, setTimerIsActive] = useState(false); // Timer'ın çalışmasını sağlayan değişken
  const [isLightOn, setIsLightOn] = useState(true); // Makinenin ışıklarının açılıp/kapanmasını sağlayan değişken
  const [message, setMessage] = useState(""); // Makinenin bilgi mesajlarını tutan değişken
  const [energy, setEnergy] = useState(2); // Makinenin enerji tüketimini tutan değişken (Default ışık aaçık olduğu için 2 den başlatılmıştır.)
  const [temperature, setTemperature] = useState(20);//Makinenin ısını tutan değişken(Oda sıcaklığı 20 derece kabul edilmiştir.)

  useEffect(() => {
    setTotal(coin);
  }, [coin]);

  // 5 saniyede bir mesajı sıfırlamak için yazılmıştır
  useEffect(() => {
    const clearMessage = setTimeout(() => {
      setMessage("");
    }, 5000);

    return () => clearTimeout(clearMessage);
  }, [message]);

  // 1 saatte enerji yenilenecek. ışık açık klima kapalı 20*C'de olacak, resetleyecek. 
  // Enerjiyle bir işlem yapılmadığı sürece, bekleme moduna geçecek.
  useEffect(() => {
    const clearEnergy = setTimeout(() => {
      setTemperature(20);
      setIsLightOn(true);
      setEnergy(2);
    }, 3600000); 

    return () => clearTimeout(clearEnergy);
  }, [energy]);

  // Timer sona erdiğinde kullanıcıyı bilgilendiren bir mesaj gönderen fonksiyon.
  useEffect(() => {
    if (timerCount === 0) {
      if (coin > 0) {
        setMessage(
          "İşleminizi gerçekleştirmeniz gereken sürede gerçekleştiremediniz. Yüklediğiniz " +
            coin +
            " birim para iade edilecektir."
        );
        setTotal(0);
        onCoinChanged(0);
      } else if (timerIsActive) {
        setMessage(
          "İşleminizi gerçekleştirmeniz gereken süre doldu. Yeniden para yükleyip işlem yapabilirsiniz."
        );
      }
      setTimerIsActive(false);
    }
  }, [timerCount]);

  // Makineyi resetlemeye yarayan bir fonksiyon.
  const onReset = () => {
    const newTotal = 0;
    setTotal(newTotal);
    onCoinChanged(newTotal);
    setTimerIsActive(false);
    setTimerCount(0); 
    setMessage("Makineye Baştan Başlattınız."); 
    setTemperature(20); 
    setEnergy(isLightOn ? 2 : 0); 
  };

  // kullanıcının makine içerisinde bulunan parasını çekmeye yarayan fonksiyon.
  const onCheckOut = () => {
    if (coin > 0) {
      setMessage(
        "İşleminiz başarıyla gerçekleşmiştir. İade tutarınız: " +
          coin +
          " birim paradır."
      );
      const newTotal = 0;
      setTotal(newTotal);
      onCoinChanged(newTotal);
      setTimerIsActive(false);
      setTimerCount(0);
    } else {
      setMessage("Çekebileceğiniz bir para bulunmamaktadır.");
    }
  };

  // ışıkları açıp kapatmaya yarayan fonksiyon.
  // Işık 2 birim enerji tüketmektedir.
  // Eğer 2 birim enerji tükettiğinde enerji 5'i geçecek olursa bu işleme izin vermiyor. Işığı açmıyor.
  const toggleLight = () => {
    if (isLightOn) {
      const newEnergy = energy - 2;
      setEnergy(newEnergy);
      if (energy < 5) {
        setIsLightOn(!isLightOn);
      } else {
        setMessage(
          "Makine güç tüketimi fazla olduğu için bu özelliği kullanamazsınız."
        );
      }
      setIsLightOn(!isLightOn);
    } else {
      const newEnergy = energy + 2;
      if (newEnergy < 5) {
        setEnergy(newEnergy);
        setIsLightOn(!isLightOn);
      } else {
        setMessage(
          "Makine güç tüketimi fazla olduğu için bu özelliği kullanamazsınız."
        );
      }
    }
  };

  // coin değiştiği zaman total parayı düzenlemeye yarayan fonksiyon.
  const onCoinChanged = (total) => {
    setCoin(total);
  };

  return (
    <div className="page-wrap">
      <div className="vend-container">
        <div className="vend-outer">
          <SupplierActions
            setMessage={setMessage}
            machineTotalPrice={machineTotalPrice}
            setMachineTotalPrice={setMachineTotalPrice}
            onReset={onReset}
          />
          <div className="check-out-box" onClick={onCheckOut}>
            Siparişi Tamamla
          </div>
          <div className="display-box"></div>
          <Toggle
            defaultChecked={isLightOn}
            checked={isLightOn}
            onChange={toggleLight}
          />
          <Energy
            energy={energy}
            setEnergy={setEnergy}
            temperature={temperature}
            setTemperature={setTemperature}
            setMessage={setMessage}
          />
          <div className="timer-box">
            <Timer
              timerIsActive={timerIsActive}
              setTimerIsActive={setTimerIsActive}
              timerCount={timerCount}
              setTimerCount={setTimerCount}
            />
          </div>
          <InputCoin
            coin={coin}
            onCoinChanged={onCoinChanged}
            setTimerIsActive={setTimerIsActive}
            setTotal={setTotal}
            total={total}
            timerCount={timerCount}
            setTimerCount={setTimerCount}
          />
          <SlotItem isLightOn={isLightOn} />
          <TouchPad
            setMessage={setMessage}
            coin={coin}
            setCoin={setCoin}
            machineTotalPrice={machineTotalPrice}
            setMachineTotalPrice={setMachineTotalPrice}
            energy={energy}
            setEnergy={setEnergy}
          />
          <Message message={message} />
        </div>
      </div>
    </div>
  );
}

export default App;
