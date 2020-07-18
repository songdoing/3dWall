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
    //마지막 스크롤 위치
    this.lastScrollTop = 0;
    //info의 xPos값을 document의 속성으로도 넣어줌
    this.xPos = info.xPos;
    //캐릭터 이동 속도(좌우)
    this.speed = 0.1;
    //캐릭터 좌우이동 방향
    this.direction;
    //좌우 이동 중인지 아닌지
    this.runningState = false;
    //requestAnimationFrame이 return하는 숫자
    this.rafId;
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
            
            //이전 스크롤 위치와 현재 스크롤 위치 비교
            if (self.lastScrollTop > pageYOffset) {
                //이전 스크롤 위치가 크다면 : 스크롤 올림
                self.mainElem.setAttribute('data-direction', 'backward');
            }else {
                //현재스크롤 위치가 크다면 : 스크롤 내림
                self.mainElem.setAttribute('data-direction', 'forward');
            }
            self.lastScrollTop = pageYOffset;
        });

        //keycode.info 에 보면 keyboard마다 숫자가 부여됨
        window.addEventListener('keydown', function(e){
            //console.log(e.keyCode);
            //keydown를 연타하면 계속 중첩되어 속도가 빨라진다.
            if (self.runningState) return;

            if(e.keyCode == 37) {
                //왼쪽키 누른거임
                self.direction = 'left';
                self.mainElem.setAttribute('data-direction', 'left');
                self.mainElem.classList.add('running');
                //keydown에 의존해서 xPos를 바꾸니, 부자연스럽..느릿
                //requestAnimationFrame사용할것
                //self.xPos -= self.speed;
                //self.mainElem.style.left = self.xPos + '%';
                self.run(self);
                //키를 계속 눌러도 true로 바뀌어 return종료
                self.runningState = true;
            } else if (e.keyCode == 39) {
                //오른쪽키
                self.direction = 'right';
                self.mainElem.setAttribute('data-direction', 'right');
                self.mainElem.classList.add('running');
                self.run(self);
                self.runningState = true;
            }
        });

        //key를 떼었을때
        window.addEventListener('keyup', function(e){
            self.mainElem.classList.remove('running');
            //requestAnimationFrame를 취소해야 좌우버튼를 떼면 캐릭터 멈춤
            cancelAnimationFrame(self.rafId);
            //그러나 다시 버튼 눌렀을때, self.runningState가 true여서 실행안됨
            self.runningState = false;
        });
    },
    run : function(self){ 
        //run 메소드 안에서도 this 쓰려면..
        //const self = this; 를 하는데
        //this가 Character를 가르키다가 
        //context가 바뀌어(requestAnimationFrame때메) window를 가르키게 되어 오류
        if(self.direction == 'left') {
            self.xPos -= self.speed;
        } else if (self.direction == 'right') {
            self.xPos += self.speed;
        }

        //캐릭터가 벽을 뚫고 나가지 않도록,,x포지션을 읽어 범위안에서만
        if(self.xPos < 2) {
            self.xPos = 2;
        }
        if(self.xPos > 88) {
            self.xPos = 88;
        }          
        
        self.mainElem.style.left = self.xPos + '%';

        //requestAnimationFrame(self.run);
        //그냥 호출하지 말고, self를 인자로 넣어서 호출한다.
        //self.rafId에는 requestAnimationFrame이 리턴한 숫자
        self.rafId = requestAnimationFrame(function(){
            self.run(self);
        });
    }

};