

const himpunanObjek=[];
for (let index = 32; index < 127; index++) {
     himpunanObjek.push(String.fromCharCode(index))

     
}

himpunanObjek.push("α","β","Δ","δ","ε")

export {himpunanObjek}
console.log(himpunanObjek)


export function findIndex(elementToFind) {
     for (let i = 0; i < himpunanObjek.length; i++) {
          if (himpunanObjek[i] === elementToFind) {
               return i; // Mengembalikan indeks pertama di mana elemen ditemukan
          }
     }
     return -1; 
}

const kunci=document.querySelector(".k.enkripsi>input");
function textToListAscii(text){
     let arrText=Array.from(String(text));
     let arrAscii=arrText.map((e)=>(findIndex(e)));
     return arrAscii
}


function ListToTextAscii(list){
     let listMod=list.map((e)=>himpunanObjek[(100+e%100)%100]);
     let chip = listMod.join("")
     return chip
}

export function caesar(text){
     const listText=textToListAscii(text);
     const keyList=listText.map(el=>(el+Number(kunci.value)));
     return ListToTextAscii(keyList);
};


export function caesarDek(text){
     const listText=textToListAscii(text);
     const keyList=listText.map(el=>(el-Number(kunci.value)));
     return ListToTextAscii(keyList);
};


export function vigenere(text){
     const listText=textToListAscii(text);
     const listkey=textToListAscii(kunci.value);


     let listKeySebanyakText=[];
     for (let i=0;i<=text.length-1;i++){
          listKeySebanyakText.push(listkey[i%listkey.length])
     };
     let hasilPlus = listText.map((value, index) => (value + listKeySebanyakText[index])%100);
     console.log(hasilPlus)
     return ListToTextAscii(hasilPlus)
     
};

export function vigenereDek(text){
     const listText=textToListAscii(text);
     const listkey=textToListAscii(kunci.value);


     let listKeySebanyakText=[];
     for (let i=0;i<=text.length-1;i++){
          listKeySebanyakText.push(listkey[i%listkey.length])
     };
     let hasilPlus = listText.map((value, index) => (100+(value - listKeySebanyakText[index])%100)%100);
     console.log(hasilPlus)
     return ListToTextAscii(hasilPlus)

};

// membuat kunci matrix
export function keyPlayFair(text){
     let keyListA=Array.from(text);
     let kunciUniq = [];
     for ( let i = 0; i < keyListA.length; i++ ) {
          if ( !kunciUniq.includes( keyListA[ i ] ) ) {
               kunciUniq.push( keyListA[ i ] );
          }
     }

     for ( let i = 0; i < 95; i++ ) {
          if ( !kunciUniq.includes( String.fromCharCode(32+i) ) ) {
               kunciUniq.push( String.fromCharCode(32+i) );
          }
     }
     kunciUniq.push("α","β","Δ","δ","ε");


     const numRows = 10;
     const numCols = 10;
     const matrixKunci = [];

     for ( let i = 0; i < numRows; i++ ) {
     const row = [];
     for ( let j = 0; j < numCols; j++ ) {
          const value = kunciUniq[ i * numCols + j ];
          row.push( value );
     }
          matrixKunci.push( row );
     }
     return matrixKunci
}
       
function cekUniqText(teks){
     let resultArray1 = teks.match(/.{1,2}/g);
     if(resultArray1===null){
          resultArray1=[];
     }
     let resultArrayList1 = resultArray1.map(e=>Array.from(e));          
     for (let innerArray of resultArrayList1) {
          if (innerArray.length === 2 && innerArray[0] === innerArray[1]) {
               innerArray[0] += "Δ";
          }    
     }          
     let result = '';
     for (let innerList of resultArrayList1) {
          result += innerList.join('');
     }
     let listFor1=result.match(/.{1,2}/g);
     if(listFor1===null){
          listFor1=[];
     }
     let listFor=listFor1.map(e=>Array.from(e));
     return {result,listFor}     
}

