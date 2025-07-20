import * as THREE from "three";
import * as TWEEN from "@tweenjs/tween.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

class ThreeJSContainer {
    private scene: THREE.Scene;
    private cloud: THREE.Points;
     private cloud1: THREE.Points;
      private cloud2: THREE.Points;
    private light: THREE.Light;


    constructor() {}

    public createRendererDOM = (width: number, height: number, cameraPos: THREE.Vector3) => {
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(width, height);
        renderer.setClearColor(new THREE.Color(0x000000));

        const camera = new THREE.PerspectiveCamera(120, width / height,0.1 , 2000);
        camera.position.copy(new THREE.Vector3(0, 300, 300));
        camera.lookAt(new THREE.Vector3(0, 500, 0));


        const orbitControls = new OrbitControls(camera, renderer.domElement);

        this.createScene();

        const render: FrameRequestCallback = (time) => {
            orbitControls.update();
            renderer.render(this.scene, camera);
            requestAnimationFrame(render);
        };
        requestAnimationFrame(render);

        return renderer.domElement;
    };

    private createScene = () => {
        this.scene = new THREE.Scene();



        const particleNum = 3500;

const positions = new Float32Array(particleNum * 3);
for (let i = 0; i < particleNum; i++) {
    positions[i * 3 + 0] = 0;
    positions[i * 3 + 1] = 0;
    positions[i * 3 + 2] = 0;
}


const positions1 = new Float32Array(particleNum * 3);
for (let i = 0; i < particleNum; i++) {
    positions1[i * 3 + 0] = 0;
    positions1[i * 3 + 1] = 0;
    positions1[i * 3 + 2] = 0;
}


const positions2 = new Float32Array(particleNum * 3);
for (let i = 0; i < particleNum; i++) {
    positions2[i * 3 + 0] = 0;
    positions2[i * 3 + 1] = 0;
    positions2[i * 3 + 2] = 0;
}


const geometry = new THREE.BufferGeometry();
geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
const material = new THREE.PointsMaterial({
    size: 1.5,
    map: this.generateSprite("rgba(65, 174, 55, 0.93)"),
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    transparent: true,
    opacity: 1.0,
    vertexColors: true
});
this.cloud = new THREE.Points(geometry, material);
this.scene.add(this.cloud);


const geometry1 = new THREE.BufferGeometry();
geometry1.setAttribute('position', new THREE.BufferAttribute(positions1, 3));
const material1 = new THREE.PointsMaterial({
    size: 1.5,
    map: this.generateSprite("rgba(252, 214, 157, 0.93)"),
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    transparent: true,
    opacity: 1.0,
    vertexColors: true
});
this.cloud1 = new THREE.Points(geometry1, material1);
this.cloud1.position.x = 100;
this.scene.add(this.cloud1);


const geometry2 = new THREE.BufferGeometry();
geometry2.setAttribute('position', new THREE.BufferAttribute(positions2, 3));
const material2 = new THREE.PointsMaterial({
    size: 1.5,
    map: this.generateSprite("rgba(105, 78, 242, 0.93)"),
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    transparent: true,
    opacity: 1.0,
    vertexColors: true
});
this.cloud2 = new THREE.Points(geometry2, material2);
this.cloud2.position.x = -100;
this.scene.add(this.cloud2);



        this.light = new THREE.DirectionalLight(0xffffff);
        this.light.position.set(1, 1, 1).normalize();
        this.scene.add(this.light);






  this.createFirework();

this.createGround();

   let count = 1;
    const interval = setInterval(() => {

    const randX = Math.random() * 300 - 100;  // 👈 毎回リセット・再生成
    const randY = Math.random() * 100 + 50;
         this.createFirework(randX+Math.random(), randY+Math.random());
        count++;
        if (count >= 20) clearInterval(interval);
    }, 2500);

        // 各パーティクルに対してアニメーションを設定

        const triger =200*Math.random();
        for (let i = 0; i < particleNum; i++) {

            const tweeninfo = { x: -100, y: -500, z: 0, index: i };

            // 球面上のランダムな座標
            const radius = 100;
            const phi = Math.acos(2 * Math.random() - 1);
            const theta = 2 * Math.PI * Math.random();
            const target = {
                x: radius * Math.sin(phi) * Math.cos(theta),
                y: radius * Math.sin(phi) * Math.sin(theta),
                z: radius * Math.cos(phi),
            };

               const riseTarget = { x: 0, y: triger, z: 0 ,opacity:1.3};
               const spheretag  = { x: target.x, y: target.y+triger, z: target.z,opacity:0 };
               const spheretag2  = { x: 0, y: 0, z: 0,opacity:0};


            const positionAttr = geometry.getAttribute('position') as THREE.BufferAttribute;

            const updateFunc = () => {
                positionAttr.setX(tweeninfo.index, tweeninfo.x);
                positionAttr.setY(tweeninfo.index, tweeninfo.y);
                positionAttr.setZ(tweeninfo.index, tweeninfo.z);
                positionAttr.needsUpdate = true;
            };

                   const positionAttr1 = geometry1.getAttribute('position') as THREE.BufferAttribute;

            const updateFunc1 = () => {
                positionAttr1.setX(tweeninfo.index, tweeninfo.x);
                positionAttr1.setY(tweeninfo.index, tweeninfo.y);
                positionAttr1.setZ(tweeninfo.index, tweeninfo.z);
                positionAttr1.needsUpdate = true;
            };


            const colors = new Float32Array(particleNum * 3); // R, G, B × 各パーティクル

for (let i = 0; i < 1000; i++) {
    colors[i * 3 + 0] = i/100*Math.random(); // R
    colors[i * 3 + 1] = i/100*Math.random(); // G
    colors[i * 3 + 2] = Math.random(); // B
}
geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

geometry1.setAttribute("color", new THREE.BufferAttribute(colors, 3));



            const tweenToSphere = new TWEEN.Tween(tweeninfo)
                .to(riseTarget, 1000)
                .delay(0)
                .easing(TWEEN.Easing.Cubic.InOut)
                .onUpdate(updateFunc);

            tweenToSphere.start();

            const tweenToOrigin = new TWEEN.Tween(tweeninfo)
                .to(spheretag , 800)
                .delay(500)
               .easing(TWEEN.Easing.Quadratic.Out)
                .onUpdate(updateFunc);

            const tweenToOrigin2 = new TWEEN.Tween(tweeninfo)
                .to( spheretag2, 0)
                .delay(0)
               .easing(TWEEN.Easing.Cubic.InOut)
                .onUpdate(updateFunc);




            tweenToSphere.chain(tweenToOrigin);

            tweenToOrigin.chain(tweenToOrigin2);

             tweenToOrigin2.chain(tweenToSphere);


            tweenToSphere.start();


        }

        // TWEEN更新ループ
        const update: FrameRequestCallback = (time) => {
            TWEEN.update();
            requestAnimationFrame(update);
        };
        requestAnimationFrame(update);
    };

