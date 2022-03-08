


let hrrn = []
let sum_bt = 0;
const c = ['A', 'B', 'C', 'D', 'E', 'F', 'G']
const arrival = [], burst = [];
let avgtt = 0;
let avgwt = 0;


function getData(){


   const arrivalString = document.getElementById("ArrivalTimes").value;
   const BurstString = document.getElementById("BurstTimes").value;

   const arrival = arrivalString.split(' ').map(function(item) {
      return parseInt(item, 10);
   });

   const burst = BurstString.split(' ').map(function(item) {
      return parseInt(item, 10);
   });

   console.log(arrival);
   console.log(burst);

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
         wt: 0,
         tt: 0,
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


   console.log(hrrn);

   // Response Ratio = (W + S)/S
   for(let t = hrrn[0].at; t < sum_bt;){
      
      // set lower limit hrr 
      let hrr = -9999; 

      // Response Ratio Variable
      let temp = 0; 

      // Variable to store next process selected
      let loc = 0;

      for(let i = 0; i < n; i++){

         // Checking if process has arrived and is Incomplete
         if(hrrn[i].at <= t && hrrn[i].completed != 1){

            // Calculating Response Ratio
            temp = (hrrn[i].bt + (t - hrrn.at)) / hrrn[i].bt;

            // Checking for Highest Response Ratio
            if(hrr < temp){

               // Storing Response Ratio
               hrr = temp;

               // Storing Location
               loc = i;
            }
         }
      }
      
      // Updating time value
      t += hrrn[loc].bt;

      // Calculation of waiting time
      hrrn[loc].wt = t - hrrn[loc].at - hrrn[loc].bt;

      // Calculation of Turn Around Time
      hrrn[loc].tt = t - hrrn[loc].at;

      // Sum Turn Around Time for average
      avgtt += hrrn[loc].tt;

      // Calculation of Normalized Turn Around Time
      hrrn[loc].ntt = (hrrn[loc].tt / hrrn[loc].bt);


      // Updating Completion Status
      hrrn[loc].completed = 1;

      avgwt += hrrn[loc].wt;
      
   }

   console.log(hrrn);


}





