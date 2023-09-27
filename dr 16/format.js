const textArea=document.querySelectorAll("textarea");
const mode=document.querySelector("#modeSwitch");
let span=mode.parentElement.nextElementSibling.firstElementChild;
function formatTextArea(){

     textArea.forEach(e=>{
          e.style.cssText=`height: ${e.scrollHeight}px`;
          e.style.resize="none";
          e.addEventListener("input",element=>{
               e.style.height="9px";
               let sc=element.target.scrollHeight;
               e.style.height=`${sc}px`;
          });
     });
};


function mode1(){
     
     mode.addEventListener("change",()=>{
          
          if(mode.checked){
               span.textContent="Real Time";
          }else{
               span.textContent="Submit";
          }
     });
}



export {formatTextArea, mode1}
