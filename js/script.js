const api_key="5f81bc9be40141a1bf29919938024eaf";
const url="https://newsapi.org/v2/everything?q=";
window.addEventListener('load',()=>{
    return fetchNews("India");
});
function reload(){
    window.location.reload();
}

async function fetchNews(query){
    const request=`${url}${query}&sortBy=publishedAt&apiKey=${api_key}`;
    const res=await fetch(request);
    const data=await res.json();
    console.log(data);
    bindData(data.articles);
}
function bindData(articles){
    const cardContainer=document.getElementById('card-container');
    const templateContainer=document.getElementById('template-container');
    cardContainer.innerHTML="";
    articles.forEach((article)=>{
        if(!article.urlToImage) return;
        const cardclone=templateContainer.content.cloneNode(true);
        fillData(cardclone,article);
        cardContainer.appendChild(cardclone);
    });
}

function fillData(cardclone,article){
    const newsImage=cardclone.querySelector('#card-image');
    const newsTitle=cardclone.querySelector('#news-title');
    const newsSrc=cardclone.querySelector('#news-source');
    const newsDesc=cardclone.querySelector('#news-desc');
    newsImage.src=article.urlToImage;
    newsTitle.innerHTML=article.title;
    const date=new Date(article.publishedAt).toLocaleString('en-US',{
        timeZone:'Asia/jakarta'
    });
    newsSrc.innerHTML=`${article.source.name} . ${date}`;
    newsDesc.innerHTML=article.description;
    cardclone.firstElementChild.addEventListener('click',()=>{
        window.open(article.url,"_blank");
    })
}

function onNavItemClick(id){
    return fetchNews(id);
}

const searchBtn=document.getElementById('search-btn');
const searchItem=document.getElementById('search-item');
searchBtn.addEventListener('click',()=>{
    const query=searchItem.value;
    if(!query)
    return;
    return fetchNews(query);
})

const screen=window.innerWidth;
console.log(screen);
if(screen<=600){
const icon=document.querySelector('.bars');
icon.style.visibility='visible';
const navList=document.querySelector('.nav-list');
icon.addEventListener('click',()=>{
    document.querySelector('.main-bar').classList.toggle('active');
    navList.classList.toggle('active');
})
}