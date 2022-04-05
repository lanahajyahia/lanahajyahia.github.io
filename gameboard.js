var guess_count = 0;
var dmas_array = ['+', '-', '*', '/'];
var myArrayEquation = [];
var randNum;
var game_status = ""; // if win new game if next continue

var current_result_arr = [];

var played = 0;
var win = 0;
var winPer = 0;

window.onload = function() {
    game_status = window.sessionStorage.getItem('game_status');
    if (game_status == null || game_status == "win" || game_status == "loss") {
        game_status = 'next';
        myArrayEquation = generateEquation(dmas_array);
        console.log("My equation: " + (myArrayEquation));
        let tempArray = Array.from(myArrayEquation);
        randNum = eval(tempArray.join(''));
        sessionStorage.setItem('randNum', randNum);
    } else {
        guess_count = window.sessionStorage.getItem('guess_count');
        myArrayEquation = JSON.parse(window.sessionStorage.getItem('myArrayEquation'));
        console.log("My equation: " + (myArrayEquation));
        randNum = window.sessionStorage.getItem('randNum');
    }
    win = window.sessionStorage.getItem('win');
    played = window.sessionStorage.getItem('played');
    if (win != null && played != null) {
        $('#statsIframe').contents().find('#won').text(win);
        $('#statsIframe').contents().find('#played').html(window.sessionStorage.getItem('played'));
        let num = win / played * 100;
        $('#statsIframe').contents().find('#win').text(roundToTwo(num) + '%');
    }


    createBoxes(randNum);
    createCalculator();

    $("#a_" + guess_count).css("display", "block");
    $("body").mousedown(function() {
        if ($('.iframe-container').css('display') == 'block') {
            $('.iframe-container').css('display', 'none');
        }

    });
    $('#statsIframe').contents().find('button#closeIframe').click(function() {
        $('.iframe-container').toggle();
    });

    current_result_arr = JSON.parse(window.sessionStorage.getItem('current_result_arr'));
    if (current_result_arr != null && current_result_arr != undefined)
        if (current_result_arr.length > 0) {
            fillMatrix();
        }


    $("body").keypress(function() {
        switch (event.keyCode) {
            case 57:
                addNumber(event.key);
                break;
            case 56:
                addNumber(event.key);
                break;
            case 55:
                addNumber(event.key);
                break;
            case 54:
                addNumber(event.key);
                break;
            case 53:
                addNumber(event.key);
                break;
            case 52:
                addNumber(event.key);
                break;
            case 51:
                addNumber(event.key);
                break;
            case 50:
                addNumber(event.key);
                break;
            case 49:
                addNumber(event.key);
                break;
            case 48:
                addNumber(event.key);
                break;
            case 45:
                addNumber(event.key);
                break;
            case 42:
                addNumber(event.key);
                break;
            case 47:
                addNumber(event.key);
                break;
            case 43:
                addNumber(event.key);
                break;
            case 13:
                checkResult();
                break;
            case 8:
            case 46:
                remove();
                break;
            default:
                break;
        }
    });
    var b1 = document.getElementById("b_1");
    b1.onclick = function() { addNumber(1) };

    var b2 = document.getElementById("b_2");
    b2.onclick = function() { addNumber(2) };

    var b3 = document.getElementById("b_3");
    b3.onclick = function() { addNumber(3) };

    var b4 = document.getElementById("b_4");;
    b4.onclick = function() { addNumber(4) };

    var b5 = document.getElementById("b_5");
    b5.onclick = function() { addNumber(5) };

    var b6 = document.getElementById("b_6");
    b6.onclick = function() { addNumber(6) };

    var b7 = document.getElementById("b_7");
    b7.onclick = function() { addNumber(7) };

    var b8 = document.getElementById("b_8");
    b8.onclick = function() { addNumber(8) };

    var b9 = document.getElementById("b_9");
    b9.onclick = function() { addNumber(9) };

    var b0 = document.getElementById("b_0");
    b0.onclick = function() { addNumber(0) };

    var b_plus = document.getElementById("b_plus");
    b_plus.onclick = function() { addNumber('+') };

    var b_minus = document.getElementById("b_minus");
    b_minus.onclick = function() { addNumber('-') };

    var b_multiple = document.getElementById("b_multiple");
    b_multiple.onclick = function() { addNumber('*') };

    var b_divide = document.getElementById("b_div");
    b_divide.onclick = function() { addNumber('/') }

    var b_delete = document.getElementById("b_delete");
    b_delete.onclick = function() { remove() };

    var b_enter = document.getElementById("b_enter");
    b_enter.onclick = function() { checkResult() };


}

