module.exports = {
    hitPoint: function(x, y, entity) {
        var entityX = entity.getX();
        var entityY = entity.getY();
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