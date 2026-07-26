import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import styles from './TShirt3DViewer.module.css';

interface TShirt3DViewerProps {
  imageUrl: string;
  backImageUrl?: string;
  baseColor: string;
}

export const TShirt3DViewer: React.FC<TShirt3DViewerProps> = ({ imageUrl, backImageUrl, baseColor }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;

    // Create scene, camera, renderer
    const scene = new THREE.Scene();

    const width = container.clientWidth || 300;
    const height = container.clientHeight || 300;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 3.8); // Framed perfectly

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true, // Transparent canvas background
      preserveDrawingBuffer: true
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // General ambient lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    // Front key light to highlight fabric and face details
    const keyLight = new THREE.DirectionalLight(0xffffff, 0.85);
    keyLight.position.set(1.5, 3, 2.5);
    scene.add(keyLight);

    // Back rim light to create a sleek border glow on the plaque
    const rimLight = new THREE.DirectionalLight(0xff4d00, 0.6); // Brand orange rim light
    rimLight.position.set(-2, -3, -2.5);
    scene.add(rimLight);

    // Create a Card Group
    const cardGroup = new THREE.Group();
    scene.add(cardGroup);

    // 1:1 aspect ratio matching the product images
    const cardGeometry = new THREE.BoxGeometry(2.1, 2.1, 0.05);

    // Load textures
    const textureLoader = new THREE.TextureLoader();
    textureLoader.setCrossOrigin('anonymous');

    let frontTexture: THREE.Texture | null = null;
    let backTexture: THREE.Texture | null = null;

    const finalizeMaterials = () => {
      if (!frontTexture) return;

      frontTexture.colorSpace = THREE.SRGBColorSpace;
      if (backTexture) {
        backTexture.colorSpace = THREE.SRGBColorSpace;
      }

      // Materials for the 6 faces:
      // materials[0] : Right face (+X)
      // materials[1] : Left face (-X)
      // materials[2] : Top face (+Y)
      // materials[3] : Bottom face (-Y)
      // materials[4] : Front face (+Z)
      // materials[5] : Back face (-Z)
      
      const edgeMaterial = new THREE.MeshStandardMaterial({
        color: new THREE.Color('#151515'), // Dark glass/obsidian edge
        roughness: 0.15,
        metalness: 0.95,
        transparent: true,
        opacity: 0.9,
      });

      const frontMat = new THREE.MeshStandardMaterial({
        map: frontTexture,
        roughness: 0.35,
        metalness: 0.05,
      });

      const backMat = new THREE.MeshStandardMaterial({
        map: backTexture || frontTexture,
        roughness: 0.35,
        metalness: 0.05,
      });

      const materials = [
        edgeMaterial, // Right
        edgeMaterial, // Left
        edgeMaterial, // Top
        edgeMaterial, // Bottom
        frontMat,     // Front
        backMat,      // Back
      ];

      const cardMesh = new THREE.Mesh(cardGeometry, materials);
      cardGroup.add(cardMesh);
      setLoading(false);
    };

    // Load front texture
    textureLoader.load(
      imageUrl,
      (fTex) => {
        frontTexture = fTex;
        
        // Load back texture if available
        if (backImageUrl && backImageUrl !== imageUrl) {
          textureLoader.load(
            backImageUrl,
            (bTex) => {
              backTexture = bTex;
              finalizeMaterials();
            },
            undefined,
            (err) => {
              console.error("Error loading back model texture, using front texture fallback:", err);
              finalizeMaterials();
            }
          );
        } else {
          finalizeMaterials();
        }
      },
      undefined,
      (err) => {
        console.error("Error loading front model texture:", err);
        // Fallback: draw basic colored plaque
        const fallbackMat = new THREE.MeshStandardMaterial({
          color: new THREE.Color(baseColor),
          roughness: 0.7,
        });
        const cardMesh = new THREE.Mesh(cardGeometry, fallbackMat);
        cardGroup.add(cardMesh);
        setLoading(false);
      }
    );

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = true;
    controls.minDistance = 1.8;
    controls.maxDistance = 5.0;

    // Detect user interactions to suspend auto-rotation
    let isUserInteracting = false;
    const handleStartInteract = () => {
      isUserInteracting = true;
    };
    const handleEndInteract = () => {
      isUserInteracting = false;
    };

    controls.addEventListener('start', handleStartInteract);
    controls.addEventListener('end', handleEndInteract);

    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Auto-rotate the card slowly if user is not actively dragging
      if (!isUserInteracting) {
        cardGroup.rotation.y += 0.006;
      }

      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(container);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      controls.removeEventListener('start', handleStartInteract);
      controls.removeEventListener('end', handleEndInteract);
      controls.dispose();
      renderer.dispose();
      cardGeometry.dispose();

      // Dispose materials
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          if (Array.isArray(object.material)) {
            object.material.forEach((mat) => mat.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
    };
  }, [imageUrl, backImageUrl, baseColor]);

  return (
    <div ref={containerRef} className={styles.container}>
      {loading && (
        <div className={styles.loader}>
          <div className={styles.spinner} />
          <span>LOADING 3D VIEW...</span>
        </div>
      )}
      <canvas ref={canvasRef} className={styles.canvas} />
      <div className={styles.hint}>DRAG TO ROTATE / SCROLL TO ZOOM</div>
    </div>
  );
};
