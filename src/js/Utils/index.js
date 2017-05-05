/**
 * Created by davidzaludek on 26/03/17.
 */
import CryptoJS from "crypto-js";

export function mergeSorted(a, b, c) {
    var answer = new Array(a.length + b.length);
    var i = 0, j = 0, k = 0;
    while (i < a.length && j < b.length) {
        if (c(a[i], b[j])) {
            answer[k] = a[i];
            i++;
        } else {
            answer[k] = b[j];
            j++;
        }
        k++;
    }
    while (i < a.length) {
        answer[k] = a[i];
        i++;
        k++;
    }
    while (j < b.length) {
        answer[k] = b[j];
        j++;
        k++;
    }
    console.log(answer);
    return answer;
}

export function hashPassword(pass,salt) {
    return CryptoJS.PBKDF2(pass, salt, { keySize: 512/32, iterations: 300 }).toString();
}