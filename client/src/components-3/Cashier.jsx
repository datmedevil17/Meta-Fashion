import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Cashier(props) {
  const { nodes, materials } = useGLTF('./models/CASHIER DESK.glb')
  return (
    <group {...props} dispose={null} scale={10} rotation={[0,-Math.PI/2,0]} position={[110,0,0]} >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube021.geometry}
        material={materials['DYED METAL']}
        position={[0.411, 0.39, -0.322]}
        rotation={[Math.PI, 0.001, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube020.geometry}
          material={materials['DYED METAL']}
          position={[-0.443, -0.012, -0.617]}
        />
        <group position={[-0.427, -0.447, -0.24]} rotation={[Math.PI, 0, 0]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube.geometry}
            material={materials.METAL_GRAY}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube_1.geometry}
            material={materials['RUBBER GRAY']}
          />
        </group>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube023.geometry}
          material={materials.RUBER_BLACK}
          position={[-0.454, -0.447, -0.321]}
          rotation={[Math.PI, 0, 0]}
          scale={[1, 1.008, 1.008]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube024.geometry}
          material={materials.RUBBER}
          position={[-0.346, -0.447, 0.004]}
          rotation={[Math.PI, 0, 0]}
          scale={[1, 1.008, 1.008]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube027.geometry}
          material={materials.RUBBER}
        />
        <group position={[-0.41, -0.49, -0.321]} rotation={[Math.PI, 0, 0]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane001_1.geometry}
            material={materials['CASHIER DESK GLASS']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane001_2.geometry}
            material={materials.METAL_GRAY}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane001_3.geometry}
            material={materials['METAL WEAVE']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane001_4.geometry}
            material={materials.RUBBER}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane001_5.geometry}
            material={materials['HARD PLASTIC']}
          />
        </group>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane003.geometry}
          material={materials['CASHIER DESK GLASS']}
          position={[-0.315, -0.844, -0.566]}
          rotation={[-Math.PI / 2, 0, 0]}
        />
      </mesh>
    </group>
  )
}

useGLTF.preload('./models/CASHIER DESK.glb')