function roundToTwo(num) {
    return (Math.round(num * 100) / 100).toFixed(2);
}

function fillMatrix() {
    for (let i = 0; i < current_result_arr.length; i++) {
        let parent = document.getElementsByClassName('row mt-2')[i];
        let children = parent.children;
        for (let j = 0; j < children.length - 1; j++) {
            let array = current_result_arr[i];
            let index = array[j].index;
            children[index].innerHTML = array[j].number;
            children[index].style.background = array[j].color;
            children[index].style.color = 'white';
        }
    }
}

function createBoxes(randNum) {
    for (let i = 0; i < 6; i++) {
        const rowDiv = document.createElement("div");
        rowDiv.setAttribute("class", "row mt-2");

        document.getElementsByClassName("boxes")[0].appendChild(rowDiv);
        for (let j = 0; j < 7; j++) {

            const boxBtn = document.createElement("button");
            boxBtn.setAttribute("class", "box btn btn-outline-secondary");
            document.getElementsByClassName("row")[i].appendChild(boxBtn);


        }
        const resultDiv = document.createElement("div");
        resultDiv.setAttribute("id", "a_" + i);

        document.getElementsByClassName("row")[i].appendChild(resultDiv);

        for (let j = 0; j < 2; j++) {

            const resultBoxBtn = document.createElement("button");
            resultBoxBtn.setAttribute("class", "box btn");
            if (j == 0) {
                resultBoxBtn.innerText = "=";
            } else {
                resultBoxBtn.innerText = randNum;
            }
            document.getElementById(resultDiv.getAttribute('id')).appendChild(resultBoxBtn);
        }
    }
}

function createCalculator() {
    var count = 1;
    var calcStrArr = ['plus', 'minus', 'div', 'multiple'];
    var calcArr = ['+', '-', '/', '*', ''];
    var strBtn = '';
    for (let i = 0; i < 4; i++) {
        var containerDiv = document.createElement("div");
        containerDiv.setAttribute("class", "col-sm-12  d-flex justify-content-center");

        document.getElementById("keyboard").children[0].appendChild(containerDiv);
        if (i == 3) {
            const enterBtn = document.createElement("button");
            enterBtn.setAttribute("class", "box2 mt-2 ml-2 btn btn-secondary");
            enterBtn.setAttribute("id", "b_enter");
            enterBtn.innerText = 'Enter';
            document.getElementsByClassName(containerDiv.getAttribute('class'))[i].appendChild(enterBtn);

            const deleteBtn = document.createElement("button");
            deleteBtn.setAttribute("class", "box2 mt-2 ml-2 btn btn-secondary");
            deleteBtn.setAttribute("id", "b_delete");
            deleteBtn.innerText = 'Delete';
            document.getElementsByClassName(containerDiv.getAttribute('class'))[i].appendChild(deleteBtn);
        } else {
            for (let j = 0; j < 5; j++) {
                const boxBtn = document.createElement("button");
                boxBtn.setAttribute("class", "box2 mt-2 ml-2 btn btn-secondary");
                strBtn = count;
                if (count == 10) {
                    count = 0;
                    strBtn = 0;
                    boxBtn.setAttribute("id", "b_" + strBtn);
                    boxBtn.innerText = strBtn;

                } else if (count == 0) {
                    if (j == 4) {
                        break;
                    }
                    boxBtn.setAttribute("id", "b_" + calcStrArr[j]);
                    boxBtn.innerText = calcArr[j];



                } else {
                    boxBtn.setAttribute("id", "b_" + count++);
                    boxBtn.innerText = strBtn;

                }

                document.getElementsByClassName(containerDiv.getAttribute('class'))[i].appendChild(boxBtn);
            }
        }
    }
}

function addNumber(boxElm) {
    let parent = document.getElementsByClassName('row mt-2')[guess_count];
    let children = parent.children;
    for (let j = 0; j < children.length - 1; j++) {
        let box = children[j];
        if (box.innerHTML == '') {
            box.innerHTML = boxElm;
            break;
        }

    }
}

