document.addEventListener(`DOMContentLoaded`, function(){
    const emojies = [`😀`,`😀`,`😄`,`😄`,`😐`,`😐`,`😑`,`😑`,`😖`,`😖`,`😫`,`😫`,`😛`,`😛`,`😜`,`😜`];
    const boxesP = document.querySelectorAll(`.box p`);
    const MAIN_MENU = `main-menu`;
    const GAME_STATUS = `game-status`;
    const INSPECT_BOXES = `inspect-boxes`;
    let showTimeLeft = null;
    let timeLeft = null;
    let arrCompare = [];
    let correctCount = null;
    let status = null;
    
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
        
        const menuBox = document.createElement(`div`);
        menuBox.setAttribute(`id`, `menuBox`);
        menuBox.classList.add(`flex`);
        menuBox.append(gameTitle, playBtn);

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
        timeLeft = 30000;
        const timeLeftElem = document.getElementById(`timeLeft`);
        timeLeftElem.parentElement.removeAttribute(`hidden`);

        showTimeLeft = setInterval(function(){
            timeLeft--;
            timeLeftElem.innerText = timeLeft;

            if(timeLeft === 0){
                clearInterval(showTimeLeft);
                document.dispatchEvent(new Event(GAME_STATUS));
            };
        });

        removeMainMenu();
        hideEmojies();
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
        if(element.target.classList.contains(`box`)){
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
                        }, 180);
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
            if(timeLeft === 0){
                status = false;
                showGameResult(status);
            };
        };
    });

    const showGameResult = function(param){
        const menuBoxText = document.createElement(`h1`);
        param === true ? menuBoxText.innerText = `YOU WIN!`: menuBoxText.innerText = `YOU LOSE!`;
        
        const confirmBtn = document.createElement(`button`);
        confirmBtn.innerText = `OK`;
                
        const menuBox = document.getElementById(`menuBox`);
        menuBox.append(menuBoxText, confirmBtn);
    
                
        const menuBackground = document.getElementById(`menuBackground`);
        menuBackground.append(menuBox);
                
        menuBackground.style.visibility = `visible`;
    };
});