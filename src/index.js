import Phaser from "phaser";
import logoImg from "./assets/logo.png";

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 800,
  height: 600,
  physics: {
    default: 'matter',
    matter: {
        gravity: {
            y: 0
        },
        enableSleep: true,
        debug: true
    }
  },
  scene: {
    preload: preload,
    create: create
  }
};

const game = new Phaser.Game(config);

function preload() {
  this.load.image("logo", logoImg);
}

function create() {
  this.matter.world.setBounds();

  //  Let's create a bunch of random shaped objects and add them to the world

  for (var i = 0; i < 48; i++)
  {
      var x = Phaser.Math.Between(100, 700);
      var y = Phaser.Math.Between(100, 500);

      if (Math.random() < 0.7)
      {
          var sides = Phaser.Math.Between(3, 14);
          var radius = Phaser.Math.Between(8, 50);

          this.matter.add.polygon(x, y, sides, radius, { restitution: 0.9 });
      }
      else
      {
          var width = Phaser.Math.Between(16, 128);
          var height = Phaser.Math.Between(8, 64);

          this.matter.add.rectangle(x, y, width, height, { restitution: 0.9 });
      }
  }

  this.matter.add.mouseSpring();
}
