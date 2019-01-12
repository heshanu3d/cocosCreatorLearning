(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripts/Player.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'ffdfdk8SvBEuJKqfMo3rmme', 'Player', __filename);
// Scripts/Player.js

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
        jumpHeight: 0,
        jumpDuration: 0,
        maxMoveSpeed: 0,
        accel: 0,
        jumpAudio: {
            default: null,
            type: cc.AudioClip
        }
    },

    setJumpAction: function setJumpAction() {
        var jumpUp = cc.moveBy(this.jumpDuration, cc.v2(0, this.jumpHeight)).easing(cc.easeCubicActionOut());
        var jumpDown = cc.moveBy(this.jumpDuration, cc.v2(0, -this.jumpHeight)).easing(cc.easeCubicActionIn());
        var callback = cc.callFunc(this.playJumpSound, this);
        return cc.repeatForever(cc.sequence(jumpUp, jumpDown, callback));
    },
    playJumpSound: function playJumpSound() {
        cc.audioEngine.playEffect(this.jumpAudio, false);
    },
    onKeyDown: function onKeyDown(event) {
        switch (event.keyCode) {
            case cc.macro.KEY.a:
                this.accLeft = true;
                // cc.log("a down");
                this.activateGameState();
                break;
            case cc.macro.KEY.d:
                this.accRight = true;
                this.activateGameState();
                // cc.log("d down");
                break;
        }
    },
    onKeyUp: function onKeyUp(event) {
        switch (event.keyCode) {
            case cc.macro.KEY.a:
                this.accLeft = false;
                // cc.log("a up");
                break;
            case cc.macro.KEY.d:
                this.accRight = false;
                // cc.log("d up");
                break;
        }
    },
    activateGameState: function activateGameState() {
        if (this.game.gameState != 1) this.game.gameState = 1;
    },
    onLoad: function onLoad() {
        this.node.runAction(this.setJumpAction());
        this.accLeft = false;
        this.accRight = false;
        this.xSpeed = 0;

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },
    onDestroy: function onDestroy() {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },
    start: function start() {},
    update: function update(dt) {
        if (this.accLeft == true) {
            this.xSpeed = this.xSpeed > 0 ? this.xSpeed - this.accel * dt * 5 : this.xSpeed;
            this.xSpeed -= this.accel * dt;
            // cc.log(this.accel);
        } else if (this.accRight) {
            this.xSpeed = this.xSpeed > 0 ? this.xSpeed : this.xSpeed + this.accel * dt * 5;
            this.xSpeed += this.accel * dt;
        }

        this.xSpeed = this.xSpeed > 0 ? this.xSpeed - this.accel * dt / 4 : this.xSpeed + this.accel * dt / 4;

        if (Math.abs(this.xSpeed) > this.maxMoveSpeed) {
            this.xSpeed = this.maxMoveSpeed * this.xSpeed / Math.abs(this.xSpeed);
        }

        this.node.x += this.xSpeed * dt;
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
        //# sourceMappingURL=Player.js.map
        