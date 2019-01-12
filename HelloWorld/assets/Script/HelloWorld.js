cc.Class({
    extends: cc.Component,

    properties: {
        labl: {
            default: null,
            type: cc.Label
        },
        // defaults, set visually when attaching this script to the Canvas
        text: 'Hello, World!'
    },

    createParticleSystem () {
        var node = new cc.Node();
        cc.director.getScene().addChild(node);
        var particleSystem = node.addComponent(cc.ParticleSystem);
        node.setPosition(0, 0);
    },
    // use this for initialization
    onLoad: function () {
        // this.labl.string = this.text;
    },

    // called every frame
    update: function (dt) {
    },
});
