import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as CANNON from 'cannon-es';

class ThreeJSContainer {
    private scene: THREE.Scene;
    private light: THREE.Light;

    constructor() {

    }

    // 画面部分の作成(表示する枠ごとに)*
    public createRendererDOM = (width: number, height: number, cameraPos: THREE.Vector3) => {
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(width, height);
        renderer.setClearColor(new THREE.Color(0x495ed));
        renderer.shadowMap.enabled = true; //シャドウマップを有効にする

        //カメラの設定
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        camera.position.copy(cameraPos);
        camera.lookAt(new THREE.Vector3(0, 0, 0));

        const orbitControls = new OrbitControls(camera, renderer.domElement);

        this.createScene();
        // 毎フレームのupdateを呼んで，render
        // reqestAnimationFrame により次フレームを呼ぶ
        const render: FrameRequestCallback = (time) => {
            orbitControls.update();

            renderer.render(this.scene, camera);
            requestAnimationFrame(render);
        }
        requestAnimationFrame(render);

        renderer.domElement.style.cssFloat = "left";
        renderer.domElement.style.margin = "10px";
        return renderer.domElement;
    }

    // シーンの作成(全体で1回)
    private createScene = () => {
        this.scene = new THREE.Scene();

        const world = new CANNON.World({ gravity: new CANNON.Vec3(0, -9.82, 0)});

   world.defaultContactMaterial.restitution = 0.8;
   world.defaultContactMaterial.friction = 0.2;

        //単なる描画
        const carBody = new CANNON.Body({ mass: 5 });
        const carBodyShape = new CANNON.Box(new CANNON.Vec3(4, 0.5, 2));
        carBody.addShape(carBodyShape);
           const vehicle = new CANNON.RigidVehicle({ chassisBody: carBody });

        carBody.position.y = 1;

        const wheelShape = new CANNON.Sphere(1);

        const frontLeftWheelBody = new CANNON.Body({ mass: 1 });
        frontLeftWheelBody.addShape(wheelShape);
        frontLeftWheelBody.angularDamping = 0.4;



        const frontRightWheelBody = new CANNON.Body({ mass: 1 });
        frontLeftWheelBody.addShape(wheelShape);
        frontLeftWheelBody.angularDamping = 0.4;

         const WideLeftWheelBody = new CANNON.Body({ mass: 1 });
        frontLeftWheelBody.addShape(wheelShape);
        frontLeftWheelBody.angularDamping = 0.4;

         const WideRightWheelBody = new CANNON.Body({ mass: 1 });
        frontLeftWheelBody.addShape(wheelShape);
        frontLeftWheelBody.angularDamping = 0.4;





      //物理演算
      vehicle.addWheel({
    body: frontLeftWheelBody,
    position: new CANNON.Vec3(-2, 0, 2.5)
});

     vehicle.addWheel({
    body: frontRightWheelBody,
    position: new CANNON.Vec3(-2, 0, -2.5)
});

     vehicle.addWheel({
    body: WideLeftWheelBody,
    position: new CANNON.Vec3(2, 0, 2.5)
});

     vehicle.addWheel({
    body: WideRightWheelBody,
    position: new CANNON.Vec3(2, 0, -2.5)
});
      vehicle.addToWorld(world);
      const boxGeometry = new THREE.BoxGeometry(8, 1, 4);
      const boxMaterial = new THREE.MeshNormalMaterial();
       const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);

        this.scene.add(boxMesh);
       const wheelGeometry = new THREE.SphereGeometry(1);
const wheelMaterial = new THREE.MeshNormalMaterial();

const frontLeftMesh = new THREE.Mesh(wheelGeometry, wheelMaterial);
this.scene.add(frontLeftMesh);


const frontRightMesh = new THREE.Mesh(wheelGeometry, wheelMaterial);
this.scene.add(frontRightMesh);


const WideLeftMesh = new THREE.Mesh(wheelGeometry, wheelMaterial);
this.scene.add(WideLeftMesh);


const WideRightMesh = new THREE.Mesh(wheelGeometry, wheelMaterial);
this.scene.add(WideRightMesh);





        //地面の描画
         const phongMaterial = new THREE.MeshPhongMaterial();
         const planeGeometry = new THREE.PlaneGeometry(25, 25);
         const planeMesh = new THREE.Mesh(planeGeometry, phongMaterial);
         planeMesh.material.side = THREE.DoubleSide; // 両面
         planeMesh.rotateX(-Math.PI / 2);

          this.scene.add(planeMesh);

          //物理演算の地面
          const planeShape = new CANNON.Plane()
          const planeBody = new CANNON.Body({ mass: 0 })//0だと重力の影響を受けない
          planeBody.addShape(planeShape)
          planeBody.position.set(planeMesh.position.x, planeMesh.position.y, planeMesh.position.z);
          planeBody.quaternion.set(planeMesh.quaternion.x, planeMesh.quaternion.y, planeMesh.quaternion.z, planeMesh.quaternion.w);

        // グリッド表示
        const gridHelper = new THREE.GridHelper( 10,);
        this.scene.add( gridHelper );

