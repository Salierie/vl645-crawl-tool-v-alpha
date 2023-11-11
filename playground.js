let d, m, y;

d = 8;
m = 11;
y = 2023;

let s = "";
//for(let i = 0; i < 10; i++)
do{
    d = d - 7;
    if(d <= 0 && m != 1){
        if(m == 12 || m == 10 || m == 8 || m == 7 || m == 5){
            d = 30 + d;
            m --;
        }else if(IsLunar(y) == true && m == 3){
            d = 29 + d;
            m --;
        }else if(m == 4 || m == 6 || m == 8 || m == 9 || m == 11 || m == 2){
            d = 31 + d;
            m--;
        }else if (IsLunar(y) == false && m == 3){
            d = 28 + d;
            m --;
        }
    }else if (d <= 0 && m == 1){
        d = 31 + d;
        y --;
        m = 12;
    }
    s = d +"/"+ m +"/" + y;

    console.log(s);
    
    
}while(s != "24/7/2016" && y >= 2016) ;



function IsLunar(y){
    if(y % 4 == 0){
        return true;
    }else{
        return false;
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
 }