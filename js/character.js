//생성자함수의 인자로 객체를 받는다 xPos
function Character(info){
   // console.log(this); //Character
    this.mainElem = document.createElement('div');
    this.mainElem.classList.add('character');
    this.mainElem.innerHTML = ''
        + '<div class="character-face-con character-head">'
            + '<div class="character-face character-head-face face-front"></div>'
            + '<div class="character-face character-head-face face-back"></div>'
        + '</div>'
        + '<div class="character-face-con character-torso">'
            + '<div class="character-face character-torso-face face-front"></div>'
            + '<div class="character-face character-torso-face face-back"></div>'
        + '</div>'
        + '<div class="character-face-con character-arm character-arm-right">'
            + '<div class="character-face character-arm-face face-front"></div>'
            + '<div class="character-face character-arm-face face-back"></div>'
        + '</div>'
        + '<div class="character-face-con character-arm character-arm-left">'
            + '<div class="character-face character-arm-face face-front"></div>'
            + '<div class="character-face character-arm-face face-back"></div>'
        + '</div>'
        + '<div class="character-face-con character-leg character-leg-right">'
            + '<div class="character-face character-leg-face face-front"></div>'
            + '<div class="character-face character-leg-face face-back"></div>'
        + '</div>'
        + '<div class="character-face-con character-leg character-leg-left">'
            + '<div class="character-face character-leg-face face-front"></div>'
            + '<div class="character-face character-leg-face face-back"></div>'
        + '</div>'; 

    document.querySelector('.stage').appendChild(this.mainElem);
    this.mainElem.style.left = info.xPos + '%';
    //scroll중인지 아닌지 상태확인
    this.scrollState = false;
    this.init();
}
/*
Character.prototype.xxxx = function(){
    이미 존재하는 prototype객체에 xxxx라는 메소드를 추가하는..
};
*/
//prototype를 재정의하고자 함..그래서 다시 constructor를 언급해줘야
//2가지 모두 사용하고, 알아둬야..
/*
Character.prototype = {
    constructor : Character,
    xxxx : function() {
    }
};
*/
Character.prototype = {
    constructor : Character,
    init : function() {
       // console.log(this); // Character
        const self = this;
        window.addEventListener('scroll', function(){
            //setTimeout함수를 취소하는 함수
            clearTimeout(self.scrollState);

            //console.log(this); //window객체
            //this.mainElem.classList.add('running'); 에러
            //초기값은 false이니 한번 실행
            //스크롤멈춤 0.5s후에 숫자리턴해서 더이상 실행안됨
            if(!self.scrollState) {
                self.mainElem.classList.add('running');
            }

            //setTimeout함수는 숫자를 리턴해줌
            self.scrollState = setTimeout(function(){
                //0.5초후에 실행이 될텐데, 계속 clearTimeout때문에
                //실행이 안 되다가, 스크롤멈추는 마지막 순간에
                //비로소 실행이 됨.
                //console.log(self.scrollState); 스크롤멈춤 0.5s후에 숫자 리턴
                self.scrollState = false;
                self.mainElem.classList.remove('running');
            }, 500);
            
        });
    }
};