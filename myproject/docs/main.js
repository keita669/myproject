/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tweenjs/tween.js */ "./node_modules/@tweenjs/tween.js/dist/tween.esm.js");
/* harmony import */ var three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three/examples/jsm/controls/OrbitControls */ "./node_modules/three/examples/jsm/controls/OrbitControls.js");



class ThreeJSContainer {
    scene;
    cloud;
    cloud1;
    cloud2;
    light;
    constructor() { }
    createRendererDOM = (width, height, cameraPos) => {
        const renderer = new three__WEBPACK_IMPORTED_MODULE_2__.WebGLRenderer();
        renderer.setSize(width, height);
        renderer.setClearColor(new three__WEBPACK_IMPORTED_MODULE_2__.Color(0x000000));
        const camera = new three__WEBPACK_IMPORTED_MODULE_2__.PerspectiveCamera(120, width / height, 0.1, 2000);
        camera.position.copy(new three__WEBPACK_IMPORTED_MODULE_2__.Vector3(0, 300, 300));
        camera.lookAt(new three__WEBPACK_IMPORTED_MODULE_2__.Vector3(0, 500, 0));
        const orbitControls = new three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_1__.OrbitControls(camera, renderer.domElement);
        this.createScene();
        const render = (time) => {
            orbitControls.update();
            renderer.render(this.scene, camera);
            requestAnimationFrame(render);
        };
        requestAnimationFrame(render);
        return renderer.domElement;
    };
    createScene = () => {
        this.scene = new three__WEBPACK_IMPORTED_MODULE_2__.Scene();
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
        const geometry = new three__WEBPACK_IMPORTED_MODULE_2__.BufferGeometry();
        geometry.setAttribute('position', new three__WEBPACK_IMPORTED_MODULE_2__.BufferAttribute(positions, 3));
        const material = new three__WEBPACK_IMPORTED_MODULE_2__.PointsMaterial({
            size: 1.5,
            map: this.generateSprite("rgba(65, 174, 55, 0.93)"),
            blending: three__WEBPACK_IMPORTED_MODULE_2__.AdditiveBlending,
            depthWrite: false,
            transparent: true,
            opacity: 1.0,
            vertexColors: true
        });
        this.cloud = new three__WEBPACK_IMPORTED_MODULE_2__.Points(geometry, material);
        this.scene.add(this.cloud);
        const geometry1 = new three__WEBPACK_IMPORTED_MODULE_2__.BufferGeometry();
        geometry1.setAttribute('position', new three__WEBPACK_IMPORTED_MODULE_2__.BufferAttribute(positions1, 3));
        const material1 = new three__WEBPACK_IMPORTED_MODULE_2__.PointsMaterial({
            size: 1.5,
            map: this.generateSprite("rgba(252, 214, 157, 0.93)"),
            blending: three__WEBPACK_IMPORTED_MODULE_2__.AdditiveBlending,
            depthWrite: false,
            transparent: true,
            opacity: 1.0,
            vertexColors: true
        });
        this.cloud1 = new three__WEBPACK_IMPORTED_MODULE_2__.Points(geometry1, material1);
        this.cloud1.position.x = 100;
        this.scene.add(this.cloud1);
        const geometry2 = new three__WEBPACK_IMPORTED_MODULE_2__.BufferGeometry();
        geometry2.setAttribute('position', new three__WEBPACK_IMPORTED_MODULE_2__.BufferAttribute(positions2, 3));
        const material2 = new three__WEBPACK_IMPORTED_MODULE_2__.PointsMaterial({
            size: 1.5,
            map: this.generateSprite("rgba(105, 78, 242, 0.93)"),
            blending: three__WEBPACK_IMPORTED_MODULE_2__.AdditiveBlending,
            depthWrite: false,
            transparent: true,
            opacity: 1.0,
            vertexColors: true
        });
        this.cloud2 = new three__WEBPACK_IMPORTED_MODULE_2__.Points(geometry2, material2);
        this.cloud2.position.x = -100;
        this.scene.add(this.cloud2);
        this.light = new three__WEBPACK_IMPORTED_MODULE_2__.DirectionalLight(0xffffff);
        this.light.position.set(1, 1, 1).clone().normalize();
        this.scene.add(this.light);
        this.createFirework();
        this.createGround();
        let count = 1;
        const interval = setInterval(() => {
            const randX = Math.random() * 300 - 100; // 👈 毎回リセット・再生成
            const randY = Math.random() * 100 + 50;
            this.createFirework(randX + Math.random(), randY + Math.random());
            count++;
            if (count >= 20)
                clearInterval(interval);
        }, 2500);
        // 各パーティクルに対してアニメーションを設定
        const triger = 200 * Math.random();
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
            const riseTarget = { x: 0, y: triger, z: 0, opacity: 1.3 };
            const spheretag = { x: target.x, y: target.y + triger, z: target.z, opacity: 0 };
            const spheretag2 = { x: 0, y: 0, z: 0, opacity: 0 };
            const positionAttr = geometry.getAttribute('position');
            const updateFunc = () => {
                positionAttr.setX(tweeninfo.index, tweeninfo.x);
                positionAttr.setY(tweeninfo.index, tweeninfo.y);
                positionAttr.setZ(tweeninfo.index, tweeninfo.z);
                positionAttr.needsUpdate = true;
            };
            const positionAttr1 = geometry1.getAttribute('position');
            const updateFunc1 = () => {
                positionAttr1.setX(tweeninfo.index, tweeninfo.x);
                positionAttr1.setY(tweeninfo.index, tweeninfo.y);
                positionAttr1.setZ(tweeninfo.index, tweeninfo.z);
                positionAttr1.needsUpdate = true;
            };
            const colors = new Float32Array(particleNum * 3); // R, G, B × 各パーティクル
            for (let i = 0; i < 1000; i++) {
                colors[i * 3 + 0] = i / 100 * Math.random(); // R
                colors[i * 3 + 1] = i / 100 * Math.random(); // G
                colors[i * 3 + 2] = Math.random(); // B
            }
            geometry.setAttribute("color", new three__WEBPACK_IMPORTED_MODULE_2__.BufferAttribute(colors, 3));
            geometry1.setAttribute("color", new three__WEBPACK_IMPORTED_MODULE_2__.BufferAttribute(colors, 3));
            const tweenToSphere = new _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_0__.Tween(tweeninfo)
                .to(riseTarget, 1000)
                .delay(0)
                .easing(_tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_0__.Easing.Cubic.InOut)
                .onUpdate(updateFunc);
            tweenToSphere.start();
            const tweenToOrigin = new _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_0__.Tween(tweeninfo)
                .to(spheretag, 800)
                .delay(500)
                .easing(_tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_0__.Easing.Quadratic.Out)
                .onUpdate(updateFunc);
            const tweenToOrigin2 = new _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_0__.Tween(tweeninfo)
                .to(spheretag2, 0)
                .delay(0)
                .easing(_tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_0__.Easing.Cubic.InOut)
                .onUpdate(updateFunc);
            tweenToSphere.chain(tweenToOrigin);
            tweenToOrigin.chain(tweenToOrigin2);
            tweenToOrigin2.chain(tweenToSphere);
            tweenToSphere.start();
        }
        // TWEEN更新ループ
        const update = (time) => {
            _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_0__.update();
            requestAnimationFrame(update);
        };
        requestAnimationFrame(update);
    };
    createGround = () => {
        const textureLoader = new three__WEBPACK_IMPORTED_MODULE_2__.TextureLoader();
        const texture = textureLoader.load("umi2.jpg");
        texture.wrapS = three__WEBPACK_IMPORTED_MODULE_2__.RepeatWrapping;
        texture.wrapT = three__WEBPACK_IMPORTED_MODULE_2__.RepeatWrapping;
        // テクスチャを繰り返して敷き詰める
        const geometry = new three__WEBPACK_IMPORTED_MODULE_2__.PlaneGeometry(1500, 1500);
        const material = new three__WEBPACK_IMPORTED_MODULE_2__.MeshStandardMaterial({
            map: texture,
            roughness: 1.2,
            metalness: -0.5,
            side: three__WEBPACK_IMPORTED_MODULE_2__.DoubleSide
        });
        const ground = new three__WEBPACK_IMPORTED_MODULE_2__.Mesh(geometry, material);
        ground.rotation.x = -Math.PI / 2;
        ground.position.y = -20;
        ground.receiveShadow = true;
        this.scene.add(ground);
    };
    createFirework = (baseX = 0, baseY = 0) => {
        const particleNum = 3500;
        const positions = new Float32Array(particleNum * 3);
        const colors = new Float32Array(particleNum * 3);
        for (let i = 0; i < particleNum; i++) {
            positions[i * 3 + 0] = baseX;
            positions[i * 3 + 1] = baseY;
            positions[i * 3 + 2] = 0;
            colors[i * 3 + 0] = Math.random() * 10;
            colors[i * 3 + 1] = Math.random();
            colors[i * 3 + 2] = Math.random();
        }
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        const sprite = this.generateSprite(`rgba(${r}, ${g}, ${b}, 1.5)`);
        const geometry = new three__WEBPACK_IMPORTED_MODULE_2__.BufferGeometry();
        geometry.setAttribute('position', new three__WEBPACK_IMPORTED_MODULE_2__.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new three__WEBPACK_IMPORTED_MODULE_2__.BufferAttribute(colors, 3));
        const material = new three__WEBPACK_IMPORTED_MODULE_2__.PointsMaterial({
            size: 2.0,
            map: sprite,
            blending: three__WEBPACK_IMPORTED_MODULE_2__.AdditiveBlending,
            depthWrite: false,
            transparent: true,
            vertexColors: true
        });
        const points = new three__WEBPACK_IMPORTED_MODULE_2__.Points(geometry, material);
        this.scene.add(points);
        // アニメーション開始
        for (let i = 0; i < particleNum; i++) {
            const tweeninfo = { x: baseX + 20, y: baseY, z: 0, index: i };
            const radius = 100;
            const phi = Math.acos(2 * Math.random() - 1);
            const theta = 2 * Math.PI * Math.random();
            const target = {
                x: radius * Math.sin(phi) * Math.cos(theta) + baseX,
                y: radius * Math.sin(phi) * Math.sin(theta) + baseY,
                z: radius * Math.cos(phi),
            };
            const positionAttr = geometry.getAttribute('position');
            const updateFunc = () => {
                positionAttr.setXYZ(tweeninfo.index, tweeninfo.x, tweeninfo.y, tweeninfo.z);
                positionAttr.needsUpdate = true;
            };
            const riseTarget = { x: baseX + 20, y: baseY + 200, z: 0 };
            const explodeTarget = { x: target.x, y: target.y + 200, z: target.z };
            const tweenUp = new _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_0__.Tween(tweeninfo)
                .to(riseTarget, 800)
                .easing(_tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_0__.Easing.Cubic.Out)
                .onUpdate(updateFunc);
            const tweenExplode = new _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_0__.Tween(tweeninfo)
                .to(explodeTarget, 1000)
                .easing(_tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_0__.Easing.Quadratic.Out)
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
    generateSprite = (centerColor) => {
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const context = canvas.getContext('2d');
        const gradient = context.createRadialGradient(32, 32, 0, 32, 32, 32);
        // 引数で指定された色を中心に使用
        gradient.addColorStop(1.0, centerColor); // 中心の色（引数）
        gradient.addColorStop(0.6, 'rgba(0, 0, 0, 0.99)'); // 中間
        gradient.addColorStop(1.0, 'rgba(0, 0, 0, 0.88)'); // 外側（透明）
        context.fillStyle = gradient;
        context.fillRect(0, 0, canvas.width, canvas.height);
        const texture = new three__WEBPACK_IMPORTED_MODULE_2__.Texture(canvas);
        texture.needsUpdate = true;
        return texture;
    };
}
window.addEventListener("DOMContentLoaded", () => {
    const container = new ThreeJSContainer();
    const dom = container.createRendererDOM(640, 480, new three__WEBPACK_IMPORTED_MODULE_2__.Vector3(10, 0, 150));
    document.body.appendChild(dom);
});


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkcgprendering"] = self["webpackChunkcgprendering"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_tweenjs_tween_js_dist_tween_esm_js-node_modules_three_examples_jsm_contr-78d392"], () => (__webpack_require__("./src/app.ts")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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ZGVyaW5nL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL3J1bnRpbWUvY2h1bmsgbG9hZGVkIiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vY2dwcmVuZGVyaW5nL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vY2dwcmVuZGVyaW5nL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vY2dwcmVuZGVyaW5nL3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vY2dwcmVuZGVyaW5nL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tIFwidGhyZWVcIjtcbmltcG9ydCAqIGFzIFRXRUVOIGZyb20gXCJAdHdlZW5qcy90d2Vlbi5qc1wiO1xuaW1wb3J0IHsgT3JiaXRDb250cm9scyB9IGZyb20gXCJ0aHJlZS9leGFtcGxlcy9qc20vY29udHJvbHMvT3JiaXRDb250cm9sc1wiO1xuXG5jbGFzcyBUaHJlZUpTQ29udGFpbmVyIHtcbiAgICBwcml2YXRlIHNjZW5lOiBUSFJFRS5TY2VuZTtcbiAgICBwcml2YXRlIGNsb3VkOiBUSFJFRS5Qb2ludHM7XG4gICAgIHByaXZhdGUgY2xvdWQxOiBUSFJFRS5Qb2ludHM7XG4gICAgICBwcml2YXRlIGNsb3VkMjogVEhSRUUuUG9pbnRzO1xuICAgIHByaXZhdGUgbGlnaHQ6IFRIUkVFLkxpZ2h0O1xuXG5cbiAgICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgICBwdWJsaWMgY3JlYXRlUmVuZGVyZXJET00gPSAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIGNhbWVyYVBvczogVEhSRUUuVmVjdG9yMykgPT4ge1xuICAgICAgICBjb25zdCByZW5kZXJlciA9IG5ldyBUSFJFRS5XZWJHTFJlbmRlcmVyKCk7XG4gICAgICAgIHJlbmRlcmVyLnNldFNpemUod2lkdGgsIGhlaWdodCk7XG4gICAgICAgIHJlbmRlcmVyLnNldENsZWFyQ29sb3IobmV3IFRIUkVFLkNvbG9yKDB4MDAwMDAwKSk7XG5cbiAgICAgICAgY29uc3QgY2FtZXJhID0gbmV3IFRIUkVFLlBlcnNwZWN0aXZlQ2FtZXJhKDEyMCwgd2lkdGggLyBoZWlnaHQsMC4xICwgMjAwMCk7XG4gICAgICAgIGNhbWVyYS5wb3NpdGlvbi5jb3B5KG5ldyBUSFJFRS5WZWN0b3IzKDAsIDMwMCwgMzAwKSk7XG4gICAgICAgIGNhbWVyYS5sb29rQXQobmV3IFRIUkVFLlZlY3RvcjMoMCwgNTAwLCAwKSk7XG5cblxuICAgICAgICBjb25zdCBvcmJpdENvbnRyb2xzID0gbmV3IE9yYml0Q29udHJvbHMoY2FtZXJhLCByZW5kZXJlci5kb21FbGVtZW50KTtcblxuICAgICAgICB0aGlzLmNyZWF0ZVNjZW5lKCk7XG5cbiAgICAgICAgY29uc3QgcmVuZGVyOiBGcmFtZVJlcXVlc3RDYWxsYmFjayA9ICh0aW1lKSA9PiB7XG4gICAgICAgICAgICBvcmJpdENvbnRyb2xzLnVwZGF0ZSgpO1xuICAgICAgICAgICAgcmVuZGVyZXIucmVuZGVyKHRoaXMuc2NlbmUsIGNhbWVyYSk7XG4gICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmVuZGVyKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHJlbmRlcik7XG5cbiAgICAgICAgcmV0dXJuIHJlbmRlcmVyLmRvbUVsZW1lbnQ7XG4gICAgfTtcblxuICAgIHByaXZhdGUgY3JlYXRlU2NlbmUgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMuc2NlbmUgPSBuZXcgVEhSRUUuU2NlbmUoKTtcblxuXG5cbiAgICAgICAgY29uc3QgcGFydGljbGVOdW0gPSAzNTAwO1xuXG5jb25zdCBwb3NpdGlvbnMgPSBuZXcgRmxvYXQzMkFycmF5KHBhcnRpY2xlTnVtICogMyk7XG5mb3IgKGxldCBpID0gMDsgaSA8IHBhcnRpY2xlTnVtOyBpKyspIHtcbiAgICBwb3NpdGlvbnNbaSAqIDMgKyAwXSA9IDA7XG4gICAgcG9zaXRpb25zW2kgKiAzICsgMV0gPSAwO1xuICAgIHBvc2l0aW9uc1tpICogMyArIDJdID0gMDtcbn1cblxuXG5jb25zdCBwb3NpdGlvbnMxID0gbmV3IEZsb2F0MzJBcnJheShwYXJ0aWNsZU51bSAqIDMpO1xuZm9yIChsZXQgaSA9IDA7IGkgPCBwYXJ0aWNsZU51bTsgaSsrKSB7XG4gICAgcG9zaXRpb25zMVtpICogMyArIDBdID0gMDtcbiAgICBwb3NpdGlvbnMxW2kgKiAzICsgMV0gPSAwO1xuICAgIHBvc2l0aW9uczFbaSAqIDMgKyAyXSA9IDA7XG59XG5cblxuY29uc3QgcG9zaXRpb25zMiA9IG5ldyBGbG9hdDMyQXJyYXkocGFydGljbGVOdW0gKiAzKTtcbmZvciAobGV0IGkgPSAwOyBpIDwgcGFydGljbGVOdW07IGkrKykge1xuICAgIHBvc2l0aW9uczJbaSAqIDMgKyAwXSA9IDA7XG4gICAgcG9zaXRpb25zMltpICogMyArIDFdID0gMDtcbiAgICBwb3NpdGlvbnMyW2kgKiAzICsgMl0gPSAwO1xufVxuXG5cbmNvbnN0IGdlb21ldHJ5ID0gbmV3IFRIUkVFLkJ1ZmZlckdlb21ldHJ5KCk7XG5nZW9tZXRyeS5zZXRBdHRyaWJ1dGUoJ3Bvc2l0aW9uJywgbmV3IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZShwb3NpdGlvbnMsIDMpKTtcbmNvbnN0IG1hdGVyaWFsID0gbmV3IFRIUkVFLlBvaW50c01hdGVyaWFsKHtcbiAgICBzaXplOiAxLjUsXG4gICAgbWFwOiB0aGlzLmdlbmVyYXRlU3ByaXRlKFwicmdiYSg2NSwgMTc0LCA1NSwgMC45MylcIiksXG4gICAgYmxlbmRpbmc6IFRIUkVFLkFkZGl0aXZlQmxlbmRpbmcsXG4gICAgZGVwdGhXcml0ZTogZmFsc2UsXG4gICAgdHJhbnNwYXJlbnQ6IHRydWUsXG4gICAgb3BhY2l0eTogMS4wLFxuICAgIHZlcnRleENvbG9yczogdHJ1ZVxufSk7XG50aGlzLmNsb3VkID0gbmV3IFRIUkVFLlBvaW50cyhnZW9tZXRyeSwgbWF0ZXJpYWwpO1xudGhpcy5zY2VuZS5hZGQodGhpcy5jbG91ZCk7XG5cblxuY29uc3QgZ2VvbWV0cnkxID0gbmV3IFRIUkVFLkJ1ZmZlckdlb21ldHJ5KCk7XG5nZW9tZXRyeTEuc2V0QXR0cmlidXRlKCdwb3NpdGlvbicsIG5ldyBUSFJFRS5CdWZmZXJBdHRyaWJ1dGUocG9zaXRpb25zMSwgMykpO1xuY29uc3QgbWF0ZXJpYWwxID0gbmV3IFRIUkVFLlBvaW50c01hdGVyaWFsKHtcbiAgICBzaXplOiAxLjUsXG4gICAgbWFwOiB0aGlzLmdlbmVyYXRlU3ByaXRlKFwicmdiYSgyNTIsIDIxNCwgMTU3LCAwLjkzKVwiKSxcbiAgICBibGVuZGluZzogVEhSRUUuQWRkaXRpdmVCbGVuZGluZyxcbiAgICBkZXB0aFdyaXRlOiBmYWxzZSxcbiAgICB0cmFuc3BhcmVudDogdHJ1ZSxcbiAgICBvcGFjaXR5OiAxLjAsXG4gICAgdmVydGV4Q29sb3JzOiB0cnVlXG59KTtcbnRoaXMuY2xvdWQxID0gbmV3IFRIUkVFLlBvaW50cyhnZW9tZXRyeTEsIG1hdGVyaWFsMSk7XG50aGlzLmNsb3VkMS5wb3NpdGlvbi54ID0gMTAwO1xudGhpcy5zY2VuZS5hZGQodGhpcy5jbG91ZDEpO1xuXG5cbmNvbnN0IGdlb21ldHJ5MiA9IG5ldyBUSFJFRS5CdWZmZXJHZW9tZXRyeSgpO1xuZ2VvbWV0cnkyLnNldEF0dHJpYnV0ZSgncG9zaXRpb24nLCBuZXcgVEhSRUUuQnVmZmVyQXR0cmlidXRlKHBvc2l0aW9uczIsIDMpKTtcbmNvbnN0IG1hdGVyaWFsMiA9IG5ldyBUSFJFRS5Qb2ludHNNYXRlcmlhbCh7XG4gICAgc2l6ZTogMS41LFxuICAgIG1hcDogdGhpcy5nZW5lcmF0ZVNwcml0ZShcInJnYmEoMTA1LCA3OCwgMjQyLCAwLjkzKVwiKSxcbiAgICBibGVuZGluZzogVEhSRUUuQWRkaXRpdmVCbGVuZGluZyxcbiAgICBkZXB0aFdyaXRlOiBmYWxzZSxcbiAgICB0cmFuc3BhcmVudDogdHJ1ZSxcbiAgICBvcGFjaXR5OiAxLjAsXG4gICAgdmVydGV4Q29sb3JzOiB0cnVlXG59KTtcbnRoaXMuY2xvdWQyID0gbmV3IFRIUkVFLlBvaW50cyhnZW9tZXRyeTIsIG1hdGVyaWFsMik7XG50aGlzLmNsb3VkMi5wb3NpdGlvbi54ID0gLTEwMDtcbnRoaXMuc2NlbmUuYWRkKHRoaXMuY2xvdWQyKTtcblxuXG5cbiAgICAgICAgdGhpcy5saWdodCA9IG5ldyBUSFJFRS5EaXJlY3Rpb25hbExpZ2h0KDB4ZmZmZmZmKTtcbiAgICAgICAgdGhpcy5saWdodC5wb3NpdGlvbi5zZXQoMSwgMSwgMSkubm9ybWFsaXplKCk7XG4gICAgICAgIHRoaXMuc2NlbmUuYWRkKHRoaXMubGlnaHQpO1xuXG5cblxuXG5cblxuICB0aGlzLmNyZWF0ZUZpcmV3b3JrKCk7XG5cbnRoaXMuY3JlYXRlR3JvdW5kKCk7XG5cbiAgIGxldCBjb3VudCA9IDE7XG4gICAgY29uc3QgaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG5cbiAgICBjb25zdCByYW5kWCA9IE1hdGgucmFuZG9tKCkgKiAzMDAgLSAxMDA7ICAvLyDwn5GIIOavjuWbnuODquOCu+ODg+ODiOODu+WGjeeUn+aIkFxuICAgIGNvbnN0IHJhbmRZID0gTWF0aC5yYW5kb20oKSAqIDEwMCArIDUwO1xuICAgICAgICAgdGhpcy5jcmVhdGVGaXJld29yayhyYW5kWCtNYXRoLnJhbmRvbSgpLCByYW5kWStNYXRoLnJhbmRvbSgpKTtcbiAgICAgICAgY291bnQrKztcbiAgICAgICAgaWYgKGNvdW50ID49IDIwKSBjbGVhckludGVydmFsKGludGVydmFsKTtcbiAgICB9LCAyNTAwKTtcblxuICAgICAgICAvLyDlkITjg5Hjg7zjg4bjgqPjgq/jg6vjgavlr77jgZfjgabjgqLjg4vjg6Hjg7zjgrfjg6fjg7PjgpLoqK3lrppcblxuICAgICAgICBjb25zdCB0cmlnZXIgPTIwMCpNYXRoLnJhbmRvbSgpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBhcnRpY2xlTnVtOyBpKyspIHtcblxuICAgICAgICAgICAgY29uc3QgdHdlZW5pbmZvID0geyB4OiAtMTAwLCB5OiAtNTAwLCB6OiAwLCBpbmRleDogaSB9O1xuXG4gICAgICAgICAgICAvLyDnkIPpnaLkuIrjga7jg6njg7Pjg4Djg6DjgarluqfmqJlcbiAgICAgICAgICAgIGNvbnN0IHJhZGl1cyA9IDEwMDtcbiAgICAgICAgICAgIGNvbnN0IHBoaSA9IE1hdGguYWNvcygyICogTWF0aC5yYW5kb20oKSAtIDEpO1xuICAgICAgICAgICAgY29uc3QgdGhldGEgPSAyICogTWF0aC5QSSAqIE1hdGgucmFuZG9tKCk7XG4gICAgICAgICAgICBjb25zdCB0YXJnZXQgPSB7XG4gICAgICAgICAgICAgICAgeDogcmFkaXVzICogTWF0aC5zaW4ocGhpKSAqIE1hdGguY29zKHRoZXRhKSxcbiAgICAgICAgICAgICAgICB5OiByYWRpdXMgKiBNYXRoLnNpbihwaGkpICogTWF0aC5zaW4odGhldGEpLFxuICAgICAgICAgICAgICAgIHo6IHJhZGl1cyAqIE1hdGguY29zKHBoaSksXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICBjb25zdCByaXNlVGFyZ2V0ID0geyB4OiAwLCB5OiB0cmlnZXIsIHo6IDAgLG9wYWNpdHk6MS4zfTtcbiAgICAgICAgICAgICAgIGNvbnN0IHNwaGVyZXRhZyAgPSB7IHg6IHRhcmdldC54LCB5OiB0YXJnZXQueSt0cmlnZXIsIHo6IHRhcmdldC56LG9wYWNpdHk6MCB9O1xuICAgICAgICAgICAgICAgY29uc3Qgc3BoZXJldGFnMiAgPSB7IHg6IDAsIHk6IDAsIHo6IDAsb3BhY2l0eTowfTtcblxuXG4gICAgICAgICAgICBjb25zdCBwb3NpdGlvbkF0dHIgPSBnZW9tZXRyeS5nZXRBdHRyaWJ1dGUoJ3Bvc2l0aW9uJykgYXMgVEhSRUUuQnVmZmVyQXR0cmlidXRlO1xuXG4gICAgICAgICAgICBjb25zdCB1cGRhdGVGdW5jID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIHBvc2l0aW9uQXR0ci5zZXRYKHR3ZWVuaW5mby5pbmRleCwgdHdlZW5pbmZvLngpO1xuICAgICAgICAgICAgICAgIHBvc2l0aW9uQXR0ci5zZXRZKHR3ZWVuaW5mby5pbmRleCwgdHdlZW5pbmZvLnkpO1xuICAgICAgICAgICAgICAgIHBvc2l0aW9uQXR0ci5zZXRaKHR3ZWVuaW5mby5pbmRleCwgdHdlZW5pbmZvLnopO1xuICAgICAgICAgICAgICAgIHBvc2l0aW9uQXR0ci5uZWVkc1VwZGF0ZSA9IHRydWU7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAgY29uc3QgcG9zaXRpb25BdHRyMSA9IGdlb21ldHJ5MS5nZXRBdHRyaWJ1dGUoJ3Bvc2l0aW9uJykgYXMgVEhSRUUuQnVmZmVyQXR0cmlidXRlO1xuXG4gICAgICAgICAgICBjb25zdCB1cGRhdGVGdW5jMSA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICBwb3NpdGlvbkF0dHIxLnNldFgodHdlZW5pbmZvLmluZGV4LCB0d2VlbmluZm8ueCk7XG4gICAgICAgICAgICAgICAgcG9zaXRpb25BdHRyMS5zZXRZKHR3ZWVuaW5mby5pbmRleCwgdHdlZW5pbmZvLnkpO1xuICAgICAgICAgICAgICAgIHBvc2l0aW9uQXR0cjEuc2V0Wih0d2VlbmluZm8uaW5kZXgsIHR3ZWVuaW5mby56KTtcbiAgICAgICAgICAgICAgICBwb3NpdGlvbkF0dHIxLm5lZWRzVXBkYXRlID0gdHJ1ZTtcbiAgICAgICAgICAgIH07XG5cblxuICAgICAgICAgICAgY29uc3QgY29sb3JzID0gbmV3IEZsb2F0MzJBcnJheShwYXJ0aWNsZU51bSAqIDMpOyAvLyBSLCBHLCBCIMOXIOWQhOODkeODvOODhuOCo+OCr+ODq1xuXG5mb3IgKGxldCBpID0gMDsgaSA8IDEwMDA7IGkrKykge1xuICAgIGNvbG9yc1tpICogMyArIDBdID0gaS8xMDAqTWF0aC5yYW5kb20oKTsgLy8gUlxuICAgIGNvbG9yc1tpICogMyArIDFdID0gaS8xMDAqTWF0aC5yYW5kb20oKTsgLy8gR1xuICAgIGNvbG9yc1tpICogMyArIDJdID0gTWF0aC5yYW5kb20oKTsgLy8gQlxufVxuZ2VvbWV0cnkuc2V0QXR0cmlidXRlKFwiY29sb3JcIiwgbmV3IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZShjb2xvcnMsIDMpKTtcblxuZ2VvbWV0cnkxLnNldEF0dHJpYnV0ZShcImNvbG9yXCIsIG5ldyBUSFJFRS5CdWZmZXJBdHRyaWJ1dGUoY29sb3JzLCAzKSk7XG5cblxuXG4gICAgICAgICAgICBjb25zdCB0d2VlblRvU3BoZXJlID0gbmV3IFRXRUVOLlR3ZWVuKHR3ZWVuaW5mbylcbiAgICAgICAgICAgICAgICAudG8ocmlzZVRhcmdldCwgMTAwMClcbiAgICAgICAgICAgICAgICAuZGVsYXkoMClcbiAgICAgICAgICAgICAgICAuZWFzaW5nKFRXRUVOLkVhc2luZy5DdWJpYy5Jbk91dClcbiAgICAgICAgICAgICAgICAub25VcGRhdGUodXBkYXRlRnVuYyk7XG5cbiAgICAgICAgICAgIHR3ZWVuVG9TcGhlcmUuc3RhcnQoKTtcblxuICAgICAgICAgICAgY29uc3QgdHdlZW5Ub09yaWdpbiA9IG5ldyBUV0VFTi5Ud2Vlbih0d2VlbmluZm8pXG4gICAgICAgICAgICAgICAgLnRvKHNwaGVyZXRhZyAsIDgwMClcbiAgICAgICAgICAgICAgICAuZGVsYXkoNTAwKVxuICAgICAgICAgICAgICAgLmVhc2luZyhUV0VFTi5FYXNpbmcuUXVhZHJhdGljLk91dClcbiAgICAgICAgICAgICAgICAub25VcGRhdGUodXBkYXRlRnVuYyk7XG5cbiAgICAgICAgICAgIGNvbnN0IHR3ZWVuVG9PcmlnaW4yID0gbmV3IFRXRUVOLlR3ZWVuKHR3ZWVuaW5mbylcbiAgICAgICAgICAgICAgICAudG8oIHNwaGVyZXRhZzIsIDApXG4gICAgICAgICAgICAgICAgLmRlbGF5KDApXG4gICAgICAgICAgICAgICAuZWFzaW5nKFRXRUVOLkVhc2luZy5DdWJpYy5Jbk91dClcbiAgICAgICAgICAgICAgICAub25VcGRhdGUodXBkYXRlRnVuYyk7XG5cblxuXG5cbiAgICAgICAgICAgIHR3ZWVuVG9TcGhlcmUuY2hhaW4odHdlZW5Ub09yaWdpbik7XG5cbiAgICAgICAgICAgIHR3ZWVuVG9PcmlnaW4uY2hhaW4odHdlZW5Ub09yaWdpbjIpO1xuXG4gICAgICAgICAgICAgdHdlZW5Ub09yaWdpbjIuY2hhaW4odHdlZW5Ub1NwaGVyZSk7XG5cblxuICAgICAgICAgICAgdHdlZW5Ub1NwaGVyZS5zdGFydCgpO1xuXG5cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFRXRUVO5pu05paw44Or44O844OXXG4gICAgICAgIGNvbnN0IHVwZGF0ZTogRnJhbWVSZXF1ZXN0Q2FsbGJhY2sgPSAodGltZSkgPT4ge1xuICAgICAgICAgICAgVFdFRU4udXBkYXRlKCk7XG4gICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodXBkYXRlKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHVwZGF0ZSk7XG4gICAgfTtcblxuICBwcml2YXRlIGNyZWF0ZUdyb3VuZCA9ICgpID0+IHtcbiAgICBjb25zdCB0ZXh0dXJlTG9hZGVyID0gbmV3IFRIUkVFLlRleHR1cmVMb2FkZXIoKTtcbiAgICBjb25zdCB0ZXh0dXJlID0gdGV4dHVyZUxvYWRlci5sb2FkKFwidW1pMi5qcGdcIik7XG4gICAgdGV4dHVyZS53cmFwUyA9IFRIUkVFLlJlcGVhdFdyYXBwaW5nO1xuICAgIHRleHR1cmUud3JhcFQgPSBUSFJFRS5SZXBlYXRXcmFwcGluZztcbiAgICAvLyDjg4bjgq/jgrnjg4Hjg6PjgpLnubDjgorov5TjgZfjgabmlbfjgY3oqbDjgoHjgotcblxuICAgIGNvbnN0IGdlb21ldHJ5ID0gbmV3IFRIUkVFLlBsYW5lR2VvbWV0cnkoMTUwMCwgMTUwMCk7XG4gICAgY29uc3QgbWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaFN0YW5kYXJkTWF0ZXJpYWwoe1xuICAgICAgICBtYXA6IHRleHR1cmUsXG4gICAgICAgIHJvdWdobmVzczogMS4yLFxuICAgICAgICBtZXRhbG5lc3M6IC0wLjUsXG4gICAgICAgIHNpZGU6IFRIUkVFLkRvdWJsZVNpZGVcbiAgICB9KTtcblxuICAgIGNvbnN0IGdyb3VuZCA9IG5ldyBUSFJFRS5NZXNoKGdlb21ldHJ5LCBtYXRlcmlhbCk7XG4gICAgZ3JvdW5kLnJvdGF0aW9uLnggPSAtTWF0aC5QSSAvIDI7XG4gICAgZ3JvdW5kLnBvc2l0aW9uLnkgPSAtMjA7XG4gICAgZ3JvdW5kLnJlY2VpdmVTaGFkb3cgPSB0cnVlO1xuICAgIHRoaXMuc2NlbmUuYWRkKGdyb3VuZCk7XG59O1xuXG4gICAgcHJpdmF0ZSBjcmVhdGVGaXJld29yayA9IChiYXNlWDogbnVtYmVyID0wICxiYXNlWTogbnVtYmVyID0gMCkgPT4ge1xuXG4gICAgY29uc3QgcGFydGljbGVOdW0gPSAzNTAwO1xuICAgIGNvbnN0IHBvc2l0aW9ucyA9IG5ldyBGbG9hdDMyQXJyYXkocGFydGljbGVOdW0gKiAzKTtcbiAgICBjb25zdCBjb2xvcnMgPSBuZXcgRmxvYXQzMkFycmF5KHBhcnRpY2xlTnVtICogMyk7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBhcnRpY2xlTnVtOyBpKyspIHtcbiAgICAgICAgcG9zaXRpb25zW2kgKiAzICsgMF0gPSBiYXNlWDtcbiAgICAgICAgcG9zaXRpb25zW2kgKiAzICsgMV0gPSBiYXNlWTtcbiAgICAgICAgcG9zaXRpb25zW2kgKiAzICsgMl0gPSAwO1xuXG4gICAgICAgIGNvbG9yc1tpICogMyArIDBdID0gTWF0aC5yYW5kb20oKSoxMDtcbiAgICAgICAgY29sb3JzW2kgKiAzICsgMV0gPSBNYXRoLnJhbmRvbSgpO1xuICAgICAgICBjb2xvcnNbaSAqIDMgKyAyXSA9IE1hdGgucmFuZG9tKCk7XG4gICAgfVxuXG4gICAgY29uc3QgciA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDI1Nik7XG5jb25zdCBnID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMjU2KTtcbmNvbnN0IGIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyNTYpO1xuY29uc3Qgc3ByaXRlID0gdGhpcy5nZW5lcmF0ZVNwcml0ZShgcmdiYSgke3J9LCAke2d9LCAke2J9LCAxLjUpYCk7XG5cbiAgICBjb25zdCBnZW9tZXRyeSA9IG5ldyBUSFJFRS5CdWZmZXJHZW9tZXRyeSgpO1xuICAgIGdlb21ldHJ5LnNldEF0dHJpYnV0ZSgncG9zaXRpb24nLCBuZXcgVEhSRUUuQnVmZmVyQXR0cmlidXRlKHBvc2l0aW9ucywgMykpO1xuICAgIGdlb21ldHJ5LnNldEF0dHJpYnV0ZSgnY29sb3InLCBuZXcgVEhSRUUuQnVmZmVyQXR0cmlidXRlKGNvbG9ycywgMykpO1xuXG5cbiAgICBjb25zdCBtYXRlcmlhbCA9IG5ldyBUSFJFRS5Qb2ludHNNYXRlcmlhbCh7XG4gICAgICAgIHNpemU6IDIuMCxcbiAgICAgICAgbWFwOiBzcHJpdGUsXG4gICAgICAgIGJsZW5kaW5nOiBUSFJFRS5BZGRpdGl2ZUJsZW5kaW5nLFxuICAgICAgICBkZXB0aFdyaXRlOiBmYWxzZSxcbiAgICAgICAgdHJhbnNwYXJlbnQ6IHRydWUsXG4gICAgICAgIHZlcnRleENvbG9yczogdHJ1ZVxuICAgIH0pO1xuXG5cbiAgICBjb25zdCBwb2ludHMgPSBuZXcgVEhSRUUuUG9pbnRzKGdlb21ldHJ5LCBtYXRlcmlhbCk7XG4gICAgdGhpcy5zY2VuZS5hZGQocG9pbnRzKTtcblxuXG5cblxuICAgIC8vIOOCouODi+ODoeODvOOCt+ODp+ODs+mWi+Wni1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGFydGljbGVOdW07IGkrKykge1xuICAgICAgICBjb25zdCB0d2VlbmluZm8gPSB7IHg6IGJhc2VYKzIwLCB5OiBiYXNlWSwgejogMCwgaW5kZXg6IGkgfTtcbiAgICAgICAgY29uc3QgcmFkaXVzID0gMTAwO1xuICAgICAgICBjb25zdCBwaGkgPSBNYXRoLmFjb3MoMiAqIE1hdGgucmFuZG9tKCkgLSAxKTtcbiAgICAgICAgY29uc3QgdGhldGEgPSAyICogTWF0aC5QSSAqIE1hdGgucmFuZG9tKCk7XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IHtcbiAgICAgICAgICAgIHg6IHJhZGl1cyAqIE1hdGguc2luKHBoaSkgKiBNYXRoLmNvcyh0aGV0YSkrYmFzZVgsXG4gICAgICAgICAgICB5OiByYWRpdXMgKiBNYXRoLnNpbihwaGkpICogTWF0aC5zaW4odGhldGEpICsgYmFzZVksXG4gICAgICAgICAgICB6OiByYWRpdXMgKiBNYXRoLmNvcyhwaGkpLFxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IHBvc2l0aW9uQXR0ciA9IGdlb21ldHJ5LmdldEF0dHJpYnV0ZSgncG9zaXRpb24nKSBhcyBUSFJFRS5CdWZmZXJBdHRyaWJ1dGU7XG5cbiAgICAgICAgY29uc3QgdXBkYXRlRnVuYyA9ICgpID0+IHtcbiAgICAgICAgICAgIHBvc2l0aW9uQXR0ci5zZXRYWVoodHdlZW5pbmZvLmluZGV4LCB0d2VlbmluZm8ueCwgdHdlZW5pbmZvLnksIHR3ZWVuaW5mby56KTtcbiAgICAgICAgICAgIHBvc2l0aW9uQXR0ci5uZWVkc1VwZGF0ZSA9IHRydWU7XG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3QgcmlzZVRhcmdldCA9IHsgeDogYmFzZVgrMjAsIHk6IGJhc2VZICsgMjAwLCB6OiAwIH07XG4gICAgICAgIGNvbnN0IGV4cGxvZGVUYXJnZXQgPSB7IHg6IHRhcmdldC54LCB5OiB0YXJnZXQueSsyMDAsIHo6IHRhcmdldC56IH07XG5cbiAgICAgICAgY29uc3QgdHdlZW5VcCA9IG5ldyBUV0VFTi5Ud2Vlbih0d2VlbmluZm8pXG4gICAgICAgICAgICAudG8ocmlzZVRhcmdldCwgODAwKVxuICAgICAgICAgICAgLmVhc2luZyhUV0VFTi5FYXNpbmcuQ3ViaWMuT3V0KVxuICAgICAgICAgICAgLm9uVXBkYXRlKHVwZGF0ZUZ1bmMpO1xuXG4gICAgICAgIGNvbnN0IHR3ZWVuRXhwbG9kZSA9IG5ldyBUV0VFTi5Ud2Vlbih0d2VlbmluZm8pXG4gICAgICAgICAgICAudG8oZXhwbG9kZVRhcmdldCwgMTAwMClcbiAgICAgICAgICAgIC5lYXNpbmcoVFdFRU4uRWFzaW5nLlF1YWRyYXRpYy5PdXQpXG4gICAgICAgICAgICAub25VcGRhdGUodXBkYXRlRnVuYyk7XG5cbiAgICAgICAgdHdlZW5VcC5jaGFpbih0d2VlbkV4cGxvZGUpO1xuICAgICAgICB0d2VlblVwLnN0YXJ0KCk7XG4gICAgfVxuXG4gICAgLy8g5pWw56eS5b6M44Gr6Iqx54Gr5YmK6ZmkXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMuc2NlbmUucmVtb3ZlKHBvaW50cyk7XG4gICAgICAgIGdlb21ldHJ5LmRpc3Bvc2UoKTtcbiAgICAgICAgbWF0ZXJpYWwuZGlzcG9zZSgpO1xuICAgIH0sIDIwMDApO1xufTtcbiAgcHJpdmF0ZSBnZW5lcmF0ZVNwcml0ZSA9IChjZW50ZXJDb2xvcjogc3RyaW5nKTogVEhSRUUuVGV4dHVyZSA9PiB7XG4gICAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgY2FudmFzLndpZHRoID0gNjQ7XG4gICAgY2FudmFzLmhlaWdodCA9IDY0O1xuXG4gICAgY29uc3QgY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpITtcbiAgICBjb25zdCBncmFkaWVudCA9IGNvbnRleHQuY3JlYXRlUmFkaWFsR3JhZGllbnQoMzIsIDMyLCAwLCAzMiwgMzIsIDMyKTtcblxuICAgIC8vIOW8leaVsOOBp+aMh+WumuOBleOCjOOBn+iJsuOCkuS4reW/g+OBq+S9v+eUqFxuICAgIGdyYWRpZW50LmFkZENvbG9yU3RvcCgxLjAsIGNlbnRlckNvbG9yKTsgICAgICAgICAgICAgIC8vIOS4reW/g+OBruiJsu+8iOW8leaVsO+8iVxuICAgIGdyYWRpZW50LmFkZENvbG9yU3RvcCgwLjYsICdyZ2JhKDAsIDAsIDAsIDAuOTkpJyk7ICAgICAgLy8g5Lit6ZaTXG4gICAgZ3JhZGllbnQuYWRkQ29sb3JTdG9wKDEuMCwgJ3JnYmEoMCwgMCwgMCwgMC44OCknKTsgICAgICAgIC8vIOWkluWBtO+8iOmAj+aYju+8iVxuXG4gICAgY29udGV4dC5maWxsU3R5bGUgPSBncmFkaWVudDtcbiAgICBjb250ZXh0LmZpbGxSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG5cbiAgICBjb25zdCB0ZXh0dXJlID0gbmV3IFRIUkVFLlRleHR1cmUoY2FudmFzKTtcbiAgICB0ZXh0dXJlLm5lZWRzVXBkYXRlID0gdHJ1ZTtcbiAgICByZXR1cm4gdGV4dHVyZTtcbn07XG59XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiB7XG4gICAgY29uc3QgY29udGFpbmVyID0gbmV3IFRocmVlSlNDb250YWluZXIoKTtcbiAgICBjb25zdCBkb20gPSBjb250YWluZXIuY3JlYXRlUmVuZGVyZXJET00oNjQwLCA0ODAsIG5ldyBUSFJFRS5WZWN0b3IzKDEwLCAwLCAxNTApKTtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGRvbSk7XG59KTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwidmFyIGRlZmVycmVkID0gW107XG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8gPSAocmVzdWx0LCBjaHVua0lkcywgZm4sIHByaW9yaXR5KSA9PiB7XG5cdGlmKGNodW5rSWRzKSB7XG5cdFx0cHJpb3JpdHkgPSBwcmlvcml0eSB8fCAwO1xuXHRcdGZvcih2YXIgaSA9IGRlZmVycmVkLmxlbmd0aDsgaSA+IDAgJiYgZGVmZXJyZWRbaSAtIDFdWzJdID4gcHJpb3JpdHk7IGktLSkgZGVmZXJyZWRbaV0gPSBkZWZlcnJlZFtpIC0gMV07XG5cdFx0ZGVmZXJyZWRbaV0gPSBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV07XG5cdFx0cmV0dXJuO1xuXHR9XG5cdHZhciBub3RGdWxmaWxsZWQgPSBJbmZpbml0eTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV0gPSBkZWZlcnJlZFtpXTtcblx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcblx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGNodW5rSWRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRpZiAoKHByaW9yaXR5ICYgMSA9PT0gMCB8fCBub3RGdWxmaWxsZWQgPj0gcHJpb3JpdHkpICYmIE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uTykuZXZlcnkoKGtleSkgPT4gKF9fd2VicGFja19yZXF1aXJlX18uT1trZXldKGNodW5rSWRzW2pdKSkpKSB7XG5cdFx0XHRcdGNodW5rSWRzLnNwbGljZShqLS0sIDEpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZnVsZmlsbGVkID0gZmFsc2U7XG5cdFx0XHRcdGlmKHByaW9yaXR5IDwgbm90RnVsZmlsbGVkKSBub3RGdWxmaWxsZWQgPSBwcmlvcml0eTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYoZnVsZmlsbGVkKSB7XG5cdFx0XHRkZWZlcnJlZC5zcGxpY2UoaS0tLCAxKVxuXHRcdFx0dmFyIHIgPSBmbigpO1xuXHRcdFx0aWYgKHIgIT09IHVuZGVmaW5lZCkgcmVzdWx0ID0gcjtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHJlc3VsdDtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIG5vIGJhc2VVUklcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcIm1haW5cIjogMFxufTtcblxuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5PLmogPSAoY2h1bmtJZCkgPT4gKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9PT0gMCk7XG5cbi8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xudmFyIHdlYnBhY2tKc29ucENhbGxiYWNrID0gKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uLCBkYXRhKSA9PiB7XG5cdHZhciBbY2h1bmtJZHMsIG1vcmVNb2R1bGVzLCBydW50aW1lXSA9IGRhdGE7XG5cdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuXHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcblx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMDtcblx0aWYoY2h1bmtJZHMuc29tZSgoaWQpID0+IChpbnN0YWxsZWRDaHVua3NbaWRdICE9PSAwKSkpIHtcblx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcblx0XHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG5cdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKHJ1bnRpbWUpIHZhciByZXN1bHQgPSBydW50aW1lKF9fd2VicGFja19yZXF1aXJlX18pO1xuXHR9XG5cdGlmKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKSBwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbihkYXRhKTtcblx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcblx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG5cdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0oKTtcblx0XHR9XG5cdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcblx0fVxuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHJlc3VsdCk7XG59XG5cbnZhciBjaHVua0xvYWRpbmdHbG9iYWwgPSBzZWxmW1wid2VicGFja0NodW5rY2dwcmVuZGVyaW5nXCJdID0gc2VsZltcIndlYnBhY2tDaHVua2NncHJlbmRlcmluZ1wiXSB8fCBbXTtcbmNodW5rTG9hZGluZ0dsb2JhbC5mb3JFYWNoKHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgMCkpO1xuY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIGNodW5rTG9hZGluZ0dsb2JhbC5wdXNoLmJpbmQoY2h1bmtMb2FkaW5nR2xvYmFsKSk7IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBkZXBlbmRzIG9uIG90aGVyIGxvYWRlZCBjaHVua3MgYW5kIGV4ZWN1dGlvbiBuZWVkIHRvIGJlIGRlbGF5ZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHVuZGVmaW5lZCwgW1widmVuZG9ycy1ub2RlX21vZHVsZXNfdHdlZW5qc190d2Vlbl9qc19kaXN0X3R3ZWVuX2VzbV9qcy1ub2RlX21vZHVsZXNfdGhyZWVfZXhhbXBsZXNfanNtX2NvbnRyLTc4ZDM5MlwiXSwgKCkgPT4gKF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9hcHAudHNcIikpKVxuX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyhfX3dlYnBhY2tfZXhwb3J0c19fKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==