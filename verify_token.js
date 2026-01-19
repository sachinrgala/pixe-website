
const { jwtVerify } = require('jose');
const { TextEncoder } = require('util');

const secret = new TextEncoder().encode('dev-only-insecure-secret-change-in-prod-32chars!');
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQHBpeGUuY29tIiwiZXhwIjoxNzY3Nzc0MzUyLCJyb2xlIjoiYWRtaW4ifQ.RCOPLlH68Em8V_i2BQtyUQlfxqwEhXT7_l6nicEMbq8';

async function verify() {
    try {
        const { payload } = await jwtVerify(token, secret);
        console.log('Success:', payload);
    } catch (e) {
        console.error('Failed:', e);
    }
}

verify();
