import { CreateScene, LoadGLTF } from './CreateComponent.js';


var { Engine, Scene } = CreateScene();
LoadGLTF();

Engine.runRenderLoop(function(){
    Scene.render();
});

window.addEventListener('resize', function(){
    Engine.resize();
});