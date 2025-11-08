let save = Array.from({ length: 100 }, (_, i) => i)
  .sort(()=>Math.random() -0.5);

let index  = 0;
 export function autoAttack(){
    index++;
    let a = "p" + save[index];
    return  a;
}
