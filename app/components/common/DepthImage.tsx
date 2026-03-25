"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface DepthImageProps {
    image: string;
    depthMap: string;
    strength?: number; // default 0.05
    style?: React.CSSProperties;
}

export default function DepthImage({
    image,
    depthMap,
    strength = 0.05,
    style
    
}: DepthImageProps) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        if (!canvasRef.current) return;

        // Renderer
        const renderer = new THREE.WebGLRenderer({
            canvas: canvasRef.current,
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);

        // Scene + Camera
        const scene = new THREE.Scene();
        const camera = new THREE.OrthographicCamera(
            -1, 1,
            1, -1,
            0, 1
        );


        // Mouse uniform
        const mouse = new THREE.Vector2(0.5, 0.5);

        // Load textures
        const loader = new THREE.TextureLoader();
        const imageTex = loader.load(image);
        const depthTex = loader.load(depthMap);

        // Shader material
        const material = new THREE.ShaderMaterial({
            uniforms: {
                uImage: { value: imageTex },
                uDepth: { value: depthTex },
                uMouse: { value: mouse },
                uDepthStrength: { value: strength },
                uAspect: {
                    value:
                        canvasRef.current!.clientWidth /
                        canvasRef.current!.clientHeight
                }
            },
            vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position, 1.0);
        }
      `,
            fragmentShader: `
        uniform sampler2D uImage;
uniform sampler2D uDepth;
uniform vec2 uMouse;
uniform float uDepthStrength;
uniform float uAspect;

varying vec2 vUv;

void main() {
    // correct for aspect ratio
    vec2 uv = vUv;
    uv.x = (uv.x - 0.5) * uAspect + 0.5;

    float depth = texture2D(uDepth, uv).r;

    vec2 offset = (uMouse - 0.5) * uDepthStrength * depth;
    uv += offset;

    gl_FragColor = texture2D(uImage, uv);
}
      `,
        });

        // Fullscreen quad
        const quad = new THREE.Mesh(
            new THREE.PlaneGeometry(2, 2),
            material
        );
        scene.add(quad);

        // Mouse move
        const onMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX / window.innerWidth;
            mouse.y = 1.0 - e.clientY / window.innerHeight;
        };
        window.addEventListener("mousemove", onMouseMove);

        // Resize handler
        const { clientWidth, clientHeight } = canvasRef.current;
        renderer.setSize(clientWidth, clientHeight, false);


        // Animation loop
        let frameId: number;
        const animate = () => {
            renderer.render(scene, camera);
            frameId = requestAnimationFrame(animate);
        };
        animate();

        // Cleanup
        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            cancelAnimationFrame(frameId);
            renderer.dispose();
        };
    }, [image, depthMap, strength]);

    return <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block",
        ...style }} />;
}
