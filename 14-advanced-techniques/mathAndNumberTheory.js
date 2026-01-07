/**
 * ============================================
 * MATH & NUMBER THEORY
 * ============================================
 * 
 * CONCEPT:
 * Mathematical algorithms are essential for many coding problems.
 * Number theory deals with properties and relationships of integers.
 * 
 * COMMON TOPICS:
 * - GCD/LCM
 * - Prime numbers
 * - Modular arithmetic
 * - Factorials and combinations
 * - Power and exponentiation
 * 
 * INDUSTRY APPLICATIONS:
 * - Cryptography (RSA uses prime factorization)
 * - Hashing algorithms
 * - Random number generation
 * - Computer graphics
 * - Game development
 */

// ============================================
// 1. GCD AND LCM
// ============================================

/**
 * Greatest Common Divisor (GCD)
 * Euclidean Algorithm: gcd(a, b) = gcd(b, a % b)
 * 
 * Time: O(log(min(a, b)))
 */
function gcd(a, b) {
    a = Math.abs(a);
    b = Math.abs(b);
    while (b) {
        [a, b] = [b, a % b];
    }
    return a;
}

// Recursive version
function gcdRecursive(a, b) {
    return b === 0 ? Math.abs(a) : gcdRecursive(b, a % b);
}

/**
 * Least Common Multiple (LCM)
 * lcm(a, b) = (a * b) / gcd(a, b)
 */
function lcm(a, b) {
    return Math.abs(a * b) / gcd(a, b);
}

// GCD of array
function gcdArray(arr) {
    return arr.reduce((acc, val) => gcd(acc, val));
}

// LCM of array
function lcmArray(arr) {
    return arr.reduce((acc, val) => lcm(acc, val));
}

// ============================================
// 2. PRIME NUMBERS
// ============================================

/**
 * Check if prime - O(√n)
 */
function isPrime(n) {
    if (n < 2) return false;
    if (n === 2) return true;
    if (n % 2 === 0) return false;
    
    for (let i = 3; i * i <= n; i += 2) {
        if (n % i === 0) return false;
    }
    return true;
}

/**
 * Sieve of Eratosthenes - O(n log log n)
 * Find all primes up to n
 */
function sieveOfEratosthenes(n) {
    const isPrime = new Array(n + 1).fill(true);
    isPrime[0] = isPrime[1] = false;
    
    for (let i = 2; i * i <= n; i++) {
        if (isPrime[i]) {
            for (let j = i * i; j <= n; j += i) {
                isPrime[j] = false;
            }
        }
    }
    
    const primes = [];
    for (let i = 2; i <= n; i++) {
        if (isPrime[i]) primes.push(i);
    }
    
    return primes;
}

/**
 * Prime Factorization - O(√n)
 */
function primeFactors(n) {
    const factors = [];
    
    // Count 2s
    while (n % 2 === 0) {
        factors.push(2);
        n = n / 2;
    }
    
    // n is now odd
    for (let i = 3; i * i <= n; i += 2) {
        while (n % i === 0) {
            factors.push(i);
            n = n / i;
        }
    }
    
    // If n is still > 2, then it's prime
    if (n > 2) {
        factors.push(n);
    }
    
    return factors;
}

/**
 * Count divisors - O(√n)
 */
function countDivisors(n) {
    let count = 0;
    for (let i = 1; i * i <= n; i++) {
        if (n % i === 0) {
            count++; // i is a divisor
            if (i !== n / i) count++; // n/i is also divisor
        }
    }
    return count;
}

/**
 * Sum of divisors - O(√n)
 */
function sumDivisors(n) {
    let sum = 0;
    for (let i = 1; i * i <= n; i++) {
        if (n % i === 0) {
            sum += i;
            if (i !== n / i) sum += n / i;
        }
    }
    return sum;
}

// ============================================
// 3. MODULAR ARITHMETIC
// ============================================

const MOD = 1e9 + 7;

/**
 * Modular Addition
 * (a + b) % m = ((a % m) + (b % m)) % m
 */
function modAdd(a, b, mod = MOD) {
    return ((a % mod) + (b % mod)) % mod;
}

