(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripts/Game.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'cb279XhWDlCmYVe4zhODXbO', 'Game', __filename);
// Scripts/Game.js

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
        starPrefab: {
            default: null,
            type: cc.Prefab
        },
        maxStarDuration: 0,
        minStarDuration: 0,
        ground: {
            default: null,
            type: cc.Node
        },
        player: {
            default: null,
            type: cc.Node
        },
        scoreDisplay: {
            default: null,
            type: cc.Label
        },

        scoreAudio: {
            default: null,
            type: cc.AudioClip
        }
    },

    spawnStars: function spawnStars() {
        var newStar = cc.instantiate(this.starPrefab);
        this.node.addChild(newStar);
        newStar.setPosition(this.getNewStarPosition());
        newStar.getComponent("Star").game = this;

        this.timer = 0;
        this.starDuration = this.minStarDuration + (this.maxStarDuration - this.minStarDuration) * Math.random();
        // cc.log(this.starDuration);
    },
    getNewStarPosition: function getNewStarPosition() {
        var randX = this.node.width * (0.5 - Math.random());
        var randY = this.ground.y + this.ground.height / 2 + this.player.getComponent("Player").jumpHeight * Math.random();
        return cc.v2(randX, randY);
    },
    gainScore: function gainScore() {
        this.score += 1;
        this.scoreDisplay.string = 'Score : ' + this.score;
        cc.audioEngine.playEffect(this.scoreAudio, false);
    },
    gameOver: function gameOver() {
        this.gameState = 2;
        // cc.log("gameover!");
        this.player.stopAllActions();
        cc.director.loadScene('game');
    },
    onLoad: function onLoad() {
        this.timer = 0;
        this.starDuration = 0;

        this.spawnStars();
        this.score = 0;
        this.gameState = 0;
        this.player.getComponent("Player").game = this;
    },
    start: function start() {},
    update: function update(dt) {
        if (this.gameState == 1) {
            if (this.timer > this.starDuration) {
                this.gameOver();
                this.enabled = false;
                return;
            }
            this.timer += dt;
        }
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
        //# sourceMappingURL=Game.js.map
        