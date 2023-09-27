const kunci=document.querySelector(".k.enkripsi>input");


// kunci.addEventListener("input", function() {
//   console.log(kunci.value);
// });

kunci.value=0;
const selectElement = document.getElementById("selectOption");
const mode=document.querySelector("#modeSwitch");

import * as enkdek from "./modul1.js";


function caraCopy(textToCopy){
     if(textToCopy!==""){

          const tempTextArea = document.createElement("textarea");
          tempTextArea.value = textToCopy;
          document.body.appendChild(tempTextArea);
          
          // Memilih teks dalam textarea
          tempTextArea.select();
          tempTextArea.setSelectionRange(0, 9999999); // Untuk seleksi di berbagai browser
          
          // Menyalin teks ke clipboard
          document.execCommand("copy");
          
          // Menghapus elemen textarea sementara
          document.body.removeChild(tempTextArea);
          const popup = document.getElementById("popup");
          popup.innerHTML = "Teks telah disalin ke clipboard ";
          popup.style.display = "block";
          popup.style.backgroundColor="";
          setTimeout(function() {
               popup.style.display = "none";
          }, 1000);
     }else{
          const popup = document.getElementById("popup");
          popup.innerHTML = "Teks Kosong";
          popup.style.display = "block";
          popup.style.backgroundColor="red";
          setTimeout(function() {
               popup.style.display = "none";
          }, 1000);
     };     
};

const copyButtons = document.querySelectorAll("#copyButton");
function copyText() {
     copyButtons.forEach((copyButton,index)=>{
          copyButton.addEventListener("click",()=>{
               if (index===0){
                    const textToCopy = document.getElementById("tt").textContent;
                    caraCopy(textToCopy)
               }
               else{
                    const textToCopy1 = document.getElementById("ttd").textContent;
                    caraCopy(textToCopy1)
               };
          });
     });     
};





function saveSelectedOption() {
     const selectedOption = selectElement.value;
     localStorage.setItem('selectedOption', selectedOption);
}

// Fungsi untuk mendapatkan selected option dari local storage (jika ada)
function loadSelectedOption() {
     const selectedOption = localStorage.getItem('selectedOption');
     if (selectedOption) {
          selectElement.value = selectedOption;
     }
}


function switchKunci(){     
     const selectedOption=localStorage.getItem("selectedOption")

     
     switch (selectedOption) {
          case "1":
               kunci.type = "number";
               break;
          case "2":
               kunci.type = "text";
               break;
          case "3":
               kunci.type = "text";
               break;
          case "4":
               kunci.type = "text";
               break;
          default:
               break;
     };

     
};






import { keyPlayFair } from "./modul1.js";


const form=document.querySelectorAll("form");
// Fungsi untuk membuat matriks 10x10 tanpa mengisi nilainya
function createEmptyMatrix() {
    const table = document.getElementById("matrixTable");

    for (let i = 0; i < 10; i++) {
        const row = document.createElement("tr");

        for (let j = 0; j < 10; j++) {
            const cell = document.createElement("td");
            cell.textContent = ""; // Sel kosong tanpa isi
            row.appendChild(cell);
        }

        table.appendChild(row);
    }
}
createEmptyMatrix()
kunci.addEventListener("input", fillMatrix);


// Fungsi untuk mengisi matriks yang sudah ada dengan data baru
const matrixData = keyPlayFair(kunci.value); 
// Gantilah ini dengan data matriks yang sesuai
console.log(kunci.value)
console.log(matrixData)
function fillMatrix() {
     const matrixData = keyPlayFair(kunci.value); // Gantilah ini dengan data matriks yang sesuai
     console.log(matrixData)
     const table = document.getElementById("matrixTable");
     const cells = table.getElementsByTagName("td");

     for (let i = 0; i < cells.length; i++) {
        cells[i].textContent = matrixData[Math.floor(i / 10)][i % 10];
     }
}











function firstRealTime(){

     form.forEach((e,index)=>{
          const textArea=e.firstElementChild.firstElementChild;
          const outputInput=e.parentElement.nextElementSibling.lastElementChild;
          const outputHasil=outputInput.parentElement.nextElementSibling.lastElementChild; 
          
          
     
          function updateHasilOutput() {

               
               function enkripsi(){
                    const selectedOption=localStorage.getItem("selectedOption")

                    if (selectedOption==1){
                         outputHasil.textContent =enkdek.caesar(textArea.value);
                         e.addEventListener("submit", (ele)=>{
                              ele.preventDefault();
                              updateHasilOutput();
                              }     
                         );                    
                    }else if(selectedOption==2){
                         outputHasil.textContent=enkdek.vigenere(textArea.value)
                    }
                    else if(selectedOption==3){
                         const myArray = textArea.value;
                         if(myArray!==null){
                              


                              


                       

                              outputHasil.textContent=enkdek.playFair(textArea.value).hasilJoin
                              
                         }



                    }
               }
               function dekripsi(){
                    const selectedOption=localStorage.getItem("selectedOption");
                    

                    if (selectedOption==1){
                         outputHasil.textContent =enkdek.caesarDek(textArea.value);
                         e.addEventListener("submit", (ele)=>{
                              ele.preventDefault();
                              updateHasilOutput();
                              }     
                         );                    
                    }
                    else if(selectedOption==2){
                         outputHasil.textContent=enkdek.vigenereDek(textArea.value)
                    }
                    else if(selectedOption==3){
                         if (textArea.value!=null){

                              outputHasil.textContent=enkdek.playFairDek(textArea.value)
                         }
                         

                    }
               }


               if(index===0){
                    enkripsi()
                    kunci.addEventListener("change",enkripsi)
                    selectElement.addEventListener("change",enkripsi)
                    updateOutput1(); 
                    
               }else{
                    dekripsi()
                    kunci.addEventListener("change",dekripsi)
                    selectElement.addEventListener("change",dekripsi)
                    updateOutput1();     

               }
          };

          function updateOutput1() {
               outputInput.textContent =textArea.value ;
               kunci.addEventListener("change",()=>{
                    outputInput.textContent =textArea.value ;
               })          
          }

          
          
          mode.addEventListener("change", function() {
               if (mode.checked) {                    
                    textArea.addEventListener("input", updateHasilOutput);                  
               } else {          
                    textArea.removeEventListener("input", updateHasilOutput);                    
                    textArea.textContent = textArea.value;
                    e.addEventListener("submit", (ely)=>{
                         ely.preventDefault();
                         updateHasilOutput();
                         }     
                    );
               }
          });
          if (mode.checked) {
               textArea.addEventListener("input", updateHasilOutput);
     
          }


     })

};


function hapus(){
     form.forEach(fo=>{

          const textArea=fo.firstElementChild.firstElementChild;
          const outputInput=fo.parentElement.nextElementSibling.lastElementChild;
          const outputHasil=outputInput.parentElement.nextElementSibling.lastElementChild;          
          function formatHapus(){
               textArea.nextElementSibling.firstElementChild.style.display="flex";               
          }
          textArea.addEventListener("input",()=>{

               if (textArea.value!=""){
                    formatHapus()
               }else{
                    textArea.nextElementSibling.firstElementChild.style.display="none";               
                    
               };
          });
          textArea.nextElementSibling.addEventListener("click",()=>{
               const outputInput=fo.parentElement.nextElementSibling.lastElementChild;
               textArea.value="";
               outputInput.textContent="";
               textArea.nextElementSibling.firstElementChild.style.display="none";               
               outputHasil.textContent="";


          })
          
     });
};

     
     






export {copyText, firstRealTime, hapus, switchKunci,loadSelectedOption, saveSelectedOption}


