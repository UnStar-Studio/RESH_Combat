var MainBtn = document.getElementById('mainBtn');
var MainTxt = document.getElementById('mainTxt');
var ClicksTxt = document.getElementById('CoinsTxt');
var PromoBtn = document.getElementById('promoBtn2');
var PromoInp = document.getElementById('promoInp');

var ClickCount = localStorage.getItem("ClickCount") || 0;
ClickCount = parseInt(ClickCount);

MainTxt.innerText = ClickCount;
ClicksTxt.innerText = "Коинов: " + ClickCount;

var clickCountThisSecond = 0;
var lastClickTime = 0;
const maxClicksPerSecond = 10; 

MainBtn.addEventListener('click', function() {
    const now = Date.now();
    const timeSinceLastClick = now - lastClickTime;

    if (timeSinceLastClick > 1000) { 
        clickCountThisSecond = 0;
    }

    if (clickCountThisSecond < maxClicksPerSecond) {
        ClickCount ++;
        MainTxt.innerText = ClickCount;
        ClicksTxt.innerText = "Коинов: " + ClickCount;
        localStorage.setItem("ClickCount", ClickCount);
        clickCountThisSecond++;
        lastClickTime = now;
    }
    
  });

var promoCodes = {
    "РЕШАЙСЯ100": 1000,
    "SCHOOL1542": 2500,
    "РЕШАЙСЯ0232200": 5000,
    "Р0Ш4А9С1200": 10000,
    "RESHAI96SCHOOL": 15000,
};

var usedPromoCodes = JSON.parse(localStorage.getItem("usedPromoCodes")) || [];

PromoBtn.addEventListener('click', function() {
    var promoCode = PromoInp.value.toUpperCase();

    if (promoCodes.hasOwnProperty(promoCode)) {
        if (usedPromoCodes.includes(promoCode)) {
            alert("Этот промокод уже был использован.");
            return; 
        }

        var reward = promoCodes[promoCode];
        ClickCount += reward;
        MainTxt.innerText = ClickCount;
        ClicksTxt.innerText = "Коинов: " + ClickCount;
        localStorage.setItem("ClickCount", ClickCount);

        usedPromoCodes.push(promoCode); 
        localStorage.setItem("usedPromoCodes", JSON.stringify(usedPromoCodes)); 

        PromoInp.value = "";
        alert("Промокод активирован! Вы получили " + reward + " коинов.");

    } else {
        alert("Неверный промокод.");
    }
});
