const carousel = document.getElementById('carousel');
const slides = [...carousel.children];
const dots = document.getElementById('dots');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
let page = 0;

function perView(){
  return window.innerWidth <= 520 ? 1 : window.innerWidth <= 800 ? 2 : 3;
}
function pageCount(){
  return Math.max(1, slides.length - perView() + 1);
}
function renderDots(){
  dots.innerHTML = '';
  const count = pageCount();
  page = Math.min(page, count - 1);
  for(let i=0;i<count;i++){
    const b=document.createElement('button');
    b.className=i===page?'active':'';
    b.setAttribute('aria-label',`Go to slide ${i+1}`);
    b.onclick=()=>{page=i;update()};
    dots.appendChild(b);
  }
}
function update(){
  const gap = window.innerWidth <= 520 ? 0 : window.innerWidth <= 800 ? 14 : 21;
  const pv = perView();
  const offset = page * ((100 + gap * 100 / carousel.clientWidth) / pv);
  carousel.style.transform = `translateX(-${offset}%)`;
  [...dots.children].forEach((d,i)=>d.classList.toggle('active',i===page));
}
prev.addEventListener('click',()=>{page=Math.max(0,page-1);update()});
next.addEventListener('click',()=>{page=Math.min(pageCount()-1,page+1);update()});
window.addEventListener('resize',()=>{renderDots();update()});
renderDots();
update();