  private createGround = () => {
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load("umi2.jpg");
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    // テクスチャを繰り返して敷き詰める

    const geometry = new THREE.PlaneGeometry(1500, 1500);
    const material = new THREE.MeshStandardMaterial({
        map: texture,
        roughness: 1.2,
        metalness: -0.5,
        side: THREE.DoubleSide
    });

    const ground = new THREE.Mesh(geometry, material);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -20;
    ground.receiveShadow = true;
    this.scene.add(ground);
};

    private createFirework = (baseX: number =0 ,baseY: number = 0) => {

    const particleNum = 3500;
    const positions = new Float32Array(particleNum * 3);
    const colors = new Float32Array(particleNum * 3);

    for (let i = 0; i < particleNum; i++) {
        positions[i * 3 + 0] = baseX;
        positions[i * 3 + 1] = baseY;
        positions[i * 3 + 2] = 0;

        colors[i * 3 + 0] = Math.random()*10;
        colors[i * 3 + 1] = Math.random();
        colors[i * 3 + 2] = Math.random();
    }

    const r = Math.floor(Math.random() * 256);
const g = Math.floor(Math.random() * 256);
const b = Math.floor(Math.random() * 256);
const sprite = this.generateSprite(`rgba(${r}, ${g}, ${b}, 1.5)`);

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));


    const material = new THREE.PointsMaterial({
        size: 2.0,
        map: sprite,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        transparent: true,
        vertexColors: true
    });


    const points = new THREE.Points(geometry, material);
    this.scene.add(points);




    // アニメーション開始
    for (let i = 0; i < particleNum; i++) {
        const tweeninfo = { x: baseX+20, y: baseY, z: 0, index: i };
        const radius = 100;
        const phi = Math.acos(2 * Math.random() - 1);
        const theta = 2 * Math.PI * Math.random();
        const target = {
            x: radius * Math.sin(phi) * Math.cos(theta)+baseX,
            y: radius * Math.sin(phi) * Math.sin(theta) + baseY,
            z: radius * Math.cos(phi),
        };

        const positionAttr = geometry.getAttribute('position') as THREE.BufferAttribute;

        const updateFunc = () => {
            positionAttr.setXYZ(tweeninfo.index, tweeninfo.x, tweeninfo.y, tweeninfo.z);
            positionAttr.needsUpdate = true;
        };

        const riseTarget = { x: baseX+20, y: baseY + 200, z: 0 };
        const explodeTarget = { x: target.x, y: target.y+200, z: target.z };

        const tweenUp = new TWEEN.Tween(tweeninfo)
            .to(riseTarget, 800)
            .easing(TWEEN.Easing.Cubic.Out)
            .onUpdate(updateFunc);

        const tweenExplode = new TWEEN.Tween(tweeninfo)
            .to(explodeTarget, 1000)
            .easing(TWEEN.Easing.Quadratic.Out)
            .onUpdate(updateFunc);

        tweenUp.chain(tweenExplode);
        tweenUp.start();
    }

    // 数秒後に花火削除
    setTimeout(() => {
        this.scene.remove(points);
        geometry.dispose();
        material.dispose();
    }, 2000);
};
  private generateSprite = (centerColor: string): THREE.Texture => {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;

    const context = canvas.getContext('2d')!;
    const gradient = context.createRadialGradient(32, 32, 0, 32, 32, 32);

    // 引数で指定された色を中心に使用
    gradient.addColorStop(1.0, centerColor);              // 中心の色（引数）
    gradient.addColorStop(0.6, 'rgba(0, 0, 0, 0.99)');      // 中間
    gradient.addColorStop(1.0, 'rgba(0, 0, 0, 0.88)');        // 外側（透明）

    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);

    const texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    return texture;
};
}

window.addEventListener("DOMContentLoaded", () => {
    const container = new ThreeJSContainer();
    const dom = container.createRendererDOM(640, 480, new THREE.Vector3(10, 0, 150));
    document.body.appendChild(dom);
});
