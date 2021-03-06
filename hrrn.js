
let hrrn = []
const c = ['A', 'B', 'C', 'D', 'E', 'F', 'G']
const arrival = [], burst = [];
let sum_bt = 0, avgtt = 0, avgwt = 0, i = 0, n = 0;



const createTable=(n)=>{
      // creat table to display 

      document.getElementById("table").style.display = "block"; 

      for(let i = 0; i < n; i++){
         
         const tr = document.createElement("tr");
         const td_name = document.createElement("td");
         const td_at = document.createElement("td");
         const td_bt = document.createElement("td");
         const td_ct = document.createElement("td");
         const td_tt = document.createElement("td");
         const td_wt = document.createElement("td");
   
         document.getElementById("tbody").appendChild(tr);
   
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

      const aw_wt = document.createElement("p");
      const aw_tt = document.createElement("p");

      aw_wt.textContent = avgwt;
      aw_tt.textContent = avgtt;   

      document.getElementById("container-awwt").style.display = "flex";
      document.getElementById("container-awtt").style.display = "flex";

      document.getElementById("container-awwt-inner").appendChild(aw_wt);
      document.getElementById("container-awtt-inner").appendChild(aw_tt);

}

const clearTable= ()=>{
   
   // creat table to display 

   document.getElementById("tbody").innerHTML = "";
   document.getElementById("table").style.display = "none"; 
   document.getElementById("container-awwt").style.display = "none";
   document.getElementById("container-awtt").style.display = "none";

   document.getElementById("container-awwt-inner").innerHTML = "";
   document.getElementById("container-awtt-inner").innerHTML = "";


   hrrn = []
   sum_bt = 0, avgtt = 0, sum_bt = 0, avgtt = 0, avgwt = 0, i = 0, n = 0;

}

const getDataHRRN= ()=>{

   // clear 
   clearTable();

   const arrivalString = document.getElementById("ArrivalTimes").value;
   const BurstString = document.getElementById("BurstTimes").value;

   const arrival = arrivalString.trim().split(' ').map((item)=> {
      return parseInt(item);
   });

   const burst = BurstString.trim().split(' ').map((item)=> {
      return parseInt(item);
   });

   if(arrival.length != burst.length) {

      document.getElementById("ArrivalTimes").value = "";
      document.getElementById("BurstTimes").value = "";

      alert('Input incorrect');

   }

   else if (arrivalString == "" || BurstString == ""){
      alert('Input incorrect');

   }

   else{ 

      document.getElementById("ArrivalTimes").value = "";
      document.getElementById("BurstTimes").value = "";

      // check length 
      const n = burst.reduce((sum,number) => {
         return number++;
      }, 0);

      // Initail process burst time 
      for (let i = 0; i < arrival.length; i++) {

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

      hrrn.sort((a, b) => {
         if(a.at > b.at) return 1;
         if(a.at < b.at) return -1;
         return 0;
      })
      

      console.log(hrrn);

      // Set lower limit to response ratio 
      let time = hrrn[0].at;
      // let hrr = -100;
      // let x = -1, loc =-1;

      // Response Ratio = (W + S)/S
      while(time <= sum_bt + hrrn[hrrn.length - 1].at){

         let hrr = -100;
         let x = 0, loc = -1;
         let count = 0;

         // select next process 
         for(let i = 0; i < burst.length; i++){
            count++;

            // Checking if process has arrived and is Incomplete
            if(hrrn[i].at <= time && hrrn[i].completed !== 1){

               // Calculating Response Ratio 
               x = ((hrrn[i].bt + (time - hrrn[i].at)) / hrrn[i].bt);

               // hecking for Highest Response Ratio  -> ????????????????????? ??????????????????????????????????????????
               if(hrr < x ){

                  // Storing Response Ratio  
                  hrr = x;

                  // Storing Location
                  loc = i;

               }

               fag = true;
            }
         }

         if(loc === -1 && count === burst.length){
            console.log(`buff`)
            time += 1;
            continue;
         }

         time += hrrn[loc].bt;      

         // Calculation of Completion Time ****** 
         if( hrrn[loc].ct === 0) { 

            console.log(`alive => ${hrrn[loc].at}`);
            
            hrrn[loc].ct = time ;

            // Calculation of waiting time 
            hrrn[loc].wt = time - hrrn[loc].at - hrrn[loc].bt;

            // Calculation of Turn Around Time 
            hrrn[loc].tt = time - hrrn[loc].at;

            hrrn[loc].completed = 1;

         }


      }

      for(let i = 0; i < hrrn.length ; i++ ){
         avgwt += hrrn[i].wt;
         avgtt += hrrn[i].tt;
      }

      avgwt = avgwt / hrrn.length;
      avgtt = avgtt / hrrn.length;

      // create html table
      createTable(hrrn.length);
   }  

}

const getDataHRRN_RR=(quantum)=>{

   // clear
   clearTable()

   const arrivalString = document.getElementById("ArrivalTimes").value;
   const BurstString = document.getElementById("BurstTimes").value;

   const arrival = arrivalString.trim().split(' ').map(function(item) {
      return parseInt(item);
   });

   const burst = BurstString.trim().split(' ').map(function(item) {
      return parseInt(item);
   });

   console.log(arrival);
   console.log(burst);

   // check length
   if(arrival.length != burst.length) {

      document.getElementById("ArrivalTimes").value = "";
      document.getElementById("BurstTimes").value = "";

      alert('Input incorrect');

   }

   else if (arrivalString == "" || BurstString == "" ){
      alert('Input incorrect');

   }

   else {

      document.getElementById("ArrivalTimes").value = "";
      document.getElementById("BurstTimes").value = "";


      // Initail process burst time 
      for (let i = 0; i < arrival.length; i++) {

         temp = {
            name: c[i],
            at: arrival[i],
            bt: burst[i],
            ct: 0,
            wt: 0,
            tt: 0,
            // count time quantum
            count: 0,
            completed: 0
         }

         hrrn.push(temp);
         
         // Variable for sum of all Burst Times
         sum_bt += burst[i];
      }


      // sort by at 
      hrrn.sort((a, b) => {
         if(a.at > b.at) return 1;
         if(a.at < b.at) return -1;
         return 0;
      })
      
      let time = hrrn[0].at;

      let processBF = "";

      // Response Ratio = (W + S)/S
      while(time < sum_bt + hrrn[hrrn.length - 1].at){

         // Set lower limit to response ratio 
         let hrr = -100;
         let x = 0, loc =0;

         // select next process 
         for(let i = 0; i < burst.length; i++){

            // Checking if process has arrived and is Incomplete -> ??????????????? process ????????????????????????
            if(hrrn[i].at <= time && hrrn[i].completed !== 1 && hrrn[i].name != processBF){

               // Calculating Response Ratio 
               let wt_temp = (time - hrrn[i].at);
               if(wt_temp <= 0) wt_temp *= 1
               x = ((hrrn[i].bt + wt_temp) / hrrn[i].bt);

               // hecking for Highest Response Ratio 
               if(hrr < x){

                  // Storing Response Ratio  
                  hrr = x;

                  // Storing Location
                  loc = i;

                  processBF = hrrn[loc].name;

               }
            }
         }

         // set time quantum -> ????????????????????? quantum
         count = 0;
         while(count < parseInt(quantum)){

            if(hrrn[loc].name === 'A'){
               console.log(`${hrrn[loc].name} => ${hrrn[loc].count}`);
            }

            if(hrrn[loc].completed !== 1){

            time += 1;

            // set time count 
            hrrn[loc].count += 1;

            // update counter check quantum 
            count += 1;

            // Calculation of waiting time 
            hrrn[loc].wt = time - hrrn[loc].at - hrrn[loc].bt;

            // Calculation of Turn Around Time 
            hrrn[loc].tt = time - hrrn[loc].at;

            // Calculation of Complete time
            hrrn[loc].ct = time;
            }
            else{
               time += 1;
            }

            // check process complete
            if(hrrn[loc].count === hrrn[loc].bt){
               hrrn[loc].completed = 1;
               if(hrrn[loc].name === 'A'){
                  console.log(`complte ${hrrn[loc].name} => ${hrrn[loc].count}`);
               }
               break;
            }
         }
      }

      // calcurate average time 
      for(let i = 0; i < hrrn.length ; i++ ){
         avgwt += hrrn[i].wt;
         avgtt += hrrn[i].tt;
      }

      avgwt = avgwt / hrrn.length;
      avgtt = avgtt / hrrn.length;
   

      // create html table
      createTable(hrrn.length);
   
   }

}