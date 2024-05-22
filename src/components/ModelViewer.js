import React, { useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const ModelViewer = ({ url }) => {
  useEffect(() => {
    // Create a scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('model-viewer').appendChild(renderer.domElement);

    // Lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 10, 10).normalize();
    scene.add(directionalLight);

    // Load the GLB model
    const loader = new GLTFLoader();
    loader.load(url, (gltf) => {
      scene.add(gltf.scene);
      renderer.render(scene, camera);
    }, undefined, (error) => {
      console.error('Error loading model:', error);
    });

    // Camera positioning
    camera.position.z = 5;

    // OrbitControls for interactivity
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.update();

    // Animation loop
    const animate = function () {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // Clean up the effect
    return () => {
      document.getElementById('model-viewer').removeChild(renderer.domElement);
    };
  }, [url]);

  return <div id="model-viewer" style={{ width: '100%', height: '500px' }}></div>;
};

export default ModelViewer;
