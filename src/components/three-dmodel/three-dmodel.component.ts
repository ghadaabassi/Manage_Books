import { Component, AfterViewInit } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

@Component({
  selector: 'app-three-dmodel',
  templateUrl: './three-dmodel.component.html',
  styleUrls: ['./three-dmodel.component.css'],
})
export class ThreeDModelComponent implements AfterViewInit {
  private canvas!: HTMLCanvasElement;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private controls!: OrbitControls;

  ngAfterViewInit(): void {
    this.initScene();
  }

  private initScene(): void {
    this.canvas = document.getElementById('canvas-box') as HTMLCanvasElement;

    this.scene = new THREE.Scene();

    this.addLights();

    this.camera = this.createCamera();

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true,
    });
    this.setupRenderer();

    this.addGroundPlane();

    this.loadModel();

    this.setupControls();

    this.handleResize();

    this.animate();
  }

  private addLights(): void {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    this.scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1.5);
    pointLight.position.set(5, 5, 5);
    this.scene.add(pointLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
    directionalLight.position.set(-5, 5, 5);
    this.scene.add(directionalLight);
  }

  private createCamera(): THREE.PerspectiveCamera {
    const aspectRatio = this.canvas.clientWidth / this.canvas.clientHeight;
    const camera = new THREE.PerspectiveCamera(10, aspectRatio, 0.1, 50);
    camera.position.set(0, 1, 5); 
    return camera;
  }

  private setupRenderer(): void {
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
    this.renderer.setClearColor(0xffffff, 0);
  }

  private addGroundPlane(): void {
    const planeGeometry = new THREE.PlaneGeometry(10, 10);
    const planeMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff, 
      side: THREE.DoubleSide, 
    });

  }

  private loadModel(): void {
    const loader = new GLTFLoader();
    loader.load(
      'model/poetry_book.glb',
      (gltf) => {
        console.log('Model loaded:', gltf);

        const model = gltf.scene;

        const box = new THREE.Box3().setFromObject(model);
        const size = new THREE.Vector3();
        box.getSize(size); 
        const center = new THREE.Vector3();
        box.getCenter(center);


        model.position.sub(center);
        model.position.y += size.y / 2;

        this.scene.add(model);
      },
      undefined,
      (error) => {
        console.error('Error loading model:', error);
      }
    );
  }

  private setupControls(): void {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true; 
    this.controls.dampingFactor = 0.05;
    this.controls.screenSpacePanning = false;
    this.controls.minDistance = 1; 
    this.controls.maxDistance = 10; 
    this.controls.maxPolarAngle = Math.PI / 2; 
  }

  private handleResize(): void {
    window.addEventListener('resize', () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(width, height);
    });
  }

  private animate(): void {
    const animate = () => {

      this.controls.update();


      this.renderer.render(this.scene, this.camera);

      requestAnimationFrame(animate);
    };
    animate();
  }
}
