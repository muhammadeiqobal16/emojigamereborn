document.addEventListener(`DOMContentLoaded`, function(){
    const emojies = [`😀`,`😀`,`😄`,`😄`,`😐`,`😐`,`😑`,`😑`,`😖`,`😖`,`😫`,`😫`,`😛`,`😛`,`😜`,`😜`];
    const boxesP = document.querySelectorAll(`.box p`);
    const STORAGE_KEY = `best-time`;
    const MAIN_MENU = `main-menu`;
    const GAME_STATUS = `game-status`;
    const INSPECT_BOXES = `inspect-boxes`;
    let showTimeLeft = null;
    let timeLeft = null;
    let arrCompare = [];
    let correctCount = null;
    let status = null;

    if(typeof(Storage)!==`undefined`){
        if(localStorage.getItem(STORAGE_KEY) === null){
            localStorage.setItem(STORAGE_KEY, 0);
        };
    }else{
        alert(`Your browser does not support web storage. So, you will never saved your game's best time`);
    };
    
    document.addEventListener(MAIN_MENU, function(){
        for(let index in boxesP){
            boxesP[index].innerText = emojies[index];
        };

        const gameTitle = document.createElement(`h1`);
        gameTitle.innerText = `EMOJI GAME`;
        
        const playBtn = document.createElement(`button`);
        playBtn.innerText = `PLAY`;
        playBtn.addEventListener(`click`, function(){
            loadingBeforePlay(menuBox);
        });

        const bestTime = document.createElement(`p`);
        if(30-localStorage.getItem(STORAGE_KEY)===30){
            bestTime.innerText = `Best Time: ${localStorage.getItem(STORAGE_KEY)}s`;
        }else{
            bestTime.innerText = `Best Time: ${30-localStorage.getItem(STORAGE_KEY)}s`;
        };
        
        const menuBox = document.createElement(`div`);
        menuBox.setAttribute(`id`, `menuBox`);
        menuBox.classList.add(`flex`);
        menuBox.append(gameTitle, playBtn, bestTime);

        const menuBackground = document.createElement(`div`);
        menuBackground.setAttribute(`id`, `menuBackground`);
        menuBackground.classList.add(`flex`);
        menuBackground.append(menuBox);
        
        const gameBoard = document.getElementById(`gameBoard`);
        gameBoard.append(menuBackground);
    });

    document.dispatchEvent(new Event(MAIN_MENU));

    const loadingBeforePlay = function(param){
        countDown(param);
    };

    const countDown = function(param){
        shuffleEmojies();

        const countText = document.createElement(`h1`);
        countText.innerText = `3`;
        
        param.innerHTML = ``;
        param.append(countText);

        const counter = setInterval(function(){
            countText.innerText--;
        }, 1000);

        setTimeout(function(){
            clearInterval(counter);
            gameBegin();
        }, 3000);
    };

    const shuffleEmojies = function(){
        const shuffling = setInterval(function(){
            const shuffledEmojies = emojies.sort(()=> .5 - Math.random());
            for(let index in boxesP){
                boxesP[index].innerText = shuffledEmojies[index];
            };
        }, 100);

        setTimeout(()=>clearInterval(shuffling), 3000);
    };

    const gameBegin = function(){
        timer();
        removeMainMenu();
        hideEmojies();
    };

    const timer = function(){
        timeLeft = 29;
        const timeLeftElem = document.getElementById(`timeLeft`);
        timeLeftElem.parentElement.removeAttribute(`hidden`);

        showTimeLeft = setInterval(countToZero, 1000);

        function countToZero(){
            if(timeLeft == 0){
                clearTimeout(showTimeLeft);
                document.dispatchEvent(new Event(GAME_STATUS));
            }else{
                timeLeft--;
                timeLeftElem.innerText = `${timeLeft}s`;
            };
        };
    };

    const removeMainMenu = function(){
        const menuBox = document.getElementById(`menuBox`);
        menuBox.innerHTML = ``;

        const menuBackground = document.getElementById(`menuBackground`);
        menuBackground.style.visibility = `hidden`;
    };

    const hideEmojies = function(){
        for(let boxP of boxesP){
            boxP.style.visibility = `hidden`;
        };
    };

    document.addEventListener(`click`, function(element){
        if(element.target.classList.contains(`box`) && !element.target.classList.contains(`solved`)){
            element.target.children[0].style.visibility = `visible`;
            element.target.classList.add(`clicked`);
            arrCompare.push(element.target.children[0].innerText);
            document.dispatchEvent(new Event(INSPECT_BOXES));
        };
    });

    document.addEventListener(INSPECT_BOXES, function(){
        if(arrCompare.length === 2){
            const [emo1, emo2] = arrCompare;
            if(emo1 === emo2){
                console.log(`sama`);
                for(let boxP of boxesP){
                    if(boxP.parentElement.classList.contains(`clicked`)){
                        boxP.parentElement.classList.remove(`clicked`);
                        boxP.parentElement.classList.add(`solved`);
                        boxP.parentElement.style.opacity = `0.5`;
                    };
                };
                correctCount++;
                arrCompare = [];
                document.dispatchEvent(new Event(GAME_STATUS));
            }else{
                console.log(`beda`);
                for(let boxP of boxesP){
                    if(boxP.parentElement.classList.contains(`clicked`)){
                        boxP.parentElement.classList.remove(`clicked`);
                        setTimeout(function(){
                            boxP.style.visibility = `hidden`;
                        }, 200);
                    };
                };
                arrCompare = [];
            };
        };
    });

    document.addEventListener(GAME_STATUS, function(){
        if(correctCount === 8){
            status = true;
            clearInterval(showTimeLeft);
            showGameResult(status);
        }else{
            if(timeLeft == 0){
                status = false;
                showGameResult(status);
            };
        };
    });

    const showGameResult = function(param){
        const menuBoxText = document.createElement(`h1`);
        if(param === true){
            menuBoxText.innerText = `YOU WIN!`;
            if((timeLeft) > (localStorage.getItem(STORAGE_KEY))){
                localStorage.setItem(STORAGE_KEY, (timeLeft));
            };
        }else{
            menuBoxText.innerText = `YOU LOSE!`;
        };
        
        const confirmBtn = document.createElement(`button`);
        confirmBtn.innerText = `OK`;

        const btnWrapper = document.createElement(`a`);
        btnWrapper.setAttribute(`href`, ``);
        btnWrapper.classList.add(`btnWrapper`);
        btnWrapper.append(confirmBtn);

        const bestTime = document.createElement(`p`);
        bestTime.innerText = `Best Time: ${30-localStorage.getItem(STORAGE_KEY)}s`;
                
        const menuBox = document.getElementById(`menuBox`);
        menuBox.append(menuBoxText, btnWrapper, bestTime);
        
        const menuBackground = document.getElementById(`menuBackground`);
        menuBackground.append(menuBox);
                
        menuBackground.style.visibility = `visible`;
    };
});