        // 軸表示
        const axesHelper = new THREE.AxesHelper( 5 );
        this.scene.add( axesHelper );

        //ライトの設定
        this.light = new THREE.DirectionalLight(0xffffff);
        const lvec = new THREE.Vector3(1, 1, 1).normalize();
        this.light.position.set(lvec.x, lvec.y, lvec.z);
        this.scene.add(this.light);

        let update: FrameRequestCallback = (time) => {


                world.fixedStep();
                boxMesh.position.set(carBody.position.x, carBody.position.y, carBody.position.z);
                boxMesh.quaternion.set(carBody.quaternion.x, carBody.quaternion.y, carBody.quaternion.z, carBody.quaternion.w);
                world.addBody(planeBody);
                frontLeftWheelBody.addShape(wheelShape);
                frontRightWheelBody.addShape(wheelShape);
                WideLeftWheelBody.addShape(wheelShape);
                WideRightWheelBody.addShape(wheelShape);


                frontLeftMesh.position.set(frontLeftWheelBody.position.x, frontLeftWheelBody.position.y, frontLeftWheelBody.position.z);
                frontLeftMesh.quaternion.set(frontLeftWheelBody.quaternion.x, frontLeftWheelBody.quaternion.y, frontLeftWheelBody.quaternion.z, frontLeftWheelBody.quaternion.w);

                   frontRightMesh.position.set(frontRightWheelBody.position.x, frontRightWheelBody.position.y, frontRightWheelBody.position.z);
                   frontRightMesh.quaternion.set(frontRightWheelBody.quaternion.x, frontRightWheelBody.quaternion.y, frontRightWheelBody.quaternion.z, frontRightWheelBody.quaternion.w);

                   WideLeftMesh.position.set(WideLeftWheelBody.position.x, WideLeftWheelBody.position.y, WideLeftWheelBody.position.z);
                   WideLeftMesh.quaternion.set(WideLeftWheelBody.quaternion.x, WideLeftWheelBody.quaternion.y, WideLeftWheelBody.quaternion.z, WideLeftWheelBody.quaternion.w);

                  WideRightMesh.position.set(WideRightWheelBody.position.x, WideRightWheelBody.position.y, WideRightWheelBody.position.z);
                  WideRightMesh.quaternion.set(WideRightWheelBody.quaternion.x, WideRightWheelBody.quaternion.y,WideRightWheelBody.quaternion.z, WideRightWheelBody.quaternion.w);

//前進
document.addEventListener('keydown', (event) => {//押した瞬間
  switch (event.key) {
    case 'ArrowUp':
      vehicle.setWheelForce(10, 0);
      vehicle.setWheelForce(10, 1);
      vehicle.setWheelForce(10, 2);
      vehicle.setWheelForce(10, 3);
      break;

  }
});

document.addEventListener('keyup', (event) => {//離した瞬間
  switch (event.key) {
    case 'ArrowUp':
      vehicle.setWheelForce(0, 0);
      vehicle.setWheelForce(0, 1);
      vehicle.setWheelForce(0, 2);
      vehicle.setWheelForce(0, 3);
      break;


  }
});

//後進
document.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'ArrowDown':
      vehicle.setWheelForce(-10, 0);
      vehicle.setWheelForce(-10, 1);
      vehicle.setWheelForce(-10, 2);
      vehicle.setWheelForce(-10, 3);
      break;

  }
});

document.addEventListener('keyup', (event) => {
  switch (event.key) {
    case 'ArroDown':
      vehicle.setWheelForce(0, 0);
      vehicle.setWheelForce(0, 1);
      vehicle.setWheelForce(0, 2);
      vehicle.setWheelForce(0, 3);
      break;


  }
});
//左
document.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'ArrowLeft':
vehicle.setSteeringValue(THREE.MathUtils.degToRad(30), 0);
vehicle.setSteeringValue(THREE.MathUtils.degToRad(30), 1);
      break;

  }
});

document.addEventListener('keyup', (event) => {
  switch (event.key) {
    case 'ArrowLeft':
vehicle.setSteeringValue(THREE.MathUtils.degToRad(0), 0);
vehicle.setSteeringValue(THREE.MathUtils.degToRad(0), 1);
      break;


  }
});
//右
document.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'ArrowRight':
vehicle.setSteeringValue(THREE.MathUtils.degToRad(-30), 0);
vehicle.setSteeringValue(THREE.MathUtils.degToRad(-30), 1);
      break;

  }
});

document.addEventListener('keyup', (event) => {
  switch (event.key) {
    case 'ArrowRight':
vehicle.setSteeringValue(THREE.MathUtils.degToRad(0), 0);
vehicle.setSteeringValue(THREE.MathUtils.degToRad(0), 1);
      break;


  }
});
                  world.addBody(planeBody);




            requestAnimationFrame(update);

    }
        requestAnimationFrame(update);
    }

}

window.addEventListener("DOMContentLoaded", init);

function init() {
    let container = new ThreeJSContainer();

    let viewport = container.createRendererDOM(640, 480, new THREE.Vector3(5, 5, 5));
    document.body.appendChild(viewport);
}
