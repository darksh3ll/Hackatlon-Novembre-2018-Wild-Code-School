(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var _GameState = require('states/GameState');

var _GameState2 = _interopRequireDefault(_GameState);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError("Cannot call a class as a function");
	}
}

function _possibleConstructorReturn(self, call) {
	if (!self) {
		throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	}return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) {
		throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Game = function (_Phaser$Game) {
	_inherits(Game, _Phaser$Game);

	function Game() {
		_classCallCheck(this, Game);

		var _this = _possibleConstructorReturn(this, (Game.__proto__ || Object.getPrototypeOf(Game)).call(this, 500, 500, Phaser.AUTO, 'content', null, false, false));

		_this.state.add('GameState', _GameState2.default, false);
		_this.state.start('GameState');
		return _this;
	}

	return Game;
}(Phaser.Game);

new Game();

},{"states/GameState":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var GameState = function (_Phaser$State) {
    _inherits(GameState, _Phaser$State);

    function GameState() {
        _classCallCheck(this, GameState);

        return _possibleConstructorReturn(this, (GameState.__proto__ || Object.getPrototypeOf(GameState)).apply(this, arguments));
    }

    _createClass(GameState, [{
        key: 'preload',
        value: function preload() {
            this.game.load.image('chen', 'images/issam.png');
            this.game.load.image('barH', 'images/barH.png');
            this.game.load.image('barV', 'images/barV.png');
            this.game.load.image('bar', 'images/bar.png');
            this.game.load.image('pikachu', 'images/chit.png');
            this.game.load.image('grotadmorv', 'images/lydia.png');
            this.game.load.image("bg", "images/bg.png");
        }
    }, {
        key: 'create',
        value: function create() {
            this.game.stage.backgroundColor = '#213638';

            // Perso
            this.chen = this.game.add.sprite(this.game.width / 2, this.game.height - 50, 'chen');
            this.chen.scale.setTo(1);
            this.chen.anchor.setTo(0.5);
            this.game.physics.arcade.enable(this.chen);
            this.chen.body.gravity.y = 400;

            // Cursor
            this.cursor = this.game.input.keyboard.createCursorKeys();

            // Cadre
            this.createCadre();
            this.createBoard();

            // Pikachu
            this.pikachu = this.game.add.sprite(20, 20, 'pikachu');
            this.game.physics.arcade.enable(this.pikachu);

            // Grotadmorv
            this.grotadmorvs = this.game.add.group();
            this.grotadmorvs.enableBody = true;
            this.grotadmorvs.createMultiple(70, 'grotadmorv');

            this.game.time.events.loop(1000, this.goGrotadmorv, this);
        }
    }, {
        key: 'goGrotadmorv',
        value: function goGrotadmorv() {
            var grotadmorv = this.grotadmorvs.getFirstDead();
            if (!grotadmorv) return;

            var height = this.game.height;
            var width = this.game.width;

            var pos = [{ x: 0, y: this.game.rnd.between(0, height) }, { x: width, y: this.game.rnd.between(0, height) }, { x: this.game.rnd.between(0, width), y: 0 }, { x: this.game.rnd.between(0, width), y: height }];

            var newPos = this.game.rnd.pick(pos);

            grotadmorv.reset(newPos.x, newPos.y);

            if (newPos === pos[0]) {
                grotadmorv.body.velocity.x = 200;
            } else if (newPos === pos[1]) {
                grotadmorv.body.velocity.x = -200;
            } else if (newPos === pos[2]) {
                grotadmorv.body.velocity.y = 200;
            } else {
                grotadmorv.body.velocity.y = -200;
            }

            grotadmorv.checkWorldBounds = true;
            grotadmorv.outOfBoundsKill = true;
        }
    }, {
        key: 'createBoard',
        value: function createBoard() {
            var _this2 = this;

            this.board = this.game.add.group();
            this.board.enableBody = true;

            var pos = [{ x: 20, y: 80 }, { x: 250, y: 100 }, { x: 380, y: 150 }, { x: 280, y: 220 }, { x: 20, y: 270 }, { x: 150, y: 350 }, { x: 380, y: 420 }];

            pos.map(function (crd) {
                _this2.game.add.sprite(crd.x, crd.y, 'bar', 0, _this2.board);
            });

            this.board.setAll('body.immovable', true);
        }
    }, {
        key: 'createCadre',
        value: function createCadre() {
            this.cadre = this.game.add.group();
            this.cadre.enableBody = true;

            // Côtés
            this.game.add.sprite(0, 0, 'barV', 0, this.cadre);
            this.game.add.sprite(this.game.width - 12, 0, 'barV', 0, this.cadre);
            // Haut
            this.game.add.sprite(0, 0, 'barH', 0, this.cadre);
            // Bas
            this.game.add.sprite(0, this.game.height - 12, 'bar', 0, this.cadre);
            this.game.add.sprite(this.game.width - 100, this.game.height - 12, 'bar', 0, this.cadre);
            var barMilieu = this.game.add.sprite(this.game.width / 2, this.game.height - 12, 'bar', 0, this.cadre);
            barMilieu.anchor.setTo(0.5, 0);

            this.cadre.setAll('body.immovable', true);
        }
    }, {
        key: 'moveChen',
        value: function moveChen() {
            if (this.cursor.left.isDown) {
                this.chen.body.velocity.x = -150;
            } else if (this.cursor.right.isDown) {
                this.chen.body.velocity.x = 150;
            } else {
                this.chen.body.velocity.x = 0;
            }

            if (this.cursor.up.isDown && this.chen.body.touching.down) {
                this.chen.body.velocity.y = -250;
            }
        }
    }, {
        key: 'catchPikachu',
        value: function catchPikachu() {
            var _this3 = this;

            this.pikachu.kill();
            this.grotadmorvs.removeAll();
            setTimeout(function () {
                _this3.game.state.start('GameState');
            }, 2000);
        }
    }, {
        key: 'gameOver',
        value: function gameOver() {
            this.chen.kill();
        }
    }, {
        key: 'update',
        value: function update() {
            this.game.physics.arcade.collide(this.chen, [this.cadre, this.board]);
            this.game.physics.arcade.overlap(this.chen, this.pikachu, this.catchPikachu, null, this);
            this.game.physics.arcade.overlap(this.chen, this.grotadmorvs, this.gameOver, null, this);

            this.moveChen();

            if (!this.chen.inWorld || !this.chen.alive) {
                this.game.state.start('GameState');
            }
        }
    }]);

    return GameState;
}(Phaser.State);

exports.default = GameState;

},{}]},{},[1])
//# sourceMappingURL=game.js.map
