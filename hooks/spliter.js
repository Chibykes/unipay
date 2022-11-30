const spliter = (num) => {
    let nw = "";
    for(let i=0; i< num.length; i++){

        nw += num[i];
        
        if((i+1)%4 === 0){
            nw += '-';
        }
    }

    return nw;
}

export default spliter;