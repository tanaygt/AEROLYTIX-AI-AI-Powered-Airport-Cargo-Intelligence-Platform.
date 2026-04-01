import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Box, Html, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { useDemo } from '../context/DemoContext';

// Radar Sweep
function RadarSweep() {
  const radarRef = useRef();
  const { speedMultiplier } = useDemo();
  
  const radarTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    
    // Polyfill or ignore gradient if unsupported, standard linear is fine but let's do simple arc
    const numSteps = 30;
    for(let i=0; i<numSteps; i++) {
        ctx.beginPath();
        ctx.moveTo(128,128);
        ctx.arc(128, 128, 128, i * 2 * Math.PI / numSteps, (i+1) * 2 * Math.PI / numSteps);
        ctx.fillStyle = `rgba(0, 243, 255, ${i / numSteps * 0.5})`;
        ctx.fill();
    }
    return new THREE.CanvasTexture(canvas);
  }, []);

  useFrame((state) => {
    if (radarRef.current) {
      radarRef.current.rotation.z -= 0.02 * speedMultiplier;
    }
  });

  return (
    <group position={[0, -0.58, 0]}>
      <mesh ref={radarRef} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[25, 64]} />
        <meshBasicMaterial 
          color="#ffffff" 
          transparent 
          opacity={1} 
          map={radarTexture}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}


function Truck({ position, speed, offset, path }) {
  const group = useRef();
  const { speedMultiplier } = useDemo();
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime() * speed * speedMultiplier + offset;
    // Simple back and forth along Z or X depending on path
    if (path === 'z') {
      group.current.position.z = position[2] + Math.sin(time) * 12;
    } else {
      group.current.position.x = position[0] + Math.sin(time) * 12;
    }
    // Simple rotation snap
    group.current.rotation.y = Math.cos(time) > 0 ? (path === 'z' ? 0 : Math.PI/2) : (path === 'z' ? Math.PI : -Math.PI/2);
  });
  
  return (
    <group ref={group} position={position}>
      <Box args={[0.8, 1, 2.5]} castShadow>
        <meshStandardMaterial color="#7B61FF" roughness={0.3} metalness={0.7} />
      </Box>
      <Box position={[0, 0.4, 0.8]} args={[0.8, 0.5, 0.8]}>
         <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.2} />
      </Box>
      <pointLight position={[0.4, -0.2, 1.2]} intensity={2} color="#00F3FF" distance={8} />
      <pointLight position={[-0.4, -0.2, 1.2]} intensity={2} color="#00F3FF" distance={8} />
    </group>
  );
}

function DataPulse({ start, end, color }) {
  const points = [start, end];
  const { speedMultiplier } = useDemo();
  const matRef = useRef();

  useFrame((state) => {
    if (matRef.current) {
      matRef.current.opacity = 0.3 + Math.sin(state.clock.elapsedTime * 4 * speedMultiplier) * 0.4;
    }
  });

  return (
    <mesh>
      <tubeGeometry args={[new THREE.CatmullRomCurve3(points.map(p => new THREE.Vector3(...p))), 20, 0.08, 8, false]} />
      <meshBasicMaterial ref={matRef} color={color} transparent opacity={0.6} />
    </mesh>
  );
}

