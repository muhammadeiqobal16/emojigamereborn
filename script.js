document.addEventListener(`DOMContentLoaded`, function(){
    const MAIN_MENU = `main-menu`;
    let arrCompare = [];
    const emojies = [`😀`,`😀`,`😄`,`😄`,`😐`,`😐`,`😑`,`😑`,`😖`,`😖`,`😫`,`😫`,`😛`,`😛`,`😜`,`😜`];
    const boxesP = document.querySelectorAll(`.box p`);

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
        menuBox.classList.add(`menuBox`, `flex`);
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
        shuffleEmojies();
    };

    const countDown = function(param){
        const countText = document.createElement(`h1`);
        countText.innerText = `3`;
        
        param.innerHTML = ``;
        param.append(countText);

        const counter = setInterval(function(){
            countText.innerText--;
        }, 1000);

        setTimeout(function(){
            clearInterval(counter);
            removeMainMenu();
            hideEmojies();
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

    const removeMainMenu = function(){
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
            if(arrCompare.length < 1){
                element.target.children[0].style.visibility = `visible`;
                element.target.classList.add(`clicked`);
                arrCompare.push(element.target.children[0].innerText);
            }else{
                element.target.children[0].style.visibility = `visible`;
                element.target.classList.add(`clicked`);
                arrCompare.push(element.target.children[0].innerText);
                const [emo1, emo2] = arrCompare;
                if(emo1 === emo2){
                    console.log(`sama`);
                    for(let boxP of boxesP){
                        if(boxP.parentElement.classList.contains(`clicked`)){
                            boxP.parentElement.classList.remove(`clicked`);
                            boxP.parentElement.style.opacity = `0.5`;
                        };
                    }
                    arrCompare = [];
                }else{
                    console.log(`beda`);
                    for(let boxP of boxesP){
                        if(boxP.parentElement.classList.contains(`clicked`)){
                            boxP.parentElement.classList.remove(`clicked`);
                            setTimeout(function(){
                                boxP.style.visibility = `hidden`;
                            }, 150);
                        };
                    }
                    arrCompare = [];
                }
            }
        }
    });
});