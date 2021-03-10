import { Engine, Scene, DeviceOrientationCamera, Vector3, HemisphericLight, SceneLoader, WebXRSessionManager, Mesh, StandardMaterial, CubeTexture, Texture, Color3, MeshBuilder } from 'babylonjs';
import { GLTFFileLoader } from 'babylonjs-loaders';

/** @type {HTMLCanvasElement} */
let canvas;
/** @type {Engine} */
let engine;
/** @type {Scene} */
let scene;
/** @type {DeviceOrientationCamera} */
let camera;

/** @type {HemisphericLight} */
let light;
/** @type {Scene} */
let model;

export async function CreateScene() {
    await LoadPolyfill();
    WebXRSessionManager.IsSessionSupportedAsync('immersive-vr');

    canvas = document.querySelector('canvas');
    engine = new Engine(canvas, true, {preserveDrawingBuffer: true, stencil: true});
    scene = new Scene(engine);
    scene.collisionsEnabled = true;
    new Mesh.CreateGround('ground', 50, 50, 50, scene, false);

    camera = new DeviceOrientationCamera('camera', new Vector3(0, 2.25, 1.25), scene);
    camera.checkCollisions = true;
    camera.rotation.y = Math.PI;
    camera.attachControl(canvas, true);

    light = new HemisphericLight('light1', new Vector3(0, 1, 0), scene);

    InitializeXR();

    return { 
        Canvas: canvas,
        Engine: engine,
        Scene:  scene,
        Camera: camera,
        Light:  light,
        Model:  model
    };
}

export function LoadGLTF() {
    GLTFFileLoader.IncrementalLoading = false;
    GLTFFileLoader.HomogeneousCoordinates = true;

    SceneLoader.AppendAsync('./', 'models/building.glb', scene) 
    .then(data => {
        model = data;
    }).catch(err => console.error(err));

    return { 
        Canvas: canvas,
        Engine: engine,
        Scene:  scene,
        Camera: camera,
        Light:  light,
        Model:  model
    };
}

export function LoadSky() {
    const skyBox = MeshBuilder.CreateBox('skyBox', { size: 150 }, scene);
    const skyMat = new StandardMaterial('skyBox', scene);
    skyMat.backFaceCulling = false;
    skyMat.reflectionTexture = new CubeTexture('res/', scene,);
    skyMat.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE;
    skyMat.diffuseColor = Color3.Black();
    skyMat.specularColor = Color3.Black();
    skyBox.material = skyMat;
}

async function LoadPolyfill() {
    return await new Promise(resolve => {
        if (navigator.xr) return resolve();

        define('polyfill', [ 'https://cdn.jsdelivr.net/npm/webxr-polyfill@latest/build/webxr-polyfill.js' ], polyfill => {
            new polyfill();
            resolve();
        });
    });
}

async function InitializeXR() {
    const xr = await scene.createDefaultXRExperienceAsync();

    xr.input.onControllerAddedObservable.add(_ => console.log('Input', _));
}