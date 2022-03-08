


let hrrn = []
let sum_bt = 0;
const c = ['A', 'B', 'C', 'D', 'E', 'F', 'G']
const arrival = [], burst = [];


function getData(){


   const arrivalString = document.getElementById("ArrivalTimes").value;
   const BurstString = document.getElementById("BurstTimes").value;


   const arrival = arrivalString.split(' ').map(function(item) {
      return parseInt(item, 10);
   });

   const burst = BurstString.split(' ').map(function(item) {
      return parseInt(item, 10);
   });

   

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
         completed: 0,
      }
   
      hrrn.push(temp);
   
      // Variable for sum of all Burst Times
      sum_bt += burst[i];
      console.log(sum_bt);
   }

   hrrn.sort((a, b) => {
      return a.at - b.at
   });


   // main 

   for(let t = hrrn[0].at; t < sum_bt; t++){
      console.log(t);

      // set lower limit to response ratio
      let hrr = -9999;

      // Response Ratio Variable
      let temp = 0; 

      // Variable to store next process selected
      let loc = 0; 
      for(let i = 0; i < n; i++){

         // Checking if process has arrived and is Incomplete
         if(hrrn[i].at <= t && hrrn[i].completed != 1){

            // Calculating Response Ratio
            temp = (hrrn[i].bt + (t - hrrn))

         }
      }




   }

}





