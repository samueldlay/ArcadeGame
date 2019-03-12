class GameChar {
  constructor (x, y) {
    this.x = x || 0;
    this.y = y || 0;
  }

  static charDimensions (obj) {
    let img = new Image();
    img.onload = () => {
      obj.height = img.height;
      obj.width = img.width;
      console.log((obj.sprite === 'images/enemy-bug.png' ? 'enemy' : 'player') + ' x:' + obj.x + ' y:' + obj.y + ' height:' + obj.height + ' width:' + obj.width);
    };
    img.src = obj.sprite;
  }

  render () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

class Enemy extends GameChar {
  constructor (x, y, speed) {
    super(x, y);
    this.sprite = 'images/trumSprite.png';
    this.speed = speed;
    GameChar.charDimensions(this);
  }

  static getRandomRow () {
    const rows = [133, 215, 298];
    return rows[Math.floor(Math.random() * rows.length)];
  }

  collisionDetect (obj) {
    if (this.x < obj.x + obj.width
      && this.x + this.width > obj.x
      && this.y < obj.y + obj.height
      && this.y + this.height > obj.y) {
      console.log('Trump has captured you with his fat greesy fingers!');
      obj.reset();
    }
  }

  static getRandomSpeed () {
    return Math.floor(Math.random() * 512) + 40;
  }

  update (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    // if (this.x < 505) {
    //   this.speed = Math.floor(Math.random() * 512) + 40;
    //   this.x += this.speed * dt;
    // }
    this.x += this.speed * dt;
    if (this.x > 505) {
      this.x = -50;
    }
    this.collisionDetect(player);
  }
}

class Player extends GameChar {
  constructor (x, y) {
    super(x, y);
    this.sprite = 'images/char-boy.png';
    GameChar.charDimensions(this);
  }

  handleInput (key) {
    const allowedKeys = [
      'ArrowUp',
      'ArrowRight',
      'ArrowDown',
      'ArrowLeft'
    ];

    if (allowedKeys.includes(key)) {
      switch (key) {
        case 'ArrowUp':
          console.log('up');
          this.y = this.y + -83;
          // if (this.y < 55) {
          //   this.y += 83;
          // }
          break;
        case 'ArrowRight':
          console.log('right');
          this.x = this.x + 101;
          if (this.x > 420) {
            this.x -= 101;
          }
          break;
        case 'ArrowDown':
          console.log('down');
          this.y = this.y + 83;
          if (this.y > 465) {
            this.y -= 83;
          }
          break;
        case 'ArrowLeft':
          console.log('left');
          this.x = this.x - 101;
          if (this.x < 0) {
            this.x += 101;
          }
          break;
        default:
          break;
      }
    }
  }

  hasCrossed () {
    console.log('has crossed');
    document.querySelector('h1 > span').textContent = parseInt(document.querySelector('h1 > span').textContent) + 1;
    allEnemies.push(new Enemy(0, Enemy.getRandomRow(), Enemy.getRandomSpeed()));
    this.reset();
  }

  reset () {
    this.y = 465;
    this.x = 218;
  }

  update () {
    if (this.y < 465 - 83 * 4) {
      this.hasCrossed();
    }
  }
}

const allEnemies = [];

// for (let i = 0; i < 5; i ++) {
//   const enemy = new Enemy(i * 0, i * 100); // x, y values
//   allEnemies.push(enemy);
// }

const enemy1 = new Enemy(0, 133, Enemy.getRandomSpeed());
const enemy2 = new Enemy(0, 215, Enemy.getRandomSpeed()); // function that create anemy object
const enemy3 = new Enemy(0, 298, Enemy.getRandomSpeed());
allEnemies.push(enemy1);
allEnemies.push(enemy2);
allEnemies.push(enemy3);

const player = new Player(218, 465); // x, y values

document.addEventListener('keyup', (ev) => {
  player.handleInput(ev.key);
});

document.addEventListener('keyup', (ev) => {
  if (ev.key === 'f') {
    setInterval(() => {
      player.handleInput('ArrowUp');
    }, 10);
  }
});
