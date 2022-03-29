let hrrn = []
const c = ['A', 'B', 'C', 'D', 'E', 'F', 'G']
const arrival = [], burst = [];
let sum_bt = 0, avgtt = 0, avgwt = 0, i = 0, n = 0;


function createTable(n){
      // creat table to display 

      let table = document.getElementById("table").style.display = "block"; 

      for(let i = 0; i < n; i++){
   
         const tr = document.createElement("tr");
         const td_name = document.createElement("td");
         const td_at = document.createElement("td");
         const td_bt = document.createElement("td");
         const td_ct = document.createElement("td");
         const td_tt = document.createElement("td");
         const td_wt = document.createElement("td");
   
         const tbody = document.getElementById("tbody").appendChild(tr);
   
         td_name.textContent = hrrn[i].name;
         td_at.textContent = hrrn[i].at;
         td_bt.textContent = hrrn[i].bt;
         td_ct.textContent = hrrn[i].ct;
         td_tt.textContent = hrrn[i].tt;
         td_wt.textContent = hrrn[i].wt;
   
         tr.appendChild(td_name);
         tr.appendChild(td_at);
         tr.appendChild(td_bt);
         tr.appendChild(td_ct);
         tr.appendChild(td_tt);
         tr.appendChild(td_wt);
   
      }
}

function clearTable(){
   // creat table to display 

   document.getElementById("tbody").innerHTML = "";

   hrrn = []
   sum_bt = 0, avgtt = 0, avgwt = 0, i = 0, n = 0;

}

function getDataHRRN(){

   // clear 
   clearTable();

   const arrivalString = document.getElementById("ArrivalTimes").value;
   const BurstString = document.getElementById("BurstTimes").value;

   const arrival = arrivalString.split(' ').map(function(item) {
      return parseInt(item, 10);
   });

   const burst = BurstString.split(' ').map(function(item) {
      return parseInt(item, 10);
   });

   document.getElementById("ArrivalTimes").value = "";
   document.getElementById("BurstTimes").value = "";


   // check length 
   const n = burst.reduce((sum,number) => {
      return number++;
    }, 0)

   // Initail process burst time 
   for (let i = 0; i < n; i++) {

      temp = {
         name: c[i],
         at: arrival[i],
         bt: burst[i],
         ct: 0,
         wt: 0,
         tt: 0,
         completed: 0
      }
   
      hrrn.push(temp);
   
      // Variable for sum of all Burst Times
      sum_bt += burst[i];
   }

   // sort by at 
   hrrn.sort((a, b) => {
      return a.at - b.at
   });

   let time = hrrn[0].at;
   // Set lower limit to response ratio 
   let hrr = -9999;
   let x = 0, loc =0;

   // Response Ratio = (W + S)/S
   while(time < sum_bt + hrrn[0].at){

      // select next process 
      for(let i = 0; i < n; i++){

         // Checking if process has arrived and is Incomplete
         if(hrrn[i].at <= time && hrrn[i].completed != 1){

            // Calculating Response Ratio 
            x = ((hrrn[i].bt + (time - hrrn[i].at)) / hrrn[i].bt);

            // hecking for Highest Response Ratio 
            if(hrr < x){

               // Storing Response Ratio  
               hrr = x;

               // Storing Location
               loc = i;

            }
         }
      }


      // Updating time value 
      time += hrrn[loc].bt

      hrrn[loc].ct = hrrn[loc].tt + hrrn[loc].at ;


      // Calculation of waiting time 
      hrrn[loc].wt = time - hrrn[loc].at - hrrn[loc].bt;

      // Calculation of Turn Around Time 
      hrrn[loc].tt = time - hrrn[loc].at;

      hrrn[loc].completed = 1;

   }

   // create html table
   
   createTable(n);


}

function getDataHRRN_RR(quantum){

   console.log(quantum);

   clearTable()

   const arrivalString = document.getElementById("ArrivalTimes").value;
   const BurstString = document.getElementById("BurstTimes").value;

   const arrival = arrivalString.split(' ').map(function(item) {
      return parseInt(item, 10);
   });

   const burst = BurstString.split(' ').map(function(item) {
      return parseInt(item, 10);
   });

   document.getElementById("ArrivalTimes").value = "";
   document.getElementById("BurstTimes").value = "";

   // check length 
   const n = burst.reduce((sum,number) => {
      return number++;
    }, 0)

   // Initail process burst time 
   for (let i = 0; i < n; i++) {

      temp = {
         name: c[i],
         at: arrival[i],
         bt: burst[i],
         ct: 0,
         wt: 0,
         tt: 0,
         count: 0,
         completed: 0
      }

      hrrn.push(temp);
      
      // Variable for sum of all Burst Times
      sum_bt += burst[i];
   }

   console.log(hrrn);

   // sort by at 
   hrrn.sort((a, b) => {
      return a.at - b.at
   });

   let time = hrrn[0].at;

   // Set lower limit to response ratio 
   let hrr = -9999;
   let x = 0, loc =0;


   // Response Ratio = (W + S)/S
   while(time < sum_bt + hrrn[0].at){

      // select next process 
      for(let i = 0; i < n; i++){

         // Checking if process has arrived and is Incomplete
         if(hrrn[i].at <= time && hrrn[i].completed != 1){

            // Calculating Response Ratio 
            x = ((hrrn[i].bt + (time - hrrn[i].at)) / hrrn[i].bt);

            // hecking for Highest Response Ratio 
            if(hrr < x){

               // Storing Response Ratio  
               hrr = x;

               // Storing Location
               loc = i;

            }
         }
      }

      count = 0;
      while(count < parseInt(quantum)){
         // Updating time value 
         time += 1

         hrrn[loc].count += 1;

         count += 1;

         // Calculation of waiting time 
         hrrn[loc].wt = time - hrrn[loc].at - hrrn[loc].bt;

         // Calculation of Turn Around Time 
         hrrn[loc].tt = time - hrrn[loc].at;

         // Calculation of Complete time
         hrrn[loc].ct = hrrn[loc].tt + hrrn[loc].at ;

         if(hrrn[loc].count == hrrn[loc].bt){
            hrrn[loc].completed = 1;
         }
      }

   }
 

   // create html table
   createTable(n);


}