function IoTPulse({ position, color }) {
  const { speedMultiplier } = useDemo();
  const sphereRef = useRef();
  
  useFrame((state) => {
    if(sphereRef.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 3 * speedMultiplier) * 0.5;
      sphereRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group position={position}>
      <Sphere args={[0.2, 16, 16]}>
        <meshBasicMaterial color={color} />
      </Sphere>
      <Sphere ref={sphereRef} args={[0.3, 16, 16]}>
        <meshBasicMaterial color={color} transparent opacity={0.3} />
      </Sphere>
    </group>
  );
}

function Label({ position, title, value, color }) {
  return (
    <Html position={position} center zIndexRange={[100, 0]}>
      <div style={{
        background: 'rgba(11, 15, 26, 0.85)',
        border: `1px solid ${color}`,
        padding: '6px 12px',
        borderRadius: '6px',
        color: '#fff',
        fontSize: '11px',
        whiteSpace: 'nowrap',
        backdropFilter: 'blur(8px)',
        pointerEvents: 'none',
        boxShadow: `0 0 15px ${color}50`,
        fontFamily: 'var(--font-main)'
      }}>
        <div style={{color: color, fontWeight: 800, letterSpacing:'0.5px'}}>{title}</div>
        <div style={{fontWeight: 500, marginTop:'2px'}}>{value}</div>
      </div>
    </Html>
  );
}

function Scene() {
  const { speedMultiplier } = useDemo();
  
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 20, 10]} intensity={1.5} castShadow />
      
      {/* Ground Grid */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, -0.6, 0]}>
        <planeGeometry args={[80, 80]} />
        <meshStandardMaterial color="#0B0F1A" roughness={0.1} metalness={0.6} />
      </mesh>
      
      <gridHelper args={[80, 80, "#00F3FF", "#1a203f"]} position={[0, -0.59, 0]} />

      <RadarSweep />

      {/* Warehouses */}
      <Box position={[-12, 2.5, -8]} args={[14, 6, 14]} castShadow receiveShadow>
        <meshStandardMaterial color="#111827" roughness={0.2} metalness={0.8} opacity={0.95} transparent />
      </Box>
      <IoTPulse position={[-12, 6, -8]} color="#EAB308" />
      <Label position={[-12, 7.5, -8]} title="WH-ALPHA" value="12,450 kWh Draw" color="#EAB308" />

      <Box position={[12, 3.5, -8]} args={[12, 8, 12]} castShadow receiveShadow>
        <meshStandardMaterial color="#111827" roughness={0.2} metalness={0.8} opacity={0.95} transparent />
      </Box>
      <IoTPulse position={[12, 8, -8]} color="#00F3FF" />
      <Label position={[12, 9.5, -8]} title="WH-BETA" value="84% Capacity" color="#00F3FF" />

      {/* Containers Block */}
      <group position={[6, 0, 8]}>
        {[...Array(30)].map((_, i) => (
          <Box 
            key={i} 
            position={[ (i%5)*1.5, 0.5 + Math.floor(i/15)*1.1, (Math.floor(i/5)%3)*2 ]} 
            args={[1.2, 1, 2.4]} 
            castShadow
          >
            <meshStandardMaterial color={["#00F3FF", "#7B61FF", "#1f2937", "#FF4D6D"][i%4]} />
          </Box>
        ))}
      </group>
      <IoTPulse position={[9, 3, 10]} color="#FF4D6D" />
      <Label position={[9, 4.5, 10]} title="STACK C SECURITY" value="2 Alerts Flagged" color="#FF4D6D" />

      {/* Moving autonomous trucks */}
      <Truck position={[-3, 0.5, 8]} speed={0.4} offset={0} path="z" />
      <Truck position={[0, 0.5, 2]} speed={0.6} offset={Math.PI} path="x" />
      <Truck position={[-8, 0.5, 12]} speed={0.5} offset={Math.PI/2} path="z" />

      {/* Glowing Data Routing */}
      <DataPulse start={[-12, 0, -8]} end={[-3, 0, 8]} color="#00F3FF" />
      <DataPulse start={[12, 0, -8]} end={[6, 0, 8]} color="#22C55E" />
      <DataPulse start={[-12, 0, -8]} end={[12, 0, -8]} color="#7B61FF" />
      <DataPulse start={[9, 0, 10]} end={[0, 0, 2]} color="#FF4D6D" />

      <OrbitControls 
        enableZoom={false} 
        autoRotate 
        autoRotateSpeed={0.5 * speedMultiplier} 
        maxPolarAngle={Math.PI/2 - 0.05} 
        minPolarAngle={Math.PI/6}
      />
    </>
  );
}

const Scene3D = () => {
  return (
    <div className="three-container glass-panel">
      <div className="three-overlay">
        <h3 style={{color: '#fff', textShadow: '0 0 10px rgba(0,243,255,0.5)'}}>Digital Twin Matrix</h3>
        <p style={{color: 'var(--color-primary)', fontSize: '12px', letterSpacing: '2px', textTransform:'uppercase'}}>Live Global Tracking</p>
      </div>
      <Canvas shadows camera={{ position: [25, 20, 30], fov: 40 }}>
        <Scene />
      </Canvas>
    </div>
  );
};

export default Scene3D;
