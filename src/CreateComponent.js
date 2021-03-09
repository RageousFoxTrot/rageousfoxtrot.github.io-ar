import { Engine, Scene, FreeCamera, Vector3, HemisphericLight, SceneLoader } from 'babylonjs';
import { GLTFFileLoader } from 'babylonjs-loaders';

let canvas, engine, scene, camera;
let light, model;

export function CreateScene() {
    canvas = document.querySelector('canvas');
    engine = new Engine(canvas, true, {preserveDrawingBuffer: true, stencil: true});
    scene = new Scene(engine);
    camera = new FreeCamera('camera1', new Vector3(20, 20, -10), scene);
    camera.setTarget(Vector3.Zero());
    camera.attachControl(canvas, false);

    light = new HemisphericLight('light1', new Vector3(0, 1, 0), scene);

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
        console.log(data);
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