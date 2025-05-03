document.addEventListener('DOMContentLoaded', function() {
    // Элементы интерфейса для заработка
    var MainBtn = document.getElementById('mainBtn');
    var MainTxt = document.getElementById('mainTxt');
    var ClicksTxt = document.getElementById('CoinsTxt');
    
    // Элементы магазина
    const promoBtn = document.getElementById('promoBtn');
    const giftBtn = document.getElementById('giftBtn');
    const giftsTab = document.getElementById('GiftsTab');
    const tokenBuyButton = document.querySelector('.tokenByButton');
    
    // Данные пользователя
    let userData = {
        coins: 0,
        reshTokens: 0,
        ownedGifts: []
    };

    // Инициализация из localStorage
    function initUserData() {
        const savedCoins = localStorage.getItem("ClickCount");
        if (savedCoins) {
            userData.coins = parseInt(savedCoins) || 0;
        }
        
        const savedShopData = localStorage.getItem('userShopData');
        if (savedShopData) {
            const shopData = JSON.parse(savedShopData);
            userData.reshTokens = shopData.reshTokens || 0;
            userData.ownedGifts = shopData.ownedGifts || [];
        }
        
        updateUI();
        updateGiftButtons();
    }

    // Обновление интерфейса
    function updateUI() {
        MainTxt.innerText = userData.coins;
        ClicksTxt.innerText = `Коинов: ${userData.coins}`;
        document.querySelector('.GiftExchanger p').textContent = `RESH токенов: ${userData.reshTokens}`;
    }
    
    // Обновление кнопок подарков
    function updateGiftButtons() {
        document.querySelectorAll('.Gift').forEach(gift => {
            const giftName = gift.querySelector('.GiftName').textContent;
            const buyButton = gift.querySelector('.GiftBuyButton');
            
            if (userData.ownedGifts.includes(giftName)) {
                buyButton.textContent = 'Куплено';
                buyButton.disabled = true;
                buyButton.style.backgroundColor = '#cccccc';
            } else {
                buyButton.textContent = 'Купить';
                buyButton.disabled = false;
                buyButton.style.backgroundColor = '';
            }
        });
    }

    // Сохранение данных магазина
    function saveShopData() {
        const shopData = {
            reshTokens: userData.reshTokens,
            ownedGifts: userData.ownedGifts
        };
        localStorage.setItem('userShopData', JSON.stringify(shopData));
    }

    // Заработок монет
    MainBtn.addEventListener('click', function() {
        userData.coins++;
        MainTxt.innerText = userData.coins;
        ClicksTxt.innerText = `Коинов: ${userData.coins}`;
        localStorage.setItem("ClickCount", userData.coins);
    });

    // Покупка RESH токена
    tokenBuyButton.addEventListener('click', function() {
        if (userData.coins >= 500) {
            userData.coins -= 500;
            userData.reshTokens += 1;
            updateUI();
            saveShopData();
            localStorage.setItem("ClickCount", userData.coins); // Обновляем и основные монеты
            alert('Вы успешно купили RESH токен!');
        } else {
            alert('Недостаточно койнов для покупки RESH токена! Требуется 500 койнов.');
        }
    });

    // Покупка подарка
    document.querySelectorAll('.GiftBuyButton').forEach(button => {
        button.addEventListener('click', function() {
            if (userData.reshTokens <= 0) {
                alert('Недостаточно RESH токенов для покупки подарка!');
                return;
            }
            
            const gift = this.closest('.Gift');
            const giftName = gift.querySelector('.GiftName').textContent;
            
            if (userData.ownedGifts.includes(giftName)) {
                alert('Вы уже купили этот подарок!');
                return;
            }
            
            userData.reshTokens -= 1;
            userData.ownedGifts.push(giftName);
            
            updateUI();
            updateGiftButtons();
            saveShopData();
            
            alert(`Вы успешно купили подарок "${giftName}"!`);
        });
    });

    // Переключение между вкладками
    promoBtn.addEventListener('click', function() {
        alert('Вкладка промокодов в разработке');
    });

    giftBtn.addEventListener('click', function() {
        giftsTab.style.display = 'block';
    });

    // Инициализация при загрузке
    initUserData();
});