export function playFair(text){
     const matrixKunci=keyPlayFair(kunci.value);     
     let hasiljadiTextEnk=cekUniqText(text).listFor;
     let hasiljadiTextEnkRe=cekUniqText(text).result;
     for (let innerArray of hasiljadiTextEnk) {
          if (innerArray.length === 2 && innerArray[0] === innerArray[1]) {
               hasiljadiTextEnk=cekUniqText(hasiljadiTextEnkRe).listFor
               hasiljadiTextEnkRe=cekUniqText(hasiljadiTextEnkRe).result;
               }
               
     }
     
     if (hasiljadiTextEnk === null) {
          hasiljadiTextEnk = []; 
     }


     for (let i = 0; i < hasiljadiTextEnk.length; i++) {
          if (hasiljadiTextEnk[i].length === 1) {
               hasiljadiTextEnk[i].push("Δ") ;
          }
     }


     let x = hasiljadiTextEnk.map( e =>
          e.map( el => {
               const positions = findElementPosition( matrixKunci, el );
               return [ positions.row, positions.col ];
          } )
     );
     

     for ( let i = 0; i < x.length; i++ ) {
          if ( x[ i ][ 0 ][ 0 ] == x[ i ][ 1 ][ 0 ] ) {
               // Mengganti karakter kedua dengan karakter baru (contoh: menambah 1)
               const newCharacter1 =  (parseInt( x[ i ][ 0 ][ 1 ] ) + 1)%10 ;
               const newCharacter2 =  (parseInt( x[ i ][ 1 ][ 1 ] ) + 1)%10 ;
               x[ i ][ 0 ][ 1 ] = newCharacter1;
               x[ i ][ 1 ][ 1 ] = newCharacter2;

          }else if( x[ i ][ 0 ][ 1 ] == x[ i ][ 1 ][ 1 ] ){
               const newCharacter1 =  (parseInt( x[ i ][ 0 ][ 0 ] ) + 1)%10 ;
               const newCharacter2 =  (parseInt( x[ i ][ 1 ][ 0 ] ) + 1)%10 ;
               x[ i ][ 0 ][ 0 ] = newCharacter1;
               x[ i ][ 1 ][ 0 ] = newCharacter2;
               
          }else{
               const newCharacter1 =  (parseInt( x[ i ][ 1 ][ 1 ] )) ;
               const newCharacter2 =  (parseInt( x[ i ][ 0 ][ 1 ] )) ;
               x[ i ][ 0 ][ 1 ] = newCharacter1;
               x[ i ][ 1 ][ 1 ] = newCharacter2;

          }
     }
     const flatList = x.reduce( ( acc, curr ) => {
               return acc.concat( curr );
          }, [] );

          let hasil=[];
          for ( let i = 0; i < flatList.length; i++ ){

               hasil.push(matrixKunci[flatList[i][0]][flatList[i][1]])
          }
          const hasilJoin=hasil.join("");
          return {hasil, hasilJoin};
};

export function playFairDek(text){

     let textArray = text.match(/.{1,2}/g);
     if (textArray === null) {
     textArray = [];
     }

     let resultArrayList1 = textArray.map(e => Array.from(e));

     if (text.length % 2 == 0 && resultArrayList1.every(e => e[0] != e[1])) {
     return playFairD(text).hasilJoin; // Lakukan sesuatu dengan hasil pemanggilan ini
     }else{
          if (text.length%2!=0){
               return "Tidak bisa didekripsi, alasan: Jumlah input Ganjil"
               
          } else{
               return "Tidak bisa didekripsi, alasan: Terdapat pair yang sama"

          }
     }



}
       
function playFairD(text){
     const matrixKunci=keyPlayFair(kunci.value)
     let textArray = text.match(/.{1,2}/g);
     if(textArray===null){
          textArray=[];
     }     
     let textArray1 = textArray.map(e=>Array.from(e));
     let x = textArray1.map( e =>
          e.map( el => {
               const positions = findElementPosition( matrixKunci, el );
               return [ positions.row, positions.col ];
          } )
     );
     

     for ( let i = 0; i < x.length; i++ ) {
          if ( x[ i ][ 0 ][ 0 ] == x[ i ][ 1 ][ 0 ] ) {
               // Mengganti karakter kedua dengan karakter baru (contoh: menambah 1)
               const newCharacter1 =  parseInt((10+(( x[ i ][ 0 ][ 1 ] ) - 1)%10)%10) ;
               const newCharacter2 =  parseInt((10+(( x[ i ][ 1 ][ 1 ] ) - 1)%10)%10) ;
               x[ i ][ 0 ][ 1 ] = newCharacter1;
               x[ i ][ 1 ][ 1 ] = newCharacter2;
               
          }else if( x[ i ][ 0 ][ 1 ] == x[ i ][ 1 ][ 1 ] ){
               const newCharacter1 =  parseInt((10+(( x[ i ][ 0 ][ 0 ] ) - 1)%10)%10) ;
               const newCharacter2 =  parseInt((10+(( x[ i ][ 1 ][ 0 ] ) - 1)%10)%10) ;
               
               x[ i ][ 0 ][ 0 ] = newCharacter1;
               x[ i ][ 1 ][ 0 ] = newCharacter2;
               

          }else{
               const newCharacter1 =  (parseInt( x[ i ][ 1 ][ 1 ] )) ;
               const newCharacter2 =  (parseInt( x[ i ][ 0 ][ 1 ] )) ;
               x[ i ][ 0 ][ 1 ] = newCharacter1;
               x[ i ][ 1 ][ 1 ] = newCharacter2;

          }
     }
     const flatList = x.reduce( ( acc, curr ) => {
               return acc.concat( curr );
          }, [] );

          let hasil=[];
          for ( let i = 0; i < flatList.length; i++ ){

               hasil.push(matrixKunci[flatList[i][0]][flatList[i][1]])
          }
          const hasilJoin=hasil.filter(e=>e!="Δ").join("");
          
          return {hasil, hasilJoin};
};





// mencari fungsi
function findElementPosition( matrixKunci, targetValue ) {
          for ( let row = 0; row < matrixKunci.length; row++ ) {
               for ( let col = 0; col < matrixKunci[ row ].length; col++ ) {
                    if ( matrixKunci[ row ][ col ] === targetValue ) {
                         return { row, col };
                    }
               }
          }
          return null;
     }





