function showMateri(num){
    document.getElementById("menu").style.display = "none";

    document.querySelectorAll(".detail").forEach(item=>{
        item.style.display = "none";
    });

    document.getElementById("materi"+num).style.display = "block";
}

function backMenu(){
    document.querySelectorAll(".detail").forEach(item=>{
        item.style.display = "none";
    });

    document.getElementById("menu").style.display = "grid";
}