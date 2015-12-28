import Sprite from '../dist/Sprite';

/**
 *
 */
describe('Sprite', function() {
    var point;

    beforeEach(function () {
        point = new Sprite();
    });

    it('should have property x which equals zero', function () {
        expect(point.x).toEqual(0);
    });

    it('should have property y which equals zero', function () {
        expect(point.y).toEqual(0);
    });
});