function remove() {

    let parent = document.getElementsByClassName('row mt-2')[guess_count];
    let children = parent.children;

    for (let j = 0; j < children.length - 1; j++) {
        let box = children[j];
        if (box.innerHTML == '') {
            if (j - 1 > -1) {
                children[j - 1].innerHTML = '';
                break;
            }
        } else {
            if (j == 6 && box.innerHTML != '') {
                box.innerHTML = '';
                break;
            }
        }
    }
}

function checkResult() {

    let myEqArr = [],
        orgEqArr = [];
    let isWinCount = 0;

    let sessionArr = [];
    if (current_result_arr == null)
        current_result_arr = [];
    let parent = document.getElementsByClassName('row mt-2')[guess_count];
    let children = parent.children;
    for (let j = 0; j < children.length - 1; j++) {
        myEqArr[j] = children[j].innerHTML;
    }

    try {
        if (eval(myEqArr.join('')) == randNum) {
            myArrayEquation.join('').split('');
            orgEqArr = [...myArrayEquation];
            for (let i = 0; i < myEqArr.length; i++) {
                if (myEqArr[i] == orgEqArr[i]) {
                    myEqArr[i] = orgEqArr[i] = 'x';
                    children[i].style.background = 'green';
                    isWinCount++;
                    sessionArr.push({ index: i, number: children[i].innerHTML, color: children[i].style.background });
                }
                children[i].style.color = 'white';
            }
            if (isWinCount == 7) {
                $("#winTitle").toggle();
                statsUpdate("win");
                game_status = "win";
                return "win";
            } else {
                for (let i = 0; i < myEqArr.length; i++) {
                    if (myEqArr[i] != 'x') {
                        if (orgEqArr.indexOf(myEqArr[i]) != -1) {
                            orgEqArr[orgEqArr.indexOf(myEqArr[i])] = myEqArr[i] = 'y';
                            children[i].style.background = 'orange';
                        } else {
                            children[i].style.background = 'black';
                        }
                        sessionArr.push({ index: i, number: children[i].innerHTML, color: children[i].style.background });
                    }
                }
                $("#a_" + guess_count++).css("display", "none");
                if (guess_count < 6) {
                    current_result_arr.push(sessionArr);
                    $("#a_" + guess_count).css("display", "block");
                    game_status = "next";
                    return "next";
                } else {
                    game_status = "loss";
                    statsUpdate("loss");
                    $("#lossTitle").toggle();
                }
            }

        } else {
            warningErrorEquation(); //show error red
            shakeBoxes(children);
        }
    } catch (err) {
        console.log(err);
        warningErrorEquation(); //show error red
        shakeBoxes(children);
    }
}

function shakeBoxes(children) {
    for (let j = 0; j < children.length - 1; j++) {
        if (children[j].innerHTML != "" && children[j].innerHTML != undefined)
            children[j].classList.add('shake');

        window.setTimeout(function() {

            children[j].classList.remove('shake');
        }, 500);
    }
}

function statsUpdate(status) {
    win = window.sessionStorage.getItem('win');
    if (win == NaN)
        win = 0;

    played = window.sessionStorage.getItem('played');
    if (played == NaN)
        played = 0;

    played++;
    window.sessionStorage.setItem("played", played);
    if (status == "win") {
        win++;
    }
    let num = win / played * 100;
    winPer = roundToTwo(num);
    window.sessionStorage.setItem("win", win);

    $('#statsIframe').contents().find('#won').text(win);
    $('#statsIframe').contents().find('#win').text(winPer + '%');
    $('#statsIframe').contents().find('#played').html(played);

    window.setTimeout(function() { $('#statsBtn').click(); }, 2000);
}

function warningErrorEquation() {
    // get last child of equation
    let parent = document.getElementsByClassName('row mt-2')[guess_count];
    let children = parent.children;

    let el = children[children.length - 1].children[0];
    var original = 'black';
    el.style.color = 'red';
    window.setTimeout(function() { el.style.color = original; }, 1500);

}

function displayIframe() {
    $('.iframe-container').toggle();
}

window.onbeforeunload = function() {
    try {
        if (guess_count >= 0)
            window.sessionStorage.setItem("guess_count", guess_count);

        if (game_status != '')
            window.sessionStorage.setItem("game_status", game_status);

        if (game_status != 'next') {
            window.sessionStorage.setItem("current_result_arr", null);
        } else if (current_result_arr != null)
            window.sessionStorage.setItem("current_result_arr", JSON.stringify(current_result_arr));
    } catch (err) {
        console.log(err);
    }

}