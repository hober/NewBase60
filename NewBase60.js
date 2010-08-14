/* Tantek Çelik's NewBase60.
 *     http://tantek.com/
 *     http://tantek.pbworks.com/NewBase60
 *
 * Lightly translated from the original CASSIS to CommonsJS- &
 * Node.js-aware JavaScript by Edward O'Connor <hober0@gmail.com>.
 *
 * Released under CC BY-SA 3.0:
 *           http://creativecommons.org/licenses/by-sa/3.0/
 */

function numtosxg($n) {
    var $s = "";
    var $m = "0123456789ABCDEFGHJKLMNPQRSTUVWXYZ_abcdefghijkmnopqrstuvwxyz";
    if ($n===undefined || $n===0) { return 0; }
    while ($n>0) {
        var $d = $n % 60;
        $s = $m[$d]+$s;
        $n = ($n-$d)/60;
    }
    return $s;
}

function numtosxgf($n, $f) {
    var $s = numtosxg($n);
    if ($f===undefined) {
        $f=1;
    }
    $f -= $s.length;
    while ($f > 0) {
        $s = "0"+$s;
        --$f;
    }
    return $s;
}

function sxgtonum($s) {
    var $n = 0;
    var $j = $s.length;
    for (var $i=0; $i<$j; $i++) { // iterate from first to last char of $s
        var c = $s[$i].charCodeAt(0); //  put current ASCII of char into c
        if (c>=48 && c<=57) { c=c-48; }
        else if (c>=65 && c<=72) { c-=55; }
        else if (c==73 || c==108) { c=1; } // typo capital I,
        // lowercase l to 1
        else if (c>=74 && c<=78) { c-=56; }
        else if (c==79) { c=0; } // error correct typo capital O to 0
        else if (c>=80 && c<=90) { c-=57; }
        else if (c==95) { c=34; } // underscore
        else if (c>=97 && c<=107) { c-=62; }
        else if (c>=109 && c<=122) { c-=63; }
        else { c = 0; } // treat all other noise as 0
        $n = 60*$n + c;
    }
    return $n;
}

// Export library functions when we're in a CommonsJS environment
if (typeof(exports) == 'object') {
    exports.numtosxg  = numtosxg;
    exports.numtosxgf = numtosxgf;
    exports.sxgtonum  = sxgtonum;
}

// If being run directly as a Node.js program, spit out a random 32-bit
// number in NewBase60.
if ((typeof(__filename) == 'string')
    && (typeof(process) == 'object')
    && (__filename == process.argv[1])) {

    var s = Math.pow(2,32);
    var n = Math.floor(Math.random()*s);
    require('sys').puts(numtosxg(n));
}
