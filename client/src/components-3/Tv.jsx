import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Tv(props) {
  const { nodes, materials } = useGLTF('./models/Tv.glb')
  return (
    <group {...props} dispose={null} scale={5} position={[40,6,55]} rotation={[0,-Math.PI/2,0]}>
      <group position={[3.074, 1.192, 3.754]} scale={[0.024, 0.83, 1.136]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube062.geometry}
          material={materials['tv screen']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube062_1.geometry}
          material={materials['Material.003']}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tablet.geometry}
        material={materials.metall}
        position={[3.345, -0.401, 4.944]}
        scale={0.83}
      />
     
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tablet001.geometry}
        material={materials.metall}
        position={[3.345, -0.401, 4.944]}
        scale={0.83}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tablet002.geometry}
        material={materials['White mdf']}
        position={[3.345, -0.469, 4.944]}
        scale={0.83}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tablet003.geometry}
        material={materials['White mdf']}
        position={[3.345, -0.887, 4.944]}
        scale={0.83}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tablet004.geometry}
        material={materials['White mdf']}
        position={[3.345, -1.306, 4.944]}
        scale={0.83}
      />
    </group>
  )
}

useGLTF.preload('/Tv.glb')
