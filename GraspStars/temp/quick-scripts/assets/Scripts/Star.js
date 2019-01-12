(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripts/Star.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'dcdf3Osp7FG6aA54L4X7Lva', 'Star', __filename);
// Scripts/Star.js

"use strict";

// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        pickRadius: 0
    },

    // LIFE-CYCLE CALLBACKS:

    getPlayerDinstance: function getPlayerDinstance() {
        var playerPos = this.game.player.getPosition();
        var dist = this.node.getPosition().sub(playerPos).mag();
        return dist;
    },
    onPicked: function onPicked() {
        this.game.spawnStars();
        this.game.gainScore();
        this.node.destroy();
    },


    // onLoad () {},

    start: function start() {},
    update: function update(dt) {
        if (this.getPlayerDinstance() < this.pickRadius) this.onPicked();
        var opacityRation = 1 - this.game.timer / this.game.starDuration;
        var minOpacity = 50;
        this.node.opacity = minOpacity + Math.floor(opacityRation * (255 - minOpacity));
        return;
    }
});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=Star.js.map
        