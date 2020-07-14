(function () {
    //전역변수 사용을 피하기 위해
    //house를 움직이자
    const houseElem = document.querySelector('.house');
    //전체문서 높이 - 창높이 = 스크롤할수 있는 높이
    let maxScrollValue = document.body.offsetHeight - window.innerHeight;

    window.addEventListener('scroll', function(){
        console.log(pageYOffset);        
        console.log(maxScrollValue);
        //스크롤을 얼마나 했는지 비율
        console.log(pageYOffset/maxScrollValue);

        //house를 translateZ로 -490해줘서 hello벽이 뒤로 물러나 있었고,
        //스크롤했을때, 0부터 시작이 아닌, -490빼주고 시작하도록
        //0~1의 비율값에 1000를 곱해 0~1000까지
        const zMove = pageYOffset/maxScrollValue * 980 - 490;        
        houseElem.style.transform = 'translateZ(' + zMove + 'vw)';
    });
})();