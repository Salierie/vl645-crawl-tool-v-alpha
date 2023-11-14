const cheerio = require("cheerio");
const axios = require("axios");
const fs = require('fs');
const prompt = require('prompt-sync')();



const results = [];
const alpha = []; 

let singleArr = new Array();
let doubleArr = new Array();
let tripleArr = new Array();
let quadrupleArr = new Array();
let quintupletArr = new Array();
let hexadArr = new Array();



async function printAllPossibleSets(numbers){


    const groups = [];
    //if(fs.existsSync('./single.xlsx') || fs.existsSync('./double.xlsx') || fs.existsSync('./triple.xlsx') || fs.existsSync('./quadruple.xlsx') || fs.existsSync('./quintuplet.xlsx') || fs.existsSync('./hexad.xlsx')){
    //  fs.unlinkSync('./single.xlsx');
    //  fs.unlinkSync('./double.xlsx');
    //  fs.unlinkSync('./triple.xlsx');
    //  fs.unlinkSync('./quadruple.xlsx');
    //  fs.unlinkSync('./quintuplet.xlsx');
    //  fs.unlinkSync('./hexad.xlsx');
    //}
    for (let i = 0; i < numbers.length; i += 6) {
      groups.push(numbers.slice(i, i + 6));
    }

    for(const group of groups){
        for(let i = 0; i < group.length ; i++){
            console.log(group[i]);
            singleArr.push(group[i]);
        }   
    }

    for (const single of singleArr) {
      fs.appendFileSync('./single.xlsx', single + '\n');
    }

    for (const group of groups) {
      for (let i = 0; i < group.length; i++) {
        for (let j = i + 1; j < group.length; j++) {
            console.log(group[i], group[j]);
            doubleArr.push(group[i] + ' ' + group[j]);
        }
      }
    }

    for (const group of groups) {
      for (let i = 0; i < group.length; i++) {
        for (let j = i + 1; j < group.length; j++) {
          for (let k = j + 1; k < group.length; k++) {
            console.log(group[i], group[j], group[k]);
            tripleArr.push(group[i] + ' ' + group[j] + ' ' + group[k]);
          }
        }
      }
    }

    for (const group of groups) {
      for (let i = 0; i < group.length; i++) {
        for (let j = i + 1; j < group.length; j++) {
          for (let k = j + 1; k < group.length; k++) {
            for (let l = k + 1; l < group.length; l++) {
              console.log(group[i], group[j], group[k], group[l]);
              quadrupleArr.push(group[i] + ' ' + group[j] + ' ' + group[k] + ' ' + group[l]);
            }
          }
        }
      }
    }
  
    for (const group of groups) {
      for (let i = 0; i < group.length; i++) {
        for (let j = i + 1; j < group.length; j++) {
          for (let k = j + 1; k < group.length; k++) {
            for (let l = k + 1; l < group.length; l++) {
              for (let m = l + 1; m < group.length; m++) {
                console.log(group[i], group[j], group[k], group[l], group[m]);
                quintupletArr.push(group[i] + ' ' + group[j] + ' ' + group[k] + ' ' + group[l] + ' ' + group[m]);
              }
            }
          }
        }
      }
    }

    for (const group of groups) {
        for (let i = 0; i < group.length; i++) {
          for (let j = i + 1; j < group.length; j++) {
            for (let k = j + 1; k < group.length; k++) {
              for (let l = k + 1; l < group.length; l++) {
                for (let m = l + 1; m < group.length; m++) {
                    for(let n = m + 1; n < group.length; n++){
                        console.log(group[i], group[j], group[k], group[l], group[m], group[n]);
                        hexadArr.push(group[i] + ' ' + group[j] + ' ' + group[k] + ' ' + group[l] + ' ' + group[m] + ' ' + group[n]);
                    }
                }
              }
            }
          }
        }
      }

      
      
        for (const double of doubleArr) {
          fs.appendFileSync('./double.xlsx', double + '\n');
        }
        for (const triple of tripleArr) {
          fs.appendFileSync('./triple.xlsx', triple + '\n');
        }
        for (const quadruple of quadrupleArr) {
          fs.appendFileSync('./quadruple.xlsx', quadruple + '\n');
        }
        for (const quintuplet of quintupletArr) {
          fs.appendFileSync('./quintuplet.xlsx', quintuplet + '\n');
        }
        for (const hexad of hexadArr) {
          fs.appendFileSync('./hexad.xlsx', hexad + '\n');
        }
  
}



async function getResults(url){
    try{
        const response = await axios.get(url);
        const $=cheerio.load(response.data);
        
        const table = $('tbody');
        table.each(function(){         
            num = $(this).find("span.home-mini-whiteball").text();

            results.push(num);             
        });
        
        let resultString = results.toString();
        for (let i = 0; i < resultString.length; i+=2){
            let ball = resultString.split(' ').join("").substring(i, i+2);
            alpha.push(ball);
        }

        printAllPossibleSets(alpha);
        console.log("all done");
            
        }catch(error){
            console.error(error);
        }    
}

function GetDate(){
  let date_ob = new Date();
  let date = ("0" + date_ob.getDate()).slice(-2);

// current month
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

  // current year
  let year = date_ob.getFullYear();

  let strDate = date + "-" + month + "-" + year;

  return strDate
}
//console.log(GetDate());

const baseUrl = [`https://www.ketquadientoan.com/tat-ca-ky-xo-so-mega-6-45.html?datef=02-01-2022&datet=${GetDate()}`];

getResults(baseUrl)