import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Shelf4(props) {
  const { nodes, materials } = useGLTF('./models/Shelf.glb')

  
  return (
    <group {...props} dispose={null} scale={7} position={[55,0,72.5]}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane.geometry}
       
      />
    </group>
  )
}

useGLTF.preload('./models/Shelf.glb')