

let price=document.getElementById('price');
let title=document.getElementById('title');
let ads=document.getElementById('ads');
let discount=document.getElementById('discount');
let count=document.getElementById('count');
let total=document.getElementById('total');
let category=document.getElementById('category');
let searshmode="title";
let submint=document.getElementById('submint');
total.innerHTML='';

let temp=0;
 let mode='create';
 let datapro;
 
function cleardata() {
price.value='';
title.value='';
ads.value='';
taxes.value='';
discount.value='';
category.value='';
total.innerHTML='';

count.value='';
  total.style.background='#ff2b5f'  
}




function gettotal() {
    if(price.value!=''){
     let result=(+price.value+  +ads.value+  +taxes.value )- +discount.value;
     total.innerHTML=result;
     total.style.background='#040'     
    }
    else{total.innerHTML='';
   total.style.background='#ff2b5f'; }}
   
 if(localStorage.product !=null){datapro=JSON.parse(localStorage.product)}  else{datapro=[];}

submint.onclick=function () {

let newpro={
    title:title.value.toLowerCase(),
    price:price.value,
    ads:ads.value,
    taxes:taxes.value,
    discount:discount.value,
    count:count.value,
    category:category.value.toLowerCase(),
    total:total.innerHTML 
}

if(title.value!=''&& price.value!=''&&category.value!=''&&count.value<101){  if (mode==='create') {
    if(newpro.count>1)
{
    for(i=0;i<newpro.count;i++)
    {datapro.push(newpro); }
    }
    
    else{
    
    console.log(datapro)
     datapro.push(newpro);    
    } 
    
    
    }
  else{
     datapro[temp]=newpro;
     
    count.style.display='block';
 
 submint.innerHTML='اضافة منتج جديد'
  } 
   cleardata();
  }

  
         
    localStorage.product=JSON.stringify(datapro);  
    
     gettotal();   
   showdata();      
         
     }   
    

 let btnDeleteAll=document. getElementById('DeleteAll');
 
 
function showdata() {
gettotal();

    let table='';
    for (I=0;I<datapro.length; I++)
    {
     table +=`
      <tr>       
        <td>${datapro[I].title}</td>
         <td>${datapro[I].price}</td> 
      <td>${datapro[I].category}</td>  
         <td>${datapro[I].total}</td>
  <td><button  onclick=updatedata(${I}) id="update">update</button></td>
            <td><button onclick="deletData(${I})"
               id="delete">delete</button></td> 
            
         </tr>`
 }
   document.getElementById("tbody").innerHTML=table;
 
  if (datapro.length >0){btnDeleteAll.innerHTML=`
 <button onclick="DeleteAll()">حذف جميع العناصر</button>`} 
 else  {   
     btnDeleteAll.innerHTML=''}
   
 

 

 
    }
    
  function updatedata(I) {
    title.value=datapro[I].title;
  price.value=datapro[I].price;
  taxes.value=datapro[I].taxes;
 ads.value=datapro[I].ads;
total.innrHTMK=datapro[I].title;
 gettotal(); category.value=datapro[I].category; 
    count.ads=datapro[I].ads; 
 count.style.display='none';
 
 submint.innerHTML='UPDATE';
 mode='update';
 temp=I;
 scroll(
     {top:0,
    behavior:'smooth',
     }
 );
 
   
}


function DeleteAll() {
   localStorage.clear();
   datapro.splice(0);
   showdata();
   
}

 function deletData(I) {
datapro.splice(I,1);
localStorage.product=JSON.stringify(datapro);
showdata(); 
 }   
 
 
 function getsearshmode(id) {

 let searsh=document.getElementById('searsh');
  if(id==='searshTitle'){
    searshmode="title";
      searsh.placeholder='بحث بالاسم'  
  }
  else
  {
     searshmode="category"; 
     searsh.placeholder='بحث بالنوع';
  }
  searsh.focus();
  
  searsh.value=''
  showdata();  
  
  console.log(searshmode)
}


function searshdata(value) {
table=''
 if( searshmode=='title')
{
 for(I=0;I<datapro.length;I++)
   {
      if(datapro[I].title.includes(value.toLowerCase())){
          table +=`
           <tr>       
             <td>${datapro[I].title}</td>
             <td>${datapro[I].price}</td>  
              <td>${datapro[I].taxes}</td>
             <td>${datapro[I].ads}</td>
           <td>${datapro[I].discount}</td>
            
               <td>${datapro[I].category}</td>  
               <td>${datapro[I].total}</td>
               <td><button  onclick=updatedata(${I}) id="update">update</button></td>
               <td><button onclick="deletData(${I})"
               id="delete">delete</button></td> 
            
         </tr>`    
          
      }      
   }
}
//mode category
else
{
 
  if( searshmode=='category')
{
 for(I=0;I<datapro.length;I++)
   {
      if(datapro[I].category.includes(value.toLowerCase())){
          table +=`
           <tr>       
             <td>${datapro[I].title}</td>
             <td>${datapro[I].price}</td>  
              <td>${datapro[I].taxes}</td>
             <td>${datapro[I].ads}</td>
           <td>${datapro[I].discount}</td>
            
               <td>${datapro[I].category}</td>  
               <td>${datapro[I].total}</td>
               <td><button  onclick=updatedata(${I}) id="update">update</button></td>
               <td><button onclick="deletData(${I})"
               id="delete">delete</button></td> 
            
         </tr>`    
          
      }      
   }
 
 
    }
}
  
  
document.getElementById("tbody").innerHTML=table;
 
    
 }   

showdata();
 

