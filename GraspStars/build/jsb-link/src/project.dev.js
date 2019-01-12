window.__require = function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var b = o.split("/");
        b = b[b.length - 1];
        if (!t[b]) {
          var a = "function" == typeof __require && __require;
          if (!u && a) return a(b, !0);
          if (i) return i(b, !0);
          throw new Error("Cannot find module '" + o + "'");
        }
      }
      var f = n[o] = {
        exports: {}
      };
      t[o][0].call(f.exports, function(e) {
        var n = t[o][1][e];
        return s(n || e);
      }, f, f.exports, e, t, n, r);
    }
    return n[o].exports;
  }
  var i = "function" == typeof __require && __require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s;
}({
  Game: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "cb279XhWDlCmYVe4zhODXbO", "Game");
    "use strict";
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
      },
      getNewStarPosition: function getNewStarPosition() {
        var randX = this.node.width * (.5 - Math.random());
        var randY = this.ground.y + this.ground.height / 2 + this.player.getComponent("Player").jumpHeight * Math.random();
        return cc.v2(randX, randY);
      },
      gainScore: function gainScore() {
        this.score += 1;
        this.scoreDisplay.string = "Score : " + this.score;
        cc.audioEngine.playEffect(this.scoreAudio, false);
      },
      gameOver: function gameOver() {
        this.gameState = 2;
        this.player.stopAllActions();
        cc.director.loadScene("game");
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
        if (1 == this.gameState) {
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
  }, {} ],
  Player: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ffdfdk8SvBEuJKqfMo3rmme", "Player");
    "use strict";
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
          this.activateGameState();
          break;

         case cc.macro.KEY.d:
          this.accRight = true;
          this.activateGameState();
        }
      },
      onKeyUp: function onKeyUp(event) {
        switch (event.keyCode) {
         case cc.macro.KEY.a:
          this.accLeft = false;
          break;

         case cc.macro.KEY.d:
          this.accRight = false;
        }
      },
      activateGameState: function activateGameState() {
        1 != this.game.gameState && (this.game.gameState = 1);
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
        if (true == this.accLeft) {
          this.xSpeed = this.xSpeed > 0 ? this.xSpeed - this.accel * dt * 5 : this.xSpeed;
          this.xSpeed -= this.accel * dt;
        } else if (this.accRight) {
          this.xSpeed = this.xSpeed > 0 ? this.xSpeed : this.xSpeed + this.accel * dt * 5;
          this.xSpeed += this.accel * dt;
        }
        this.xSpeed = this.xSpeed > 0 ? this.xSpeed - this.accel * dt / 4 : this.xSpeed + this.accel * dt / 4;
        Math.abs(this.xSpeed) > this.maxMoveSpeed && (this.xSpeed = this.maxMoveSpeed * this.xSpeed / Math.abs(this.xSpeed));
        this.node.x += this.xSpeed * dt;
      }
    });
    cc._RF.pop();
  }, {} ],
  Star: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "dcdf3Osp7FG6aA54L4X7Lva", "Star");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        pickRadius: 0
      },
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
      start: function start() {},
      update: function update(dt) {
        this.getPlayerDinstance() < this.pickRadius && this.onPicked();
        var opacityRation = 1 - this.game.timer / this.game.starDuration;
        var minOpacity = 50;
        this.node.opacity = minOpacity + Math.floor(opacityRation * (255 - minOpacity));
        return;
      }
    });
    cc._RF.pop();
  }, {} ]
}, {}, [ "Game", "Player", "Star" ]);