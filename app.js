/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/



var score, roundScore, activePlayer,game_active

function init() {
    console.log(this);
    //哦！ 这里不能乱用this，直接调用的init是属于windos的
    //但是绑定在 botton 之后：
    //document.querySelector('.btn-new').addEventListener('click',init)
    //这个时候， this就是返回的botton这个instance了
    game_active = true
    score = [0, 0]
    roundScore = 0
    activePlayer = 0
    //设置中间的dice的css的样式为不显示
    document.querySelector('.dice').style.display = 'none'
    document.querySelector('#score-0').textContent = 0
    document.querySelector('#current-0').textContent = 0

    //另外一个等同的函数：
    //这个函数就不需要用 css style的query了，可以去掉 # 符号
    document.getElementById('score-1').textContent = 0
    document.getElementById('current-1').textContent = 0
    document.getElementById('name-0').textContent = 'Player 1'
    document.getElementById('name-1').textContent = 'Player 2'
    document.querySelector('.player-' + 0 + '-panel').classList.remove('winner')
    document.querySelector('.player-' + 1 + '-panel').classList.remove('winner')
    document.querySelector('.player-' + 0 + '-panel').classList.remove('active')
    document.querySelector('.player-' + 1 + '-panel').classList.remove('active')
    document.querySelector('.player-' + 0 + '-panel').classList.add('active')
}
init()


function rollDice() {
    console.log(this);
    dice = Math.floor(Math.random() * 6) + 1
    if (dice !== 1) {
        //add the score to cur player
        roundScore += dice
        document.getElementById("current-" + activePlayer).textContent = roundScore
    } else {
        //Next player
        nextPlayer()
    }
}

function study_querySelector() {
    /**练习:
     * 在document.querySelector 里面，
     * 用 "#" 作为前缀来搜索id，
     * 用 "." 作为前缀来所搜索class
     */

    /** 用#作为前缀搜索id，并改html内容: */

    // document.querySelector('#score-0').textContent = rollDice()
    // document.querySelector('#current-'+activePlayer).innerHTML = "<div>"+rollDice()+"</div>"
    // document.querySelector('#current-'+activePlayer).textContent = "<div>"+rollDice()+"</div>"
    // var player1_cur_score = document.querySelector('#current-'+activePlayer).textContent;
    // console.log(player1_cur_score);
    // player1_cur_score = 700 //不能这样改变
    // var player1_DOM = document.querySelector('#current-'+activePlayer);
    // console.log(player1_DOM);
    // player1_DOM.textContent = 700 //但是可以这样改变

    /** 用 . 作为前缀来搜索class，来修改 css 的内容:*/
    //设置中间的dice的css的样式为不显示
    document.querySelector('.dice').style.display = 'none'
    //他说过，这个querySelector是找第一个符合的，而不是全部，所以一般用ID找，而不是用class
    document.querySelector('.player-score').style.display = 'none'
    document.querySelector('.player-score').textContent = 1000

}
// study_querySelector()


function study_getBottonEvent() {
    /**
     * 这里的 addEventListener 有很多种event，包括 dbclick,mouseup/down, whell
     * doc 网址： https://developer.mozilla.org/en-US/docs/Web/events
     * 
     * addEventListener有两个input 参数：
     * 1. event 
     * 2. function event发生之后，call的function
     * 
     * 注意这里传递的是function本身，而不是就这里调用这个方程，所以不加括号
     */
    // document.querySelector('.btn-roll').addEventListener('click',rollDice)
    // 匿名方程写法
    document.querySelector('.btn-roll').addEventListener('click', function () {
        if(!game_active){
            return
        }
        
        //更新dice值
        window.rollDice()

        //写入html
        var diceDOM = document.querySelector(".dice")

        //让这个dice显示（counter of 'none'）
        diceDOM.style.display = 'block'
        diceDOM.src = 'dice-' + window.dice + '.png'
    })


}
study_getBottonEvent()

//keep develop game logic:

//实现 hole botton
document.querySelector('.btn-hold').addEventListener('click', function () {

    if(!game_active){
        return
    }
    // // 注意，当前的 this 并不是 window 这个类
    // console.log("哈哈");
    // console.log(this===window);
    // console.log(this);
    // console.log(window);
    //更新当前player的dice值
    score[activePlayer] += roundScore
    document.getElementById("score-" + activePlayer).textContent = score[activePlayer]

    // Check if this player win the game:
    if (score[activePlayer] >= 20) {
        document.getElementById("name-" + activePlayer).textContent = "WINNER!"
        document.querySelector('.dice').style.display = 'none'
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner')
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active')
        game_active=false
        return
    }


    //设置dice不显示
    document.querySelector('.dice').style.display = 'none'
    //换player：
    nextPlayer()
})

//实现new botton
document.querySelector('.btn-new').addEventListener('click', init)


// DON'T REPEAT YOURSELF RULE:
function nextPlayer() {
    // document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active')
    // activePlayer = (activePlayer+1)%2
    // document.querySelector('.player-'+activePlayer+'-panel').classList.add('active')

    //用更高明的方法换 html里面的css的class:
    roundScore = 0
    document.getElementById("current-" + activePlayer).textContent = roundScore
    activePlayer = (activePlayer + 1) % 2
    document.querySelector('.player-0-panel').classList.toggle('active')
    document.querySelector('.player-1-panel').classList.toggle('active')
}







