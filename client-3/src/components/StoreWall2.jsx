import React from 'react'
import * as THREE from "three"

const StoreWall2 = () => {
  return (
    <mesh position={[0,7,75]}>
        <planeGeometry args={[250,15]} />
        <meshStandardMaterial
        side={THREE.DoubleSide}
        />
      
    </mesh>
  )
}

export default StoreWall2
