export const ValidateChile = (dni: string) => {
    if ( !/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test( dni )){
        return false;
    };
    let temp = dni.split('-');
	let digit = temp[1]; 
	let rut = temp[0];
	if( digit === 'K' ) {
        digit = 'k';
    };
	return (VerifyDigit(parseInt(rut)) == digit );
};

const VerifyDigit = (rut: number) => {
    let count = 0;
    let sum = 1;
    for(;rut;rut=Math.floor(rut/10)){
        sum = (sum + rut % 10 * ( 9 - count++ % 6 )) % 11;
    };
    return sum ? sum-1 :'k';
};