/**
 * Modular Multiplication
 * (a * b) % m = ((a % m) * (b % m)) % m
 */
function modMul(a, b, mod = MOD) {
    return ((a % mod) * (b % mod)) % mod;
}

/**
 * Modular Exponentiation - O(log n)
 * Binary exponentiation: a^n % mod
 */
function modPow(base, exp, mod = MOD) {
    let result = 1n;
    base = BigInt(base) % BigInt(mod);
    exp = BigInt(exp);
    mod = BigInt(mod);
    
    while (exp > 0n) {
        if (exp % 2n === 1n) {
            result = (result * base) % mod;
        }
        exp = exp / 2n;
        base = (base * base) % mod;
    }
    
    return Number(result);
}

/**
 * Modular Inverse using Fermat's Little Theorem
 * a^(-1) ≡ a^(p-2) (mod p), when p is prime
 */
function modInverse(a, mod = MOD) {
    return modPow(a, mod - 2, mod);
}

/**
 * Modular Division
 * (a / b) % m = (a * modInverse(b)) % m
 */
function modDiv(a, b, mod = MOD) {
    return modMul(a, modInverse(b, mod), mod);
}

// ============================================
// 4. FACTORIALS AND COMBINATIONS
// ============================================

/**
 * Factorial with memoization
 */
const factorialCache = [1, 1];
function factorial(n) {
    if (factorialCache[n] !== undefined) return factorialCache[n];
    
    for (let i = factorialCache.length; i <= n; i++) {
        factorialCache[i] = factorialCache[i - 1] * i;
    }
    
    return factorialCache[n];
}

/**
 * nCr (Combinations) - O(r)
 * n! / (r! * (n-r)!)
 */
function nCr(n, r) {
    if (r > n) return 0;
    if (r === 0 || r === n) return 1;
    
    // Optimize by using smaller r
    if (r > n - r) r = n - r;
    
    let result = 1;
    for (let i = 0; i < r; i++) {
        result *= (n - i);
        result /= (i + 1);
    }
    
    return Math.round(result);
}

/**
 * nCr with modular arithmetic
 */
function nCrMod(n, r, mod = MOD) {
    if (r > n) return 0;
    if (r === 0 || r === n) return 1;
    
    // Precompute factorials and inverse factorials
    const fact = new Array(n + 1);
    const invFact = new Array(n + 1);
    
    fact[0] = 1;
    for (let i = 1; i <= n; i++) {
        fact[i] = modMul(fact[i - 1], i, mod);
    }
    
    invFact[n] = modInverse(fact[n], mod);
    for (let i = n - 1; i >= 0; i--) {
        invFact[i] = modMul(invFact[i + 1], i + 1, mod);
    }
    
    return modMul(fact[n], modMul(invFact[r], invFact[n - r], mod), mod);
}

/**
 * nPr (Permutations) - O(r)
 * n! / (n-r)!
 */
function nPr(n, r) {
    if (r > n) return 0;
    
    let result = 1;
    for (let i = 0; i < r; i++) {
        result *= (n - i);
    }
    
    return result;
}

// ============================================
// 5. FIBONACCI
// ============================================

/**
 * Fibonacci with Matrix Exponentiation - O(log n)
 * For very large n
 */
function fibMatrix(n) {
    if (n <= 1) return n;
    
    const multiply = (a, b) => {
        return [
            [a[0][0] * b[0][0] + a[0][1] * b[1][0], a[0][0] * b[0][1] + a[0][1] * b[1][1]],
            [a[1][0] * b[0][0] + a[1][1] * b[1][0], a[1][0] * b[0][1] + a[1][1] * b[1][1]]
        ];
    };
    
    const matPow = (mat, exp) => {
        let result = [[1, 0], [0, 1]]; // Identity
        
        while (exp > 0) {
            if (exp % 2 === 1) {
                result = multiply(result, mat);
            }
            mat = multiply(mat, mat);
            exp = Math.floor(exp / 2);
        }
        
        return result;
    };
    
    const base = [[1, 1], [1, 0]];
    const result = matPow(base, n);
    
    return result[0][1];
}

// ============================================
// 6. PRACTICE PROBLEMS
// ============================================

/**
 * Problem 1: Count Primes less than n
 */
