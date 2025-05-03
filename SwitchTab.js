//Говнокод для переключения сори


//Кнопки нижнего меню
var gameTab = document.getElementById('gameTab');
var shopTab = document.getElementById('shopTab');
var settingsTab = document.getElementById('settingsTab');

var gameBtn = document.getElementById('gameSwitchBtn');
var shopBtn = document.getElementById('shopSwitchBtn');
var settingsBtn = document.getElementById('settingsSwitchBtn');

//кнопки магазина

var giftTab = document.getElementById('GiftsTab');
var promoTab = document.getElementById('PromoTab');

var giftBtn = document.getElementById('giftBtn');
var promoBtn = document.getElementById('promoBtn');

gameTab.style.display = "none";
shopTab.style.display = "none";
settingsTab.style.display = "none";

giftTab.style.display = "none";
promoTab.style.display = "none";

gameTab.style.display = "block";

//меню магазина
giftBtn.addEventListener('click', function() {
    giftTab.style.display = 'block';
    promoTab.style.display = 'none';
});
promoBtn.addEventListener('click', function() {
    giftTab.style.display = 'none';
    promoTab.style.display = 'block';
});

//нижнее меню
gameBtn.addEventListener('click', function() {
    gameTab.style.display = 'block';
    shopTab.style.display = 'none';
    settingsTab.style.display = 'none';
});
shopBtn.addEventListener('click', function(){
    gameTab.style.display = "none";
    shopTab.style.display = "block";
    settingsTab.style.display = "none";

    giftTab.style.display = 'block';
});
settingsBtn.addEventListener('click', function(){
    gameTab.style.display = "none";
    shopTab.style.display = "none";
    settingsTab.style.display = "block";
});