let wallpapers = [];


const gallery = document.querySelector("#gallery");
const search = document.querySelector("#search");
const category = document.querySelector("#category");


fetch("manifest.json")
.then(r => r.json())
.then(data => {

    wallpapers = data.wallpapers;

    setupCategories();

    render();

});



function setupCategories(){

    let cats = wallpapers.map(w => {

        return w.file.split("/")[1];

    });


    [...new Set(cats)].forEach(cat=>{

        let option=document.createElement("option");

        option.value=cat;

        option.textContent=
            cat[0].toUpperCase()+cat.slice(1);

        category.appendChild(option);

    });

}



function render(){

    let query =
        search.value.toLowerCase();


    let selected =
        category.value;


    gallery.innerHTML="";


    wallpapers

    .filter(w=>{


        let cat =
        w.file.split("/")[1];


        let matchesSearch =
            w.title
            .toLowerCase()
            .includes(query)
            ||
            w.author
            .toLowerCase()
            .includes(query);


        let matchesCategory =
            selected==="all"
            ||
            selected===cat;


        return matchesSearch &&
               matchesCategory;


    })

    .forEach(w=>{


        let card=document.createElement("div");

        card.className="card";


        card.innerHTML=`

            <img src="${w.file}">

            <div class="info">

                <h3>${w.title}</h3>

                <div class="tag">
                    ${w.author}
                </div>

            </div>

        `;


        card.onclick=()=>openViewer(w);


        gallery.appendChild(card);


    });

}



search.oninput=render;
category.onchange=render;




const viewer =
document.querySelector("#viewer");


function openViewer(w){


    viewer.classList.add("active");


    viewerImage.src=w.file;

    viewerTitle.textContent=w.title;

    viewerAuthor.textContent=
        "by "+w.author;


    viewerSource.href=
        w.originalSource;


}



close.onclick=()=>{

    viewer.classList.remove("active");

};



document.addEventListener(
"keydown",
e=>{

    if(e.key==="Escape")
        viewer.classList.remove("active");

});