function countPrimes(n) {
    if (n <= 2) return 0;
    return sieveOfEratosthenes(n - 1).length;
}

/**
 * Problem 2: Power of Two/Three/Four
 */
function isPowerOfTwo(n) {
    return n > 0 && (n & (n - 1)) === 0;
}

function isPowerOfThree(n) {
    return n > 0 && 1162261467 % n === 0; // 3^19
}

function isPowerOfFour(n) {
    return n > 0 && (n & (n - 1)) === 0 && (n & 0x55555555) !== 0;
}

/**
 * Problem 3: Ugly Number (prime factors only 2, 3, 5)
 */
function isUgly(n) {
    if (n <= 0) return false;
    
    for (const factor of [2, 3, 5]) {
        while (n % factor === 0) {
            n /= factor;
        }
    }
    
    return n === 1;
}

/**
 * Problem 4: Nth Ugly Number
 */
function nthUglyNumber(n) {
    const ugly = [1];
    let p2 = 0, p3 = 0, p5 = 0;
    
    for (let i = 1; i < n; i++) {
        const next = Math.min(ugly[p2] * 2, ugly[p3] * 3, ugly[p5] * 5);
        ugly.push(next);
        
        if (next === ugly[p2] * 2) p2++;
        if (next === ugly[p3] * 3) p3++;
        if (next === ugly[p5] * 5) p5++;
    }
    
    return ugly[n - 1];
}

/**
 * Problem 5: Happy Number
 */
function isHappy(n) {
    const seen = new Set();
    
    while (n !== 1 && !seen.has(n)) {
        seen.add(n);
        n = String(n).split('').reduce((sum, d) => sum + d * d, 0);
    }
    
    return n === 1;
}

/**
 * Problem 6: Excel Column Number
 */
function titleToNumber(s) {
    let result = 0;
    for (const char of s) {
        result = result * 26 + (char.charCodeAt(0) - 64);
    }
    return result;
}

function convertToTitle(n) {
    let result = '';
    while (n > 0) {
        n--;
        result = String.fromCharCode(65 + (n % 26)) + result;
        n = Math.floor(n / 26);
    }
    return result;
}

// -------------------------------------------------------------------------------------------
// SUMMARY & KEY TAKEAWAYS
// -------------------------------------------------------------------------------------------

/**
 * MATH CHEAT SHEET:
 * 
 * GCD/LCM:
 * - gcd(a, b) = gcd(b, a % b)
 * - lcm(a, b) = a * b / gcd(a, b)
 * 
 * MODULAR ARITHMETIC:
 * - (a + b) % m = ((a % m) + (b % m)) % m
 * - (a * b) % m = ((a % m) * (b % m)) % m
 * - a^(-1) ≡ a^(p-2) (mod p) [Fermat's Little Theorem]
 * 
 * PRIMES:
 * - Check: O(√n)
 * - Sieve: O(n log log n)
 * - Factorize: O(√n)
 * 
 * COMBINATIONS:
 * - nCr = n! / (r! * (n-r)!)
 * - nPr = n! / (n-r)!
 * - Pascal's: C(n,r) = C(n-1,r-1) + C(n-1,r)
 * 
 * BINARY EXPONENTIATION:
 * - a^n in O(log n)
 * - Also works for matrix exponentiation
 * 
 * COMMON INTERVIEW TOPICS:
 * - GCD/LCM (water jugs, step counting)
 * - Prime (factors, sieve)
 * - Power of 2/3/4
 * - Combinations (unique paths, Pascal's triangle)
 */

module.exports = { 
    gcd, 
    gcdRecursive,
    lcm,
    gcdArray,
    lcmArray,
    isPrime,
    sieveOfEratosthenes,
    primeFactors,
    countDivisors,
    sumDivisors,
    modAdd,
    modMul,
    modPow,
    modInverse,
    modDiv,
    factorial,
    nCr,
    nCrMod,
    nPr,
    fibMatrix,
    countPrimes,
    isPowerOfTwo,
    isPowerOfThree,
    isPowerOfFour,
    isUgly,
    nthUglyNumber,
    isHappy,
    titleToNumber,
    convertToTitle
};
