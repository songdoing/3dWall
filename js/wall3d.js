(function () {
    //전역변수 사용을 피하기 위해
    //house를 움직이자
    const houseElem = document.querySelector('.house');
    const barElem = document.querySelector('.progress-bar');
    const mousePos = {x:0, y:0};
    //벽들과 캐릭터들이 마우스무브에 따라 움직이기 위해 stage를 이용
    const stageElem = document.querySelector('.stage');
    
    //전체문서 높이 - 창높이 = 스크롤할수 있는 높이
    let maxScrollValue;

    //창사이즈가 바뀌면 maxScrollValue를 갱신해서 계산한다.
    function resizeHandler() {
        maxScrollValue = document.body.offsetHeight - window.innerHeight;
    }
    window.addEventListener('scroll', function(){
        //console.log(pageYOffset);        
        //console.log(maxScrollValue);
        //스크롤을 얼마나 했는지 비율
        //console.log(pageYOffset/maxScrollValue);

        //house를 translateZ로 -490해줘서 hello벽이 뒤로 물러나 있었고,
        //스크롤했을때, 0부터 시작이 아닌, -490빼주고 시작하도록
        //0~1의 비율값에 1000를 곱해 0~1000까지
        const scrollPer = pageYOffset/maxScrollValue;
        const zMove = scrollPer * 980 - 490;        
        houseElem.style.transform = 'translateZ(' + zMove + 'vw)';

        //progress bar
        barElem.style.width = scrollPer * 100 + '%';
    });

    window.addEventListener('mousemove', function(e){
        //console.log(e.clientX, e.clientY);
        //화면의 가운데점을 {0,0}으로 하고 왼쪽 x:-1 오른쪽 x:1 위쪽 y:1 아래 y:-1
        //엄청 자주쓰는 수식이다.
        mousePos.x = -1 + (e.clientX / window.innerWidth) *2;
        mousePos.y = 1 - (e.clientY / window.innerHeight) *2;

        //stageElem.style.transform = 'rotateX(0deg) rotateY(0deg)';
        //가로축을 기준으로 rotate되는 거니..mousePos.y와 관련
        stageElem.style.transform = 'rotateX(' + (mousePos.y *5) + 'deg) rotateY(' + (mousePos.x *5) +'deg)';
    });

    //창사이즈가 달라질때마다 resizeHandler호출
    window.addEventListener('resize', resizeHandler);

    //stage를 클릭했을때 생성자 함수를 호출해서 캐릭터를 생기게 한다. 
    stageElem.addEventListener('click', function(e){
        //css파일의 left값에 clientX 값을 넣어주면 클릭한 점의 x좌표에 캐릭터
        //console.log(e.clientX);
        //%값으로 만들기
        //e.clientX / window.innerWidth * 100
        //생성자 함수, 객체형식으로 입력(여러값넣을꺼라서)
        new Character({
            xPos : e.clientX / window.innerWidth * 100,
            speed : Math.random() * 0.5 + 0.2
            //캐릭터 생성시 random으로 0~1 사이가 speed나옴
        });
    });
    //최초 한번은 호출
    resizeHandler();

    
    
})();