import { CreateScene, LoadGLTF, LoadSky } from './CreateComponent.js';


var { Engine, Scene } = await CreateScene();
LoadGLTF();
LoadSky();

Engine.runRenderLoop(function(){
    Scene.render();
});

window.addEventListener('resize', function(){
    Engine.resize();
});