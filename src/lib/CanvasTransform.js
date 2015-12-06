/*
 * Transform tracker
 * Based on a class created by Simon Sarris - www.simonsarris.com - sarris@acm.org
 */
export default class CanvasTransform {
    constructor(context) {
        this.context = context;
        this.matrix = [1,0,0,1,0,0]; //initialize with the identity matrix
        this.stack = [];
    }

    //==========================================
    // Constructor, getter/setter
    //==========================================

    setContext(context) {
        this.context = context;
    }

    getMatrix() {
        return this.matrix;
    }

    setMatrix(m) {
        this.matrix = [m[0],m[1],m[2],m[3],m[4],m[5]];
        this.setTransform();
    }

    cloneMatrix(m) {
        return [m[0],m[1],m[2],m[3],m[4],m[5]];
    }

    //==========================================
    // Stack
    //==========================================

    save() {
        var matrix = this.cloneMatrix(this.getMatrix());
        this.stack.push(matrix);

        this.context.save();
    }

    restore() {
        if (this.stack.length > 0) {
            var matrix = this.stack.pop();
            this.setMatrix(matrix);
        }

        this.context.restore();
    }

    //==========================================
    // Matrix
    //==========================================

    setTransform() {
        if (this.context) {
            this.context.setTransform(
                this.matrix[0],
                this.matrix[1],
                this.matrix[2],
                this.matrix[3],
                this.matrix[4],
                this.matrix[5]
            );
        }
    }

    translate(x, y) {
        this.matrix[4] += this.matrix[0] * x + this.matrix[2] * y;
        this.matrix[5] += this.matrix[1] * x + this.matrix[3] * y;

        this.setTransform();
    }

    rotate(rad) {
        var c = Math.cos(rad);
        var s = Math.sin(rad);
        var m11 = this.matrix[0] * c + this.matrix[2] * s;
        var m12 = this.matrix[1] * c + this.matrix[3] * s;
        var m21 = this.matrix[0] * -s + this.matrix[2] * c;
        var m22 = this.matrix[1] * -s + this.matrix[3] * c;
        this.matrix[0] = m11;
        this.matrix[1] = m12;
        this.matrix[2] = m21;
        this.matrix[3] = m22;

        this.setTransform();
    }

    scale(sx, sy) {
        this.matrix[0] *= sx;
        this.matrix[1] *= sx;
        this.matrix[2] *= sy;
        this.matrix[3] *= sy;

        this.setTransform();
    }

    //==========================================
    // Matrix extensions
    //==========================================

    rotateDegrees(deg) {
        var rad = deg * Math.PI / 180;
        this.rotate(rad);
    }

    rotateAbout(rad, x, y) {
        this.translate(x, y);
        this.rotate(rad);
        this.translate(-x, -y);
        this.setTransform();
    }

    rotateDegreesAbout(deg, x, y) {
        this.translate(x, y);
        this.rotateDegrees(deg);
        this.translate(-x, -y);
        this.setTransform();
    }

    identity() {
        this.m = [1,0,0,1,0,0];
        this.setTransform();
    }

    multiply(matrix) {
        var m11 = this.matrix[0] * matrix.m[0] + this.matrix[2] * matrix.m[1];
        var m12 = this.matrix[1] * matrix.m[0] + this.matrix[3] * matrix.m[1];

        var m21 = this.matrix[0] * matrix.m[2] + this.matrix[2] * matrix.m[3];
        var m22 = this.matrix[1] * matrix.m[2] + this.matrix[3] * matrix.m[3];

        var dx = this.matrix[0] * matrix.m[4] + this.matrix[2] * matrix.m[5] + this.matrix[4];
        var dy = this.matrix[1] * matrix.m[4] + this.matrix[3] * matrix.m[5] + this.matrix[5];

        this.matrix[0] = m11;
        this.matrix[1] = m12;
        this.matrix[2] = m21;
        this.matrix[3] = m22;
        this.matrix[4] = dx;
        this.matrix[5] = dy;
        this.setTransform();
    }

    invert() {
        var d = 1 / (this.matrix[0] * this.matrix[3] - this.matrix[1] * this.matrix[2]);
        var m0 = this.matrix[3] * d;
        var m1 = -this.matrix[1] * d;
        var m2 = -this.matrix[2] * d;
        var m3 = this.matrix[0] * d;
        var m4 = d * (this.matrix[2] * this.matrix[5] - this.matrix[3] * this.matrix[4]);
        var m5 = d * (this.matrix[1] * this.matrix[4] - this.matrix[0] * this.matrix[5]);
        this.matrix[0] = m0;
        this.matrix[1] = m1;
        this.matrix[2] = m2;
        this.matrix[3] = m3;
        this.matrix[4] = m4;
        this.matrix[5] = m5;
        this.setTransform();
    }

    //==========================================
    // Helpers
    //==========================================

    transformPoint(x, y) {
        return {
            x: x * this.matrix[0] + y * this.matrix[2] + this.matrix[4],
            y: x * this.matrix[1] + y * this.matrix[3] + this.matrix[5]
        };
    }
}