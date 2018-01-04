
if (!Detector.webgl) {
    Detector.addGetWebGLMessage();
}
var container, stats;
var camera, controls, scene, render;
var cross;
var strModelFile;
setModelFile("models/q1c.stl");
init();
animate();
function init() {
    /*
    var canvasContainer = document.getElementById('mainCanvas');
    var width = canvasContainer.clientWidth;  //获取画布的宽
    var height = canvasContainer.clientHeight;  //获取画布的高
    var render = new THREE.WebGLRenderer({
        antialias: true  //抗锯齿开
    });
    render.setSize(width, height);  //设置渲染器的宽和高
    render.setClearColor(0x660000); //设置渲染器的背景颜色为黑色
    var canvas = render.domElement; //获取渲染器的画布元素
    canvasContainer.appendChild(canvas); //将画布写入html元素中
    */

    width = document.getElementById('canvas-frame').clientWidth;
    height = document.getElementById('canvas-frame').clientHeight;
    render = new THREE.WebGLRenderer({
        antialias : true
    });
    render.setSize(width, height);
    document.getElementById('canvas-frame').appendChild(render.domElement);
    render.setClearColor(0x660000, 1.0);
    /*
              width = document.getElementById('canvas-frame').clientWidth;
              height = document.getElementById('canvas-frame').clientHeight;
              renderer = new THREE.WebGLRenderer({
                  antialias : false
              });
              renderer.setSize(width, height);
              document.getElementById('canvas-frame').appendChild(renderer.domElement);
              renderer.setClearColor(0x660000);
    */
    camera = new THREE.PerspectiveCamera(60, width / height, 0.01, 1e10 );
    camera.position.z = 0.2;

    controls = new THREE.TrackballControls(camera);

    controls.rotateSpeed = 5.0;
    controls.zoomSpeed = 5;
    controls.panSpeed = 2;

    controls.noZoom = false;
    controls.noPan = false;

    controls.staticMoving = false;
    controls.dynamicDampingFactor = 0.3;

    scene = new THREE.Scene();
    scene.add( camera );

    // light
    var dirLight = new THREE.DirectionalLight( 0xffffff );
    dirLight.position.set( 200, 200, 1000 ).normalize();

    camera.add(dirLight);
    camera.add(dirLight.target);

    var material = new THREE.MeshLambertMaterial({ color:0xffffff, side: THREE.DoubleSide });

    // 加载模型文件
    var loader = new THREE.STLLoader();
    loader.load(strModelFile, stlMesh);
    function stlMesh(stlGeometry) {
        var mat= new THREE.MeshLambertMaterial({color:0x00FF00});
        mesh = new THREE.Mesh(stlGeometry, mat);
        scene.add(mesh)
    }
    /*
              container = document.createElement('div');
              document.body.appendChild(container);
              container.appendChild(render.domElement);

              stats = new Stats();
              stats.domElement.style.position = 'absolute';
              stats.domElement.style.top = '0px';
              container.appendChild(stats.domElement );
              */
    //
    window.addEventListener('resize', onWindowResize, false);
}
function setModelFile(modelFile) {
    strModelFile = modelFile;
}

function onWindowResize() {
    width = document.getElementById('canvas-frame').clientWidth;
    height = document.getElementById('canvas-frame').clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    render.setSize(width, height);
    controls.handleResize();
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    render.render(scene, camera);
    //stats.update();
}

/*
      var renderer;
      var stats;

      //javascript

      function initThree() {
          width = document.getElementById('canvas-frame').clientWidth;
          height = document.getElementById('canvas-frame').clientHeight;
          renderer = new THREE.WebGLRenderer({
              antialias : true
          });
          renderer.setSize(width, height);
          document.getElementById('canvas-frame').appendChild(renderer.domElement);
          renderer.setClearColor(0xFFFFFF, 1.0);

          //window.addEventListener('resize', onWindowResize, false);

          //stats = new Stats();
          //stats.domElement.style.position = 'absolute';
          //stats.domElement.style.left = '0px';
          //stats.domElement.style.top = '0px';
          //document.getElementById('canvas-frame').appendChild(stats.domElement);

      }

      var camera;
      function initCamera() {
          camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
          camera.position.x = 100;
          camera.position.y = 300;
          camera.position.z = 600;
          camera.up.x = 0;
          camera.up.y = 1;
          camera.up.z = 0;
          camera.lookAt({
              x : 0,
              y : 0,
              z : 0
          });
      }

      var scene;
      function initScene() {
          scene = new THREE.Scene();
      }

      var light;
      function initLight() {
          light = new THREE.AmbientLight(0xFF0000);
          light.position.set(100, 100, 200);
          scene.add(light);

      }

      var cube;
      var mesh;
      function initObject() {
          var geometry = new THREE.BoxGeometry( 100, 100, 100 );
          for ( var i = 0; i < geometry.faces.length; i += 2 ) {

              var hex = Math.random() * 0xffffff;
              geometry.faces[ i ].color.setHex( hex );
              geometry.faces[ i + 1 ].color.setHex( hex );

          }

          var material = new THREE.MeshBasicMaterial( { vertexColors: THREE.FaceColors} );
          mesh = new THREE.Mesh( geometry,material);
          mesh.position = new THREE.Vector3(0, 0, 0);
          scene.add(mesh);
      }

      function initGrid(){
          var helper = new THREE.GridHelper( 1000, 50 );
          helper.setColors( 0x0000ff, 0x808080 );
          scene.add( helper );
      }

      function start() {
          initThree();
          initCamera();
          initScene();
          initLight();

          initObject();
          initGrid();
          animation();
      }

      // 帧循环、游戏循环
      function animation()
      {
          mesh.rotation.y +=0.01;
          renderer.render(scene, camera);
          requestAnimationFrame(animation);
      }*/
