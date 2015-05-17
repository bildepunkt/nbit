module.exports = {
    hitPoint: function(x, y, entity) {
        var x = entity.getX();
        var y = entity.getY();
        var width = entity.getWidth();
        var height = entity.getHeight();

        if (x >= entityX &&
            x <= entityX + width &&
            y >= entityY &&
            y <= entityY + height) {
            return true;
        }
        return false;
    }
};