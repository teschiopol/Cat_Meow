kaboom({
    background: [104, 202, 230 ],
});

const FLOOR_HEIGHT = 48;
const JUMP_FORCE = 800;
const SPEED = 480;

scene("game", () => {
    gravity(2400);

    const player = add([
        rect(50, 50),
        color(243, 242, 59),
        pos(80, 40),
        area(),
        body(),
    ]);

    add([
        rect(width(), FLOOR_HEIGHT),
        outline(3),
        pos(0, height()),
        origin("botleft"),
        area(),
        solid(),
        color(162, 230, 110),
    ]);

    function jump() {
        if (player.isGrounded()) {
            player.jump(JUMP_FORCE);
        }
    }

    onKeyPress("space", jump);
    onKeyPress("w", jump);
    onKeyPress("up", jump);
    onClick(jump);

    function spawnTree() {

        add([
            rect(48, rand(32, 96)),
            area(),
            outline(2),
            pos(width(), height() - FLOOR_HEIGHT),
            origin("botleft"),
            color(250, 43, 197),
            move(LEFT, SPEED),
            cleanup(),
            "tree",
        ]);

        wait(rand(0.7, 1.7), spawnTree).then(r => r);

    }
    spawnTree();

    player.onCollide("tree", () => {
        go("lose", score);
        addKaboom(player.pos);
    });

    let score = 0;

    const scoreLabel = add([
        text(score, {
            size: 60,
            width: 350,
        }),
        pos(24, 24),
    ]);

    onUpdate(() => {
        score++
        scoreLabel.text = score
    });
});

scene("lose", (score) => {
    add([
        rect(50, 50),
        color(243, 242, 59),
        pos(width() / 2, height() / 2 - 80),
        scale(2),
        origin("center"),
    ]);

    add([
        text(score, {
            size: 100,
            width: 400,
        }),
        pos(width() / 2, height() / 2 + 80),
        origin("center"),
    ]);

    onKeyPress("space", () => go("game"));
    onKeyPress("w", () => go("game"));
    onKeyPress("up", () => go("game"));
    onClick(() => go("game"));
});

go("game");
