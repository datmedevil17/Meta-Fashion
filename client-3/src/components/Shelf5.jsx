import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Shelf5(props) {
  const { nodes, materials } = useGLTF('./models/Shelf.glb')

  
  return (
    <group {...props} dispose={null} scale={7} position={[122,0,55]} rotation={[0,Math.PI/2,0]}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane.geometry}
       
      />
    </group>
  )
}

useGLTF.preload('./models/Shelf.glb')